if (sweetbot) sweetbot.shutdown();
var sweetbot = {
	admins: [3741010],
    lotWinner: null,
    settings: {
        a: {
            autoJoin: true,
            autoWoot: true,
            bouncerLock: false,
            lottery: true,
            customMotd: false,
            motd: "Active a Optional Message Using !motd [message]!",
            motdInt: 5,
            afkRemoval: false,
            forceWoot: false,
            afkLimit: 120,
            userCmdCD: 20,
            userCmds: true,
            gettingMehs: true,
            mehlimit: 7,
            duelDelay: 120,
            ruleSkip: true,
            chatFilter: true,
            historyGuard: true
        },
        b: {
            lockDown: false,
            spamAtt: false,
            apoc: false,
            timeGuard: true,
            cycleGuard: false,
            lockGuard: false,
            autoSkip: false,
			songStats: true,
            video: true,
            removedFilter: true
        }
    },
    version: "6.7.1",
    stats: {
        launchTime: Date.now(),
        woots: 0,
        mehs: 0,
        grabs: 0,
        afk: 0,
        lot: 0,
        songCounter: 0,
        lengths: [3],
    },
    vars: {
        motdInd: 0,
        lockedTime: 0,
        cycleTime: 0,
        skipping: false,
        globCounter: 0,
        lockSkipping: false,
        cycleWasFalse: null,
        lockskipPos: 2,
        lotWinner: null,
        lotWinners: [],
        userCmdOnCD: false,
        cmdOnCD: false,
        nextDJ: API.getWaitList()[0],
        lastChat: Date.now(),
        duel: [],
        duelReady: true,
        muteVotes: 0,
        muteVoters: [],
        voteMute: false,
        voteMuter: null,
        execute: [],
        autoReply: 'off',
        capsLimit: 50,
        tacos: ["crispy taco","mexican taco","vegetarian taco","spicy taco","meatlover taco","cheese taco","wet hamburger","taco shell","delicious taco","gross taco","horse meat taco","kinky taco","burrito"]
    },
    timeouts: {
        spamAlert: undefined,
        bouncerLock: undefined,
        globCounter: undefined,
        skip: undefined,
        lotSelect: undefined,
        userCmds: undefined,
        autoSkip: undefined,
        cmdCD: undefined,
        dcCheck: undefined
    },
    timeoutCalls: {
        spamAlert: function () {
            if (sweetbot.settings.b.spamAtt) sweetbot.timeouts.spamAlert = setInterval(function () {
                sweetbot.sendMsg("Spam Protection Activated")
            }, 3e4);
            else clearInterval(sweetbot.timeouts.spamAlert)
        },
        globCounter: function () {
            sweetbot.timeouts.globCounter = setInterval(function () {
                sweetbot.vars.globCounter++;
                if (!(sweetbot.vars.globCounter % 60) && sweetbot.settings.a.lottery && Date.now() - sweetbot.stats.launchTime >= 1e3 * 60 * 20) sweetbot.boostLottery()
            }, 6e4)
        },
        dcCheck: function () {
            sweetbot.timeouts.dcCheck = setInterval(function () {
                if (Date.now() - sweetbot.vars.lastChat >= 1e3 * 60 * 10) sweetbot.shutdown()
            }, 6e4)
        }
    },
	ctx: {
		room : null,
		wl : null
	},
    userData: {},
    waitList: [],
    addToWL: [],
    bouncerPlus: ["lock", "cycle", "move", "bouncer+"],
    userCmds: ["dc", "theme","blacklist","help", "rules", "emoji", "commands", "eta", "site", "ping", "oki", "song", "link"],
    sock: undefined,
    onchat: function(a) { 
        sweetbot.eventChat({ message: stripLink(a.message), un: a.un, uid: a.uid, timestamp: a.timestamp, cid: a.cid, type: a.type }) 
    },
    startup: function () {
	    if(API.getUser().role >= 1) {
        this.proxy = {
            eventJoin: $.proxy(this.eventJoin, this),
            eventLeave: $.proxy(this.eventLeave, this),
            eventDjAdv: $.proxy(this.eventDjAdv, this),
            eventCommand: $.proxy(this.eventCommand, this),
            eventDjUpdate: $.proxy(this.eventDjUpdate, this),
            eventVoteUpdate: $.proxy(this.eventVoteUpdate, this),
            eventWaitlistUpdate: $.proxy(this.eventWaitlistUpdate, this)
        };
        setTimeout(function(){API.sendChat("Bot Running! Version " + sweetbot.version);}, 100);
        console.log("EDT ChatBot Activated! Version " + sweetbot.version);
		API.moderateDeleteChat = function (cid) {
			$.ajax({
				url: "https://plug.dj/_/chat/" + cid,
				type: "DELETE"
			})
		};
		API.djJoin = function () {
			$.ajax({
				url: "https://plug.dj/_/booth",
				type: "POST"
			})
		};
		this.getModules();

        API.getRoomInfo = function(type) {
            switch (type.toLowerCase()) {
                case 'title':
                    return sweetbot.ctx.room.attributes.name;                   
                case 'welcome':
                    return sweetbot.ctx.room.attributes.welcome;                   
                case 'description':
                    return sweetbot.ctx.room.attributes.description;
                case 'host':
                    return sweetbot.ctx.room.attributes.hostName;
                case 'locked':
                    return sweetbot.ctx.wl.attributes.isLocked;
                case 'cycle':
                    return sweetbot.ctx.wl.attributes.shouldCycle;
                default:
                    return console.error('Invalid Room Info Type Specified!');
            }
        };
        API.on(API.CHAT, this.onchat, this);
        API.on(API.USER_JOIN, this.proxy.eventJoin);
        API.on(API.ADVANCE, this.proxy.eventDjUpdate);
        API.on(API.ADVANCE, this.proxy.eventDjAdv);
        API.on(API.USER_LEAVE, this.proxy.eventLeave);
        API.on(API.VOTE_UPDATE, this.proxy.eventVoteUpdate);
        API.on(API.CHAT_COMMAND, this.proxy.eventCommand);
        API.on(API.WAIT_LIST_UPDATE, this.proxy.eventWaitlistUpdate);
        this.vars.globCounter = (new Date).getMinutes();
        var e = JSON.parse(localStorage.getItem("sweetbotData")),
         t = JSON.parse(localStorage.getItem("sweetbotSettings")),
         n = API.getUsers(),
         r, i;
        if (e && Date.now() - e.b < 1e3 * 60 * 10) {
            this.stats = e.stats;
            this.userData = e.users;
            this.arrays = e.arrays;
        } else localStorage.removeItem("sweetbotData");
        if (t) this.settings.a = t.settings;
        else localStorage.removeItem("sweetbotSettings");
        for (r in this.userData) {
            var s = false;
            for (i in n) {
                if (r == n[i].id) {
                    s = true;
                    break
                }
            }
            this.userData[r].inRoom = s
        }
        this.timeoutCalls.globCounter();
        for (r in n) if (!this.userData[n[r].id]) this.newUser(n[r].id);
        this.refreshWL();
        if (this.getLocked()) this.vars.lockedTime = Date.now();
        if (this.getCycle()) this.vars.cycleTime = Date.now();
        API.djJoin();
		} else API.chatLog('Only Manager+ have permission to activate the bot!');
    },
    historyCheck: function(data) {
        var history = API.getHistory(); var caught = -1;
        for (var i in history) {
            if (history[i].media.cid === API.getMedia().cid) {var caught = i; return caught;}
        }
        console.log('history check')
    },
    cleanString: function(string) {
        return string.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&#34;/g, "\"").replace(/&#59;/g, ";").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    },
    shutdown: function () {
        API.off(API.CHAT, this.onchat);
        API.off(API.USER_JOIN, this.proxy.eventJoin);
        API.off(API.ADVANCE, this.proxy.eventDjAdv);
        API.off(API.USER_LEAVE, this.proxy.eventLeave);
        API.off(API.VOTE_UPDATE, this.proxy.eventVoteUpdate);
        API.off(API.CHAT_COMMAND, this.proxy.eventCommand);
        API.off(API.ADVANCE, this.proxy.eventDjUpdate);
        API.off(API.WAIT_LIST_UPDATE, this.proxy.eventWaitlistUpdate);
        for (var e in this.timeouts) {
            clearTimeout(this.timeouts[e]);
            clearInterval(this.timeouts[e])
        }
        console.log("Bot" + this.version + " shut down.");
        sweetbot = false
    },
    eventChat: function (e) {
		if (!e.uid)	return;
        if (this.settings.b.apoc) API.moderateDeleteChat(e.cid);
        else if (this.settings.b.lockDown && API.getUser(e.uid).role === 0 && API.getUser(e.uid).gRole === 0) API.moderateDeleteChat(e.cid);
        else if (this.userData[e.uid].muted) API.moderateDeleteChat(e.cid);
        e.message = this.stringFix(e.message);
        if (e.uid != API.getUser().id) this.vars.lastChat = Date.now();
        if (!this.userData[e.uid]) this.newUser(e.uid);
        this.userData[e.uid].chatted = true;
        if (e.message.indexOf('[AR]') === -1 && e.message.indexOf('[AFK]') === -1) this.userData[e.uid].afk.time = Date.now();
        this.userData[e.uid].afk.warn1 = 0, this.userData[e.uid].afk.warn2 = false;
        if (sweetbot.settings.a.chatFilter) this.messageDeletion(e, e.cid, API.getUser(e.uid).role);
        for (var i in this.arrays.spam) {
            if (e.message.toLowerCase().indexOf(this.arrays.spam[i]) > -1 && API.getUser(e.uid).role === 0 && sweetbot.settings.a.chatFilter) API.moderateDeleteChat(e.cid);
        }
        if (!e.message.indexOf("!")) this.commandHandler(e);
        if (this.userData[e.uid].inbox.msg.length) {
            API.sendChat("@" + e.un + " [Msg from " + this.userData[e.uid].inbox.un + "] " + this.userData[e.uid].inbox.msg);
            this.userData[e.uid].inbox.msg = "";
            this.userData[e.uid].inbox.un = ""
        }
        this.shortenURL(e);
        if (sweetbot.vars.execute.indexOf(e.uid) > -1) API.sendChat('@' + e.un + ' and Died...'), API.moderateBanUser(e.uid, 0, -1), delete sweetbot.vars.execute[sweetbot.vars.execute.indexOf(e.uid)];
        if (e.type === 'mention' && sweetbot.vars.autoReply !== 'off') API.sendChat('[AR] @' + e.un + ' ' + sweetbot.vars.autoReply);
        if(e.message.indexOf('!afkmessage') === -1) sweetbot.userData[e.uid].afkMessage = '';
        if(e.message.match(/@\S+/g) !== null) {
            var unn = [];
            for (var i in e.message.match(/@\S+/g)) {
                unn.push(e.message.match(/@\S+/g)[i].substr(1));
            }
 
        }
        if (unn) {
            for (var i in unn) {
                if (sweetbot.userData[sweetbot.getUserByName(unn[i])].afkMessage !== '' && sweetbot.userData[sweetbot.getUserByName(unn[i])].afkCooldown) {
                    API.sendChat('[' + unn[i] + ' AFK Msg] @' + e.un + ' ' + sweetbot.userData[sweetbot.getUserByName(unn[i])].afkMessage);
                    sweetbot.userData[sweetbot.getUserByName(unn[i])].afkCooldown = false;
                }
            }
        }
		
		var b = e.message.match(/[A-Z]/g);
		if (e.message.length > 100 && b && b.length > 40) {
			API.moderateDeleteChat(e.cid);
			setTimeout(function(e){
				API.moderateMuteUser(e.uid, 0, API.MUTE.LONG);
			}, 2000, e);
		}		
    },
    eventCommand: function (e) {
        switch (e.split(' ')[0]) {
        case "/autojoin":
            this.settings.a.autoJoin = !this.settings.a.autoJoin;
            API.chatLog(this.settings.a.autoJoin ? "Autojoin enabled" : "Autojoin disabled", true);
            break;
        case "/autowoot":
            this.settings.a.autoWoot = !this.settings.a.autoWoot;
            API.chatLog(this.settings.a.autoWoot ? "Autowoot enabled" : "Autowoot disabled", true);
            break;
        case "/lock":
            API.moderateLockWaitList(true);
            break;
        case "/unlock":
            API.moderateLockWaitList(false);
            break;
        case "/getmehs":
            this.getMehs();
            if (e.split(' ')[1] === 'enable') {
                this.settings.a.gettingMehs = true;
                API.chatLog('Getmehs enabled', true);
            } else if (e.split(' ')[1] === 'disable') {
                this.settings.a.gettingMehs = false;
                API.chatLog('Getmehs disabled', true);
            }
            break;
        case "/video":
            this.settings.b.video = !this.settings.b.video;
            $("#yt-frame").slideToggle();
            $(".background").slideToggle();
            API.chatLog("Toggled video", true);
            break;
        case '/fixmotd':
            var a = JSON.parse(localStorage.getItem('sweetbotData'));
            delete a.arrays.motd;
            localStorage.setItem('sweetbotData', JSON.stringify(a));
            break;
        case '/autoreply':
            sweetbot.vars.autoReply = e.substr(11);
            API.chatLog('AutoReply is now "' + e.substr(11) + '"', true);
            break;
        }
    },
    ytc : {
    now : null,
    check: function(e){
        sweetbot.ytc.now=null;
        if (!e)
            return API.sendChat('Could not get video information!');
         
        if (typeof e == 'string')
            e = JSON.parse(e);
         
        if ( e.error)
            return API.sendChat('Error fetching video information!');
        if (e.items && !e.items.length){
			if (API.getDJ().language === 'pt') API.sendChat('@'+API.getDJ().username+' Vídeo privado ou indísponivel, você será pulado e movido para 2 na lista de espera.');
            API.sendChat('@'+API.getDJ().username+' private video or unavailable, it will be skipped and moved to second in the waiting list!');
            return sweetbot.lockSkip();
        }
    },
    nDJ : function(e){
        if (!sweetbot.settings.b.removedFilter || !e.media || e.media.format != 1){
            this.now = null;
            return;
        }
         
        $.get('https://www.googleapis.com/youtube/v3/videos?id='+e.media.cid+'&part=snippet,contentDetails,statistics,status&key=AIzaSyDg9pSV0Tkbq8fo7I1z_gz4oVN0IZ3TeHw',
            sweetbot.ytc.check)
        .error(function(data){
            sweetbot.ytc.check(data.responseJSON);
        });
    }
},
    eventDjAdv: function (e) {
        if(sweetbot.settings.a.ruleSkip && sweetbot.arrays.ruleSkip[API.getMedia().cid] !== undefined){
            switch(sweetbot.arrays.ruleSkip[e.media.cid].rule){
                case '1':
                    API.sendChat('@'+e.dj.username+' Unavailable Video');
                    API.moderateForceSkip();
                    break;
                case '2':
                    API.sendChat('@'+e.dj.username+' Overplayed Song');
                    API.moderateForceSkip();
                    break;
                case '3':
                    API.sendChat('@'+e.dj.username+' NSFW Video');
                    API.moderateForceSkip();
                    break;
                case '4':
                    API.sendChat('@'+e.dj.username+' Wrong Genre');
                    API.moderateForceSkip();
                    break;
                case '5':
                    API.sendChat('@'+e.dj.username+' Too Long');
                    API.moderateForceSkip();
                    break;
                default:
                    API.sendChat('@'+e.dj.username+' '+sweetbot.arrays.ruleSkip[e.media.cid].rule);
                    API.moderateForceSkip();
                    break;
            }
        }
        $("#woot").mousedown();
		adv(e);
		sweetbot.ytc.nDJ(e);
        sweetbot.stats.lengths.push(API.getMedia().duration / 60);
        if (!this.settings.b.video) $("#yt-frame").hide();
        for (var t in this.userData) this.userData[t].vote = 0;
        if (this.settings.a.autoJoin && API.getWaitListPosition() == -1 && !this.getLocked()) API.djJoin();
        if (this.addToWL.length) this.addUsers();
        if (!this.userData[e.dj.id]) this.newUser(e.dj.id);
        this.resetDC(e.dj.id);
 
/*        if (this.vars.nextDJ.id != e.dj.id && this.vars.nextDJ.id != API.getWaitList()[0].id) {
            this.sendMsg(this.vars.nextDJ.username + " Estava suposto a ser o DJ! Alguma coisa ruim aconteceu!");
            document.getElementById("chat-sound").playChatSound();
            setTimeout(function () {
                document.getElementById("chat-sound").playChatSound()
            }, 300);
            setTimeout(function () {
                document.getElementById("chat-sound").playChatSound()
            }, 500)
        }*/
        this.vars.nextDJ = API.getWaitList()[0];
        console.log(e)
        if (!this.vars.skipping) {
            this.stats.woots += e.lastPlay.score.positive;
            this.stats.mehs += e.lastPlay.score.negative;
            this.stats.grabs += e.lastPlay.score.grabs;
            ++this.stats.songCounter;
            if (API.getDJ().id == 666 || API.getDJ().id == 666) API.sendChat("Look " + API.getDJ().username + " is now playing " + API.getMedia().author + ' - ' + API.getMedia().title + "! Olhe! " + API.getDJ().username + ' está tocando ' + API.getMedia().author + ' - ' + API.getMedia().title);
            else if (!(this.stats.songCounter % this.settings.a.motdInt)) this.motdFunction()
        }
        var skipOnExceed;
        if (e.media.duration > 420 && sweetbot.settings.b.timeGuard){
			if (API.getDJ().language === 'pt') API.sendChat("@"+API.getDJ().username+" Essa música excede o tempo limite.");
            else API.sendChat("@"+API.getDJ().username+" This song exceeds the max length!");
                API.moderateForceSkip();
        };
        clearTimeout(skipOnExceed);
        clearTimeout(this.timeouts.autoSkip);
        if (this.settings.a.afkRemoval) this.afkRemover();
        this.refreshWL();
        sweetbot.saveData();
        console.log(2)
        for (var i in API.getUsers()){
            sweetbot.userData[API.getUsers()[i].id].lastWoot++;
        };
        console.log('dj advance');
        if (sweetbot.historyCheck()){ 
            setTimeout(function(){
                if (API.getDJ().language === 'pt') API.sendChat('@' + API.getDJ().username + ' Essa música já foi tocada!'); 
                else API.sendChat('@' + API.getDJ().username + ' Your song was in the history!');
                sweetbot.lockSkip();
            }, 600);
        };
		if (sweetbot.settings.b.songStats === true) API.sendChat("/em " + e.lastPlay.media.author + " - " + e.lastPlay.media.title + ": " + e.lastPlay.score.positive + " :thumbsup: " + e.lastPlay.score.grabs + " :green_heart: " + e.lastPlay.score.negative + " :thumbsdown: ");
    },
    eventJoin: function (e) {
        if (!this.userData[e.id]) this.newUser(e.id);
        this.userData[e.id].inRoom = true;
        this.userData[e.id].chatted = false;
        this.userData[e.id].joinTime = Date.now()
    },
    eventLeave: function (e) {
        if (!this.userData[e.id]) this.newUser(e.id);
        this.userData[e.id].inRoom = false, this.userData[e.id].afk.warn1 = 0, this.userData[e.id].afk.warn2 = false;
        if (this.waitList.indexOf(e.id) > -1) {
            this.userData[e.id].lastDC.pos = this.waitList.indexOf(e.id) + 1;
            this.userData[e.id].lastDC.song = this.stats.songCounter;
            this.userData[e.id].lastDC.afk = this.stats.afk;
            this.refreshWL()
            this.userData[e.id].leaveTime = new Date().toString().split(' ')[4];
        }
        for (var t in this.addToWL) {
            if (this.addToWL[t].id == e.id) this.addToWL.splice(t, 1);
            break
        }
    },
    eventVoteUpdate: function (e) {
        if (!this.userData[e.user.id]) this.newUser(e.user.id);
        if (this.userData[e.user.id].vote == 1)--this.userData[e.user.id].woots;
        else if (this.userData[e.user.id].vote == -1)--this.userData[e.user.id].mehs;
        if (e.vote == 1) ++this.userData[e.user.id].woots;
        else if (e.vote == -1){
            ++this.userData[e.user.id].mehs;
            if (this.settings.a.gettingMehs) sweetbot.getMehs();
        }
        this.userData[e.user.id].vote = e.vote
		var MTS = API.getScore().negative - API.getScore().grabs;
        if (MTS >= sweetbot.settings.a.mehlimit) {
            API.sendChat('@' + API.getDJ().username + ' Your song has received too many mehs!');
            API.moderateForceSkip();
        }
        if (e.vote === 1) sweetbot.userData[e.user.id].lastWoot = 0;
    },
    eventDjUpdate: function (e) {
        setTimeout(function(){$("#woot").click()}, 1000);
        if (this.settings.a.autoJoin && API.getWaitListPosition() == -1 && !this.getLocked()) API.djJoin();
        this.refreshWL();
        this.vars.nextDJ = API.getWaitList()[0]
        if (this.settings.a.forceWoot) this.forceWoot();
    },
    eventWaitlistUpdate: function (e) {
		if (this.settings.a.autoJoin && API.getWaitListPosition() == -1 && !this.getLocked()) API.djJoin();
    },
    commandHandler: function (e) {
        var t = e.message.substr(1).split(" ");
        if (this.commands[t[0]]) API.moderateDeleteChat(e.cid);
        if (!this.vars.cmdOnCD && this.commands[t[0]]) {
            var n = API.getUser(e.uid).role;
            if (API.getUser(e.uid).gRole > 0) n = 6;
			if (sweetbot.admins.indexOf(e.uid) > -1) n = 5;
            if (n == 0 && this.settings.a.userCmds && !this.vars.userCmdOnCD && this.userCmds.indexOf(t[0]) > -1) n = 1;
            else if (n == 2 && this.settings.a.bouncerLock && this.bouncerPlus.indexOf(t[0]) > -1) n = 3;
			
            if (n >= this.commands[t[0]].r) {
                this.vars.cmdOnCD = true;
                this.timeouts.cmdCD = setTimeout(function () {
                    sweetbot.vars.cmdOnCD = false
                }, 2e3);
                this.commands[t[0]].f(t, e);
                if (API.getUser(e.uid).role == 0 && t[0] != "lottery") {
                    this.vars.userCmdOnCD = true;
                    var r = this.settings.a.userCmdCD * 1e3;
                    this.timeouts.userCmds = setTimeout(function () {
                        sweetbot.vars.userCmdOnCD = false
                    }, r)
                }
            } else if (!e.message.indexOf("/")) this.sock.emit("cmderror", "You haven't the necessary rank!")
        } else if (!e.message.indexOf("/")) {
            if (this.vars.cmdOnCD) this.sock.emit("cmderror", "Commands on cooldown");
            else this.sock.emit("cmderror", "Not a valid command")
        }
    },
    commands: {
        lock: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + " Used lock]");
                API.moderateLockWaitList(true)
            },
            r: 3
        },
        cycle: {
            f: function (e, t) {
                if (API.getRoomInfo('cycle')) {
                    sweetbot.sendMsg("[" + t.un + "] Disabled DJ cycle");
                } else {
                    sweetbot.sendMsg('[' + t.un + '] Enabled DJ Cycle');
                }
				$.ajax({ type: 'PUT', url: '/_/booth/cycle', dataType: 'json', contentType: 'application/json', data: JSON.stringify({'shouldCycle':!API.getRoomInfo('cycle')}) })
            },
            r: 3
        },
        reload: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] Reloading...! ");
                sweetbot.saveData();
                sweetbot.shutdown();
                setTimeout(function () {
                    $.getScript("")
                }, 2e3)
            },
            r: 3
        },
        kill: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] Shut Down...");
                sweetbot.saveData();
                sweetbot.shutdown()
            },
            r: 3
        },
        "bouncer+": {
            f: function (e, t) {
                sweetbot.settings.a.bouncerLock = !sweetbot.settings.a.bouncerLock;
                if (sweetbot.settings.a.bouncerLock) {
                    if (e.length > 1) {
                        var n = parseInt(e[1]);
                        if (isNaN(n)) sweetbot.sendMsg("Error!");
                        else {
                            sweetbot.timeouts.bouncerLock = setTimeout(function () {
                                bouncerLock = false
                            }, 1e3 * 60 * n);
                            sweetbot.sendMsg("[" + t.un + "] Bouncer+ Activated! for " + n + " minutes.")
                        }
                    } else sweetbot.sendMsg("[" + t.un + "] Bouncer+ Activated! ")
                } else {
                    clearTimeout(sweetbot.timeouts.bouncerLock);
                    sweetbot.sendMsg("[" + t.un + "] Bouncer+ Disabled!")
                }
            },
            r: 3
        },
        apocalypse: {
            f: function (e, t) {
                sweetbot.settings.b.apoc = !sweetbot.settings.b.apoc;
                if (sweetbot.settings.b.apoc) {
                    sweetbot.settings.b.apoc = true;
                    sweetbot.sendMsg(t.un + " called the Apocalypse!");
                    var n = $("#chat-messages").children();
                    for (var r = 0; r < n.length; r++) API.moderateDeleteChat(n[r].className.substr(n[r].className.indexOf("cid-") + 4, 14))
                } else setTimeout(function () {
                    sweetbot.sendMsg(t.un + " ended the apocalypse!")
                }, 1e3)
            },
            r: 3
        },
        startlottery: {
            f: function(e, t) {
                sweetbot.sendMsg('[' + t.un + '] Lottery will start in 30 seconds!');
                setTimeout(sweetbot.boostLottery, 30000);
            },
            r: 3
        },
        duel: {
            f: function (e, t) {
                if (sweetbot.vars.duelReady && sweetbot.vars.duel[0] === undefined && sweetbot.getUserByName(t.message.substr(7)) !== t.uid && !sweetbot.userData[t.uid].muted){
                    if (sweetbot.getUserByName(t.message.substr(7))){
                        sweetbot.vars.duel.push(t.uid);
                        sweetbot.vars.duel.push(sweetbot.getUserByName(t.message.substr(7)));
                        sweetbot.sendMsg('@' + t.message.substr(7) + ', ' + t.un + '  called you for x1! Before two minutes type !accept to accept x1. WARNING the loser will be muted for 2 minutes!');
                        setTimeout(function(){
                            sweetbot.vars.duel = [];
                        }, 120000);
                    } else {
                        sweetbot.sendMsg('[' + t.un + '] Invalid User! How to use: !duel @User');
                    }
                }
            }, r: 0
        },
        accept: {
            f: function (e, t) {
                if (t.uid === sweetbot.vars.duel[1]) {
                    sweetbot.sendMsg(API.getUser(sweetbot.vars.duel[0]).username +' and ' + API.getUser(sweetbot.vars.duel[1]).username + ' Started the x1!');
                    var win = Math.round(Math.random());
                    win === 0 ? lose = 1 : lose = 0;
                    var winner = sweetbot.vars.duel[win];
                    var loser = sweetbot.vars.duel[lose];
                    setTimeout(function(){
                        sweetbot.sendMsg(API.getUser(winner).username + ' won the x1! This means it will  ' + API.getUser(loser).username + ' be muted for 2 minutes! are you going to cry?');
                        sweetbot.vars.duelReady = false;
                        sweetbot.userData[loser].muted = true;
                        setTimeout(function(){sweetbot.userData[loser].muted = false;}, 120000);
                        setTimeout(function(){sweetbot.vars.duelReady = true}, sweetbot.settings.duelDelay * 1000);
                        sweetbot.vars.duel = [];
                    }, 5000)
                }
            }, r: 0
        },
        reject: {
            f: function(e, t) {
                if (t.uid === sweetbot.vars.duel[1]){
                    sweetbot.vars.duel = [];
                    sweetbot.vars.duelReady = true;
                    API.sendChat(t.un + ' did not accept the duel!.');
                }
            }, r: 0
        },
		plus: {
		    f: function(e, t) {
				var firstSpace = t.message.indexOf(' ');
				var lastSpace = t.message.lastIndexOf(' ');
				var num1 = t.message.substring("soma".length + 2, lastSpace);
				var num2 = t.message.substring(lastSpace + 2);
				var cal = num1 + num2;
				
				sweetbot.sendMsg('[' + t.un + ']' + ' Result: ' + cal);
			}, r: 0
		},
        dueldelay: {
            f: function (e, t) {
              if (!isNaN(parseInt(t.message.substr(11))) && parseInt(t.message.substr(11)) >= 30) {
                sweetbot.settings.duelDelay = parseInt(t.message.substr(11));
                sweetbot.sendMsg('[' + t.un + '] Duel delay is now ' + sweetbot.settings.duelDelay + ' seconds');
              } else {
                sweetbot.sendMsg('Invalid delay!');
              }
            },
            r: 2
        },
       clearchat: {
            f: function (e, t) {
                var currentchat = $('#chat-messages').children();
                          for (var i = 0; i < currentchat.length; i++) {
                             API.moderateDeleteChat(currentchat[i].getAttribute("data-cid"));
                          }
                             setTimeout(function(){
                             sweetbot.sendMsg('[' + t.un + ' Used Clearchat]');
                             },1500);
            },
            r: 3
        },
        lockguard: {
            f: function (e, t) {
                sweetbot.settings.b.lockGuard = !sweetbot.settings.b.lockGuard;
                if (sweetbot.settings.b.lockGuard) sweetbot.sendMsg("[" + t.un + "] Lock Guard active. Waiting list will be unlocked if it goes for more than 10 minutes Caught!");
                else sweetbot.sendMsg("[" + t.un + "] Lock Guard disabled. Waiting list will be released and unlocked manually.")
            },
            r: 3
        },
        cycleguard: {
            f: function (e, t) {
                sweetbot.settings.b.cycleGuard = !sweetbot.settings.b.cycleGuard;
                if (sweetbot.settings.b.cycleGuard) sweetbot.sendMsg("[" + t.un + "] Cycle Guard active. DJ Cycle will be automatically disabled if forgotten for more than 10 minutes!");
                else sweetbot.sendMsg("[" + t.un + "] Cycle Guard disabled. DJ Cycle will not be reset if it is forgotten for more than 10 minutes.")
            },
            r: 3
        },
        timeguard: {
            f: function (e, t) {
                sweetbot.settings.b.timeGuard = !sweetbot.settings.b.timeGuard;
                if (sweetbot.settings.b.timeGuard) sweetbot.sendMsg("[" + t.un + "] Time Guard active. Songs over 7 minutes will be automatically skipped!");
                else sweetbot.sendMsg("[" + t.un + "] Time Guard disabled. Songs over seven minutes will not be automatically skipped!")
            },
            r: 3
        },
        autoskip: {
            f: function (e, t) {
                sweetbot.settings.b.autoSkip = !sweetbot.settings.b.autoSkip;
                if (sweetbot.settings.b.autoSkip) sweetbot.sendMsg("[" + t.un + "] AutoSkip active. Songs are skipped to finish!");
                else {
                    clearTimeout(sweetbot.timeouts.autoSkip);
                    sweetbot.sendMsg("[" + t.un + "] AutoSkip disabled. Songs will not be skipped over!")
                }
            },
            r: 3
        },
		songstats: {
			f: function (e, t) {
				sweetbot.settings.b.songStats = !sweetbot.settings.b.songStats;
				if (sweetbot.settings.b.songStats) sweetbot.sendMsg("[" + t.un + "] SongStats Enabled!");
				else sweetbot.sendMsg("[" + t.un + "] SongStats Disabled!");
			},
			r: 3
		},
        voteskip: {
            f: function (e, t) {
                if (!isNaN(parseInt(t.message.substring(10))) && t.message.substring(10) !== ' ' && t.message.substring(10) !== undefined) {
                    sweetbot.settings.a.mehlimit = parseInt(t.message.substring(10));
                    sweetbot.sendMsg('[' + t.un + '] Voteskip limit is now ' + sweetbot.settings.a.mehlimit);
                    setTimeout(function(){ if (API.getScore().negative >= sweetbot.settings.a.mehlimit) {API.sendChat('@' + API.getDJ().username + ' Your song has received too many mehs!'); API.moderateForceSkip();}}, 1500);
                } else {
                    sweetbot.sendMsg('[' + t.un + '] How to use: !voteskip [mehs of number]');
                }
            },
            r: 3
        },
        boostlottery: {
            f: function (e, t) {
                sweetbot.settings.a.lottery = !sweetbot.settings.a.lottery;
                if (sweetbot.settings.a.lottery) sweetbot.sendMsg("[" + t.un + "] Bonus of active lottery. Every time an active User has the chance to win the position 5 as a reward on the waiting list!");
                else {
                    sweetbot.sendMsg("[" + t.un + "] Lottery disabled!");
                    clearTimeout(sweetbot.timeouts.lotSelect)
                }
            },
            r: 3
        },
        move: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] How to use: !move @user position");
                else {
                    var n = API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User Not Found!.");
                    else {
                        var r = API.getWaitListPosition(n.id);
                        var i = parseInt(e[2].substr(e[2].length-2).trim());
                        if (isNaN(i)) sweetbot.sendMsg("[" + t.un + "] Error!");
                        else if (i < 1 || i > 50) sweetbot.sendMsg("[" + t.un + "] Error. (Position should be between 1 to 50)");
                        else if (n.id == API.getDJ().id) sweetbot.sendMsg("[" + t.un + "] User is currently playing!");
                        else if (r > -1 && r != undefined) {
                            sweetbot.sendMsg("[" + t.un + " Useu move]");
                            API.moderateMoveDJ(n.id, i)
                        } else if (API.getWaitList().length < 50) {
                            sweetbot.sendMsg("[" + t.un + " Usou move]");
                            API.moderateAddDJ(n.id);
                            setTimeout(function () {
                                API.moderateMoveDJ(n.id, i)
                            }, 3e3)
                        } else {
                            var s = true;
                            for (var o in sweetbot.addToWL) if (sweetbot.addToWL[o].id == n.id) {
                                sweetbot.sendMsg("[" + t.un + "] This User is already being added!");
                                s = false;
                                break
                            }
                            if (s) {
                                sweetbot.addToWL.push({
                                    id: n.id,
                                    pos: i
                                });
                                sweetbot.sendMsg("[" + t.un + "] Adding " + n.username + " to the waiting list in position " + i + ". Position: " + sweetbot.addToWL.length);
                                API.moderateLockWaitList(true)
                            }
                        }
                    }
                }
            },
            r: 3
        },
        lotreset: {
            f: function (e, t) {
                sweetbot.settings.a.globCounter = 0;
                sweetbot.sendMsg("[" + t.un + "] Lottery reset. The next round will be in the next 60 minutes!")
            },
            r: 3
        },
        lotsync: {
            f: function (e, t) {
                sweetbot.settings.a.globCounter = (new Date).getMinutes();
                sweetbot.sendMsg("[" + t.un + "] Lottery synchronized with the current time. The lottery will occur every hour! (:00)")
            },
            r: 3
        },
        usercommands: {
            f: function (e, t) {
                if (e.length == 1) {
                    sweetbot.settings.a.userCmds = !sweetbot.settings.a.userCmds;
                    if (sweetbot.settings.a.userCmds) sweetbot.sendMsg("[" + t.un + "] User commands enabled.");
                    else sweetbot.sendMsg("[" + t.un + "] User commands Disabled. ")
                } else if (e.length == 2) {
                    var n = parseInt(e[1]);
                    if (isNaN(n)) sweetbot.sendMsg("[" + t.un + "] Error! ");
                    else {
                        sweetbot.settings.a.userCmdCD = n;
                        sweetbot.sendMsg("[" + t.un + "] User commands changed to " + n + " seconds!")
                    }
                } else sweetbot.sendMsg("[" + t.un + "] How To Use: !usercommands [opt: seconds]")
            },
            r: 3
        },
        usercmdcd: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] Users can use commands every " + sweetbot.settings.a.userCmdCD + " seconds.");
                else {
                    var n = parseInt(e[1]);
                    if (isNaN(n)) sweetbot.sendMsg("[" + t.un + "] Error!");
                    else {
                        sweetbot.settings.a.userCmdCD = n;
                        sweetbot.sendMsg("[" + t.un + "] Delay of user commands added to " + n + " Seconds!")
                    }
                }
            },
            r: 3
        },
        clearinbox: {
            f: function (e, t) {
                if (e.length == 2) {
                    var n = API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                    else {
                        sweetbot.userData[n.id].inbox.msg = "";
                        sweetbot.userData[n.id].inbox.un = "";
                        sweetbot.sendMsg("[" + t.un + "] " + n.username + "'s inbox cleared!")
                    }
                } else sweetbot.sendMsg("[" + t.un + "] How To Use: !clearinbox @user")
            },
            r: 3
        },
        lockskip: {
            f: function (e, t) {
                if (!sweetbot.vars.skipping && e.length <= 3) {
                    var n, r;
                    sweetbot.sendMsg("[" + t.un + " Used lockskip!]");
                    switch (n) {
                    case "theme":
                        r = "@" + API.getDJ().username + " This song is not part of the themes allowed, please choose another.";
                        break;
                    case "op":
                        r = "@" + API.getDJ().username + " This song is OVERPLAYED, choose a different song!";
                        break;
                    case "history":
                        r = "@" + API.getDJ().username + " This music has been played, choose a different one!";
                        break;
                    case "rules":
                        r = "@" + API.getDJ().username + " This song does not respect the rules of the room, choose a different song!";
                        break;
                    default:
                        r = false
                    }
                    if (r) API.sendChat(r);
                    sweetbot.lockSkip()
                }
            },
            r: 2
        },
        unlock: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + " used unlock]");
                API.moderateLockWaitList(false)
            },
            r: 2
        },
        skip: {
            f: function (e, t) {
                if (!sweetbot.vars.skipping) {
                    sweetbot.sendMsg("[" + t.un + " used skip]");
                    sweetbot.vars.skipping = true;
                    API.moderateForceSkip();
                    sweetbot.timeouts.skip = setTimeout(function () {
                        sweetbot.vars.skipping = false
                    }, 5e3)
                }
            },
            r: 2
        },
        add: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] How To Use: !add @user");
                else if (API.getWaitList().length < 50) {
                    var n = API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                    else if (n.wlIndex > -1) sweetbot.sendMsg("[" + t.un + "] User is already on the waiting list!");
                    else if (n.id == API.getUser().id) {
                        sweetbot.sendMsg("[" + t.un + " used add]");
                        API.djJoin();
                        sweetbot.sendMsg("joined the waitlist.")
                    } else {
                        API.moderateAddDJ(n.id);
                        API.sendChat('[' + t.un + '] Added  @' + n.username + '!');
                    }
                } else sweetbot.sendMsg("[" + t.un + "] Wait List is Full!")
            },
            r: 2
        },
        remove: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] How To Use: !remove @Usuario");
                else {
                    var n = API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                    else if (API.getWaitListPosition(n.id) == undefined) sweetbot.sendMsg("[" + t.un + "] User isn't on the waiting list.");
                    else if (n.id == API.getUser().id) {
                        sweetbot.sendMsg("[" + t.un + "] used remove]");
                        API.djLeave();
                        sweetbot.sendMsg("left the waitlist.")
                    } else {
                        API.moderateRemoveDJ(n.id);
                        API.sendChat('[' + t.un + '] Removed @' + n.username + '!');
                    }
                }
            },
            r: 2
        },
        dc: {
            f: function (e, t) {
                var n = API.getUser(t.uid).role;
                if (e.length > 1 && n < 2) return;
                var r = e.length == 1 ? {
                    username: t.un,
                    id: t.uid
                } : API.getUser(sweetbot.getUserByName(t.message.substr(5)));
                if (!r) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                else {
                    if (!sweetbot.userData[r.id]) sweetbot.newUser(r.id);
                    if (sweetbot.userData[r.id].lastDC.pos == -1) sweetbot.sendMsg("[" + t.un + "] " + r.username + " Not Disconnected");
                    else {
                        var i = sweetbot.userData[r.id].lastDC;
                        var s = r.username + " Disconnected " + (sweetbot.stats.songCounter - i.song) + " Song";
                        s += sweetbot.stats.songCounter - i.song == 1 ? " " : "s ";
                        s += "ago at position " + i.pos + ", with ";
                        s += sweetbot.stats.afk - i.afk + " AFK";
                        s += sweetbot.stats.afk - i.afk == 1 ? " removed. " : " Removed, ";
                        if (sweetbot.stats.songCounter - i.song >= 16) s += "To Long Ago!!";
                        else {
                            var o = API.getWaitListPosition(r.id);
                            var u = i.pos;
                            if (o != -1) API.moderateMoveDJ(r.id, u);
                            else if (API.getWaitList().length < 50) {
                                API.moderateAddDJ(r.id);
                                setTimeout(function () {
                                    API.moderateMoveDJ(r.id, u)
                                }, 3e3)
                                sweetbot.userData[r.id].lastDC.pos = -1;
                            } else {
                                var a = true;
                                for (var f in sweetbot.addToWL) if (sweetbot.addToWL[f].id == r.id) {
                                    a = false;
                                    s += "User already is being added!";
                                    break
                                }
                                if (a) {
                                    sweetbot.addToWL.push({
                                        id: r.id,
                                        pos: u
                                    });
                                    s += " Adding the user on the waiting list at position " + u + ".";
                                    API.moderateLockWaitList(true)
                                }
                                sweetbot.userData[r.id].lastDC.pos = -1;
                            }
                        }
                        sweetbot.sendMsg("[" + t.un + "] " + s + ' [' + sweetbot.userData[r.id].leaveTime + ']')
                    }
                }
            },
            r: 1
        },
        kick: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] How To Use: !kick @User [Minutes]");
                else if (API.getUser(sweetbot.getUserByName(e[1].substr(1))).role === 0){
                    var n = API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                    else {
                        var r = e.length == 3 ? parseInt(e[2]) * 1e3 * 60 : 30 * 1e3;
                        if (isNaN(r)) sweetbot.sendMsg("[" + t.un + "] Error. (NaN)");
                        else {
                            sweetbot.sendMsg("[" + t.un + " used kick]");
                            API.moderateBanUser(n.id, 0);
                            setTimeout(function () {
                                $.ajax({
                                    type: "DELETE",
                                    url: "https://plug.dj/_/bans",
                                    contentType: "application/json",
                                    data: '{"userID":["' + n.id + '"]}'
                                })
                            }, r)
                        }
                    }
                }
            },
            r: 2
        },
        ban: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] How To Use: !ban @User");
                else if (API.getUser( sweetbot.getUserByName(e[1].substr(1)) ).role === 0){
                    var n = API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                    else if (n.role) sweetbot.sendMsg("[" + t.un + "] You cannot ban people from the staff!");
                    else {
                        sweetbot.sendMsg("[" + t.un + " used ban]");
                        API.moderateBanUser(n.id, 0, 'f')
                    }
                }
            },
            r: 2
        },
        mute: {
            f: function (e, t) {
                if (!t.message.substr(7)) sweetbot.sendMsg("[" + t.un + "] How To Use: !mute @Usuario");
                else {
                    var n = API.getUser(sweetbot.getUserByName(t.message.substr(7)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                    else {
                        if (!sweetbot.userData[n.id]) sweetbot.newUser(n.id);
                        if (sweetbot.userData[n.id].muted) sweetbot.sendMsg("[" + t.un + "] User Already Muted.");
                        else if (n.role >= API.getUser(t.uid).role) sweetbot.sendMsg("[" + t.un + "] You cannot mute who possesses a rank greater than you!");
                        else {
                            sweetbot.userData[n.id].muted = true;
                            sweetbot.sendMsg("[" + t.un + "] Muted " + n.username + ".")
                        }
                    }
                }
            },
            r: 2
        },
        unmute: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] How To Use: !unmute @User");
                else if (e[1] == "all" && !sweetbot.userData[t.uid].muted) {
                    for (i in sweetbot.userData) sweetbot.userData[i].muted = false;
                    sweetbot.sendMsg("[" + t.un + "] Unmuted all!")
                } else if (!sweetbot.userData[t.uid].muted){
                    var n = API.getUser(sweetbot.getUserByName(t.message.substr(9)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                    else {
                        if (!sweetbot.userData[n.id]) sweetbot.newUser(n.id);
                        if (!sweetbot.userData[n.id].muted) sweetbot.sendMsg("[" + t.un + "] User is not muted!");
                        else {
                            sweetbot.userData[n.id].muted = false;
                            sweetbot.sendMsg("[" + t.un + "] Unmuted " + n.username + ".")
                        }
                    }
                }
            },
            r: 2
        },
        voteratio: {
            f: function (e, t) {
                var n = e.length == 1 ? {
                    username: t.un,
                    id: t.uid
                } : API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found");
                else {
                    var r;
                    if (!sweetbot.userData[n.id]) sweetbot.newUser(n.id);
                    if (sweetbot.userData[n.id].woots + sweetbot.userData[n.id].mehs == 0) r = "0.00";
                    else r = (sweetbot.userData[n.id].woots / (sweetbot.userData[n.id].woots + sweetbot.userData[n.id].mehs)).toFixed(2);
                    sweetbot.sendMsg("[" + t.un + "] " + n.username + " ~ Woots: " + sweetbot.userData[n.id].woots + " | Mehs: " + sweetbot.userData[n.id].mehs + " | Porcentagem: " + r)
                }
            },
            r: 1
        },
        afkreset: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] How To Use: !afkreset @User ");
                else {
                    var n = API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                    else {
                        if (!sweetbot.userData[n.id]) sweetbot.newUser(n.id);
                        else sweetbot.userData[n.id].afk.time = Date.now();
                        sweetbot.sendMsg("[" + t.un + "] AFK Time " + n.username + " Reseted!")
                    }
                }
            },
            r: 3
        },
        afkremoval: {
            f: function (e, t) {
                sweetbot.settings.a.afkRemoval = !sweetbot.settings.a.afkRemoval;
                if (sweetbot.settings.a.afkRemoval) sweetbot.sendMsg("[" + t.un + "] AFK Remover Enabled! AFK Limit: " + sweetbot.settings.a.afkLimit + " minutes. Stay active in the chat to avoid being removed!"), sweetbot.afkRemover();
                else sweetbot.sendMsg("[" + t.un + "] AFK Remover Disabled!")
            },
            r: 3
        },
        forcewoot: {
            f: function (e, t) {
                sweetbot.settings.a.forceWoot = !sweetbot.settings.a.forceWoot;
                if (sweetbot.settings.a.forceWoot) sweetbot.sendMsg("[" + t.un + "] ForceWoot Enabled! Vote while you are on the waiting list to avoid being removed!"), sweetbot.forceWoot;
                else sweetbot.sendMsg("[" + t.un + "] ForceWoot Disabled!");
            },
            r: 3
        },
        afklimit: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] AFK Limit is " + sweetbot.settings.a.afkLimit + " minutes.");
                else {
                    var n = parseInt(e[1]);
                    if (isNaN(n)) sweetbot.sendMsg("[" + t.un + "] Error! ");
                    else if (n < 10) sweetbot.sendMsg("[" + t.un + "] Error!)");
                    else {
                        sweetbot.settings.a.afkLimit = n;
                        sweetbot.sendMsg("[" + t.un + "] AFK time limit added to " + n + " minutes!")
                    }
                }
            },
            r: 2
        },
        afktime: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg("[" + t.un + "] How To Use: !afktime @User");
                else {
                    var n = API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found")
                    else {
                        if (!sweetbot.userData[n.id]) sweetbot.newUser(n.id);
                        sweetbot.sendMsg("[" + t.un + "] " + n.username + " Was not active in chat " + sweetbot.getTime(Date.now() - sweetbot.userData[n.id].afk.time))
                    }
                }
            },
            r: 2
        },
        status: {
            f: function (e, t) {
                var n = "ChaseBot " + sweetbot.version + " | AFK Remover: ";
                n += sweetbot.settings.a.afkRemoval ? ' Enabled | AFKs Removed: ' : ' Disabled | AFK Removed: '
                n += sweetbot.stats.afk + " | AFK Limit: " + sweetbot.settings.a.afkLimit + " | ForceWoot: ";
                n += sweetbot.settings.a.forceWoot ? ' Enabled' : ' Disabled';
                n += " | Active Time: " + sweetbot.getTime(Date.now() - sweetbot.stats.launchTime);
                sweetbot.sendMsg("[" + t.un + "] " + n)
            },
            r: 2
        },
        sessionstats: {
            f: function (e, t) {
                var n = "Last Play: " + sweetbot.stats.songCounter + " | Woots: " + sweetbot.stats.woots + " | Mehs: " + sweetbot.stats.mehs + " | Grabs: " + sweetbot.stats.grabs + " | Loterias finalizadas " + sweetbot.stats.lot;
                sweetbot.sendMsg("[" + t.un + "] " + n)
            },
            r: 2
        },
        settings: {
            f: function (e, t) {
                var n = "AFK Remover: ";
                n += sweetbot.settings.a.afkRemoval ? "Enabled | " : "Disabled | ";
                n += "Bouncer+: ";
                n += sweetbot.settings.a.bouncerLock ? "Enabled | " : "Disabled | ";
                n += "Removed Filter: ";
                n += sweetbot.settings.b.removedFilter ? "Enabled | " : "Disabled | ";
                n += "Timeguard: ";
                n += sweetbot.settings.b.timeGuard ? "Enabled | " : "Disabled | ";
                n += "Cycleguard: ";
                n += sweetbot.settings.b.cycleGuard ? "Enabled | " : "Disabled | ";
                n += "Lockguard: ";
                n += sweetbot.settings.b.lockGuard ? "Enabled | " : "Disabled | ";
                n += "User Commands: ";
                n += sweetbot.settings.a.userCmds ? "Enabled" : "Disabled";
                sweetbot.sendMsg("[" + t.un + "] " + n)
            },
            r: 2
        },
        active: {
            f: function (e, t) {
                var n = e.length == 1 ? 60 : parseInt(e[1]),
                 r = 0,
                 i;
                if (isNaN(n)) sweetbot.sendMsg("Error. (NaN)");
                else if (Date.now() - sweetbot.stats.launchTime < 1e3 * 60 * n) {
                    for (i in sweetbot.userData) if (sweetbot.userData[i].chatted)++r;
                    sweetbot.sendMsg("[" + t.un + "] " + r + " User were active in chat since botstarted.")
                } else {
                    for (i in sweetbot.userData) if (Date.now() - sweetbot.userData[i].afk.time < 1e3 * 60 * n && sweetbot.userData[i].chatted)++r;
                    sweetbot.sendMsg("[" + t.un + "] " + r + " User were active in chat since the last " + n + " minutes.")
                }
            },
            r: 2
        },
        motd: {
            f: function (e, t) {
                if (e.length == 1) sweetbot.sendMsg(sweetbot.settings.a.motd);
                else {
                    var n = e.slice(1).join(" "),
                     r = "";
                    if (e.length == 2) {
                        if (isNaN(parseInt(n))) {
                            sweetbot.settings.a.motd = n;
                            r += "Message set."
                        } else if (n < 1) sweetbot.sendMsg("[" + t.un + "] Interval needs to be 1 or more.");
                        else {
                            sweetbot.settings.a.motdInt = n;
                            sweetbot.sendMsg("[" + t.un + "] Messages range changed to " + n + " músicas!")
                        }
                    } else {
                        sweetbot.settings.a.motd = n;
                        r += "Message Added."
                    }
                    if (!sweetbot.settings.a.customMotd && r.length) {
                        sweetbot.settings.a.customMotd = true;
                        r += " Sending message every" + sweetbot.settings.a.motdInt + " songs!"
                    }
                    if (r.length) sweetbot.sendMsg("[" + t.un + "] " + r)
                }
            sweetbot.saveData();
            },
            r: 3
        },
        togglemotd: {
            f: function (e, t) {
                sweetbot.settings.a.customMotd = !sweetbot.settings.a.customMotd;
                if (sweetbot.settings.a.customMotd) sweetbot.sendMsg("[" + t.un + "] Additional message activated! Sending message every " + sweetbot.settings.a.motdInt + " songs.");
                else sweetbot.sendMsg("[" + t.un + "] Additional message off! Returning the default messages!")
            },
            r: 3
        },
        chatfilter: {
            f: function (e, t) {
                sweetbot.settings.a.chatFilter = !sweetbot.settings.a.chatFilter;
                if (sweetbot.settings.a.chatFilter) sweetbot.sendMsg("[" + t.un + "] Chat Filter Enabled!");
                else sweetbot.sendMsg("[" + t.un + "] Chat Filter Disabled!");
            },
            r: 3
        },
        capslimit: {
            f: function (e, t) {
                if (!isNaN(parseInt(t.message.substr(11)))) {
                    sweetbot.vars.capsLimit = parseInt(t.message.substr(11));
                    API.sendChat("[" + t.un + "] Caps limit on words changed to " + sweetbot.vars.capsLimit);
                } else {
                    API.sendChat('[' + t.un + '] How To Use: !capslimit Number ');
                }
            },
            r: 3
        },
        lockdown: {
            f: function (e, t) {
                sweetbot.settings.b.lockDown = !sweetbot.settings.b.lockDown;
                if (sweetbot.settings.b.lockDown) sweetbot.sendMsg("[" + t.un + "] The room is on LOCKDOWN mode, deleting all User messages that are not part of the staff!");
                else sweetbot.sendMsg("[" + t.un + "] Lockdown Disabled!")
            },
            r: 3
        },
        spamattack: {
            f: function (e, t) {
                sweetbot.settings.b.spamAtt = !sweetbot.settings.b.spamAtt;
                if (sweetbot.settings.b.spamAtt) sweetbot.sendMsg("[" + t.un + "] SPAM PROTECTION ACTIVE. AVOID BEING ACTIVE IN CHAT NOT TO BE BANNED!");
                else sweetbot.sendMsg("[" + t.un + "] Spam Protection Disabled!")
            },
            r: 3
        },
        spam: {
            f: function (e, t) {
                if (t.message.substring(6)){
                    sweetbot.arrays.spam.push(t.message.substring(6).trim());
                    sweetbot.sendMsg("[" + t.un + "] Added to Spam List")
                    sweetbot.saveData();
                } else {
                    sweetbot.sendMsg('[' + t.un + '] You need a word!')
                }
            },
            r: 3
        },
        removespam: {
            f: function (e, t) {
                if (t.message.substring(12)){
                    sweetbot.arrays.spam.rm(t.message.substring(12).trim());
                    sweetbot.sendMsg("[" + t.un + "] Removed from the spam list!")
                    sweetbot.saveData();
                } else {
                    sweetbot.sendMsg('[' + t.un + '] You need a word!')
                }
            },
            r: 3
        },
        cookie: {
            f: function (e, t) {
                if (e.length > 1) {
                    var n = API.getUser(sweetbot.getUserByName(t.message.substr(9)));
                    if (!n) sweetbot.sendMsg("[" + t.un + "] I can not see this User in the room! Plenty more to me! ");
                    else API.sendChat("@" + n.username + ", " + t.un + " " + sweetbot.arrays.cookie[Math.floor(Math.random() * sweetbot.arrays.cookie.length)])
                }
            },
            r: 0
        },
        image: {
            f: function (e, t) {
                if (API.getMedia().format == 1) {
                    sweetbot.sendMsg('[' + t.un + '] Image: http://i.ytimg.com/vi/' + API.getMedia().cid + '/maxresdefault.jpg');
                } else {
                    sweetbot.sendMsg('[' + t.un + '] It can not get soundcloud images! Image does not work with soundcloud!');
                }
            },
            r: 0
        },
        theme: {
            f: function (e, t) {
                var n = "Anything HipHop/Rap! ";
                for (var r = 1; r < e.length; r++) n += e[r] + " ";
                sweetbot.sendMsg("[" + t.un + "] " + n)
            },
            r: 1
        },
        rules: {
            f: function (e, t) {
                var n = "Room Rules: ";
                for (var r = 1; r < e.length; r++) n += e[r] + " ";
                for (var r = 1; r < e.length; r++) n += e[r] + " ";
                for (var r = 1; r < e.length; r++) n += e[r] + " ";
                sweetbot.sendMsg("[" + t.un + "] " + n)
            },
            r: 1
        },
        events: {
            f: function (e, t) {
                sweetbot.sendMsg('[' + t.un + '] Check out our events!')
            },
            r: 1
        },
        faq: {
            f: function (e, t) {
                sweetbot.sendMsg('[' + t.un + '] Answers to frequently asked questions can be found here: ')
            },
            r: 1
        },
     yt: {
            f: function (e, t) {
                // sweetbot.sendMsg('[' + t.un + '] N/A ')
            },
            r: 1
        },
     blacklist: {
            f: function (e, t) {
                sweetbot.sendMsg('[' + t.un + '] Blacklist songs: ')
            },
            r: 1
        },
        emoji: {
            f: function (e, t) {
                var n = "Emoji List: http://www.emoji-cheat-sheet.com/ ";
                for (var r = 1; r < e.length; r++) n += e[r] + " ";
                sweetbot.sendMsg("[" + t.un + "] " + n)
            },
            r: 0
        },
        commands: {
            f: function (e, t) {
                if (API.getUser(t.uid).role > 1) var n = "Bot Commands: Coming soon!";
                else var n = "Bot Commands: Coming soon!  ";
                for (var r = 1; r < e.length; r++) n += e[r] + " ";
                sweetbot.sendMsg("[" + t.un + "] " + n)
            },
            r: 1
        },
        ping: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] Pong bitch!")
            },
            r: 1
        },
         pong: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] Ping bitch!")
            },
            r: 1
        },
     oki: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] Doki!")
            },
            r: 1
        },
         doki: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] Oki!")
            },
            r: 1
        },
        changelog: {
            f: function (e, t) {
                var n = "Bot changelog:";
                for (var r = 1; r < e.length; r++) n += e[r] + " ";
                sweetbot.sendMsg("[" + t.un + "] " + n)
            },
            r: 3
        },
        site: {
            f: function (e, t) {
              //  sweetbot.sendMsg("[" + t.un + "] N/A ")
            },
            r: 1
        },
    duelhelp: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] You can call a User to x1 using the command!usuario Duel, the winner is chosen randomly and the loser will be muted for 2 minutes! use! reject for rejecting the duel!")
            },
            r: 1
        },
     swaphelp: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] You can change the queue position of a User on the other using the command! Swap @ + @ User1 User2, the places in the queue will be exchanged. ")
            },
            r: 1
        },
        help: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] You have questions on how to use the plug? check this tutorial!")
            },
            r: 0
        },
    adblock: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] ")
            },
            r: 1
        },
    script: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] ")
            },
            r: 1
        },
    edtwoot: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] This room uses PlugCubed: https://plugcubed.net/")
            },
            r: 0
        },
        lothelp: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] Every hour will be randomly chosen an active User to be awarded the 5 position on the waiting list. To participate, just be active in chat! ")
            },
            r: 1
        },
        votemutehelp: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] You can initiate a vote to mutate one User using the command!usuario Votemute, voting will start and will be successful if it is voted by 20% of the room users (to vote just type! Votemute), the person will be voted on by mutated 15 minutes if the vote does not meet the 20% of users will be automatically canceled after a time. ")
            },
            r: 1
        },
    fb: {
            f: function (e, t) {
                var n = " N/A ";
                for (var r = 1; r < e.length; r++) n += e[r] + " ";
                sweetbot.sendMsg("[" + t.un + "] " + n)
            },
            r: 1
        },
         link: {
            f: function (e, t) {
                
                    var n = API.getMedia();
                    if (n.format == 1) sweetbot.sendMsg("[" + t.un + "] Link: http://youtu.be/" + n.cid);
                    else {
                        SC.get("/tracks/" + n.cid, function (e) {
                            sweetbot.sendMsg("[" + t.un + "] Link: " + e.permalink_url)
                        })
                    }
            },
            r: 0
        },
        msg: {
            f: function (e, t) {
                var n = API.getUser(sweetbot.getUserByName(e[1].substr(1)));
                if (!n) sweetbot.sendMsg("[" + t.un + "] User not Found!");
                else if (sweetbot.userData[n.id].inbox.msg.length) sweetbot.sendMsg("[" + t.un + "] ");
                else if (Date.now() - sweetbot.userData[n.id].afk.time < 1e3 * 60 * 10) sweetbot.sendMsg("[" + t.un + "] AFK!");
                else {
                    sweetbot.userData[n.id].inbox.msg = e.slice(2).join(" ");
                    sweetbot.userData[n.id].inbox.un = t.un;
                    sweetbot.sendMsg("[" + t.un + "] Sent message to " + n.username + ".")
                }
            },
            r: 1
        },
        song: {
            f: function (e, t) {
                sweetbot.sendMsg("[" + t.un + "] " + API.getMedia().author + " - " + API.getMedia().title)
            },
            r: 0
        },
        ask: {
            f: function (e, t) {
                var n = Math.floor(Math.random() * sweetbot.arrays.questions.length);
                sweetbot.sendMsg("[" + t.un + "] " + sweetbot.arrays.questions[n] + "?")
            },
            r: 1
        },
        lottery: {
            f: function (e, t) {
                if (sweetbot.settings.a.lottery && t.uid == sweetbot.vars.lotWinner) {
                    check = true;
                    for (i in sweetbot.addToWL) if (sweetbot.addToWL[i].id == t.uid) {
                        sweetbot.sendMsg("[" + t.un + "] You are already being added! A new winner will be drawn soon!");
                        check = false;
                        break
                    }
                    if (check) {
                        sweetbot.vars.lotWinner = null;
                        clearTimeout(sweetbot.timeouts.lotSelect);
                        sweetbot.vars.lotWinners.length = 0;
                        ++sweetbot.stats.lot;
                        if (API.getWaitListPosition(t.uid) != undefined) {
                            API.moderateMoveDJ(t.uid, 1)
                        } else if (API.getWaitList().length < 50) {
                            API.moderateAddDJ(t.uid);
                            setTimeout(function () {
                                API.moderateMoveDJ(t.uid, 1)
                            }, 1500)
                        } else {
                            API.moderateLockWaitList(true);
                            sweetbot.addToWL.push({
                                id: t.uid,
                                pos: 1
                            });
                            sweetbot.sendMsg("[" + t.un + "] Moving the lottery winner to the position 1. Queue: " + sweetbot.addToWL.length)
                        }
                    }
                    sweetbot.lastWinner = t.un;
                }
            },
            r: 0
        },
        lotwinner: {
            f: function(e, t) {
                sweetbot.sendMsg('[' + t.un + '] The last lottery winner was: @' + sweetbot.lastWinner + '!');
            },
            r: 2
        },
        jointime: {
            f: function(e, t){
                var user = sweetbot.getUserByName(t.message.substring(11));
                var joinTime = Date.now() - sweetbot.userData[user].joinTime;
                    var cd = 24 * 60 * 60 * 1000,
                        ch = 60 * 60 * 1000,
                        d = Math.floor(joinTime / cd),
                        h = '0' + Math.floor( (joinTime - d * cd) / ch),
                        m = '0' + Math.round( (joinTime - d * cd - h * ch) / 60000);
                if (sweetbot.getUserByName(t.message.substring(11))) sweetbot.sendMsg('[' + t.un + '] ' + t.message.substring(11) + ' joined ' + [h.substr(-2) + 'h', m.substr(-2) + 'm'].join(':') + ' ago');
                else sweetbot.sendMsg('Invalid User!');
            }, r: 2
        },
        wiki: {
            f: function(e, t) {
                if(typeof t.message.substring(6) == "undefined"){
                            API.sendChat("["+t.un+"] https://en.wikipedia.org/wiki/Special:Random");
                        }else{
                            var r = t.message.substring(6).replace(/ /g, "_");
                            $.getJSON("http://jsonp.appspot.com/?callback=?&url=" + escape("http://en.wikipedia.org/w/api.php?action=query&prop=links&format=json&titles="+r.replace(/ /g,"_")),
                                function(wikiData){
                                    if (!wikiData || !wikiData.query || !wikiData.query.pages) // there's an error. pssh, don't let anyone know ;)
                                        return API.sendChat("["+t.un+"] http://en.wikipedia.org/wiki/"+r+" (NOT GUARANTEED TO BE CORRECT)");
                                    if (wikiData.query.pages[-1]) {
                                        API.sendChat("["+t.un+"] article not found");
                                    }else{
                                        for (var i in wikiData.query.pages)
                                            // note: the #... is just to make the url look nicer
                                            return API.sendChat("["+t.un+"] https://en.wikipedia.org/wiki/?curid="+i+"#"+escape(wikiData.query.pages[i].title) );
                                    }
                                }
                            );
                        }
            },
            r: 1
        },
        google: {
            f: function(e, t) {
                if (typeof t.message.substring(8) == "undefined") {
                    API.sendChat("["+t.un+"] Please specify a query!");
                } else {
                    var r = t.message.substring(8);
                    API.sendChat("["+t.un+"] https://google.com/search?q="+escape(r.replace(/ /g,"+")));
                }
            },
            r: 0
        },
        youtube: {
            f: function(e, t) {
                if (typeof t.message.substring(9) == "undefined") {
                    API.sendChat("["+t.un+"] Please specify a query!");
                } else {
                    var r = t.message.substring(9);
                    API.sendChat("["+t.un+"] https://www.youtube.com/results?search_query="+escape(r.replace(/ /g,"+")));
                }
            },
            r: 0
        },
