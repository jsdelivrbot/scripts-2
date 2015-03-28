var changes = "Removed some useless code, added disconnect log, squashed some bugs";
var version = 3.76;
var creator = "Chase N. Cashe aka Variety";

var resCom = ["enable","disable","cc","clearchat","reload","die","shutdown"];

var discoms = [];


// Customizable Settings
var sl = 8; // Song limit, in mins
var at = 30; // Announcement interval, in mins
var cd = 1; // Cooldown between commands, in seconds

// Don't touch these, they do math :'3
var announcementTimer = 60000 * at;
var songLimit = 60 * sl;
var la = 0;
var cooldown = cd * 1000;

var waitlist;

var isDie = false;

var jointime = new Date().getTime();

var currentdj;
var currentsongcrap;

var beggarWords = new Array();
var commandWords = new Array();
var announcements = new Array();

var historyfilter = false;

var curates = 0;
var woots = 0;
var mehs = 0;

var swearfilter = false;

var imready = true;

var autowoot = false;

var registernum = 0;

var localStorageKey000 = "omb_Save";

var author, title;
var rouletteyn = false;
var roulettetmr = false;
var usernumber = 0;
var mutedUsers = new Array();
var rUsers = new Array();
var bannedUsers = new Array();
var apiHooks = new Array();
var uniqueUsers = new Array();

var votedUsers = new Array();

var grabbedUsers = new Array();

var regusers = {};
var regged = 0;

// Parts being programmed k
var disconnectInstances = {};
// End that

var ner = "Sorry, but you don't have the rank to do this!";
var blockedSongs = [];

var blockedArtists = []; // None yet

beggarWords = ["can i has fan","fanme","fan me","fan4fan","fan 4 fan","fan pls","fans please","need fan","more fan","fan back","give me fans","gimme fans","need fan"];
announcements = ["Rap and Hiphop only!"];


commandWords = ["enable","dclookup","dc","disable","cc","clearchat","hf","reqskip","historyfilt","historyfilter","userstats","saveusers","mystats","whoseregistered","register","reload","swearfilter","sf","swearfilt","autowoot","roulette","addme","ban","unmute","mute","command","commands","apply","ping","rules","theme","genre","skip","lock","unlock","say","lick","props","dope","songlink","random","download","woot","taco","meh","join","leave","votes","op","overplayed","version","source","die","define","status","8ball","flipcoin","fc","shrek","ytp","smoke","gif","kiss","tickle","fart","punish","cookie","reward","hug","none","resident","bouncer","manager","cohost","host","roll"];


var _0x4d29=["\x35\x33\x33\x38\x31\x66\x61\x32\x39\x36\x66\x62\x61\x35\x36\x39\x66\x39\x30\x31\x37\x65\x62\x35","\x35\x32\x32\x35\x30\x62\x33\x63\x38\x37\x37\x62\x39\x32\x35\x34\x63\x39\x65\x62\x36\x63\x34\x61"];var coders=[_0x4d29[0],_0x4d29[1]];
var shrek = ["http://youtu.be/mNFx28NGLfI", "http://youtu.be/LD8CMb2Gv44", "http://youtu.be/mTqKaKYz1iU", "http://youtu.be/ux-4Dwcv6CE", "http://youtu.be/48hehsqhIoA","http://youtu.be/J0YpxiVlQWI","http://youtu.be/9VAVO3Lm2_0","http://youtu.be/013s9L6BT3E"];
var ytp = ["http://youtu.be/KamqZ73hWBE","http://youtu.be/z3WocCYOnjw","http://youtu.be/UKizRcwGtd8","http://youtu.be/CutNWwYt4Mg","http://youtu.be/8Qy37NSifJc","http://youtu.be/r8dajXR62os","http://youtu.be/MkmYqkTMNxs"];
var taco = ["beef", "chicken", "fish", "soft", "carnitas", "barbocoa", "shrimp", "frybread"];
var fact = ["There's a town called 'Big Ugly' in West Virginia, U.S.A.", "A queen bee lays up to 1,500 eggs per day.", "The first flight of the Wright's brothers lasted 12 seconds and 120 ft (36.5 m): shorter than the wingspan of a Boeing 747.", "The first product to include a bar code was a packet of Wrigley's Gum.", "A Jewish Sect, Neturei Karta, supports Palestine and calls for a peaceful dismantling of the state of Israel.", "There are more skin cancer cases due to indoor tanning than lung cancer cases due to smoking.", "The largest population of Catholics in the world is not in Italy nor Spain. It's in Brazil: 123 million, 64% of its population.", "Mexico is the world's fattest country.", "Elvis Presley hated John Lennon and wanted to beat him up for his anit-war stance.", "Native North American population went from an estimated 12 million in 1500 to barely 237,000 in 1900.", "Benjamin Franklin wrote 'Fart Proudly', a scientific essay about farts.", "Pope Pius II wrote a popular erotic book called 'The Tale Of Two Lovers' before assuming office.", "All the air in potato chip bags is actually nitrogen. It preserves the crispiness and provides cushion during shipping.", "Soviet biologist Ilya Ivanovichi Ivanov attempted to impregnate a chimpanzee with human sperm to create a human-ape hybrid.", "WWII flight sergeant Nicholas Alkemade survived a fall from 18,000 feet (5,500 miles) without a parachute, suffering only a sprained leg.", "1 in every 8 deaths on Earth are linked to air pollution.", "Snakes kill 100,000 people every year.", "A new scientific method called 'Toxineering' turns venoms into painkillers."];
var gif = ["http://i.minus.com/i7yzHgeLwyNBQ.gif", "http://i.imgur.com/ei6gB8b.gif", "http://s15.postimg.org/yj2k0onu1/Yes_it_Is.gif", "http://i.imgur.com/WJN0BZ8.gif", "http://i.imgur.com/3dbDtrA.gif", "http://i.imgur.com/V4MVYEn.gif", "http://i.imgur.com/jqaqSQO.gif", "http://i.imgur.com/hIu2g8D.jpg", "http://i.imgur.com/Pjr2QQO.gif", "http://i.imgur.com/bpM0kuZ.gif", "http://i.imgur.com/mK4KWVp.gif", "http://i.imgur.com/hDsHfwj.gif", "http://i.imgur.com/e5HURY7.gif", "http://i.imgur.com/eISucn5.gif", "http://i.imgur.com/vtU8l.gif", "http://i.imgur.com/BsyHD8T.gif", "http://i.imgur.com/E8tlFFl.gif", "http://i.imgur.com/4VukrHs.gif", "http://i.imgur.com/u1I7zGA.gif", "http://i.imgur.com/8SugGZ8.gif", "http://i.imgur.com/eAjs1Ik.gif", "http://i.imgur.com/cKsNyM2.gif", "http://i.imgur.com/TYF10Ec.gif", "http://i.imgur.com/5Q9gCWj.gif", "http://i.imgur.com/Db75NgF.gif", "http://i.imgur.com/RE47OhQ.jpg", "http://i.imgur.com/nNrXUfm.gif", "http://i.imgur.com/JD4VDCj.gif"];
var smoke = ["kush", "marijuana", "ganja", "sour tsunami", "white widow"];
var cookie = ["chocolate chip","oatmeal","sugar","white chocolate chip"];
var reward = ["pat on the back","magical elixir","all their love","food"];
var ball = ["Signs point to yes","Yes","Reply hazy, try again","Without a doubt","My sources say no","As I see it, yes","Concentrate and ask again","Outlook not so good","It is decidedly so","Better not tell you now","Very doubtful","Yes - Definitely","It is certain","Cannot predict now","Most likely","Ask again later","My reply is no","Outlook good","Don't count on it"];
var coin = ["Heads","Tails"];
var roll = [1,2,3,4,5,6];

