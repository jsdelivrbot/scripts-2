var scripts = ["https://rawgit.com/Varietyy/scripts/master/rs.js",
                     "https://rawgit.com/Varietyy/scripts/master/chase.js"];
 
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
