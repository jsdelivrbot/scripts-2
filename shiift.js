var scripts =
    ["https://my.nbot.eu/nWOOT/source.js",
          "https://cdn.jsdelivr.net/gh/Varietyy/nomeh/shiftchat.js"];
 
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