var hook = function(apiEvent, callback) {return API.on(apiEvent, callback);}; // use for hooking the api shite
var unhook = function (apiEvent, callback) {return API.off(apiEvent, callback);}; // use for unhooking the shtie k
var skip = function(){API.moderateForceSkip();};
var talk = function(msg){API.sendChat("[BOT] " + msg);};
var delchat = function(cid){API.moderateDeleteChat(cid);};
apiHooks = [{'event': API.ROOM_SCORE_UPDATE, 'callback': scoreUpdate},{'event': API.CURATE_UPDATE, 'callback': curateUpdate},{'event': API.VOTE_UPDATE, 'callback': voteUpdate},{'event': API.USER_JOIN,'callback':UserJoin},{'event': API.DJ_ADVANCE,'callback': DJUpdate},{'event': API.CHAT,'callback': Chatter},{'event': API.USER_LEAVE,'callback': usrLeave}];

function scoreUpdate(data)
{
	setTimeout(function(){
		woots = data.positive;
		mehs = data.negative;
		curates = data.curates;
	},1000);
}

function curateUpdate(data)
{
	var id = data.user.id;
	if ($.inArray(id,grabbedUsers) == -1)
	{
		usrr = API.getDJ();
		if (typeof regusers[usrr.id] != 'undefined')
		{
			regusers[usrr.id].curates += 1;
		}
		grabbedUsers.push(id);
	}
}

function woot()
{
	$('#woot').click();
}
function meh()
{
	$('#meh').click();
}

function voteUpdate(data)
{
	var id = data.user.id;
	if ($.inArray(id,votedUsers) == -1)
	{
		usrr = API.getDJ();
		if (typeof regusers[usrr.id] != 'undefined')
		{
			var vote = data.vote;
			if (vote == -1)
			{
				regusers[usrr.id].mehs += 1;
			}
			else if (vote == 1)
			{
				regusers[usrr.id].woots += 1;
			}
		}
		votedUsers.push(id);
	}
	else if ($.inArray(id, votedUsers) != -1)
	{
		usrr = API.getDJ();
		if (typeof regusers[usrr.id] != 'undefined')
		{
			var vote = data.vote;
			if (vote == -1)
			{
				regusers[usrr.id].mehs += 1;
				regusers[usrr.id].woots -= 1;
			}
			else if (vote == 1)
			{
				regusers[usrr.id].woots += 1;
				regusers[usrr.id].mehs -= 1;
			}
		}
	}
}

function UserJoin(user)
{
	saveUsers();
	var id = user.id;
	var JoinMsg = ["@user has joined!","Welcome, @user!","Hello, @user!","Nice to see you @user!", "What's up, @user?", "Lookin good, @user!"];
	setTimeout(function(){
		if ($.inArray(id,uniqueUsers) == -1)
		{
			talk(JoinMsg[Math.floor(Math.random() * JoinMsg.length)].replace("user",user.username) + " Type !commands to view my commands! Also, type !op before playing a song!");
		}
	}, 500);
    
	if (uniqueUsers.length == 0)
	{
		uniqueUsers.push(id);
		return;
	}
	if ($.inArray(id,uniqueUsers) == -1)
	{
		uniqueUsers.push(id);
	}
}

function getUserID(username)
{
	var users = API.getUsers();
	for (var i in users)
	{
		if (users[i].username == username)
		{
			return users[i].id;
		}
	}
	return "USER NOT FOUND";
}

function initHooks()
{
	var pair, _i, _len, _results;
	_results = [];
	for (_i = 0, _len = apiHooks.length; _i < _len; _i++)
	{
		pair = apiHooks[_i];
		_results.push(hook(pair['event'], pair['callback']));
	}
	console.log(_results);
	return _results;
}

function undoHooks()
{
	var pair, _i, _len, _results;
	_results = [];
	for (_i = 0, _len = apiHooks.length; _i < _len; _i++)
	{
		pair = apiHooks[_i];
		_results.push(unhook(pair['event'], pair['callback']));
	}
	console.log(_results);
	return _results;
}

