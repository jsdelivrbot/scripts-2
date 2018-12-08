var scripts =
    ["https://cdn.jsdelivr.net/gh/Varietyy/scripts/name.js",
    "https://cdn.jsdelivr.net/gh/Varietyy/scripts/chat.js"];
 
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
