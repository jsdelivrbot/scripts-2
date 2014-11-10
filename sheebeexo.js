$(document).ready(function(){
if (API.enabled && $("#radiantscriptt-css").length <= 0) {
$('body').prepend('<link rel="stylesheet" type="text/css" id="radiantscriptt-css" href="https://rawgit.com/Varietyy/nomeh/master/radiantscriptt.css" />');
 
//When script loads
API.chatLog("sheebeexo's ChatScript! Commands: /on, /off, /chat", alert)
$('#button-vote-positive').click();
 
//global var
var total = 0;
 
 
if (localStorage.usData === undefined) {
    localStorage.usData = JSON.stringify({
        counter: 0,
    })
}
 
function fanEveryone(data) {
    var relationship = require('app/models/TheUserModel');
    if (relationship.getRelationship(data.id) < 2) {
        var fan = require('app/services/user/UserFanService');
        fan = new fan(true, data.id);
          var totalCount = JSON.parse(localStorage.usData);
        ++totalCount.counter;
        console.log('Fanned new user: ' + data.username + '. Total number fanned: ' + totalCount.counter);
        localStorage.usData = JSON.stringify(totalCount);
                total + 1;
    }
}
API.on(API.USER_FAN, fanEveryone);
 
//chat commands and so on below here
var intervalMessage = setInterval(function(){message();},3480000); //60,000 is 1 minute
 
function message(){
var m, msgs;
msgs = [
"!props"];
 
m = Math.floor(Math.random() * msgs.length);
API.sendChat(msgs[m]);          
                         
}
 
 
API.on(API.CHAT_COMMAND, command);
function command(value)
{
        switch(value)
        {
                case "/off":
                clearInterval(intervalMessage);
                API.chatLog("ChatScript OFF", alert)
                break;
               
                case "/on":
            intervalMessage = setInterval(function(){message();},3480000);
                API.chatLog("ChatScript ON", alert)
                break;
               
                case "/fans":
                //API.sendChat(total + " People fanned since launched");
                API.chatLog(total + " People fanned since launched", alert)
                break;
               
                case "/chat":
                message();
                break;
               
        }
}
 
API.on(API.DJ_ADVANCE, woot);
function woot()
{
        $('#button-vote-positive').click();
}
 
 
});

API.on(API.CHAT,customChat);$("head").append('<style id="customChat">#chat-messages .id-4204176{background-color:#FFC0CB;}#chat-messages:nth-child(2n+1) .id-4204176{background-color:#FFC0CB;}</style>');function customChat(e){var t=$("#chat-messages").children().last();t.addClass("id-"+e.fid);}