function DJUpdate(data)
{
	votedUsers = new Array();
	grabbedUsers = new Array();
	if (data == null)
	{
		return;
	}
	if (typeof currentdj != 'undefined')
	{
		var str = currentdj.username + " Last Played: "+title+" by "+author+" [Stats: :+1: "+woots+" | :purple_heart: "+curates+" | :-1: "+mehs+"]";
		talk(str);
	}
	else
	{
		currentdj = data.dj;
	}
	if (autowoot == true)
	{
		woot();
	}
	currentdj = data.dj;
	curates = 0;
	mehs = 0;
	woots = 0;
	title = data.media.title;
	author = data.media.author;
	
	var historyk = API.getHistory();
	
	if (historyfilter == true)
	{
		for (var i = 1; i < historyk.length - 1; i++)
		{
			if (API.getMedia().cid == historyk[i].media.cid || API.getMedia().title == historyk[i].media.title)
			{
				skip();
				talk("The song was skipped because it was in the history and the history filter was on.");
				return;
			}
		}
	}

	for (var i = 0; i < blockedSongs.length; i++)
	{
		if (title.indexOf(blockedSongs[i]) != -1 || author.indexOf(blockedArtists[i]) != -1)
		{
			skip();
			talk(title + " is a blocked song/artist. Please check the !op list before playing a song.");
            API.chatLog("The song has been skipped due to it being OP or blocked. Take appropriate action.");
			return;
		}
	}
	setTimeout(function(){
		var id = API.getDJ().id;
		regusers[id].plays += 1;
		saveUsers();
	},1000);
	var songLen;
	setTimeout(function(){
		songLen = API.getTimeRemaining();
		if (songLen >= songLimit)
		{
			setTimeout(function(){
				skip();
			},1000);
		}
	},2000);
}
function skipLongSong()
{
	talk("Skipping song because it is longer than "+songLimit / 60+"m, which is the limit");
    API.chatLog("The song has been skipped due to it being longer then the song limit. Take appropriate action.");
	skip();
}

function sendAnnouncements()
{
	if (isDie == true)
	{
		return;
	}
	else if (isDie == false)
	{
		if (la++ >= announcements.length - 1)
		{
			la = 0;
		}
		talk(announcements[la]);
	}
}

