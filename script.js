/* 
    AntiTroll Script
    By: Brand Ambassador Igor
    http://plug.dj/@/igor
*/

// Variables
var version = "stable 0.2.3",

    // Options
    lockDown = false,
    lockRoom = false,
    chatLog = true,
    dataLog = true,
    ldPerm = 2,

    // Status
    chatCount = 0,
    logCount = 0,
    deleteCount = 0,
    banCount = 0,

    // Moderation
    H = API.BAN.HOUR,
    D = API.BAN.DAY,
    P = API.BAN.PERMA,

    S = API.MUTE.SHORT,
    M = API.MUTE.MEDIUM,
    L = API.MUTE.LONG,

    // Permissions
    perms = [
        ["0", "User", API.ROLE.NONE],
        ["1", "Resident DJ", API.ROLE.RESIDENTDJ],
        ["2", "Bouncer", API.ROLE.BOUNCER],
        ["3", "Manager", API.ROLE.MANAGER],
        ["4", "Host", API.ROLE.COHOST],
        ["8", "Ambassador", API.ROLE.AMBASSADOR],
        ["10", "Admin", API.ROLE.ADMIN]
    ];

// API on
API.on(API.CHAT_COMMAND, chatCommand)
    .on(API.CHAT, chatEvent);

// Callbacks
function chatCommand(value) {
    var res = value.split(" "),
        usr = value.split("@");
    res[0].toLowerCase();

    switch (res[0]) {
        case "/commands":
            addChat("AntiTroll commands: https://github.com/IgorAntun/plug.dj/blob/master/README.md");
            break;

        case "/lockdown":
            if (lockDown && res[1] == undefined) {
                lockDown = false;
                logData("Chat lockdown disabled", true, true);
            } else {
                if (res[1] == "1" || res[1] == "2" || res[1] == "3" || res[1] == "4" || res[1] == "8")
                    ldperm = res[1];
                else
                    ldperm = 2;

                lockDown = true;
                logData("Chat lockdown enabled. Rank needed: " + perms[ldperm][1], true, true);
            }
            break;

        case "/lockroom":
            if (lockRoom) {
                API.moderateLockWaitList(false);
                lockRoom = false;
                logData("Room unlocked", false, true);
            } else {
                API.moderateLockWaitList(true, true);
                if (API.getDJ() != undefined)
                    API.moderateRemoveDJ(API.getDJ().id);
                lockRoom = true;
                logData("Room locked", true, true);
            }
            break;

        case "/mute":
            res[2].toLowerCase();
            if (res[2] == "S" || res[2] == "M" || res[2] == "L")
                API.moderateMuteUser(getUid(res[1]), 5, res[2]);
            else {
                for (var i in usr)
                    API.moderateMuteUser(getUid(usr[i].trim()), 5, M);
            }
            logData(name + " muted", true);
            break;

        case "/unmute":
            API.moderateUnmuteUser(getUid(usr[1]));
            logData(name + " unmuted", true);
            break;

        case "/ban":
            if (name == null)
                logData("User not found", true);
            else {
                for (var i in usr) {
                    API.moderateBanUser(getUid(usr[i].trim()), 4, P);
                    banCount++;
                }
            }
            break;

        case "/kick":
            if (name == null)
                logData("User not found", true);
            else {
                for (var i in usr) {
                    API.moderateBanUser(getUid(usr[i].trim()), 4, H);
                    banCount++;
                }
            }
            break;

        case "/banall":
            for (var i in API.getUsers()) {
                API.moderateBanUser(API.getUsers()[i].id, 4, P);
                banCount++;
            }
            break;

        case "/kickall":
            for (var i in API.getUsers()) {
                API.moderateBanUser(API.getUsers()[i].id, 4, H);
                banCount++;
            }
            break;

        case "/lookup":
            $.ajax({
                type: 'GET',
                url: 'https://plug.dj/_/users/' + res[1]
            }).done(function(user) {
                data = user.data[0];

                addChat("<b>Name:</b> " + data.username + "<br><b>Blurb:</b> " + data.blurb + "<br><b>ID:</b> " + data.id + "<br><b>Level:</b> " + data.level + "<br><b>Avatar:</b> " + data.avatar + "<br><b>Status:</b> " + data.status + "<br><b>Badge:</b> " + data.badge, "#CCCCCC");
            });
            break;

        case "/chatlog":
            if (chatLog) {
                chatLog = false;
                logData("Chat log disabled", true);
            } else {
                chatLog = true;
                logData("Chat log enabled", true);
            }
            break;

        case "/datalog":
            if (dataLog) {
                dataLog = false;
                logData("Data log disabled", true);
            } else {
                dataLog = true;
                logData("Data log enabled", true);
            }
            break;

        case "/clearchat":
            var messages = $('#chat-messages').children();
            for (var i = 0; i < messages.length; i++) {
                for (var j = 0; j < messages[i].classList.length; j++) {
                    if (messages[i].classList[j].indexOf('data-cid=') == 0) {
                        API.sendChat("♥ Chase Cleared The Chat ♥");
                        API.moderateDeleteChat(messages[i].classList[j].substr(4));
                        deleteCount++;
                        break;
                    }
                }
            }
            logData("Clearing chat", true, true);
            break;

        case "/status":
            addChat("<b>LockDown:</b> " + lockDown + "<br><b>LockRoom:</b> " + lockRoom + "<br><b>ChatLog:</b> " + chatLog + "<br><b>DataLog:</b> " + dataLog + "<br><b>Chats:</b> " + chatCount + "<br><b>Deletes:</b> " + deleteCount + "<br><b>Bans:</b> " + banCount, "#CCCCCC");
            break;

        case "/restart":
            shutDown(true);
            break;

        case "/shutdown":
            shutDown(false);
            break;
    }
}

