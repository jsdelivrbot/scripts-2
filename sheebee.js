var scripts =
    ["https://my.nbot.eu/nWOOT/source.js",
        "https://rawgit.com/Varietyy/nomeh/master/name.js",
          "https://rawgit.com/Varietyy/nomeh/master/sheebeexo.js"];
 
function load(script)
{
    if(typeof script === "undefined")
        script = 0;
    $.getScript(scripts[script++], function(){
        if(script < scripts.length)
        {
            load(script);
        }
    });
}
 
load();
