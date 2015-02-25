$(document).ready(function(){
 
//When script loads
API.chatLog("The King's ChatScript Enabled!")
$('#button-vote-positive').click();
 
//global var
var total = 0;
 
 
if (localStorage.usData === undefined) {
    localStorage.usData = JSON.stringify({
        counter: 0,
    })
}
 
//chat commands and so on below here
var intervalMessage = setInterval(function(){message();},3480000); //60,000 is 1 minute
 
function message(){
var m, msgs;
msgs = [
 "/me Reminder: Be sure to check the OP list before you play so you don't get skipped: http://pastebin.com/eW26rqFW",
 "/me Reminder: Chat every 60 minutes in order to DJ or you will be removed from the waitlist!",
 "/me Reminder: The song length limit is 8 minutes!",
 "/me Reminder: Try to keep your woot/meh ratio above 1.0. (Woot more than meh)",
 "/me Reminder: Ask the staff if you are unsure if your song is appropriate for the room!",
 "/me Reminder: Don't get butthurt if you lose your Resident DJ; you aren't the only one.",
 "/me Reminder: If you disconnect and you lose your spot, type !dc and the bot will move you back to your position!",
 "/me Reminder: The bot will skip you if you acquire 10 meh's on your track, so play good shit!",
 "/me Reminder: If you don't like a song, mute it and move on.",
 "/me Reminder: Play English only songs or you will be skipped!"];
 
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

API.on(API.CHAT, callback);
 function callback(data) {
   var msg = data.message;
   if (msg.indexOf('The roulette is now open! Type !join to participate!') > -1) {    
     API.sendChat('!join');
   }
 };
 
 API.on(API.CHAT, callback);
 function callback(data) {
   var msg = data.message;
   if (msg.indexOf("8/8 mehs. Skipping!") > 2) {    
     API.sendChat('!reload');
   }
 };