function chatEvent(data) {
    chatCount++;
    if (chatLog)
        console.log("[" + data.timestamp + " | " + data.uid + " | " + data.un + "]: " + data.message);

    if (lockDown) {
        if (!API.hasPermission(data.uid, perms[ldperm][2])) {
            API.moderateDeleteChat(data.cid);
            deleteCount++;
        }
    }
}

// Functions
function getUid(name) {
    var users = API.getUsers();
    for (var i in users)
        if (users[i].username == name)
            return users[i].id;
    return null;
}

function getName(uid) {
    var users = API.getUsers();
    for (var i in users)
        if (users[i].id == uid)
            return users[i].username;
    return null;
}

function logData(data, log, chat) {
    if (dataLog) console.log("[AntiTroll] " + data);
    if (log) addChat(data);
    if (chat) API.sendChat("/me " + data);
}

function addChat(text, color, icon) {
    var chat = $('#chat-messages'),
        a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;

    if (color == undefined)
        color = "#9fee00";

    if (icon != undefined)
        chat.append("<div class='update antitroll-update' style='border-left: solid 3px " + color + "; background-image: url(" + icon + "); background-repeat: no-repeat; background-position: 5px center'><span class='antitroll-text' style='color: " + color + "'>" + text + "</span></div>");
    else
        chat.append("<div class='update antitroll-update' style='border-left: solid 3px " + color + "'><span class='antitroll-text' style='color: " + color + "'>" + text + "</span></div>");

    if (a)
        chat.scrollTop(chat[0].scrollHeight);
    if (chat.children().length >= 512)
        chat.children().first().remove();
}

logData("AntiTroll Script " + version + " loaded");
addChat("Chase's Script " + version + " loaded", undefined, "http://i.imgur.com/grVeNnR.png");

function shutDown(restart) {
    API.off(API.CHAT_COMMAND, chatCommand)
        .off(API.CHAT, chatEvent);

    if (restart == true) {
        logData("Restarting script", true, false);

        setTimeout(function() {
            $.getScript('https://raw.githubusercontent.com/IgorAntun/antitroll-script/master/antitroll_beta.js');
        }, 1500);
    } else
        logData("Script unloaded", true, false);
}
