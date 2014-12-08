if (API.enabled && $("#radiantscript-css").length <= 0) {

    var radiantScript = {

        version       : "Fuck plug.dj",
        autoWoot      : true,
        cAutoWoot     : '',
        autoJoin      : true,
        cAutoJoin     : '',
        fullScreen    : false,
        cfullScreen   : '',
        mehShow       : true,
        cmehShow      : '',
        userJoin      : false,
        cuserJoin     : '',
        userLeave     : false,
        cuserLeave    : '',
        chatSound     : true,
        cchatSound    : '',

        setCookie: function (key, value) {          
            var expires = new Date();
            expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + ';path=/;expires=' + expires.toUTCString();   
        },

        getCookie: function (key) {
            var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : null;
        },   

        toggleAutoWoot: function() {
            this.autoWoot = !this.autoWoot;     
            this.cAutoWoot = this.autoWoot ? 'checked' : '';

            if (this.autoWoot) { 
                $('#woot').click(); 
            }
            if (!this.autoWoot) { 
            }
            this.setCookie("COOKIE_AUTO_WOOT", this.autoWoot); 
        }, 

        toggleMehShow: function() {
            this.mehShow = !this.mehShow;     
            this.cmehShow = this.mehShow ? 'checked' : '';

            if (this.mehShow) { 
            }
            if (!this.mehShow) {
            }
            this.setCookie("COOKIE_MEH_SHOW", this.mehShow); 
        }, 

        toggleuserJoin: function() {
            this.userJoin = !this.userJoin;     
            this.cuserJoin = this.userJoin ? 'checked' : '';

            if (this.userJoin) { 
            }
            if (!this.userJoin) {
            }
            this.setCookie("COOKIE_USER_JOIN", this.userJoin); 
        }, 

        toggleuserLeave: function() {
            this.userLeave = !this.userLeave;     
            this.cuserLeave = this.userLeave ? 'checked' : '';

            if (this.userLeave) { 
            }
            if (!this.userLeave) {
            }
            this.setCookie("COOKIE_USER_LEAVE", this.userJoin); 
        },   

        toggleAutoJoin: function() {
            this.autoJoin = !this.autoJoin;     
            this.cAutoJoin = this.autoJoin ? 'checked' : '';
            if (this.autoJoin) { 
                API.djJoin();
            }
            if (!this.autoJoin) { 
            }
            this.setCookie("COOKIE_AUTO_JOIN", this.autoJoin); 
        },

        toggleFullScreen: function(obj) {
            this.fullScreen = !this.fullScreen;     
            this.cfullScreen = this.fullScreen ? 'checked' : '';
            if (this.fullScreen) {
                radiantScript.fullscreenTrigger();
            }
            if (!this.fullScreen) {
                radiantScript.fullscreenTrigger();
            }
        },

        toggleChatSound: function(obj) {
            this.chatSound = !this.chatSound;     
            this.cchatSound = this.chatSound ? 'checked' : '';
            this.setCookie("COOKIE_CHAT_SOUND", this.chatSound); 
        },

        addChatLog: function(message, cssClass) {
            $('#chat-messages').append('<div class="update ' + cssClass + '">' + message + '</div>');
            $('#chat-messages').scrollTop($('#chat-messages').prop("scrollHeight"));
        },

        updateQueueStatus: function() {            
            if(API.getWaitListPosition() == '0') {
                radiantScript.addChatLog('Get ready ' + this.userInfo.username + ', you\'re about to play!', 'aqua');
                $('#waitlist-button').addClass('blue-bg');          
            }
            else {                      
                $('#waitlist-button').removeClass('blue-bg');                                  
            }
        },

        f_votelggr: function (obj){
            if (radiantScript.mehShow) { 
                if (obj.vote != 1){
                    API.chatLog(obj.user.username + " meh'd this track", true);
                }
            }
        },

        djAdvanced: function(obj) {
            if (radiantScript.autoWoot) { setTimeout(function() { $('#woot').click(); }, 2000); }
            radiantScript.updateQueueStatus();
        },

        queueUpdate: function(obj) {
            if (radiantScript.autoJoin) { 
                    !radiantScript.isInQueue() && radiantScript.joinQueue();
            }
        },

        isInQueue: function(obj) {
            if (radiantScript.autoJoin) { 
                    return -1 !== API.getWaitListPosition();
            }
        },

        onuserJoin: function (obj){
            if (!radiantScript.userJoin) return;  
            radiantScript.addChatLog(obj.username + " just joined the room!", 'aqua');
        },

        onuserLeave: function (obj){
            if (!radiantScript.userLeave) return;  
            radiantScript.addChatLog(obj.username + " just left the room!", 'orange');
        },

        onCommandChat: function (data){
        	var message = data.message.toLowerCase();
        	if(data.type == "message" && data.uid !== API.getUser().id){
	            if ((message.indexOf('!joindisable') >= 0) && API.getUser(data.uid).role > 1 && radiantScript.autoJoin) {
	                API.sendChat("@"+data.un+" Auto Join has been Disabled!");
            		$('#checkbox-autojoin').click();
	            }
	        }
        },

        joinQueue: function(obj) {
            if (radiantScript.autoJoin) { 
                    "is-wait" === $("#dj-button").attr("class") ? $("#dj-button").click() : API.getWaitList().length < 50 && API.djJoin();
            }
        },

        join: function(obj) {
            if (radiantScript.autoJoin) { 
                    radiantScript.joinQueue();
            }
        },

        fullscreenTrigger: function() {
            if (radiantScript.fullScreen) { 
                radiantScript.fullscreen();
                $('#vote').addClass('disabled1');
                $('#radiantscriptBottom').addClass('disabled1');
                $('#playback').addClass('fsenabled3');
                $('#playback-controls').addClass('fsenabled4');
                $('#playback .background').addClass('fsenabled5');
                $('#playback .background img').addClass('fsenabled6');
                $('#DisableFullScreen').removeClass('disabled1');
                $('#radiantscriptRight').addClass('disabled1');
            }
            if (!radiantScript.fullScreen) {
                $('#vote').removeClass('disabled1');
                $('#radiantscriptBottom').removeClass('disabled1');
                $('#playback').removeClass('fsenabled3');
                $('#playback-controls').removeClass('fsenabled4');
                $('#playback .background').removeClass('fsenabled5');
                $('#playback .background img').removeClass('fsenabled6');
                $('#DisableFullScreen').addClass('disabled1');
                $('#radiantscriptRight').removeClass('disabled1');
                $('#vote').removeClass('disabled1'); 
                $('#vote').removeClass('fsenabled'); 
                $(window).trigger('resize');
            }
        },

        fullscreen: function() {
            if (radiantScript.fullScreen) { 
                var a = document.getElementById("playback");
                var b = document.getElementById("playback-container").style.height = document.getElementById("app").style.height;
                var c = document.getElementById("playback-container").style.width = document.getElementById("app").style.width;
                var d = document.getElementById("no-dj");
                var g;

                a.style.height = "", a.style.overflow = "visible";
                document.getElementById("playback-container").style.left = 0, a.style.left = 0;
                d && (d.style.height = b, d.style.width = c, d.style.left = 0);

                window.onresize = function(event) {
                    radiantScript.fullscreen();
                }
                window.dispatchEvent = function(event) {
                    radiantScript.fullscreen();
                }
                window.onclick = function(event) {
                    radiantScript.fullscreen();
                }

                $('#app').on('mouseover', function() {
                    if (radiantScript.fullScreen) { $('#fullscreenDisable').removeClass('disabled1'); 
                    $('#vote').addClass('fsenabled'); 
                    $('#vote').removeClass('disabled1'); };
                }); 
                $('#app').on('mouseout', function() {  
                    if (radiantScript.fullScreen) { $('#fullscreenDisable').addClass('disabled1'); 
                    $('#vote').removeClass('fsenabled'); 
                    $('#vote').addClass('disabled1'); }
                }); 
            }
            
        },

        init: function() {

            this.autoWoot      = this.getCookie('COOKIE_AUTO_WOOT') == 'true' ?  true : false;  
            this.autoJoin      = this.getCookie('COOKIE_AUTO_JOIN') == 'true' ?  true : false;    
            this.fullScreen    = this.getCookie('COOKIE_FULL_SCREEN') == 'true' ?  true : false;
            this.mehShow       = this.getCookie('COOKIE_MEH_SHOW') == 'true' ?  true : false;   
            this.userJoin      = this.getCookie('COOKIE_USER_JOIN') == 'true' ?  true : false;   
            this.userLeave     = this.getCookie('COOKIE_USER_LEAVE') == 'true' ?  true : false;
            this.chatSound     = this.getCookie('COOKIE_CHAT_SOUND') == 'true' ?  true : false;           
            this.cAutoWoot     = this.autoWoot   ? 'checked' : ''; 
            this.cAutoJoin     = this.autoJoin   ? 'checked' : '';   
            this.cfullScreen   = this.fullScreen ? 'checked' : ''; 
            this.cmehShow      = this.mehShow    ? 'checked' : '';   
            this.cuserJoin     = this.userJoin   ? 'checked' : '';   
            this.cuserLeave    = this.userLeave  ? 'checked' : '';
            this.cchatSound    = this.chatSound  ? 'checked' : '';   
            this.userInfo      = API.getUser();

            if(this.autoWoot) { $('#woot').click(); }      
            this.updateQueueStatus();

            API.on(API.ADVANCE, this.djAdvanced); 
            API.on(API.WAIT_LIST_UPDATE, this.queueUpdate);
            API.on(API.UPDATE, this.queueUpdate); 
            API.on(API.VOTE_UPDATE, this.f_votelggr);
            API.on(API.USER_JOIN, this.onuserJoin);
            API.on(API.USER_LEAVE, this.onuserLeave);
            API.on(API.CHAT, this.onCommandChat);

            this.queueUpdate();
            this.fullscreenTrigger();

            $('#now-playing-media').hover(function(){
                $('body').append('<div id="tooltip" style="top:0px;left:550px;"><span>' + API.getMedia().author + ' - ' + API.getMedia().title + '</span><div class="corner"></div></div>');
                },function(){
                $('#tooltip').remove();
            });

            cleanASCII = function(a) {
              var b = a.split("&#");
                  for (var c = 1;c < b.length;c++) {
                  var d = b[c].split(";")[0];
                      a = a.replace("&#" + d + ";",String.fromCharCode(d));
                  }
                  a = a.split('&lt;').join('<').split('&gt;').join('>').split('&amp;').join('&').split('&quot;').join('"').replace(/<(?:.|\n)*?>/gm, '');
                  return a;
                };
            function f_chtlggr (data){
                var str = data.un;
                var ns = str.length;
                var msg = cleanASCII(data.message);
                var log = function () {
                    return console.log.apply(
                        console,
                        ['['+new Date().toISOString().slice(11,-5)+']'].concat(
                            Array.prototype.slice.call(arguments)
                        )
                    );
                };
                switch(data.type){
                     case("message"):
                            log("(" + data.cid + ") (" + data.uid + ")  " + Array(25 - ns).join(" ") + "" + data.un + " : " + msg );
                            break;
                     case("emote"):
                            log("(" + data.cid + ") (" + data.uid + ") " + Array(25 - ns).join(" ") + "" + data.un + " : /me: " + msg );
                            break;
                     case("mention"):
                         log("(" + data.cid + ") (" + data.uid + ") " + Array(25 - ns).join(" ") + "" + data.un + " : " + msg );
                     break;
                }
            }
            API.on(API.CHAT, f_chtlggr);
            // End of chat logger
            API.on(API.CHAT_COMMAND, customCommands);
            function customCommands(value) {
                if (value == '/users') {
                    radiantScript.addChatLog("Right now there are " + API.getUsers().length + " users in the room.", "aqua");
                }
            }
        },

    }           

    radiantScript.init();  
    var plugCubed;
    var content1 = '<section id="radiantscript">\
        <h3 id="rm_button" style="cursor:pointer;">sheebeexo</h3>\
        <p class="version">sheebeexo</p>\
        <div id="rm_menu">\
        <div><p>Auto Woot</p>\
        <div class="onoffswitch">\
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="checkbox-autowoot" ' + radiantScript.cAutoWoot + '>\
            <label class="onoffswitch-label" for="checkbox-autowoot">\
                <div class="onoffswitch-inner"></div>\
                <div class="onoffswitch-switch"></div>\
            </label>\
        </div></div>\
        <div><p>Auto Join</p>\
        <div class="onoffswitch">\
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="checkbox-autojoin" ' + radiantScript.cAutoJoin + '>\
            <label class="onoffswitch-label" for="checkbox-autojoin">\
                <div class="onoffswitch-inner"></div>\
                <div class="onoffswitch-switch"></div>\
            </label>\
        </div></div>\
        <div><p>Show Mehs</p>\
        <div class="onoffswitch">\
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="checkbox-showmehs" ' + radiantScript.cmehShow + '>\
            <label class="onoffswitch-label" for="checkbox-showmehs">\
                <div class="onoffswitch-inner"></div>\
                <div class="onoffswitch-switch"></div>\
            </label>\
        </div></div>\
        <div><p>User Join</p>\
        <div class="onoffswitch">\
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="checkbox-userJoin" ' + radiantScript.cuserJoin + '>\
            <label class="onoffswitch-label" for="checkbox-userJoin">\
                <div class="onoffswitch-inner"></div>\
                <div class="onoffswitch-switch"></div>\
            </label>\
        </div></div>\
        <div><p>User Leave</p>\
        <div class="onoffswitch">\
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="checkbox-userLeave" ' + radiantScript.cuserLeave + '>\
            <label class="onoffswitch-label" for="checkbox-userLeave">\
                <div class="onoffswitch-inner"></div>\
                <div class="onoffswitch-switch"></div>\
            </label>\
        </div></div>\
        <div><p>Chat Tone</p>\
        <div class="onoffswitch">\
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="checkbox-chatSound" ' + radiantScript.cchatSound + '>\
            <label class="onoffswitch-label" for="checkbox-chatSound">\
                <div class="onoffswitch-inner"></div>\
                <div class="onoffswitch-switch"></div>\
            </label>\
        </div></div>\
        <div><p>Fullscreen</p>\
        <div class="onoffswitch">\
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="checkbox-fullscreen" ' + radiantScript.cfullScreen + '>\
            <label class="onoffswitch-label" for="checkbox-fullscreen">\
                <div class="onoffswitch-inner"></div>\
                <div class="onoffswitch-switch"></div>\
            </label>\
        </div></div>\
        </div>\
        <p class="version">' + radiantScript.version + '</p>\

    var content3 = '<div id="playlist-export-button" class="button"><i class="icon icon-export-white"></i></div>';

    var content4 = '<section id="DisableFullScreen" class="disabled1"><div id="fullscreenDisable">Disable Fullscreen</div></section>';


    $('body').prepend('<link rel="stylesheet" type="text/css" id="radiantscript-css" href="https://rawgit.com/Varietyy/scripts/master/radiantscript.css" />');  
    $('#room').append(content1);
    $('#room').append(content2);
    $('#room').append(content3);
    $('#room').append(content4);

    radiantScript.fullscreen();

    $('#checkbox-autowoot').on('click', function() { radiantScript.toggleAutoWoot();  });    
    $('#checkbox-autojoin').on('click', function() { radiantScript.toggleAutoJoin();  }); 
    $('#checkbox-pointwhore').on('click', function() { radiantScript.togglePointWhore();  });
    $('#checkbox-fullscreen').on('click', function() { radiantScript.toggleFullScreen();  }); 
    $('#checkbox-showmehs').on('click', function() { radiantScript.toggleMehShow();  }); 
    $('#checkbox-userLeave').on('click', function() { radiantScript.toggleuserLeave();  }); 
    $('#checkbox-userJoin').on('click', function() { radiantScript.toggleuserJoin();  }); 
    $('#checkbox-chatSound').on('click', function() { radiantScript.toggleChatSound();  }); 

    $('#rmFacebook').on('click', function() { window.open('https://vine.co/');  });
    $('#rmTwitter').on('click', function() { window.open('https://vine.co/');  });
    $('#rmSite').on('click', function() { window.open('https://vine.co/');  });
    $('#rmCmd').on('click', function() { window.open('https://vine.co/');  });
    $('#rmBlacklist').on('click', function() { window.open('https://vine.co/');  });
    $('#rmRules').on('click', function() { window.open('https://vine.co/');  });
    $('#keyshortcuts').on('click', function() { 
    	radiantScript.addChatLog("<u>Keyboard shortcuts:</u>\
    		<br>W = Woot\
            <br>M = Meh<br>G = Grab to current playlist \
    		<br>D = Dashboard\
            <br>C = Chat View\
            <br>U = User View\
    		<br>F = Friend View\
            <br>L = Waitlist View\
    		<br>P = Show Playlists\
    		<br>H = Show History\
    		<br>[SPACE] = Mute Sound\
    		<br>+ = Volume Up +5\
    		<br>- = Volume Down -5\
    		<br>T = Type in Chat\
    		<br>ESC (or TAB) = Get out of Chat", "aqua");
    	if (API.getUser().gRole > 0) { 
    		radiantScript.addChatLog("<u>BA Shortcuts:</u>\
    		<br>Z = Ban selected user\
    		<br>X = Mute selected user\
    		<br>V = Remove selected user from waitlist", "aqua");
    	}
    });
    
    $('#fullscreenDisable').on('click', function() { $('#checkbox-fullscreen').click(); });
    $('#fullscreenDisable').on('mouseover', function() { $('#fullscreenDisable').addClass('highlight'); }); 
    $('#fullscreenDisable').on('mouseout', function() { $('#fullscreenDisable').removeClass('highlight'); });  
    $("#rm_button").click(function(){
    	$("#rm_menu").slideToggle();
    	$("#radiantscriptOther").slideToggle();
	});
	$(document).keypress(function(esc) {
		if ($(':focus').is('input') == true) {
			switch (esc.which) {
				case 27: // esc
					$('#chat-input-field').blur();
					break;
			}
	    }
	});
	$(document).keypress(function(key) {
		if ($(':focus').is('input') == true)
			return;
		if ($('#room-info').css('display') == 'block')
			return;
		switch (key.which) {
			case 32: // Spacebar
				$('#volume > .button').click();
				break;
			case 103: // g
				if ($('#grab.selected').length < 1) {
					$('#grab').click();
					$('.grab > .menu > ul > li > .icon-check-purple').parent().mousedown();
				}
				break;
			case 119: // w
				$('#woot').click();
				break;
			case 109: // m
				$('#meh').click();
				break;
			case 112: // p
				$('#playlist-button').click();
				break;
			case 100: // d
				if($('#dashboard').css('display') === 'block') {
					$('#footer-user > .back').click();
				}
				else $('.item.community.clickable').mousedown();
				break;
			case 117: // u
				$('#users-button').click();
				break;
			case 108: // l
				$('#waitlist-button').click();
				break;
			case 99: // c
				$('#chat-button').click();
				break;
			case 102: // f
				$('#friends-button').click();
				break;
			case 104: // h
				$('#history-button').click();
				break;
			case 116: // t
				$('#chat-input-field').focus();
				break;
			case 43: // +
				API.setVolume(API.getVolume()+5);
				break;
			case 45: // +
				API.setVolume(API.getVolume()-5);
				break;
		    //special functions
			case 122: // z
				if (API.getUser().gRole > 0) { 
					if (isNaN(API.selectedUserID)) return API.chatLog("Please select a user (Click on their username in chat or in userlist)");
					var data = API.getUser(API.selectedUserID);
					API.chatLog("Banning User: "+data.username);
					API.moderateBanUser(data.id, 1, API.BAN.DAY);
				}
				break;
			case 120: // x
				if (API.getUser().gRole > 0) { 
					if (isNaN(API.selectedUserID)) return API.chatLog("Please select a user (Click on their username in chat or in userlist)");
					var data = API.getUser(API.selectedUserID);
					API.chatLog("Muting User: "+data.username);
					API.moderateMuteUser(data.id, 3, API.MUTE.SHORT);
				}
				break;
			case 118: // v
				if (API.getUser().gRole > 0) { 
					if (isNaN(API.selectedUserID)) return API.chatLog("Please select a user (Click on their username in chat or in userlist)");
					var data = API.getUser(API.selectedUserID);
					API.chatLog("Removing User: "+data.username+" from waitlist");
					API.moderateRemoveDJ(data.id);
				}
				break;
			default:
		}
	});
    $(document).on('click', '#chat-messages .from, #user-lists .user', function(e){
        var name = $(this).text().replace(/^\s*|\s*$/g, ''),
            users = API.getUsers(),
            user;

        for(var i = users.length; !user && i--; )
            if(users[i].username == name)
                user = users[i];

        setTimeout(function(){
            if(!$('#user-panel .showID').length){
                $('#user-panel .name').after(
                    $('\
                        <span class="showID"></span>\
                    ').css({
                        'font-size': '11px',
                        position: 'absolute',
                        top: '31px',
                        left: '64px'
                    })
                );
                $('#user-panel .status').css({
                    top: '45px',
                    'font-size': '11px'
                });
            }
            if(user) $('#user-panel .showID').text(user.id || '');
        }, 0);
    });
    $('#audience-canvas').on('mouseover', function(e){
        $('#user-panel .showID').remove();
    });
}
else {
    $('#radiantscript').fadeIn();
    console.log('Radiant Script v' + radiantScript.version + ' already loaded');
    API.chatLog('Radiant Script v' + radiantScript.version + ' already loaded', true);    
}
var userName = API.getUser().username;
var newSound = new Audio("https://code.radiant.dj/chatsound.mp3");
API.on('chat', function(chat){
	chat.message.indexOf('@everyone') > -1 && API.getUser(chat.uid).role > 1 && newSound.play();
    if (!radiantScript.chatSound) return;
    chat.message.indexOf('@' + userName) > -1 && newSound.play();
});