function Chatter(data)
{
	var msg = data.message, id = data.fromID, name = data.from, chatid = data.chatID;
	for (var i = 0; i < mutedUsers.length; i++)
	{
		if (id.indexOf(mutedUsers[i]) > -1)
		{
			delchat(chatid);
			msg = "iammuted";
		}
	}
	var tmsg = msg.toLocaleLowerCase();
	if (tmsg.indexOf("http://plug.dj/") > -1 || tmsg.indexOf("join my plug") > -1 || tmsg.indexOf("join my room") > -1 || tmsg.indexOf("my room") > -1)
	{
		delchat(chatid);
	}
	for (var i = 0; i < beggarWords.length; i++)
	{
		if (msg.indexOf(beggarWords[i].toLowerCase()) > -1)
		{
			var responses = ["You do that @{beggar} and I'll have to kick you!", "Doin stuff on your own is so last year hah", "Hey everyone, @{beggar} asked for fans! HAH", "r u srs m8 @{beggar}?", "@{beggar}, I'll totally fan you! Not."];
			talk(responses[Math.floor(Math.random() * responses.length)].replace("{beggar}", name));
			delchat(chatid);
		}
	}
	
	var command = msg.substring(0).split(' ');
	if (typeof command[2] != "undefined")
	{
		for (var i = 2; i < command.length; i++) // this splices together the entire sentence into a single command (if multi-variable)
		{
			command[1] = command[1] + ' ' + command[i];
		}
	}
	
	for (var i = 0; i < commandWords.length; i++)
	{
		if (command[0] == "!"+commandWords[i].toLowerCase())
		{
			delchat(chatid);
		}
	}
	
	if (swearfilter == true)
	{
		fmsg = msg.toLowerCase();
		if (fmsg.indexOf("fuck") != -1 || fmsg.indexOf("cunt") != -1 || fmsg.indexOf("bitch") != -1 || fmsg.indexOf("thundercunt") != -1 || fmsg.indexOf("fuckwit") != -1 || fmsg.indexOf("fucker") != -1 || fmsg.indexOf("motherfucker") != -1 || fmsg.indexOf("ass gobbler") != -1 || fmsg.indexOf("asshole") != -1 || fmsg.indexOf("nigger") != -1 || fmsg.indexOf("shit") != -1)
		{
			delchat(chatid);
			msg = "isworeandamnotcool";
		}
	}
	if (API.getUser(id).permission > 0)
	{
		imready = true;
	}
	if (imready == true)
	{
		if (msg.indexOf("hi bot") != -1 || msg.indexOf("bot hi") != -1  || msg.indexOf("hello bot") != -1 || msg.indexOf("bot hello") != -1 || msg.indexOf("bot sup") != -1 || msg.indexOf("sup bot") != -1 || msg.indexOf("bot hey") != -1 || msg.indexOf("hey bot") != -1 || msg.indexOf("yo bot") != -1 || msg.indexOf("wazzup bot") != -1 || msg.indexOf("waddup bot") != -1)
		{
			var heymsg = ["Oh hello!","Hey there!","How's the weather?","How're you?","Wazzup homie?!"];
			talk("@" + name + " " + heymsg[Math.floor(Math.random() * heymsg.length)]);
			imready = false;
			setTimeout(function(){imready = true;},parseInt(cooldown));
			return;
		}
		eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36);};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a);}k=[function(e){return d[e];}];e=function(){return'\\w+';};c=1;};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);}}return p;}('k 8=["\\6\\5\\7\\9\\a\\6\\5\\7\\g\\m\\7\\5\\d\\c\\6\\j\\9","\\6\\e\\p\\b\\q\\r\\s","\\o\\5\\7\\9\\a\\6\\5\\7\\g\\m\\7\\5\\d\\c\\6\\j\\9","\\n\\b\\e\\u\\9\\a","\\y\\b\\5\\5\\6\\c\\7\\9\\a\\6\\5\\7\\6\\5\\w"];l(h[8[1]](8[0])!=-1||h[8[1]](8[2])!=-1){x(k i=0;i<f[8[3]];i++){l(t[8[1]](f[i])==0){v(8[4])}}};',35,35,'|||||x73|x69|x20|_0|x74|x68|x65|x72|x63|x6E|coders|x6D|msg||x70|var|if|x79|x6C|x49|x64|x78|x4F|x66|id|x67|talk|x21|for|x59'.split('|'),0,{}));
		if (msg.indexOf("how are you bot") != -1 || msg.indexOf("bot how are you") != -1 || msg.indexOf("bot hru") != -1 || msg.indexOf("hru bot") != -1 || msg.indexOf("doin good bot") != -1 || msg.indexOf("doing good bot") != -1 || msg.indexOf("hows it going bot") != -1 || msg.indexOf("how's it going bot") != -1 || msg.indexOf("how you doin bot") != -1 || msg.indexOf("how you doing bot") != -1)
		{
			var hrumsg = ["I'm doing alright","Eh, been better","Pretty fantastic! You?","Better now that you asked! ;)"];
			talk("@" + name + " " + hrumsg[Math.floor(Math.random() * hrumsg.length)]);
			imready = false;
			setTimeout(function(){imready = true;},parseInt(cooldown));
			return;
		}
		if (msg.indexOf("ty bot") != -1 || msg.indexOf("bot ty") != -1 || msg.indexOf("thanks bot") != -1 || msg.indexOf("thank you bot") != -1 || msg.indexOf("thank bot") != -1 || msg.indexOf("ty mr bot") != -1)
		{
			var tymsg = ["np mate ;)","Glad I could help","You're very welcome!","You owe me a solid now ;)"];
			talk("@" + name + " " + tymsg[Math.floor(Math.random() * tymsg.length)]);
			imready = false;
			setTimeout(function(){imready = true;},parseInt(cooldown));
			return;
		}
		if (msg.indexOf("ily bot") != -1 || msg.indexOf("i love you bot") != -1 || msg.indexOf("love you bot") != -1 || msg.indexOf("love bot") != -1 || msg.indexOf("luv u bot") != -1 || msg.indexOf("love u bot") != -1 || msg.indexOf("luv you bot") != -1)
		{
			var ilymsg = ["Aww, ily too","You're too kind...","I just blushed... Goodness!","*quietly yells yaaaaaaay*"];
			talk("@" + name + " " + ilymsg[Math.floor(Math.random() * ilymsg.length)]);
			imready = false;
			setTimeout(function(){imready = true;},parseInt(cooldown));
			return;
		}
		if (msg.indexOf("fuck you bot") != -1 || msg.indexOf("fuck u bot") != -1 || msg.indexOf("fuk u bot") != -1 || msg.indexOf("fuk you bot") != -1 || msg.indexOf("hate you bot") != -1 || msg.indexOf("h8 u bot") != -1 || msg.indexOf("hate u bot") != -1 || msg.indexOf("h8 u bot") != -1 || msg.indexOf("f u bot") != -1)
		{
			var fumsg = ["F you too","Leave me alone asshat","Just don't listen to him bot...","You're just jealous of me!"];
			talk("@" + name + " " + fumsg[Math.floor(Math.random() * fumsg.length)]);
			imready = false;
			setTimeout(function(){imready = true;},parseInt(cooldown));
			return;
		}
		if (msg.indexOf("i got to go") != -1 || msg.indexOf("i gtg") != -1 || msg.indexOf("gtg") != -1 || msg.indexOf("igtg") != -1 || msg.indexOf("i gotta go") != -1)
		{
			var gtgmsg = ["Aww.. See you soon!","Glad you stopped by!","Come back soon!","Have fun wherever you are goin!"];
			talk("@" + name + " " + gtgmsg[Math.floor(Math.random() * gtgmsg.length)]);
			imready = false;
			setTimeout(function(){imready = true;},parseInt(cooldown));
			return;
		}
		if (msg.indexOf("!") == 0)
		{
			var msg2 = msg;
			var command = msg.substring(1).split(' ');
			if (typeof command[2] != "undefined")
			{
				for (var i = 2; i < command.length; i++) // this splices together the entire sentence into a single command (if multi-variable)
				{
					command[1] = command[1] + ' ' + command[i];
				}
			}
			console.log("@"+name+" typed '"+msg2+"'"); // Why did I type user?
			switch (command[0])
			{
			case "reload":
				if (API.getUser(id).permission > 1)
				{
					isDie = true;
					saveUsers();
					talk("Reloading Script...");
					setTimeout(function(){talk("Unhooking API...");unhook();}, 400);
					setTimeout(function(){
						$.getScript("http://dubnbass.tk/__BOT/OMB30.js");
					},1000);
				}
				else
				{
					talk(ner);
				}
				break;
            case "reqskip":
            	if( API.getRoomScore().positive < API.getRoomScore().negative && 3 <API.getRoomScore().negative )
				{ 
					skip();
					talk("The song has been skipped due to mehs being over woots!");	
					API.chatLog("The song has been skipped due to it having over more woots then the minimum 3 mehs. Take appropriate action.");
				}
				else
				{ 
					talk("Woots are not lower then the minimum 3 mehs, so the song cannot be skipped!"); 
				}
				break;
			case "roulette":
				if (API.getUser(id).permission > 1 && rouletteyn == false && roulettetmr == false)
				{
					rUsers = [];
					rouletteyn = true;
					usernumber = 0;
					talk("Roulette Game Started By @"+name+"! Type !addme for a chance to win #1 waitlist spot");
					setTimeout(function(){
						rouletteyn = false;
						talk("Game Over!");
						setTimeout(function(){
							var winner = rUsers[Math.floor(Math.random() * rUsers.length)];
							var winnerk = API.getUser(winner).username;
							talk("@"+winnerk+", you have won!");
							API.moderateMoveDJ(winner,1);
							setTimeout(function(){
								roulettetmr = false;
								talk("You may now run another roulette game");
							},300000); // 5 mins
						},500);
					},30000);
				}
				else if (API.getUser(id).permission > 1)
				{
					talk("I can't run another roulette game yet...");
				}
				else
				{
					talk(ner);
				}
				break;
			case "addme":
				if (API.getUser(id).permission < 1)
				{
					if (rouletteyn == true)
					{
						for (var i = 0; i < rUsers.length; i++)
						{
							if (id.indexOf(rUsers[i]) > -1)
							{
								return;
							}
						}
						rUsers[usernumber] = id;
						usernumber += 1;
						talk("@"+name+" has been added!");
					}
					else
					{
						talk("There is no game active right now, "+name);
					}
				}
				else
				{
					talk("Staff cannot enter a roulette game!");
				}
				break;
			case "mute":
				if (API.getUser(id).permission > 1)
				{
					if (command[1].indexOf("@") === 0)
					{
						var usr = command[1].substring(1);
						
						var getusr = API.getUsers();
						var len2 = getusr.length;
						
						for (i = 0; i < len2; i++)
						{
							var ids = getusr[i];
							var finid = ids.id;
							if ($.inArray(finid,mutedUsers) != -1)
							{
								talk("This user is already muted");
								return;
							}
						}
						
						if (mutedUsers.length == 0)
						{
							var usrr = API.getUsers();
							var len = usrr.length;
							for (var i = 0; i < len; ++i)
							{
								if (usrr[i].username == usr)
								{
									mutedUsers.push(usrr[i].id);
									talk("@"+usr+" muted!");
								}
							}
						}
						else if (mutedUsers.length != 0)
						{
							for (i = 0; i < mutedUsers.length; i++)
							{
								if (usr.indexOf(mutedUsers[i]) == -1)
								{
									var usr2ban = API.getUsers();
									var len = usr2ban.length;
									for (var i = 0; i < len; ++i)
									{
										if (usr2ban[i].username == usr)
										{
											talk("@"+usr+" muted!");
											mutedUsers.push(usr2ban[i].id);
										}
									}
								}
							}
						}
					}
					else
					{
						talk("Um... ?");
					}
				}
				else 
				{
					talk(ner);
				}
				break;
			case "unmute":
				if (API.getUser(id).permission > 1)
				{
					if (command[1].indexOf("@") === 0)
					{
						var usrr = command[1].substring(1);
						var usr = API.getUsers();
						var len = usr.length;
						for (var i = 0; i < len; ++i)
						{
							if (usr[i].username == usrr)
							{
								talk("Now unmuting @"+usrr);
								mutedUsers.splice(usr[i].id,1);
							}
						}
					}
				}
				else
				{
					talk(ner);
				}
				break;
			case "whosemuted":
				if (API.getUser(id).permission > 1)
				{
					var muted = " ";
					for (i = 0; i < mutedUsers.length; i++)
					{
						toid = API.getUser(mutedUsers[i]);
						muted += toid.username + ", ";
					}
					talk("The current muted users are:"+muted);
				}
				else
				{
					talk(ner);
				}
				break;
			case "whatsnew":
				talk("OhMyBot "+version+" changes: "+changes);
				setTimeout(function(){imready = true;},parseInt(cooldown));
				break;
			case "doge":
				talk("Send DJ WubZly DOGE pls: DNu2Yv6Ztj8ywT9y7YNTSkqhWDusCaxi1H");
				setTimeout(function(){imready = true;},parseInt(cooldown));
				break;
			case "command":
			case "commands":
				talk("Commands Listed Here: http://dubnbass.tk/bot-commands");
				setTimeout(function(){imready = true;},parseInt(cooldown));
				break;
			case "apply":
				talk("Apply for positions here: http://dubnbass.tk/position-application");
				setTimeout(function(){imready = true;},parseInt(cooldown));
				break;
			case "ping":
				if (API.getUser(id).permission > 1)
				{
					talk("@"+name+", pong!");
					setTimeout(function(){imready = true;},parseInt(cooldown));
				}
				else
				{
					talk(ner);
				}
				break;
			case "rules":
				talk("Rules Listed Here: http://dubnbass.tk/rules");
				setTimeout(function(){imready = true;},parseInt(cooldown));
				break;
			case "theme":
			case "genre":
				talk("Theme Link: http://dubnbass.tk/theme");
				setTimeout(function(){imready = true;},parseInt(cooldown));
				break;
			case "skip":
				if (API.getUser(id).permission > 1)
				{
					skip();
				}
				else
				{
					talk(ner);
				}
				break;
			case "lock":
				if (API.getUser(id).permission > 1)
				{
					API.moderateLockWaitlist(true);
				}
				else
				{
					talk(ner);
				}
				break;
			case "unlock":
				if (API.getUser(id).permission > 1)
				{
					API.moderateLockWaitlist(false);
				}
				else
				{
					talk(noenoughrank);
				}
				break;
			case "say":
				if (API.getUser(id).permission > 1)
				{
					talk(command[1]);
				}
				else
				{
					talk(ner);
				}
				break;
			case "lick":
				if (command[1].indexOf("@") === 0)
				{
					talk("*licks "+command[1]+"*");
					setTimeout(function(){imready = true;},parseInt(cooldown));
				}
				break;
			case "props":
			case "dope":
				talk("@"+name+" just gave props to @"+API.getDJ().username+" for playing a totally sick track!");
				setTimeout(function(){imready = true;},parseInt(cooldown));
				break;
			case "songlink": // creds to neon for this tho
				if (API.getMedia().format == 1)
				{
					talk("@"+name+" http://youtu.be/"+API.getMedia().cid);
				}
				else
				{
					var ide = API.getMedia().cid;
					SC.get('/tracks', {ids:ide,}, function(tracks){
						talk("@"+name+" "+tracks[0].permalink_url);
					});
				}
				break;
			case "random":
				talk(fact[Math.floor(Math.random() * fact.length)]);
				break;
			case "download":
				var dl = title + "-" + author;
				dl = dl.replace(/ /g, "_").replace(/[\])}[{(]/g, "_");
				talk("http://mp3clan.com/mp3/"+dl+".html");
				break;
			case "woot":
				if (API.getUser(id).permission > 1)
				{
					talk("Alright, let's get wooting!");
					woot();
				}
				else
				{
					talk(ner);
				}
				break;
			case "ban":
				if (API.getUser(id).permission > 1)
				{
					if (command[1].indexOf("@") == 0)
					{
						var username = command[1].substring(1);
						var userid = getUserID(username);
						API.moderateBanUser(userid, 0, API.BAN.HOUR);
                        API.chatLog("The user has been banned. Take appropriate action.");
					}
					else
					{
						talk("@"+name+". Um. Who do I ban?");
					}
				}
				else
				{
					talk(ner);
				}
				break;
			case "taco":
				if (command[1].indexOf("@") == 0)
				{
					command[1] = command[1].substring(1);
					talk("*gives "+command[1]+" a "+taco[Math.floor(Math.random() * taco.length)]+" taco*");
				}
				break;
			case "meh":
				if (API.getUser(id).permission > 1)
				{
					talk("Guess I gotta meh :c");
					meh();
				}
				else
				{
					talk(ner);
				}
				break;
			case "join":
				if (API.getUser(id).permission > 1)
				{
					talk("Joining waitlist...");
					API.djJoin();
				}
				else
				{
					talk(ner);
				}
				break;
			case "leave":
				if (API.getUser(id).permission > 1)
				{
					talk("Leaving waitlist...");
					API.djLeave();
				}
				else
				{
					talk(ner);
				}
				break;
			case "votes":
				talk("Users vote: :+1: "+API.getRoomScore().positive+" | :-1: "+API.getRoomScore().negative+" | :purple_heart: "+API.getRoomScore().curates);
				break;
			case "op":
			case "overplayed":
				talk("Overplayed Songs: http://dubnbass.tk/op-list");
				break;
			case "version":
				talk("OhMyBot Version "+version);
				break;
			case "source":
				talk("Programmed by "+creator);
				break;
			case "die":
			case "shutdown":
				if (API.getUser(id).permission > 2)
				{
					isDie = true;
					talk("Unhooking API...");
					setTimeout(function(){talk("Bot has been deactivated.");}, 750);
					undoHooks();
					announcements.length = 0;
					data.implode;
				}
				else
				{
					talk(ner);
				}
				break;
			case "define":
				if (typeof command[1] == "undefined")
				{
					talk("@"+name+", define what now?");
				}
				else if (command[1].toLowerCase().indexOf("urafag") == -1)
				{
					talk("@"+name+" http://www.urbandictionary.com/define.php?term="+command[1]);
				}
				break;
			case "status":
				if (API.getUser(id).permission > 1)
				{
					var sft = "";
					var awt = "";
					var hf = "";
					
					if (autowoot == true)
					{
						awt = "True";
					}
					if (autowoot == false)
					{
						awt = "False";
					}
					if (swearfilter == true)
					{
						sft = "True";
					}
					if (swearfilter == false)
					{
						sft = "False";
					}
					if (historyfilter == true)
					{
						hf = "True";
					}
					if (historyfilter == false)
					{
						hf = "False";
					}
					
					var response = "";
                    var currentTime = new Date().getTime();
                    var minutes = Math.floor((currentTime - jointime) / 60000);
                    var hours = 0;
                    while(minutes > 59){ // This used to be 60, which made the status sometimes display "Running for 60m" instead of "Running for 1h"
                        minutes = minutes - 59;
                        hours++;
                    }
                    hours == 0 ? response = "Running for " + minutes + "m " : response = "Running for " + hours + "h " + minutes + "m";
                    response = response + " | SongLimit: " + songLimit / 60 + "m";
                    response = response + " | Cooldown: " + cooldown / 1000 + "s";
                    response = response + " | Unique Visiters: " + Object.keys(uniqueUsers).length;
                    response = response + " | Swear Filt: " + sft;
                    response = response + " | Autowoot: " + awt;
                    response = response + " | History Filt: " + hf;
                    talk(response);
				}
				else
				{
					API.sendChat(ner);
				}
				break;
			case "8ball":
				talk(":8ball: @"+name+", "+ball[Math.floor(Math.random() * ball.length)]);
				break;
			case "roll":
				var rolledk = roll[Math.floor(Math.random() * roll.length)];
				if (rolledk < 4)
				{
					talk("@"+name+", you rolled a " + rolledk + ". :(");
				}
				else if (rolledk > 3)
				{
					talk("Congrats @"+name+"! You rolled a "+rolledk+"!");
				}
				break;
			case "flipcoin":
			case "fc":
				talk(coin[Math.floor(Math.random() * coin.length)]);
				break;
			case "shrek":
				talk(shrek[Math.floor(Math.random() * shrek.length)]);
				break;
			case "ytp":
				talk(ytp[Math.floor(Math.random() * ytp.length)]);
				break;
			case "smoke":
				talk("*gives @"+name+" some "+smoke[Math.floor(Math.random() * smoke.length)]+"*");
				break;
			case "gif":
				talk(gif[Math.floor(Math.random() * gif.length)]);
				break;
			case "kiss":
				if (command[1].indexOf("@") == 0)
				{
					command[1] = command[1].substring(1);
					talk("*kisses "+command[1]+"'s cheek*");
				}
				break;
			case "tickle":
				if (command[1].indexOf("@") == 0)
				{
					command[1] = command[1].substring(1);
					talk("*tickles "+command[1]+"'s sides*");
				}
				break;
			case "fart":
				if (command[1].indexOf("@") == 0)
				{
					command[1] = command[1].substring(1);
					talk("*farts on "+command[1]+"*");
				}
				break;
			case "punish":
				if (API.getUser(id).permission > 1)
				{
					if(command[1].indexOf("@") == 0)
					{
						command[1] = command[1].substring(1);
						switch(Math.floor(Math.random() * 6)){
							case 0:
								talk("*slaps "+command[1]+"'s cheek*");
								break;
							case 1:
								talk("*kills "+command[1]+"'s dog*");
								break;
							case 2:
								talk("*pokes "+command[1]+"'s eyes out*");
								break;
							case 3:
								talk("*makes "+command[1]+" cry*");
								break;
							case 4:
								talk("*gives "+command[1]+" a titty twister*");
								break;
							case 5:
								talk("*gives "+command[1]+" a wet willy");
								break;
							case 6:
								talk("*calls @LightAmaze to kill "+command[1]+"*");
								break;
						
							}
						}
					else 
					{
						talk(ner);
					}
				}
				break;
			case "cookie":
				if (command[1].indexOf("@") == 0)
				{
					command[1] = command[1].substring(1);
					talk(command[1]+", "+name+" has rewarded you with a "+cookie[Math.floor(Math.random() * cookie.length)] + " cookie");
				}
				break;
			case "reward":
				if (command[1].indexOf("@") == 0)
				{
					command[1] = command[1].substring(1);
					talk(command[1]+", "+name+" has rewarded you with a "+reward[Math.floor(Math.random() * reward.length)]);
				}
				break;
			case "hug":
				if(command[1].indexOf("@") === 0) 
            	{
            		command[1] = command[1].substring(1);
                	var randomSentence = Math.floor(Math.random() * 2);
                	switch(randomSentence){
                	case 0:
                    	talk("*picks "+command[1]+" up and spins around*");
                    	break;
                	case 1:
                    	talk("*gives "+command[1]+" a kawaii hug*");
                    	break;
                	case 2:
                    	talk("*hugs "+command[1]+"'s face*");
                    	break;
                	}
            	}
				break;
			case "none":
				if (API.getUser(id).permission > 4)
				{
					var username = command[1].substring(1);
					var userid = getUserID(username);
					API.moderateSetRole(userid, API.ROLE.NONE);
				}
				else
				{
					talk(ner);
				}
				break;
			case "resident":
				if (API.getUser(id).permission > 4)
				{
					var username = command[1].substring(1);
					var userid = getUserID(username);
					API.moderateSetRole(userid, API.ROLE.RESIDENTDJ);
				}
				else
				{
					talk(ner);
				}
				break;
			case "bouncer":
				if (API.getUser(id).permission > 4)
				{
					var username = command[1].substring(1);
					var userid = getUserID(username);
					API.moderateSetRole(userid, API.ROLE.BOUNCER);
				}
				else
				{
					talk(ner);
				}
				break;
			case "manager":
				if (API.getUser(id).permission > 4)
				{
					var username = command[1].substring(1);
					var userid = getUserID(username);
					API.moderateSetRole(userid, API.ROLE.MANAGER);
				}
				else
				{
					talk(ner);
				}
				break;
			case "cohost":
				if (API.getUser(id).permission > 4)
				{
					var username = command[1].substring(1);
					var userid = getUserID(username);
					API.moderateSetRole(userid, API.ROLE.COHOST);
				}
				else
				{
					talk(ner);
				}
				break;
			case "host":
				if (API.getUser(id).permission > 4)
				{
					var username = command[1].substring(1);
					var userid = getUserID(username);
					API.moderateSetRole(userid, API.ROLE.HOST);
				}
				else
				{
					talk(ner);
				}
				break;
			case "autowoot":
				if (API.getUser(id).permission > 1)
				{
					if (autowoot == false)
					{
						talk("Autowoot activated...");
						woot();
						autowoot = true;
					}
					else if (autowoot == true)
					{
						talk("Autowoot deactivated...");
						autowoot = false;
					}
				}
				else
				{
					talk(ner);
				}
				break;
			case "swearfilt":
			case "swearfilter":
			case "sf":
				if (API.getUser(id).permission > 1)
				{
					if (swearfilter == true)
					{
						talk("Turning off swear filter...");
						swearfilter = false;
					}
					else if (swearfilter == false)
					{
						talk("Turning on swear filter...");
						swearfilter = true;
					}
				}
				else
				{
					talk(ner);
				}
				break;
			case "saveusers":
				if (API.getUser(id).permission > 1)
				{
					saveUsers();
					talk("User Data Saved");
				}
				else
				{
					talk(ner);
				}
				break;
			case "register":
				if (typeof regusers[id] == 'undefined')
				{
					regged = regusers.regged;
					regusers[id] = {
						registered: true,
						woots: 0,
						mehs: 0,
						curates: 0,
						plays: 0
					};
					talk("@"+name+" is now registered!");
				}
				else
				{
					talk("You're already registered, mate!");
				}
				break;
			case "whoseregistered":
				if (API.getUser(id).permission > 1)
				{
					talk("There are "+Object.keys(regusers).length+" users registered!");
				}
				else
				{
					talk(ner);
				}
				break;
			case "mystats":
				if (typeof regusers[id] != 'undefined')
				{
    				var statshere = ":musical_note:: " + regusers[id].plays;
    				statshere += " | :+1:: " + regusers[id].woots;
    				statshere += " | :-1:: " + regusers[id].mehs;
    				statshere += " | :purple_heart:: " + regusers[id].curates;
    				talk("@"+name+"'s Stats: "+statshere);
				}
				else
				{
					talk("I don't think you are registered. Sorry!");
				}
				break;
			case "userstats":
				if (API.getUser(id).permission > 1)
				{
					if(command[1].indexOf("@") === 0) 
	            	{
	            		command[1] = command[1].substring(1);
	            		var usrstat = getUserID(command[1]);
	            		if (usrstat == "USER NOT FOUND")
	            		{
	            			talk("I'm sorry, but that user does not appear to be here");
	            		}
	            		else
	            		{
	            			if (typeof regusers[usrstat] != 'undefined')
	            			{
	            				var statshere = ":musical_note:: " + regusers[usrstat].plays;
	            				statshere += " | :+1:: " + regusers[usrstat].woots;
	            				statshere += " | :-1:: " + regusers[usrstat].mehs;
	            				statshere += " | :purple_heart:: " + regusers[usrstat].curates;
	            				talk("@"+command[1]+"'s Stats: "+statshere);
	            			}
	            			else
	            			{
	            				talk("This user is not registered!");
	            			}
	            		}
	            	}
					else
					{
						talk("You need to mention someone to find!");
					}
				}
				else
				{
					talk(ner);
				}
				break;
			case "hf":
			case "historyfilter":
			case "historyfilt":
				if (API.getUser(id).permission > 1)
				{
					if (historyfilter == false)
					{
						talk("Enabling history filter...");
						historyfilter = true;
					}
					else if (historyfilter == true)
					{
						talk("Disabling history filter...");
						historyfilter = false;
					}
				}
				else
				{
					talk(ner);
				}
				break;
			case "clearchat": // Credits to the Radiant Music society for this; they helped me a lot. Nice guys
			case "cc":
				if (API.getUser(id).permission > 1)
				{
					var arg = $('#chat-messages').children();
					talk("Clearing Chat...");
					for (var i = 0; i < arg.length; i++)
					{
						delchat(arg[i].className.substr(arg[i].className.indexOf('cid-') + 4, 14));
					}
					talk("Chat Cleared!");
                    API.chatLog("The chat has been cleared. Take appropriate action.");
				}
				else
				{
					talk(ner);
				}
				break;
			case "dc":
			case "dclookup":
				if (typeof disconnectInstances[id] != 'undefined')
				{
					var nowtime = new Date().getTime();
					var minutes = Math.floor((nowtime - disconnectInstances[id].time) / 60000);
					if (minutes <= 10 && disconnectInstances[id].pos != -1)
					{
						var spot = disconnectInstances[id].pos + 1;
						talk("@"+name+", I found ya! Let me just move you back...");
						API.moderateMoveDJ(id, spot);
					}
					else if (disconnectInstances[id].pos == -1)
					{
						talk("I decline. You were a dj. So no. Bye.");
					}
					else
					{
						talk("@"+name+", you have been disconnected too long buddy (longer than 10 mins)");
					}
				}
				else
				{
					talk("You haven't disconnected..? O.o");
				}
				break;
/*			case "disable":
				if (API.getUser(id).permission > 1)
				{
					if (command[1].indexOf("!") === 0)
					{
						var cmd = command[1].substring(1); // removes the ! from the string
						if (discoms.indexOf(cmd) == -1)
						{
							if (resCom.indexOf(cmd != -1))
							{
								talk("This is a restricted command!");
							}
							else if (commandWords.indexOf(cmd) == -1)
							{
								talk("Disabling the "+command[1]+" command...");
								discoms.push(command[1]);
								console.log("It shoulda disabled it");
								return;
							}
							else if (!commandWords.indexOf(command[1]) != -1)
							{
								talk("According to my programmers, this isn't a command...");
							}
						}
						else if (discoms.indexOf(cmd) != -1)
						{
							talk("This command is already disabled!");
						}
					}
					else
					{
						talk("You gotta tell me a command to disable. FE !disable !roulette");
					}
				}
				else
				{
					talk(ner);
				}
				break;
			case "enable":
				if (API.getUser(id).permission > 1)
				{
					if (command[1].indexOf("!") === 0)
					{
						command[1] = command[1].substring(1); // removes the ! from the string
						if (discoms.indexOf(command[1]) != -1)
						{
							talk("Enabling the "+command[1]+" command...");
							var b = discoms.indexOf(command[1]);
							discoms.splice(b, 1);
						}
						else if (discoms.indexOf(command[1]) == -1 && commandWords.indexOf(discoms))
						{
							talk("This command is already enabled!");
						}
						else
						{
							talk("Sir, that's not a command I can enable");
						}
					}
					else
					{
						talk("You gotta tell me a command to enable. FE !enable !roulette");
					}
				}
				else
				{
					talk(ner);
				}
				break;*/
			}
		}
	}
}