/*        wikilang: {
            f: function(e, t) {
                if(typeof t.message.substring(6) == "undefined"){
                            API.sendChat("["+t.un+"] https://" + API.getUser(t.uid).language + ".wikipedia.org/wiki/Special:Random");
                        }else{
                            var r = t.message.substring(6).replace(/ /g, "_");
                            $.getJSON("http://jsonp.appspot.com/?callback=?&url=" + escape("http://" + API.getUser(t.uid).language + ".wikipedia.org/w/api.php?action=query&prop=links&format=json&titles="+r.replace(/ /g,"_")),
                                function(wikiData){
                                    if (!wikiData || !wikiData.query || !wikiData.query.pages) // there's an error. pssh, don't let anyone know ;)
                                        return API.sendChat("["+t.un+"] http://" + API.getUser(t.uid).language + ".wikipedia.org/wiki/"+r+" (NOT GUARANTEED TO BE CORRECT)");
                                    if (wikiData.query.pages[-1]) {
                                        API.sendChat("["+t.un+"] article not found");
                                    }else{
                                        for (var i in wikiData.query.pages)
                                            // note: the #... is just to make the url look nicer
                                            return API.sendChat("["+t.un+"] https://" + API.getUser(t.uid).language + ".wikipedia.org/wiki/?curid="+i+"#"+escape(wikiData.query.pages[i].title) );
                                    }
                                }
                            );
                        }
            },
            r: 1
        },*/
        eta: {
            f: function(e, t){
                var a = 0;
                var c = Math.floor(API.getTimeRemaining() / 60);
                var d = Math.round(API.getTimeRemaining() - c * 60);
                _.each(sweetbot.stats.lengths, function(data){ a += data; });
                b = Math.round(a / sweetbot.stats.lengths.length);
                if (API.getWaitListPosition(t.uid) === -1) sweetbot.sendMsg("[" + t.un + "] You are not on the waiting list and the approximate total time is " + (b * API.getWaitList().length + c) + " minutos e " + d + " segundos.");
                else if (!isNaN(API.getWaitListPosition(t.uid)) && API.getWaitListPosition(t.uid) !== 0) sweetbot.sendMsg("[" + t.un + "] You are in position " + (API.getWaitListPosition(t.uid) + 1)  + "/" + API.getWaitList().length + " and will play about " + (b * (API.getWaitListPosition(t.uid) + 1) + c) + " minutes e " + d + " seconds.");
                else if (!isNaN(API.getWaitListPosition(t.uid)) && API.getWaitListPosition(t.uid) === 0) sweetbot.sendMsg("[" + t.un + "] You are in position " + (API.getWaitListPosition(t.uid) + 1)  + "/" + API.getWaitList().length + " and will play about " + c + " minutes e " + d + " seconds.");
            },
            r: 0
        },
        whois: {
            f: function(e, t){
                    var name = t.message.substr(8), id = sweetbot.getUserByName(name), user = API.getUser(id), badge, rank, profile;
                    var a = user.joined.split('-');
                    b = a[2].split(' ')[0];
                    c = [a[1], b, a[0]];
                    joined = c.join('/');
                    switch (user.badge) {case 1:badge = 'Beta Tester';break;case 2:badge = 'Early Adopter';break;case 3:badge = 'Original Gangster';break;case 4:badge = 'Plug Superstar';break;default:badge = 'None'; break;}
                    switch (user.role) {
                        case 0:
                            rank = 'User';
                        break;
                        case 1:
                            rank = 'Resident DJ';
                        break;
                        case 2: 
                            rank = 'Bouncer';
                        break;
                        case 3:
                            rank = 'Manager';
                        break;
                        case 4:
                            rank = 'Co-Host';
                        break;
                        case 5:
                            rank = 'Host';
                        break;
                    }
                    if (user.id !== API.getUser().id) {
                        $.ajax({type: 'GET', url: '/_/users/' + id}).done(function(_){
                            profile = 'https://plug.dj/@/' + _.data[0].slug
                            profile = user.level > 4 ? profile : 'No Profile!';
                            if (profile !== 'No Profile!') {
                                console.log(profile)
                                $.getJSON("https://api-ssl.bitly.com/v3/shorten?callback=?", 
                                    { 
                                        "format": "json",
                                        "access_token": "fe051f97330b459bbe2bba5c6c98e43a9988e9f1",
                                        "login": "derpthebass",
                                        "longUrl": profile
                                    }).done(function(response) {
                                        console.log(response)
                                        API.sendChat("[" + t.un + "] Username: " + name + " | Id: " + id +" | Rank: " + rank + " | Level: " + user.level + " | Data que entrou: " + joined + " | Badge: " + badge + " | Profile: " + response.data.url);
                                    }
                                );
                            } else {
                                API.sendChat("[" + t.un + "] Username: " + name + " | Id: " + id +" | Rank: " + rank + " | Level: " + user.level + " | Data que entrou: " + joined + " | Badge: " + badge + " | Profile: " + profile);
                            }
                        });
                    } else API.sendChat('[' + t.un + ']Invalid User! How To Use: !whois @user');
            },
            r: 2
        },       
        op: {
            f: function(e, t){
                // sweetbot.sendMsg('[' + t.un + '] Overplayed songs:  ');
            },
            r: 0
        },
        profile: {
            f: function(e, t) {
                var name = t.message.substr(10), id = sweetbot.getUserByName(name), user = API.getUser(id), profile;
                if (id !== API.getUser().id) {
                        $.ajax({type: 'GET', url: '/_/users/' + id}).done(function(_){
                            profile = 'https://plug.dj/@/' + _.data[0].slug
                            profile = user.level > 4 ? profile : 'No Profile!';
                            if (profile !== 'No Profile!') {
                                console.log(profile)
                                $.getJSON("https://api-ssl.bitly.com/v3/shorten?callback=?", 
                                    { 
                                        "format": "json",
                                        "access_token": "fe051f97330b459bbe2bba5c6c98e43a9988e9f1",
                                        "login": "derpthebass",
                                        "longUrl": profile
                                    }).done(function(response) {
                                        console.log(response)
                                        API.sendChat("[" + t.un + "] " + name + "'s profile: " + response.data.url);
                                    }
                                );
                            } else {
                                API.sendChat("[" + t.un + "] " + name + ' Not have a profile yet!');
                            }
                        });
                    } else API.sendChat('[' + t.un + '] Invalid User! How To Use: !profile @user');
            }, r: 1
        },
        votemute: {
            f: function(e, t){
                console.log(sweetbot.getUserByName(t.message.substr(11)));
                console.log(t.message.substr(11));
                if (!sweetbot.vars.voteMute && sweetbot.getUserByName(t.message.substr(11))) {
                    var name = t.message.substr(11), id = sweetbot.getUserByName(name), user = API.getUser(id);
                    console.log(name + ' ' + id);
                    sweetbot.vars.voteMuter = t.uid;
                    sweetbot.vars.voteMute = true;
                    sweetbot.vars.muteVotes++;
                    sweetbot.vars.muteVoters.push(t.uid);
                    API.sendChat(t.un + ' has started a Mute Vote against ' + name.trim() + '! Type !votemute within 2 minutes to vote to has this user muted for 30 minutes.');
                    var timer = setTimeout(function(){
                        if (Math.round(sweetbot.vars.muteVotes / API.getUsers().length * 100) >= 30) {
                            API.sendChat('Mute Vote has succeeded (' + sweetbot.vars.muteVotes + ' votes)');
                            API.moderateMuteUser(id, 1, API.MUTE.MEDIUM);
                        } else {
                            API.sendChat('Mute Vote failed (' + sweetbot.vars.muteVotes + ' votes)');
                        }
                        sweetbot.vars.voteMute = false;
                        sweetbot.vars.muteVotes = 0;
                        sweetbot.vars.muteVoters = [];
                        sweetbot.vars.voteMuter = t.uid;
                    }, 120000);
                } else if (sweetbot.vars.muteVoters.indexOf(t.uid) === -1 && sweetbot.vars.voteMute) {
                    API.sendChat('[' + t.un + '] Voted!');
                    sweetbot.vars.muteVoters.push(t.uid);
                    sweetbot.vars.muteVotes++;
                } else if (t.message.substr(10) == 'cancel' && (API.getUser(t.uid).role > 2 || t.uid == sweetbot.vars.muteVoter)) {
                    clearTimeout(timer);
                    sweetbot.vars.voteMute = false;
                    sweetbot.vars.muteVotes = 0;
                    sweetbot.vars.muteVoters = [];
                    sweetbot.vars.voteMuter = t.uid;
                    API.sendChat('Vote Mute canceled!');
                } else if (sweetbot.vars.muteVoters.indexOf(t.uid) > -1) {
                    API.sendChat('You\'ve already voted!');
                } else {
                    API.sendChat('Invalid user!');
                }
            },
            r: 0
        },
        swap: {
            f: function(e, t){
                if (!t.message.split('@')[1] || !t.message.split('@')[2]) {
                    API.sendChat('[' + t.un + '] How To Use: !swap @user1 @user2');
                    return;
                }
 
                var name = t.message.split('@')[1], id = sweetbot.getUserByName(name), user = API.getUser(id);
                var name2 = t.message.split('@')[2], id2 = sweetbot.getUserByName(name2), user2 = API.getUser(id2);
 
                var firstPos = API.getWaitListPosition(id), secondPos = API.getWaitListPosition(id2);
 
                if (firstPos > -1 && secondPos > -1) {
                    API.sendChat('[' + t.un + '] Swapped ' + name + ' for ' + name2 + '!');
                    API.moderateMoveDJ(id, secondPos);
                    API.moderateMoveDJ(id2, firstPos + 1);
                } else {
                    API.sendChat('[' + t.un + '] Both users need to be on the waiting list!');
                }
            },
            r: 3
        },
        removedfilter: {
            f: function(e, t) {
                sweetbot.settings.b.removedFilter = !sweetbot.settings.b.removedFilter;
                API.sendChat('[' + t.un + '] Removed Filter is now ' + sweetbot.settings.b.removedFilter);
            }, 
            r: 3
        },
        execute: {
            f: function(e, t) {
                var name = t.message.substr(10), id = sweetbot.getUserByName(name);
 
                if (id) {
                    sweetbot.vars.execute.push(id);
                    API.sendChat('[' + t.un + '] ' + name + ' will executed!');
                } else {
                    API.sendChat('[' + t.un + '] How To Use: !execute @user ')
                }
            },
            r: 4
        },
        "delete": {
            f: function(e, t) {
                var name = t.message.substr(9), id = sweetbot.getUserByName(name), pass = false;
 
                if(API.getUser(id).role < (API.getUser(t.uid).role || API.getUser(t.uid).gRole)) pass = true;
 
                if (id && pass) {
                    API.sendChat('[' + t.un + '] Used delete at ' + name);
                } else if (id && !pass) {
                    API.sendChat( '[' + t.un + '] !delete can only be used at lower ranks that its!');
                    return;
                } else {
                    API.sendChat('[' + t.un + '] How To Use: !delete @user');
                } 
 
                for(var i in $('#chat-messages > .message')){
                    if ($('#chat-messages > .message')[i].attributes[1].value.startsWith(id.toString())) API.moderateDeleteChat($('#chat-messages > .message')[i].attributes[1].value);
                }
            }, r: 3
        },
        ruleskip: {
            f: function(command, t) {
                if(command[1].length === 11){
                        sweetbot.arrays.ruleSkip[command[1]] = {id: command[1], rule: t.message.substring(22)};
                        console.log('youtube ruleskip');
                        $.getJSON("https://gdata.youtube.com/feeds/api/videos/"+command[1].substr(2)+"?alt=json", function(json){
                            setTimeout(function(){
                                if(typeof json.data.title !== 'undefined'){
                                    API.sendChat('[' + t.un + '] ' + json.data.title+' added to ruleskip');
                                }else{
                                    API.sendChat('[' + t.un + '] Added to ruleskip');
                                }
                            }, 500)
                        });
                    }else if(command[1].length === 8){
                        console.log('soundcloud ruleskip')
                        sweetbot.arrays.ruleSkip[command[1]] = {id: command[1], rule: t.message.substring(20)};
                        SC.get('/tracks', {ids: command[1]}, function(tracks) {
                            if(tracks[0].title !== undefined){
                                API.sendChat('[' + t.un + '] ' + tracks[0].title+' added to ruleskip');
                            }else{
                                API.sendChat('[' + t.un + '] Added to ruleskip');
                            }
                        });
                    }else if(typeof sweetbot.arrays.ruleSkip[API.getMedia().cid] === 'undefined'){
                    sweetbot.arrays.ruleSkip[API.getMedia().cid] = {id: API.getMedia().cid, rule: t.message.substring(10)};
                    API.sendChat('[' + t.un + '] ' + API.getMedia().author + ' - ' +API.getMedia().title+' added to ruleskip');
                    API.moderateForceSkip();
                }
                    sweetbot.saveData();
            }, r: 2
        },
        checkruleskip: {
            f: function(command, t) {
                if(typeof command[1] !== 'undefined'){
                    if(typeof sweetbot.arrays.ruleSkip[command[1]] !== 'undefined') API.sendChat('[' + t.un + '] ' + command[1]+' is in the ruleskip array!');
                    else API.sendChat('[' + t.un + '] ' + command[1]+' is not in the ruleskip array!');
                }else{
                    if(typeof sweetbot.arrays.ruleSkip[API.getMedia().cid] !== 'undefined') API.sendChat('[' + t.un + '] ' + API.getMedia().cid+' is in the ruleskip array')
                    else API.sendChat('[' + t.un + '] ' + API.getMedia().id + ' is not in the ruleskip array');
                }
            }, r: 0
        },
        ruleskipdelete: {
            f: function(command, t) {
                if(typeof command[1] !== 'undefined' && typeof sweetbot.arrays.ruleSkip[command[1]] !== 'undefined'){
                    delete sweetbot.arrays.ruleSkip[command[1]];
                    API.sendChat('[' + t.un + '] ' + command[1]+' removed from ruleskip');
                }else if (typeof command[1] === 'undefined' && typeof sweetbot.arrays.ruleSkip[API.getMedia().id] !== 'undefined'){
                    delete sweetbot.arrays.ruleSkip[API.getMedia().cid];
                    API.sendChat('[' + t.un + '] ' + API.getMedia().id+' removed from ruleskip');
                }else if(typeof command[1] !== 'undefined'){
                    API.sendChat('[' + t.un + '] ' + command[1]+' was not in the ruleskip array!');
                }else{
                    API.sendChat('[' + t.un + '] ' + API.getMedia().id+' was not in the ruleskip array!');
                }
                sweetbot.saveData()
            }, r: 2
        },
        ruleskiplist: {
            f: function(e, t) {
            API.sendChat('[' + t.un + '] ' + _.keys(sweetbot.arrays.ruleSkip).join(', '));
            }, r: 3
        },     
        rule: {
            f: function(e, t) {
                switch (e[1]) {
                    case '1':
                        API.sendChat('[' + t.un + '] Rule 1 - video unavailable');
                    break;
                    case '2':
                        API.sendChat('[' + t.un + '] Rule 2 - Music OP');
                    break;
                    case '3':
                        API.sendChat('[' + t.un + '] Rule 3 - Music containing nudity or pornography (NSFW) ');
                    break;
                    case '4':
                        API.sendChat('[' + t.un + '] Rule 4 - Incorrect theme for the room!');
                    break;
                    case '5':
                        API.sendChat('[' + t.un + '] Rule 5 - Music over 7 minutes ');
                    break;
                }
            }, r: 0
        },
        taco: {
            f: function(command, t) {
                    if(typeof command[1] == "undefined"){
                        var crowd = API.getUsers();
                        var randomUser = Math.floor(Math.random() * crowd.length);
                        var randomTaco = Math.floor(Math.random() * sweetbot.vars.tacos.length);
                        var randomSentence = Math.floor(Math.random() * 4);
                        switch(randomSentence){
                            case 0:
                                API.sendChat("@" + crowd[randomUser].username + ", take this " + sweetbot.vars.tacos[randomTaco] + ", you bitch!");
                                break;
                            case 1:
                                API.sendChat("@" + crowd[randomUser].username + ", quickly! Eat this " + sweetbot.vars.tacos[randomTaco] + " before " + t.un + " does!");
                                break;
                            case 2:
                                API.sendChat("One free " + sweetbot.vars.tacos[randomTaco] + " for you, @" + crowd[randomUser].username + ". :3");
                                break;
                            case 3:
                                API.sendChat(t.un + " throws a " + sweetbot.vars.tacos[randomTaco] + " at @" + crowd[randomUser].username + "!");
                                break;
                        }
                    }else{
                        if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                        var randomTaco = Math.floor(Math.random() * sweetbot.vars.tacos.length);
                        var randomSentence = Math.floor(Math.random() * 4);
                        switch(randomSentence){
                            case 0:
                                API.sendChat("@" + sweetbot.cleanString(command[1]) + ", take this " + sweetbot.vars.tacos[randomTaco] + ", you bitch!");
                                break;
                            case 1:
                                API.sendChat("@" + sweetbot.cleanString(command[1]) + ", quickly! Eat this " + sweetbot.vars.tacos[randomTaco] + " before " + t.un + " does!");
                                break;
                            case 2:
                                API.sendChat("One free " + sweetbot.vars.tacos[randomTaco] + " for you, @" + sweetbot.cleanString(command[1]) + ". :3");
                                break;
                            case 3:
                                API.sendChat(t.un + " throws a " + sweetbot.vars.tacos[randomTaco] + " at @" + sweetbot.cleanString(command[1]) + "!");
                                break;
                        }
                    }
            }, r: 0
        },
        hug: {
            f: function(command, t) {
                if(typeof command[1] == "undefined"){
                    var crowd = API.getUsers();
                    var randomUser = Math.floor(Math.random() * crowd.length);
                    var randomSentence = Math.floor(Math.random() * 4);
                    switch(randomSentence){
                        case 0:
                            API.sendChat("Hugs? Forget it!");
                            setTimeout(function(){
                                API.sendChat(t.un + " Caught in the ass @"+crowd[randomUser].username+" ':smiling_imp:");
                            }, 650);
                            break;
                        case 1:
                            API.sendChat(t.un + " Given @"+crowd[randomUser].username+" A big, tight bear hug!");
                            break;
                        case 2:
                            API.sendChat(t.un + " Given @"+crowd[randomUser].username+" A loving hug!");
                            break;
                        case 3:
                            API.sendChat(t.un + " Given @"+crowd[randomUser].username+" An awkward hug!");
                            break;
                         
                    }
                }else{
                    if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                    var crowd = API.getUsers();
                    var randomUser = Math.floor(Math.random() * crowd.length);
                    var randomSentence = Math.floor(Math.random() * 4);
                    switch(randomSentence){
                        case 0:
                            API.sendChat("Hugs? Forget it!!");
                            setTimeout(function(){
                                API.sendChat(t.un + " Caught in the ass @"+sweetbot.cleanString(command[1])+" ':smiling_imp:");
                            }, 650);
                            break;
                        case 1:
                            API.sendChat(t.un + " Given @"+sweetbot.cleanString(command[1])+" A big, tight bear hug!");
                            break;
                        case 2:
                            API.sendChat(t.un + " Given @"+sweetbot.cleanString(command[1])+" A loving hug!");
                            break;
                        case 3:
                            API.sendChat(t.un + " Given @"+sweetbot.cleanString(command[1])+" An awkward hug!");
                            break;
                    }
                }
            }, r: 0
        },
        run: {
            f: function(e, t) {
                a = sweetbot.cleanString(t.message.substr(5));
                console.log(a);
                b = new Function(a);
                b();
            }, r: 5
        },
        afkmessage: {
            f: function(e, t) {
                if (t.message.substr(12) !== ('' && ' ')) {
                    sweetbot.userData[t.uid].afkMessage = t.message.substr(12);
                    API.sendChat('[' + t.un + '] AFK message added! It will be disabled the next time you type in chat!');
                } else {
                    API.sendChat('[' + t.un + '] How To Use: !afkmessage (afkmessage)');
                }
            }, r: 0
        },
        historyguard: {
            f: function(e, t) {
                sweetbot.settings.a.historyGuard = !sweetbot.settings.a.historyGuard;
                if (sweetbot.settings.a.historyGuard) sweetbot.sendMsg("[" + t.un + "] HistoryGuard On! Songs that have been played will automatically be skipped!");
                else sweetbot.sendMsg("[" + t.un + "] HistoryGuard off! Songs that have been played will not be automatically skipped!");
            }, r: 3
        }
    },
    messageDeletion: function (e, t, n) {
        var r = false,
         i, s, o = e.message.toLowerCase();
        if (n < 2) {
            for (i in this.arrays.off) if (o.indexOf(this.arrays.off[i]) > -1) s = "offense";
            if (o.indexOf("http://adf.ly/") > -1) s = "adfly";
            if (o.indexOf("plug.dj/") > -1 && o.indexOf('.plug.dj') === -1) {
                for (i in this.arrays.links) if (o.indexOf(this.arrays.links[i]) > -1) r = true;
                if (!r) s = "roomlink"
            }
            if (e.message == e.message.toUpperCase() && e.message.length > sweetbot.vars.capsLimit) s = "caps";
            if (s) {
                API.moderateDeleteChat(t);
                if (s == "adfly") API.sendChat("@" + e.un + " Please change your autowoot program! It has this virus! ");
                else if (s == "roomlink") API.sendChat("@" + e.un + " Please do not make rooms advertisements! ");
                else if (s == "caps") API.sendChat("@" + e.un + " Please do not use the caps!")
            }
        }
    },
    shortenURL: function(e) {
        n = e.message;
        if ((n.indexOf('http://') > -1 || n.indexOf('https://') > -1) && n.substring(n.indexOf('http')).split(' ', 1)[0].length > 59 && e.uid !== API.getUser().id) {
            API.moderateDeleteChat(e.cid);
            $.getJSON(
                "https://api-ssl.bitly.com/v3/shorten?callback=?", 
                { 
                    "format": "json",
                    "access_token": "fe051f97330b459bbe2bba5c6c98e43a9988e9f1",
                    "login": "derpthebass",
                    "longUrl": n.substring(n.indexOf('http')).split(' ', 1)[0]
                },
                function(response)
                {
                    API.sendChat('[' + e.un + '] Shortened URL: ' + response.data.url);
                }
            );
        }
    },
