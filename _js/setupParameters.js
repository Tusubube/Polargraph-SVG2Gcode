var machineName = document.getElementById("machineName");
var widthMotor = document.getElementById("widthMotor");
var heightMotor = document.getElementById("heightMotor");
var xPosition = document.getElementById("xPosition");
var yPosition = document.getElementById("yPosition");
var mmPerRev = document.getElementById("mmPerRev");
var setpsPerRev = document.getElementById("setpsPerRev");
var microstepping = document.getElementById("microstepping");
var maxSpeed = document.getElementById("maxSpeed");
var acceleration = document.getElementById("acceleration");
var Parameters = {};


function updateParameters() {
    Parameters.machineName = machineName.value;
    Parameters.widthMotor = widthMotor.value;
    Parameters.widthPX = Parameters.widthMotor * 3.7795275591;
    Parameters.heightMotor = heightMotor.value;
    Parameters.xPosition = xPosition.value;
    Parameters.xPositionPX = Parameters.xPosition * 3.7795275591;
    Parameters.yPosition = yPosition.value;
    Parameters.yPositionPX = Parameters.yPosition * 3.7795275591;
    Parameters.mmPerRev = mmPerRev.value;
    Parameters.setpsPerRev = setpsPerRev.value;
    Parameters.microstepping = microstepping.value;
    Parameters.maxSpeed = maxSpeed.value;
    Parameters.acceleration = acceleration.value;
    console.log(Parameters);
};

updateParameters();

function setParameters() {
    var gcodeParameters = [];
    gcodeParameters.push(["C24," + widthMotor.value + "," + heightMotor.value + ",END"]);
    gcodeParameters.push(["C29," + mmPerRev.value + ",END"]);
    gcodeParameters.push(["C30," + setpsPerRev.value + ",END"]);
    gcodeParameters.push(["C31," + maxSpeed.value + ",END"]);
    gcodeParameters.push(["C32," + acceleration.value + ",END"]);
    gcodeParameters.push(["C37," + microstepping.value + ",END"]);
    gcodeParameters.push([""]);
    //gcodeParameters.join('\n')
    console.log(gcodeParameters);
    gcodeDiv.value += gcodeParameters.join('\n');
};

function loadParameters(newParameters) {
    var Copie = Object.assign(Parameters, newParameters);
    var arrayCopie = Object.entries(Parameters);
    for (var i = 0; i < arrayCopie.length; i++) {
        var parameter = arrayCopie[i];
        if (document.getElementById(parameter[0]) !== null) {
            document.getElementById(parameter[0]).value = parameter[1];

        }
    }
    console.log(Parameters);
}

loadParameters(defaultProperties);
