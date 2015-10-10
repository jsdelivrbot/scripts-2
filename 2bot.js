;(function(){
if (typeof trackbot !== "undefined") {
	trackbot.chatLog("2BotShakur is running!", "info");
	console.log("TrackBot is already running.");
} else {
	var trackbot = {
		"version": "Alpha 0.1",
		"name": "2BotShakur",
		"creator": "56012e412d5038030094d054",
		"defaultSettings": {
			"volume": 0,
			"stream": false,
			"chatSound": "off",
			"interface": "",
			"welcome": true,
			"goodbye": false,
		},
		"settings": {},
		"room": {},
		"user": {},
		// FUNCTIONS
		"getRoom": function() {
			$.ajax({
				type: "GET",
				url: "https://api.dubtrack.fm/room/" + $(".room-active-link").attr("href").split("/")[2],
				success: function(data) {
					trackbot.room = data.data;
				},
				error: function() {return null;}
			});
			return trackbot.room;
		},
		"getUser": function() {
			trackbot.getUserByName($(".user-info-button span")[0].innerHTML);
		},
		"getUserByName": function(name) {
			$.ajax({
				type: "GET",
				url: "https://api.dubtrack.fm/user/" + name,
				success: function(data) {
					window.name = data;
				},
				error: function() {return null;}
			});
			return window.name;
		},
		"announceScore": function(data) {
			if (typeof trackbot.previousSong === "undefined") {trackbot.previousSong = data; return;}
			setTimeout(function(){trackbot.score = trackbot.score = $(".dubstotal")[0].innerText;}, data.songInfo.songLength - 5000);
			trackbot.sendChat(trackbot.song.songInfo.name +", score: " + $('<span class="username-handle">'+trackbot.score+'</span>'));
			trackbot.previousSong = data;
		},
		"chatHandler": function(data) {
			if (localStorage.getItem("fcs-isBot") && data.type == "chat-message" && data.user.username !== trackbot.user.username) {
				var sender = data.user,
				    cmd = data.message.toLowerCase().split(" ");
				switch(cmd[0]) {
					case "!reload":window.onbeforeunload = "";location.reload();break;
					case "!ping":trackbot.sendChat("Pong!");break;
					case "!cookie":
						if (typeof cmd[1] === "undefined") trackbot.sendChat(":cookie:");
						else trackbot.sendChat(cmd[1] + ", " + sender.username + " offers you a cookie! :cookie:");
					break;
					case "!whoami":
						trackbot.sendChat("Name: "+sender.username+" ID: "+sender._id, "Dubs: "+sender.dubs);
					break;
					case "!welcome":
						trackbot.settings.welcome = !trackbot.settings.welcome;
						if (trackbot.settings.welcome) {
							trackbot.sendChat("Welcome Enabled!");
						} else {
							trackbot.sendChat("Welcome Disabled!");
						}
					break;
					case "!goodbye":
						trackbot.settings.goodbye = !trackbot.settings.goodbye;
						if (trackbot.settings.goodbye) {
							trackbot.sendChat("Goodbye Enabled!");
						} else {
							trackbot.sendChat("Goodbye Disabled!");
						}
					break;
					case "!status":
						trackbot.sendChat(JSON.stringify(trackbot.settings));
					break;
					default:
				}
			}
		},
		"sendChat": function(msg) {
			if (typeof msg === "string") {
				$.ajax({
					type: "POST",
					url: "https://api.dubtrack.fm/chat/" + trackbot.room._id,
					data: {
						"message": msg,
						"time": Date.now(),
						"type": "chat-message",
						"user": trackbot.user
					},
				});
			}
		},
		"chatLog": function(msg, type) {
			if (typeof type === "undefined" || typeof msg !== "string") return;
			switch(type) {
				case "info":
					msg = '<img class="emoji" src="https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/information_source.png" title=":information_source:" alt=":information_source:" align="absmiddle"></img> ' + msg;
				break;
				case "warn":
					msg = '<img class="emoji" src="https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/warning.png" title=":warning:" alt=":warning:" align="absmiddle"></img> ' + msg;
				break;
				case "error":
					msg = '<img class="emoji" src="https://mediadubtrackfm.s3.amazonaws.com/assets/emoji/images/emoji/bangbang.png" title=":bangbang:" alt=":bangbang:" align="absmiddle"></img> ' + msg;
				break;
				case "broadcast":
					msg = "" + msg;
				break;
			}
	if (!localStorage.getItem("trackbot")) {
		localStorage.setItem("trackbot", JSON.stringify(trackbot.defaultSettings));
	} else {
		// si LS.length != defaultSettings.length
		// LS[i] = defaultSettings[i]
	}
	trackbot.settings = JSON.parse(localStorage.getItem("trackbot"));
	trackbot.room = trackbot.getRoom();
	trackbot.user = trackbot.getUser();
	trackbot.sendChat(trackbot.name + " version " + trackbot.version + " is running!");
	Dubtrack.Events.on("realtime:chat-message", trackbot.chatHandler);
	Dubtrack.Events.on("realtime:room_playlist-update", trackbot.announceScore());
	Dubtrack.Events.on("realtime:user-join", function(data) {
		if (trackbot.settings.welcome) {
			trackbot.sendChat("Bienvenue @"+ data.user.username +" has joined!");
		}
	});
	Dubtrack.Events.on("realtime:user-leave", function(data) {
		if (trackbot.settings.goodbye) {
			trackbot.sendChat("@"+ data.user.username +" has left!");
		}
	});
}})();