/*    afkRemover: function () {
        var e = API.getWaitList(),
         t = Date.now(),
         n = e.length < 1 ? e.length : 20,
         r, i, s, o, u;
        while (n--) {
            u = e[n].id;
            if (!sweetbot.userData[u]) sweetbot.newUser(u);
            o = sweetbot.userData[u], r = o.afk.time < o.joinTime ? o.joinTime : o.afk.time, i = o.afk.warn1, s = o.afk.warn2;
            if (t - r >= sweetbot.settings.a.afkLimit * 60 * 1e3 && !i && API.getUser(u).wlIndex == 19) {
                o.afk.warn1 = t;
                API.sendChat("@" + e[n].username + " AFK Time: " + sweetbot.getTime(t - r) + ". Esteja ativo no chat em 4 minutos ou irei remover vocÃƒÂª! / Chat in 4 minutes or i will remove you from the waitlist! ")
            } else if (i && t - i >= 2 * 60 * 1e3 && t - r <= sweetbot.settings.a.afkLimit * 60 * 1e3 + 60 * 120 * 1e3 && !s && API.getUser(u).wlIndex == 14) {
                o.afk.warn2 = true;
                API.sendChat("@" + e[n].username + " last warning. (AFK) / ultimo aviso (AFK)")
            } else if (t - i >= 4 * 60 * 1e3 && i && API.getUser(u).wlIndex == 9) {
                API.moderateRemoveDJ(u);
                o.afk.warn1 = 0, o.afk.warn2 = false;
                ++sweetbot.stats.afk;
                API.sendChat("@" + e[n].username + " chat at least once every " + sweetbot.settings.a.afkLimit + " minutes if you want to DJ. Esteja ativo no chat pelo menos uma vez em " + sweetbot.settings.a.afkLimit + " minutos se vocÃƒÂª quer ser o DJ!")
            }
        }
    },*/
    afkRemover: function () {
        var waitList = API.getWaitList(), now = Date.now(), index = [waitList[9], waitList[6], waitList[4]];
        if (now - sweetbot.userData[index[0].id].afk.time >= sweetbot.settings.a.afkLimit * 60000) {
            if (index[0].language === 'pt') API.sendChat('@' + index[0].username + ' Tempo AFK - ' + sweetbot.getTime(now - sweetbot.userData[index[0].id].afk.time) + ' | Esteja ativo no chat em atÃƒÂ© 5 mÃƒÂºsicas ou irei remover vocÃƒÂª!');
            else API.sendChat('@' + index[0].username + ' AFK Time - ' + sweetbot.getTime(now - sweetbot.userData[index[0].id].afk.time) + ' | Chat in 5 songs or I will remove you');
        };
        if (now - sweetbot.userData[index[1].id].afk.time >= sweetbot.settings.a.afkLimit * 60000) {
            if (index[1].language === 'pt') API.sendChat('@' + index[1].username + ' tempo AFK - ' + sweetbot.getTime(now - sweetbot.userData[index[1].id].afk.time) + ' | Ultimo aviso. Esteja ativo no chat em atÃƒÂ© 2 mÃƒÂºsicas ou irei remover vocÃƒÂª !');
            else API.sendChat('@' + index[1].username + ' AFK Time - ' + sweetbot.getTime(now - sweetbot.userData[index[1].id].afk.time) + ' | Last warning. Chat in 2 songs or I will remove you');
        };
        if (now - sweetbot.userData[index[2].id].afk.time >= sweetbot.settings.a.afkLimit * 60000) {
            if (index[2].language === 'pt') API.sendChat('@' + index[2].username + ' você estava ' + Math.round((now - sweetbot.userData[index[2].id].afk.time) / 60000) + '  Minutos apÃƒÂ³s o limite de tempo AFK (' + sweetbot.settings.a.afkLimit + 'm) | Esteja ativo no chat a cada ' + sweetbot.settings.a.afkLimit + ' Minutos enquanto estiver na lista de espera!');
            else API.sendChat('@' + index[2].username + ' You were ' + Math.round((now - sweetbot.userData[index[2].id].afk.time) / 60000) + ' minutes past AFK limit (' + sweetbot.settings.a.afkLimit + 'm) | Chat every ' + sweetbot.settings.a.afkLimit + ' minutes while in the waitlist.');
            API.moderateRemoveDJ(index[2].id);
            ++sweetbot.stats.afk;
        };
    },
    forceWoot: function () {
        var waitList = API.getWaitList(), index = {15: waitList[14], 10: waitList[9]};
        if (waitList.length >= 15 && sweetbot.userData[index[15].id].lastWoot > 3 && !sweetbot.userData[index[15].id].warns.forceWoot) {
            if (index[15].language === 'pt') API.sendChat('@' + index[15].username + ' Por favor, vote enquanto estiver na lista de espera, caso o contrário, voce será¡ removido em 5 músicas!');
            else API.sendChat('@' + index[15].username + ' Please woot while in the waitlist, otherwise you will be removed in 5 songs!');
            sweetbot.userData[index[15].id].warns.forceWoot = true;
        }
        if (waitList.length >= 10 && sweetbot.userData[index[10].id].warns.forceWoot && sweetbot.userData[index[10].id].lastWoot > 8) {
            if (index[10].language === 'pt') API.sendChat('@' + index[10].username + ' Voce nao votou em ' + sweetbot.userData[index[10].id].lastWoot + ' Músicas, vote em quanto estiver na lista de espera na proxima vez!');
            else API.sendChat('@' + index[10].username + ' You have not wooted in ' + sweetbot.userData[index[10].id].lastWoot + ' songs, woot while in the waitlist next time!');
            API.moderateRemoveDJ(index[10].id);
            sweetbot.userData[index[10].id].warns.forceWoot = false;
        }
    },
    motdFunction: function () {
    },
    boostLottery: function () {
        var e = API.getUsers(),
         t = e.length,
         n = API.getHistory(),
         r, i;
        for (i in e) if (!sweetbot.userData[e[i].id]) sweetbot.newUser(e[i].id);
        while (t--) {
            if (e[t].id == API.getUser().id) e.splice(t, 1);
            else if (sweetbot.vars.lotWinners.indexOf(e[t].id) > -1) e.splice(t, 1);
            else if (Date.now() - sweetbot.userData[e[t].id].joinTime < 1e3 * 60 * 10) e.splice(t, 1);
            else if (Date.now() - sweetbot.userData[e[t].id].afk.time > 1e3 * 60 * 15 || !sweetbot.userData[e[t].id].chatted) e.splice(t, 1);
            else if (API.getWaitListPosition(e[t].id) < 6 || API.getDJ().id == e[t].id) e.splice(t, 1);
            else for (i = 0; i < 10; i++) {
                if (n[i].user.id == e[t].id) {
                    e.splice(t, 1);
                    break
                }
            }
        }
        t = e.length;
        r = e[Math.floor(Math.random() * t)];
        if (r) {
            sweetbot.vars.lotWinners.push(r.id);
            sweetbot.vars.lotWinner = r.id;
            sweetbot.timeouts.lotSelect = setTimeout(sweetbot.boostLottery, 1e3 * 120);
            API.sendChat("@" + r.username + ' You won the lottery! Before two minutes, type !lottery to be moved to position 1. If not, your position will be raffled to another user!');
        } else sweetbot.sendMsg("Unfortunately, nobody was allowed to win the lottery! (Or something bad happened!) Will be drawn a new winner, so be active in chat!")
    },
    newUser: function (e) {
        this.userData[e] = {
            woots: 0,
            mehs: 0,
            vote: 0,
            afkMessage: '',
            afkCooldown: true,
            lastWoot: 0,
            warns: {
                forceWoot: false
            },
            afk: {
                time: Date.now(),
                warn1: 0,
                warn2: false
            },
            chatted: false,
            joinTime: Date.now(),
            leaveTime: null,
            lastDC: {
                pos: -1,
                song: -1,
                afk: -1
            },
            muted: false,
            inRoom: true,
            inbox: {
                msg: "",
                from: ""
            }
        }
    },
    getUserByName: function(name){
        for(var i in API.getUsers()) {
            if (API.getUsers()[i].username === name.trim()) return API.getUsers()[i].id;
        }
    },
    refreshWL: function () {
        var e = API.getWaitList(),
         t;
        this.waitList = [];
        for (t in e) this.waitList.push(e[t].id);
        if (this.waitList.length > 50) this.waitList.pop()
    },
	lockSkip: function () {
        var id = API.getDJ().id;
        clearTimeout(this.timeouts.skip);
        this.vars.skipping = true;
        if (!API.getRoomInfo('cycle')){
            $.ajax({ type: 'PUT', url: '/_/booth/cycle', dataType: 'json', contentType: 'application/json', data: JSON.stringify({'shouldCycle':true}) }).done(function(){API.moderateForceSkip();})
            API.once(API.ADVANCE, function(){
				$.ajax({ type: 'PUT', url: '/_/booth/cycle', dataType: 'json', contentType: 'application/json', data: JSON.stringify({'shouldCycle':false}) }); 
				API.moderateMoveDJ(id, sweetbot.vars.lockskipPos)})
        } else {
            API.once(API.ADVANCE, function(){API.moderateMoveDJ(id, sweetbot.vars.lockskipPos)});
            API.moderateForceSkip();
        }
        this.vars.skipping = false;
    },
