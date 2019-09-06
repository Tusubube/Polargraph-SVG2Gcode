PolarControl website allows to convert SVG to GCODE for Polargraph.

The goal is to offert a simple, intuitive and lightweight controller for polargraph.
For now the project is limited to a simple parser to get Gcode with polar coordinate (polargraph flavor).

PolarControl work for now as website in the perspective to bring polargraph to IoT project. As Euphy (Sandy Noble) as already started to adapt polaraph to ESP32, it is possible to creat a webserver as controller supported by ESP or raspberry pi. PolarControl could eventually become an ElectronJS project in order to get a real application. A local siteweb is very limited in terme of handling local files. 

I don't plan to bring a lot of feature to PolarControl project. 
For future devellopement my personnal priority is to get a preview render of genereted Gcode then offert the possibility to stop polargraph queue in order to change pen during printing. At the moment polargraph firmware can't handle pause order therefore this project could be extented to offert a raspberry pi JS application to directly drive motors throught a webserver.


how is it working :

defaultProperties.json //Properties of your polargraph, as cookies do not work on local website this is the best I have found.

_JS/
    SVGReader.js
    vec2.js
    svg2gcode.js
    
    those three are parsing SVG to paths and paths to Gcode. I find them on Gcode-simulator https://github.com/tmpvar/gcode-simulator/tree/master/js
    I simply modify it to become polar coordinate and polargraph flavor.
    
    dashBord.js        //all functions needed for buttons ans inputs
    setupParametes.js  //all functions needed to setup the polargraph parameters




