var scripts =
    ["https://my.nbot.eu/nWOOT/source.js",
      "https://rawgit.com/Varietyy/nomeh/master/Variety/rs.js",
        "https://rawgit.com/Varietyy/nomeh/master/Variety/chat.js"];
 
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
