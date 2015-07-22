/*=====================================*/
API.sendChat('[Bot Mode Activated]');
var currentUsername = '@' + API.getUser().username; //the @name of the person who runs the script
var afkReason = 'I am AFK right now!'; //standard afk reason
var isAFK = false; //you are standard not afk
var respondRCS = false; //responder for RCS
var cmdRun = true; //for cooldown function
var MaxMeh = 10;
var MinMeh = 7;
var AFKcooldown = true;

function cooldown() { //Cooldown cmds for 5s
 cmdRun = false;
  setTimeout(function(){cmdRun = true},5000); //timeout cmd - sets after 5000ms cmdRun to true
 }
 
 function mehrulecalc() { //Calculates the needed mehs for a skip
var UserCount = API.getUsers().length; //user count in room
var MehCalc = Math.floor(UserCount - 100) / 10;
	API.chatLog(MehCalc.toString());
 }
function autoRespond(data) { //the function to respond
   var timeStamp = Date().substring(16,24) 
   var message = data.message; //the received message
   var fromUsername = data.un; //who sent the message
   if (isAFK === true) { //if you are afk Respond
        if (message.split(currentUsername).length > 1) {//if you are mentioned (so if @yourname is in the message)
        	if (AFKcooldown === true) {
                 	
		 API.sendChat('@' + fromUsername + ' [AFK] ' + afkReason + ' | I will respond when I get back!');//respond to who @mentioned you
		 AFKcooldown = false;
		 setTimeout(function(){AFKcooldown = true},60000);
        }
       }
    }
  if (isAFK === true) { //Logs msgs @me in console when you are in AFK mode. 
   if (message.split(currentUsername).length > 1) { //if you are mentioned (so if @yourname is in the message)
   console.log("[" + timeStamp + "] " + fromUsername + ' > ' + message); //log the message in the console 
   }
  }
}
API.on(API.CHAT,autoRespond); //bind the auto respond function to the chat event

function AfkMessage(command) { //the function to change the afk message
    if (command.split(' ')[0] === '/afk') { //if the command is /afk
        isAFK = true; //you are now afk
        afkReason = command.slice(5,255); //set the afk reason
	API.sendChat('/me [AFK] ' + afkReason); //sends in chat announcement about AFK with set reason
		// alert('|PH| When you are no longer AFK please disable AFK mode by typing /back'); //Alerts user to turn off AFK mode
	}
	if (command.split(' ')[0] === '/back') {	//When you are back and no longer AFK must type /back
	    API.sendChat('AFK mode disabled.');
		isAFK = false; //you are now no longer afk
	}
}
API.on(API.CHAT_COMMAND,AfkMessage) //bind the afk message change function to the command event

function rcsMsg(command) { //Function for pretyped rcs msg.
	if (command.split(' ') [0] === '/rcs') { //if the command is /rcs
		targetUser5 = command.slice(5,255); //The targeted user
		respondRCS = true; //Activates the responder function
	if(respondRCS === true) { //RCS Link/Help Responder
		API.sendChat(targetUser5 + " Link to RCS home page: https://rcs.radiant.dj/ just drag the RCS button above to your bookmarks bar, and you're good to go!"); //sends The Link @targetUser
		respondRCS = false; //or else chat explodes
	}
}
}
API.on(API.CHAT_COMMAND,rcsMsg)

function listcmds(command) { //Function for listing cmds
	if (command.split(' ') [0] === '/cmds') { //if the command is /cmds lists CMDS
		API.chatLog('Commands: https://goo.gl/cC0NF3')
 }
}
API.on(API.CHAT_COMMAND,listcmds)

function slotmachine(command) { //Function Play slot machine with urself
	if (command.split(' ') [0] === '/slots') { //activates slot machine when /slot in chat
		var slotItem = [":cherries:",":pineapple:",":apple:",":gift:",":pear:",":banana:",":watermelon:"]; //Items listed in slotmachine
		var slot1 = slotItem[Math.floor(Math.random()*slotItem.length)]; //Selects slot1
		var slot2 = slotItem[Math.floor(Math.random()*slotItem.length)]; //Selects slot2
		var slot3 = slotItem[Math.floor(Math.random()*slotItem.length)]; //Selects slot3
			API.sendChat(slot1 + " | " + slot2 + " | " + slot3); //Prints out result
		if (slot1 === slot2){
			API.sendChat("!!You Win!!"); //you win msg
		}
		else {
			API.sendChat("Better Luck Next Time."); //you loose msg
	}
  }
}
API.on(API.CHAT_COMMAND,slotmachine)