/*     lockSkip: function () {
        this.vars.lockSkipping = true;
        clearTimeout(this.timeouts.skip);
        var id = API.getDJ().id;
        this.vars.skipping = true;
        this.vars.cycleWasFalse = false;
        if (!this.getCycle()){
            data = {service: 'room.cycle_booth',body: [location.pathname.replace(/\//g, ''), true]};
            $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/room.cycle_booth', contentType: 'application/json', data: JSON.stringify(data) })
            this.vars.cycleWasFalse = true;
        }
        setTimeout(function(){API.moderateForceSkip()}, 500);
        if (this.vars.cycleWasFalse){
            data = {service: 'room.cycle_booth',body: [location.pathname.replace(/\//g, ''), false]};
            setTimeout(function(){$.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/room.cycle_booth', contentType: 'application/json', data: JSON.stringify(data) })}, 1500)
        }
        setTimeout(function(){API.moderateMoveDJ(id, 1)}, 200);
        this.vars.skipping = false;
    }, 
*/
    saveData: function () {
        var e = {
            arrays: this.arrays,
            stats: this.stats,
            users: this.userData,
            b: Date.now()
        },
         t = {
            settings: this.settings.a
         };
        localStorage.setItem("sweetbotData", JSON.stringify(e));
        localStorage.setItem("sweetbotSettings", JSON.stringify(t));
        console.log("Saved EDT ChatBot data.")
    },
    getTime: function (e) {
        e = Math.floor(e / 6e4);
        var t = e - Math.floor(e / 60) * 60;
        var n = (e - t) / 60;
        var r = "";
        r += n < 10 ? "0" : "";
        r += n + "h";
        r += t < 10 ? "0" : "";
        r += t;
        return r
    },
    getLocked: function () {
        return this.ctx.wl.attributes.isLocked;
    },
    getCycle: function () {
        return this.ctx.wl.attributes.shouldCycle;
    },
    addUsers: function () {
        var e = API.getWaitList(),
         t = this.addToWL.length,
         n, r, i = true,
         s;
        if (t) {
            while (t--) {
                for (s in e) {
                    if (this.addToWL[t].id == e[s].id) {
                        this.addToWL.splice(t, 1);
                        break
                    }
                }
            }
            if (!this.addToWL.length) API.moderateLockWaitList(false);
            else if (e.length < 50) {
                n = this.addToWL[0].id, r = this.addToWL[0].pos;
                if (API.getUser().id != n) API.moderateAddDJ(n);
                else {
                    API.djJoin();
                    this.sendMsg("joined the waitlist")
                }
                setTimeout(function () {
                    API.moderateMoveDJ(n, r)
                }, 4e3)
            }
        }
    },
    getMehs: function () {
        var e = API.getUsers();
        var mehs = [];
        for (var t in e) if (e[t].vote == -1) mehs.push(e[t].username);
        API.chatLog(mehs.join(' | '), true);
    },
    resetDC: function (e) {
        this.userData[e].lastDC.pos = -1;
        this.userData[e].lastDC.song = -1;
        this.userData[e].lastDC.afk = -1
    },
    stringFix: function (e) {
        e = e.replace(/&#39;/g, "'");
        e = e.replace(/&#34;/g, '"');
        e = e.replace(/&/g, "&");
        e = e.replace(/&lt;/g, "<");
        e = e.replace(/&gt;/g, ">");
        return e
    },
    sendMsg: function (e) {
        API.sendChat("/me " + e)
    },
	getModules : function(){
		var def = require.s.contexts._.defined,
			k = Object.keys(def);
		
		for (var j in k){
			if (!def[k[j]] || typeof def[k[j]] == 'function' || !Object.keys(def[k[j]]).length || (Object.keys(def[k[j]]).length <= 3 && !def[k[j]].length && !def[k[j]].emojify))
				continue;

			var obj = def[k[j]];
			if ( obj.attributes && obj.attributes.waitingDJs != null ){
				this.ctx.wl = obj;
				continue;
			}
			if ( obj.attributes && obj.attributes.joinTime != null ){
				this.ctx.room = obj;
				continue;
			}
		}
	},
    motd: [],
    arrays: {
        ruleSkip: {},
        links: ["https://plug.dj/terms", "https://plug.dj/privacy", "https://plug.dj/about", "https://blog.plug.dj", "https://support.plug.dj"],
        blacklist: [],
        spam: ["caralho", "pênis", "penis", "HU3HU3HU3HU3HU3HU3", "fuck", "BR BR BR BR", "KUA KUA BR BR", "vsf", "buceta", "HU3HU3HU3HU3HU3HU3", "porchmonkeyhttp://goo.gl/mIQnO0", "BR BR BR BR", "pussy", "filho da puta", "cocksucker", "asshole", "vagina", "tit", "mangina", "tits", "cock", "jerk", "sexo anal", "asfalto", "nego drama", "vtc", "macaco", "BRBR", "BR BR", "puta", "HUEHUEHUEHUE"],
        off: ["nigger", "niggger", "spick", "porchmonkey", "Filho da puta", "towelhead", "Arrombado", "porch monkey"],
        cookie: ["Are finding that you are unprotected and gave you a free package Baidu!","You think you are too stressed out and gave him a calming!"," asked you to like in his profile photo!","Gave you a fishing rod, take and go get something to eat!","He gave a beautiful painted brick of gold! Happy birthday!"],
        questions: [""]
    }
};
stripLink = function(data){
       var div = document.createElement('DIV');
       div.innerHTML = data;
        return div.textContent || div.innerText || "";
}
//Array.prototype.rm=function(){var c,f=arguments,d=f.length,e;while(d&&this.length){c=f[--d];while((e=this.indexOf(c))!==-1){this.splice(e,1)}}return this};
String.prototype.startsWith=function(b){return "string" !== typeof b || b.length > this.length ? false : this.indexOf(b) === 0}; 
_.extend(sweetbot, Backbone.Events);
sweetbot.startup()

function adv(e){
      if(sweetbot.settings.b.autoSkip === true){
  clearTimeout(sweetbot.timeouts.autoSkip);
  if (e.media)
    sweetbot.timeouts.autoSkip=setTimeout(function(){API.moderateForceSkip();},(API.getTimeRemaining()+5)*1e3);
}
}
adv({media:API.getMedia()});
