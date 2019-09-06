function svg2gcode(svg, settings) {
    svg = svg.replace(/^[\n\r \t]/gm, '');
    settings = settings || {};
    settings.scale = settings.scale || 1;


    var
        scale = function (val) {
            return val * settings.scale
        },
        paths = SVGReader.parse(svg, {}).allcolors,
        gcode,
        path;

    var idx = paths.length;
    while (idx--) {
        var subidx = paths[idx].length;
        var bounds = {
            x: Infinity,
            y: Infinity,
            x2: -Infinity,
            y2: -Infinity,
            area: 0
        };

        // find lower and upper bounds
        while (subidx--) {
            if (paths[idx][subidx][0] < bounds.x) {
                bounds.x = paths[idx][subidx][0];
            }

            if (paths[idx][subidx][1] < bounds.y) {
                bounds.y = paths[idx][subidx][0];
            }

            if (paths[idx][subidx][0] > bounds.x2) {
                bounds.x2 = paths[idx][subidx][0];
            }
            if (paths[idx][subidx][1] > bounds.y2) {
                bounds.y2 = paths[idx][subidx][0];
            }
        }

        // calculate area
        bounds.area = (1 + bounds.x2 - bounds.x) * (1 + bounds.y2 - bounds.y);
        paths[idx].bounds = bounds;
    }

    // cut the inside parts first
    paths.sort(function (a, b) {
        // sort by area
        return (a.bounds.area < b.bounds.area) ? -1 : 1;
    });
    
    
    
    //Polar coordinate ----------------------------------------------------------------------------------------------------------------


    //START PARSING TO GCODE ----------------------------------------------------------------------------------------------------------

    //integration settings
    gcode = [
    'C09,' + polarX(Parameters.xPosition, Parameters.yPosition) + ',' + polarY(Parameters.xPositionPX, Parameters.yPositionPX, 1) + ',END',
    'C14,END'
  ];

    for (var pathIdx = 0, pathLength = paths.length; pathIdx < pathLength; pathIdx++) {
        path = paths[pathIdx];

        gcode.push(['C17', scale(polarX(path[0].x, path[0].y, 1)), scale(polarY(path[0].x, path[0].y, 1)), '2', 'END'].join(','));
        gcode.push(['C13', 'END'].join(','));

        for (var segmentIdx = 1, segmentLength = path.length; segmentIdx < segmentLength; segmentIdx++) {

            var segment = path[segmentIdx];
            console.log(segment);
            var localSegment = ['C17', scale(polarX(segment.x, segment.y, 1)), scale(polarY(segment.x, segment.y, 1)), '2', 'END'].join(',');

            gcode.push(localSegment);
        }

        gcode.push(['C14', 'END'].join(','));

    }

    console.log(paths);


    // get back to origine
    gcode.push('C17,' + polarX(Parameters.xPosition, Parameters.yPosition) + ',' + polarY(Parameters.xPositionPX, Parameters.yPositionPX, 1) + ',END');
    gcode.push('');
    return gcode.join('\n');
}