/* function kawaiipic(command) { 
	if (command.split(' ') [0] === '/kawaii') { 
	targetUser8 = command.slice(8,255); 
	var picture = ["http://i.imgur.com/Vtgj9ay.gif","http://i.imgur.com/VB572y3.png","http://i.imgur.com/a1NE7Wc.jpg","http://i.imgur.com/jC8E4Nq.jpg","http://puu.sh/iaSR7.jpg"]; //list of Pictures
	var randomPic = picture[Math.floor(Math.random()*picture.length)]; 
		API.sendChat(targetUser8 + ' ' + randomPic);
 }
}
API.on(API.CHAT_COMMAND,kawaiipic) */

function fiteuser(command) { //Function fite user kekeke
	if (command.split(' ') [0] === '!fight' ) { //if the command is /fite do below
	targetUser6 = command.slice(6,355); //Targeted user
	var outcomes = [currentUsername  + " passes out before the fight starts.",targetUser6 + " gets stabbed and dies.",targetUser6 + " ascends to heaven.","Both get knocked out.",currentUsername + " runs at " + targetUser6 + ", but trips and hits head.",targetUser6 + " is unconscious.",currentUsername + " Swings at " + targetUser6 + ", but accidentally hits @donvoo",targetUser6 + " Wins!",currentUsername + " Wins!"];
	var outcome = outcomes[Math.floor(Math.random()*outcomes.length)];
		API.sendChat(currentUsername + " fights " + targetUser6 + " - " + outcome);
	}
}
API.on(API.CHAT_COMMAND,fiteuser)

function mms(command) { //Meh mute shush function
if (command.split(' ') [0] === '/mms' ) { //if the command is /mms do below
	targetUser5 = command.slice(5,355); //Targeted user
	API.sendChat(targetUser5 + " Please don't ask for skips. Mute the song!");
 	}
}
API.on(API.CHAT_COMMAND,mms)

function mehrule(command) { //Meh mute shush function
if (command.split(' ') [0] === '/mehrules' ) { //if the command is /mms do below
var UserCount = API.getUsers().length; //user count in room
targetUser9 = ("[" + command.slice(9,355) + "]"); //Targeted user
var MehCalc = Math.floor((UserCount - 100) / 10);
	if (UserCount > 350) { 
	//	API.sendChat("Users currently in room - " + UserCount)
	API.sendChat("There are " + UserCount + " Users in the room. " + targetUser9 + " there are " + MaxMeh + " Meh's needed to skip the current song.");
	}
		if (350 > UserCount) { 
			if (200 < UserCount){
			API.sendChat("There are " + UserCount + " Users in the room. " + targetUser9 + " there are " + MehCalc + " Meh's needed to skip the current song.");
		} }
			if (UserCount < 200) {
				API.sendChat("There are " + UserCount + " Users in the room. " + targetUser9 + " there are " + MinMeh + " Meh's needed to skip the current song.");
			}
			
 }
}
API.on(API.CHAT_COMMAND,mehrule)

function GlobalCommands(data) {
	var username = data.un;
	switch (data.message.split(' ')[0]) {
		case '!join':
			if(API.getUser(data.uid).role === 0){ 
			API.sendChat('[@' + username + "] This command doesn't exist here!");
			break; }
		case 'skip':
			if(API.getUser(data.uid).role === 0){ 
			 if(/^.*(?!skips|skipped|history|no|don't|dont|not|why).*skip.*$/i.test(data.message)){
			var senderUsername = ('@' + data.un);
     			API.moderateDeleteChat(data.cid);
			API.sendChat(senderUsername + " Please don't ask for skips!");
			 }
		}
	}
}
API.on(API.CHAT,GlobalCommands)
