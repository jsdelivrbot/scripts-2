//      FULLY CUSTOMIZABLE PLUG.DJ BOT FOR FREE
//      In order to run this, you need to be Manager rank or higher. Be sure to ask the room host if you're allowed to run it.
//      If you are allowed, create an alt-account and copy-paste the code below into your browser-console (F12).
//      Also, this bot has NO PERMISSION CHECKER, so do it yourself or everyone in the room can lock/unlock the waitlist etc.
//      Have fun!
 
var Songlimit = "7 Minutes";           //This limit shows up, when the !Limit command is called; the bot does NOT AUTOMATICALLY SKIP
var Mehlimit = "7";                     //This limit shows up, when the !Limit command is called; the bot does NOT AUTOMATICALLY SKIP
 
//Launch Tasks
 
API.moderateMinChatLevel(2);    //You can remove this line if you want everyone to be able to chat
API.chatLog("/me Bot Loaded!", alert);
 
//API Tasks
//DJ Update (This will post a chat message as soon as the song changes; sample below)
//DJ Update sample: https://i.imgur.com/5b75sK5.png
 
API.on(API.ADVANCE, update);
function update(){
        API.sendChat("/me :musical_note: Now Playing: " + API.getMedia().title + " | DJ: " + API.getDJ().username + " | Link: http://youtu.be/" + API.getMedia().cid);
        var Users = API.getUsers();
}
 
//CUSTOM Tasks
//Username to ID (used to get a unique user ID from a username; used to mute/kick/ban people per command.)
 
function getID(name) {
        var users = API.getUsers();
        for (var i in users) if (users[i].username == name) return users[i].id;
        return null;
}
 
//Commands
 
API.on(API.CHAT, chat);
function chat(data) {
        var role = API.getUser(data.fromID).permission;
        botrole = API.getUser().permission;
        if(data.message.indexOf("!commands") > -1)
        {
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me [" + data.un + "] Commands list: [soon]");
        }
        if(data.message.indexOf("!ping") > -1)
        {
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me [" + data.un + "] Pong!");
        }
        if(data.message.indexOf("!pic") > -1)           //This shows up the thumbnail of the song (if played from youtube)
        {
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me [" + data.un + "] Thumbnail: http://i1.ytimg.com/vi/" + API.getMedia().cid + "/maxresdefault.jpg");
        }
        if(data.message.indexOf("!cycle") > -1)
        {
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me [" + data.un + "] DJ Cycle toggled!");
                API.moderateDJCycle();
        }
        if(data.message.indexOf("!say ") > -1)          //Using this, you can chat as the bot-account (if it's on a server for example)
        {
                var Text = data.message.substr(6);
                API.moderateDeleteChat(data.cid);
                API.sendChat(Text);
        }
        if(data.message.indexOf("!countdown") > -1)
        {
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me " + data.un + " has started a 30 seconds countdown!");
                setTimeout(function(){  API.sendChat("/me 30...");                      }, 10000);
                setTimeout(function(){  API.sendChat("/me 20...");                      }, 20000);
                setTimeout(function(){  API.sendChat("/me 10...");                      }, 30000);
                setTimeout(function(){  API.sendChat("/me 00"); }, 40000);
        }
        if(data.message.indexOf("!lock") > -1)
        {
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me :lock: " + data.un + " locked the waitlist!");
                API.moderateLockWaitList(true);
        }
        if(data.message.indexOf("!unlock") > -1)
        {
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me :unlock: " + data.un + " unlocked the waitlist!");
                API.moderateLockWaitList(false);
        }
        if(data.message.indexOf("!limit") > -1)
        {
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me [" + data.un + "] Max. songlength: " + Songlimit + " - Max. mehs: " + Mehlimit);
        }
        if(data.message.indexOf("!kill") > -1)          //This forces the bot to refresh the page
        {
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me [" + data.un + "] Bot shuts down!");
                location.reload();
        }
        if(data.message.indexOf("!cookie @") > -1)      //This gives the mentioned user a cookie (message below)
        {
                var Keksuser = data.message.substr(7);
                API.moderateDeleteChat(data.cid);
                API.sendChat("@" + Keksuser + ", " + data.un + " has given you a cookie! :cookie:");
        }
        if(data.message.indexOf("!pizza @") > -1)       //This gives the mentioned user a pizza (message below)
        {
                var Pizzauser = data.message.substr(8);
                API.moderateDeleteChat(data.cid);
                API.sendChat("@" + Pizzauser + ", " + data.un + " threw a pizza at your face! :pizza:");
        }
        if(data.message.indexOf("!kick @") > -1)        //This is a test; replace the timeouts with the ban & unban function and you're good to go!
        {
                var KickedUser = data.message.substr(7);
                var KickedID = getID(KickedUser);
                API.moderateDeleteChat(data.cid);
                API.sendChat("/me " + data.un + " kicked " + KickedUser + " for 10 minutes!");
                setTimeout(function(){  API.chatLog("Banning " + KickedID + "(" + API.getUser(KickedID).username + ") for 10 minutes.",true);   }, 1000);
                setTimeout(function(){  API.chatLog("Unbanning " + KickedID + "(" + API.getUser(KickedID).username + ")",true); }, 600000);
        }
        if(data.message.indexOf("!users") > -1)         //This gives an overview about the users in the room/waitlist.
        {
                API.moderateDeleteChat(data.cid);
                if(API.getWaitList().length >= 50) {
                        API.sendChat("/me [" + data.un + "] User total: " + API.getUsers().length + " | Waitlist is full.");
                } else {
                        API.sendChat("/me [" + data.un + "] User total: " + API.getUsers().length + " | Users in Waitlist: " + API.getWaitList().length);
                }
        }
}