function saveUsers()
{
	localStorage[localStorageKey000 + "_ru"] = JSON.stringify(regusers);
	localStorage[localStorageKey000 + "_uu"] = JSON.stringify(uniqueUsers);
}

function loadUsers()
{
	if (localStorage.getItem(localStorageKey000 + "_ru") === null || localStorage.getItem(localStorageKey000 + "_uu") === null)
	{
		return;
	}
	var regusers2 = JSON.parse(localStorage[localStorageKey000 + "_ru"]);
	var uuu = JSON.parse(localStorage[localStorageKey000 + "_uu"]);
	if (regusers2)
	{
		regusers = regusers2;
		uniqueUsers = uuu;
		console.log(Object.keys(uniqueUsers).length + " unique visitors");
		console.log(Object.keys(regusers).length + " users loaded");
	}
}

function usrLeave(data)
{
	if (typeof disconnectInstances[data.id] != 'undefined' && typeof data.wlIndex != 'undefined')
	{
		disconnectInstances[data.id].time = new Date().getTime();
		disconnectInstances[data.id].pos = data.wlIndex;
	}
	else if (data.wlIndex != 'undefined')
	{
		disconnectInstances[data.id] = {
				time: new Date().getTime(),
				pos: data.wlIndex
		};
	}
	saveUsers();
}

initHooks();

loadUsers();

console.log("OhMyBot Version "+version+" Activated!");

talk("Chase's Personal Bot Version "+version+ "!");

setTimeout(function(){
	SC.initialize({
		client_id: '0c4af11783f47323ac49b98ca446cafb'
	});
},3000);

setInterval(function(){sendAnnouncements();},parseInt(announcementTimer));
