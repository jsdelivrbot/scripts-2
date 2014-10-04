if (API.enabled && $("#radiantscript-css").length <= 0) {
 
    var radiantScript = {
 
        version     : "0.9.999 alpha",
        autoWoot    : true,
        cAutoWoot   : '',
        autoJoin    : true,
        cAutoJoin   : '',
        fullScreen  : false,
        cfullScreen : '',
        mehShow     : true,
        cmehShow    : '',
 
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
 
        addChatLog: function(message, cssClass) {
            $('#chat-messages').append('<div class="update ' + cssClass + '">' + message + '</div>');
            $('#chat-messages').scrollTop($('#chat-messages').prop("scrollHeight"));
        },
 
        playChatSound: function() {
            document.getElementById('chat-sound').playChatSound();
        },
 
        playMentionSound: function() {
            document.getElementById('chat-sound').playMentionSound();
        },
 
        updateQueueStatus: function() {            
            if(API.getWaitListPosition() == '0') {
                radiantScript.addChatLog('Get ready ' + this.userInfo.username + ', you\'re about to play!', 'aqua');
                $('#waitlist-button').addClass('blue-bg');    
                radiantScript.playChatSound();  
                radiantScript.playMentionSound();          
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
            radiantScript.hyperSpace();
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
 
 
        hyperSpace: function() {
            var FIREFOX = /Firefox/i.test(navigator.userAgent);
            if (FIREFOX) return;
            $('#yt-frame').each(function(i){
                var ytSrc = this.src;
                if(ytSrc.indexOf('/_/balls') >= 0){
                    $(this).attr('src', 'https://code.radiant.dj/hyperspace');
                }
                    else if(ytSrc.indexOf('/_/abstract') >= 0){
                    $(this).attr('src', 'https://code.radiant.dj/hyperspace_1');
                }
            });
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
 
            this.autoWoot    = this.getCookie('COOKIE_AUTO_WOOT') == 'true' ?  true : false;  
            this.autoJoin    = this.getCookie('COOKIE_AUTO_JOIN') == 'true' ?  true : false;    
            this.fullScreen  = this.getCookie('COOKIE_FULL_SCREEN') == 'true' ?  true : false;
            this.mehShow     = this.getCookie('COOKIE_MEH_SHOW') == 'true' ?  true : false;          
            this.cAutoWoot   = this.autoWoot   ? 'checked' : '';
            this.cAutoJoin   = this.autoJoin   ? 'checked' : '';  
            this.cfullScreen = this.fullScreen ? 'checked' : '';
            this.cmehShow    = this.mehShow ? 'checked' : '';  
            this.userInfo    = API.getUser();
 
            if(this.autoWoot) { $('#woot').click(); }      
            this.updateQueueStatus();
 
            API.on(API.ADVANCE, this.djAdvanced);
            API.on(API.WAIT_LIST_UPDATE, this.queueUpdate);
            API.on(API.UPDATE, this.queueUpdate);
            API.on(API.VOTE_UPDATE, this.f_votelggr);
 
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
 
    console.log('Loaded Exécito da zoeira v' + radiantScript.version);      
    radiantScript.addChatLog('Exécito da zoeira Script v' + radiantScript.version, 'aqua');
    radiantScript.addChatLog('Updated just edited and modified by !Cret?n?)', 'orange');
    API.chatLog('plugCubed not included!',true);  
    radiantScript.init();  
    var plugCubed;
    var content1 = '<section id="radiantscript">\
       <h3>Variety [TRNT]</h3>\
       <p class="version">Script edited by Variety</p>\
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
       <div><p>Fullscreen</p>\
       <div class="onoffswitch">\
           <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="checkbox-fullscreen" ' + radiantScript.cfullScreen + '>\
           <label class="onoffswitch-label" for="checkbox-fullscreen">\
               <div class="onoffswitch-inner"></div>\
               <div class="onoffswitch-switch"></div>\
           </label>\
       </div></div>\
       <p class="version">version ' + radiantScript.version + '</p>\
   </section>';
    var content2 = '<section id="radiantscriptOther">\
   <div><p id="rmFacebook" class="rmLinks">TRNT Facebook</p></div>\
   <div><p id="rmTwitter" class="rmLinks">TRNT Twitter</p></div>\
   <div><p id="rmSite" class="rmLinks">TRNT Website</p></div>\
   <div><p id="rmRules" class="rmLinks">TRNT Rules</p></div>\
   <div><p id="rmCmd" class="rmLinks">Twerkbot Cmds</p></div>\
   <div><p id="rmBlacklist" class="rmLinks">OP List</p></div>\
   </section>';
 
    var content3 = '<div id="playlist-export-button" class="button"><i class="icon icon-export-white"></i></div>';
 
    var content4 = '<section id="DisableFullScreen" class="disabled1"><div id="fullscreenDisable">Disable Fullscreen</div></section>';
 
 
    $('body').prepend('<link rel="stylesheet" type="text/css" id="radiantscript-css" href="https://rawgit.com/Varietyy/nomeh/master/radiantscript.css" />');  
    $('#room').append(content1);
    $('#room').append(content2);
    $('#room').append(content3);
    $('#room').append(content4);
 
    radiantScript.fullscreen();
    radiantScript.hyperSpace();
 
    $('#checkbox-autowoot').on('click', function() { radiantScript.toggleAutoWoot();  });    
    $('#checkbox-autojoin').on('click', function() { radiantScript.toggleAutoJoin();  });
    $('#checkbox-pointwhore').on('click', function() { radiantScript.togglePointWhore();  });
    $('#checkbox-fullscreen').on('click', function() { radiantScript.toggleFullScreen();  });
    $('#checkbox-showmehs').on('click', function() { radiantScript.toggleMehShow();  });
 
    $('#rmFacebook').on('click', function() { window.open('http://facebook.com/TRNTrecords');  });
    $('#rmTwitter').on('click', function() { window.open('http://twitter.com/TRNTrecords');  });
    $('#rmSite').on('click', function() { window.open('http://TRNTrecords.com');  });
    $('#rmCmd').on('click', function() { window.open('http://git.io/245Ppg');  });
    $('#rmBlacklist').on('click', function() { window.open('http://goo.gl/EANOvG');  });
    $('#rmRules').on('click', function() { window.open('http://goo.gl/UTIHVp');  });
   
    $('#fullscreenDisable').on('click', function() { $('#checkbox-fullscreen').click(); });
    $('#fullscreenDisable').on('mouseover', function() { $('#fullscreenDisable').addClass('highlight'); });
    $('#fullscreenDisable').on('mouseout', function() { $('#fullscreenDisable').removeClass('highlight'); });  
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
    $('.slideout-menu-toggle').on('click', function(event){
        event.preventDefault();
        // create menu variables
        var slideoutMenu = $('.slideout-menu');
        var slideoutMenuWidth = $('.slideout-menu').width();
       
        // toggle open class
        slideoutMenu.toggleClass("open");
       
        // slide menu
        if (slideoutMenu.hasClass("open")) {
            slideoutMenu.animate({
                left: "0px"
            });
        } else {
            slideoutMenu.animate({
                left: -slideoutMenuWidth
            }, 250);    
        }
    });
   
}
else {
    $('#radiantscript').fadeIn();
    console.log('Radiant Script v' + radiantScript.version + ' already loaded');
    API.chatLog('Radiant Script v' + radiantScript.version + ' already loaded', true);    
}

function afkchat(data) {
      setTimeout(function(){API.sendChat("Turn up!");}, 30000);
}
 
API.on(API.ADVANCE, afkchat);
