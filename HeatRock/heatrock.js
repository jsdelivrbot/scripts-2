var scripts =
    ["https://my.nbot.eu/nWOOT/source.js",
      "https://d1rfegul30378.cloudfront.net/files/plugCubed.js",
        "https://rawgit.com/Varietyy/Scripts/master/Variety/chat.js"];
 
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
