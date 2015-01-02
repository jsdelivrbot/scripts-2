 !
 function () {
     var a = {
         attr: {
             aw: !0,
             aj: !1,
             fs: !1,
             hv: !1,
             sm: !1,
             sg: !1,
             uuj: !1,
             uul: !1,
             fj: !1,
             mbg: !1,
             ci: !1,
             ag: !1,
             sc: !1,
             id: !1,
             pc: !0,
             ct: !0,
             oc: !1,
             gm: !0,
             ml: 0,
             hc: !1,
             ul: {
                 on: !1,
                 ol: 1
             },
             afk: {
                 on: !1,
                 msg: ''
             },
             eta: {
                 on: !0
             },
             lng: {
                 def: null
             },
             snd: {
                 dlc: -1
             },
             pos: {
                 op: null,
                 bg: null,
                 ul: null
             },
             chatColors: {
                 you: 'FFDD6F',
                 admin: '42A5DC',
                 ba: '89BE6C',
                 host: 'ac76ff',
                 cohost: 'ac76ff',
                 manager: 'ac76ff',
                 bouncer: 'ac76ff',
                 resdj: 'ac76ff',
                 normal: '777f92'
             }
         },
         tmp: {
             version: '2.1.6.16',
             script: 'https://dl.dropboxusercontent.com/s/27y8jr4skqwb5p7/OrigemScript.js',
             css: 'https://dl.dropboxusercontent.com/s/ha2h0nqi1v50kga/OrigemCSS.css',
             pbgp: 'https://cdn.plug.dj/_/static/images/community/custom/2014winter/videoframe.9315d245fd149d1b8bc62d371a80f3664bbe348e.png',
             pbg: null,
             emotes: {},
             url: document['location']['pathname']['substring'](1),
             overridecss: !1,
             pl: [],
             hist: [],
             ag: !1,
             plsel: null,
             focus: !0,
             context: !1,
             pm: {
                 ids: [],
                 lspm: 0,
                 lspmall: 0
             },
             eta: {
                 med: 0,
                 str: ''
             },
             dc: {
                 wl: [],
                 dcs: []
             },
             lng: {
                 av: {},
                 sel: []
             },
             team: {
                 obj: [],
                 tmp: []
             },
             afk: {
                 ls: null,
                 pm: {}
             },
             control: {
                 grab: [],
                 meh: []
             },
             dlpl: {
                 cont: 0,
                 sc: 0,
                 plcont: 0,
                 icont: 0,
                 pl: [],
                 fmt: 'csv'
             },
             itens: null
         },
         ti: {
             eta: 0,
             rm: 0
         },
         misc: {
             events: {
                 resize: function () {
                     a['attr']['fs'] && a['gui']['util']['fullScreen'](), $('#plugbot-userlist')['css']('max-height', $('#app')['height']() - 193 + 'px');
                     try {
                         $('#plugbot-userlist')['getNiceScroll']()['resize']()
                     } catch (b) {}
                     a['gui']['util']['fixMenuLocation']()
                 },
                 focusin: function () {
                     a['tmp']['focus'] = !0
                 },
                 focusout: function () {
                     a['tmp']['focus'] = !1
                 }
             }
         },
         gui: {
             control: {
                 lockdrag: !1
             },
             pg: {
                 len: 4,
                 now: 1,
                 lock: !1
             },
             events: {
                 aw: function () {
                     a['attr']['aw'] = $(this)['prop']('checked'), a['attr']['aw'] && $('#woot')['click'](), a['storage']['save']()
                 },
                 aj: function () {
                     a['attr']['aj'] = $(this)['prop']('checked'), a['attr']['aj'] && a['util']['joinQueue'](), a['storage']['save']()
                 },
                 sm: function () {
                     a['attr']['sm'] = $(this)['prop']('checked'), a['storage']['save']()
                 },
                 sg: function () {
                     a['attr']['sg'] = $(this)['prop']('checked'), a['storage']['save']()
                 },
                 fj: function () {
                     a['attr']['fj'] = $(this)['prop']('checked'), a['storage']['save']()
                 },
                 uuj: function () {
                     a['attr']['uuj'] = $(this)['prop']('checked'), a['storage']['save']()
                 },
                 uul: function () {
                     a['attr']['uul'] = $(this)['prop']('checked'), a['storage']['save']()
                 },
                 hv: function () {
                     a['attr']['hv'] = $(this)['prop']('checked'), a['attr']['hv'] ? $('#playback')['slideUp']() : $('#playback')['slideDown'](), a['storage']['save']()
                 },
                 fs: function () {
                     a['gui']['util']['remfs'](), a['attr']['fs'] = $(this)['prop']('checked');
                     var b = $('#dj-button'),
                         c = $('#avatars-container');
                     a['attr']['fs'] ? (b['hide'](), c['hide']()) : (b['show'](), c['show']()), a['attr']['fs'] && a['gui']['util']['fullScreen'](), a['storage']['save']()
                 },
                 npg: function () {
                     if (!a['gui']['pg']['lock']) {
                         var b = a['gui']['pg']['now'],
                             c = a['gui']['pg']['now'] = a['gui']['pg']['now'] == a['gui']['pg']['len'] ? 1 : ++a['gui']['pg']['now'];
                         a['gui']['pg']['lock'] = !0, $('.page' + b)['slideUp'](400, function () {
                             $('.page' + c)['slideDown'](400, function () {
                                 a['gui']['pg']['lock'] = !1
                             })
                         })
                     }
                 },
                 tmm: function () {
                     if (!a['gui']['control']['lockdrag']) {
                         var b = $('#ow-visible');
                         b['css']('display') == 'block' ? b['slideUp']() : b['slideDown']()
                     }
                 },
                 tul: function () {
                     a['attr']['ul']['on'] = $(this)['prop']('checked'), a['attr']['ul']['on'] ? (a['util']['ul']['userListSort'](), $('#plugbot-userlist')['slideDown']()) : $('#plugbot-userlist')['slideUp'](400, function () {
                         $('#list-users')['remove']()
                     }), a['storage']['save']()
                 },
                 tmb: function () {
                     a['attr']['mbg'] = $(this)['prop']('checked'), a['attr']['mbg'] ? $('#origemscriptOther')['slideDown']() : $('#origemscriptOther')['slideUp'](), a['storage']['save']()
                 },
                 tbg: function (a) {
                     $('.room-background')['css']('background-image', 'url(' + a + ')')
                 },
                 tafk: function () {
                     a['attr']['afk']['on'] = $(this)['prop']('checked'), a['tmp']['afk']['ls'] = 0, a['tmp']['afk']['pm'] = {}, a['storage']['save']()
                 },
                 tol: function (b) {
                     a['attr']['ul']['ol'] = b, a['util']['ul']['userListSort'](), a['storage']['save']()
                 },
                 tci: function () {
                     a['attr']['ci'] = $(this)['prop']('checked'), a['storage']['save']()
                 },
                 afktifo: function () {
                     a['attr']['afk']['msg'] = $('#afkmessage')['val'](), a['storage']['save']()
                 },
                 bgtifo: function () {
                     var b = $('#bgurl')['val']()['trim']();
                     return b ? (0 == b['indexOf']('http') && (a['attr']['bg'] = b, a['gui']['events']['tbg'](a['attr']['bg']), a['storage']['save']()), void 0) : (a['attr']['bg'] = b, a['storage']['save'](), void 0)
                 },
                 bc: function (b) {
                     $('.room-background')['css']('background-image', 'url(' + b['data']['bg'] + ')'), a['attr']['bg'] = b['data']['bg'] == a['tmp']['itens']['bgs'][0] ? '' : b['data']['bg'], a['storage']['save']()
                 },
                 tsc: function () {
                     a['attr']['sc'] = $(this)['prop']('checked'), a['storage']['save'](), a['util']['gui']['applyStaffColors'](a['attr']['sc'])
                 },
                 toul: function (b) {
                     a['attr']['ul']['ol'] = b, a['util']['ul']['userListSort'](), a['storage']['save']()
                 },
                 pc: function () {
                     a['attr']['pc'] = $(this)['prop']('checked'), a['attr']['pc'] ? (a['socket']['stop'] = !1, a['socket']['init']()) : (a['socket']['stop'] = !0, a['socket']['session']['close']()), a['storage']['save']()
                 },
                 id: function () {
                     a['attr']['id'] = $(this)['prop']('checked'), a['storage']['save']()
                 },
                 ct: function () {
                     a['attr']['ct'] = $(this)['prop']('checked'), a['attr']['ct'] ? a['util']['room']['refreshCustomSettings']() : a['util']['room']['removeCustomSettings'](), a['storage']['save']()
                 },
                 toc: function () {
                     a['attr']['oc'] = $(this)['prop']('checked'), a['util']['room']['refreshChatTheme'](), a['storage']['save']()
                 },
                 gm: function () {
                     a['attr']['gm'] = $(this)['prop']('checked'), a['storage']['save']()
                 },
                 hc: function () {
                     a['attr']['hc'] = $(this)['prop']('checked'), a['attr']['hc'] && a['util']['history']['getHistory'](), a['storage']['save']()
                 },
                 maxLength: function (b) {
                     a['attr']['ml'] = parseInt(isNaN(b) ? $(this)['val']() : b), isNaN(b) || $('#slider-maxLength')['val'](a['attr']['ml']), 0 === a['attr']['ml'] ? $('#origem-slider-maxLength-value')['html']('off') : $('#origem-slider-maxLength-value')['html'](a['util']['getTimeString'](a['attr']['ml'])['substring'](3)), a['storage']['save']()
                 },
                 eta: function () {
                     a['attr']['eta']['on'] = $(this)['prop']('checked'), a['util']['eta']['getMed'](), a['util']['eta']['threadUpdate'](), a['storage']['save']()
                 },
                 toggleMenu: function () {
                     $('.origem-menu-container')['css']('display') === 'block' ? $('.origem-menu-container')['animate']({
                         width: '0px'
                     }, 400, 'swing', function () {
                         $('.origem-menu-container')['css']({
                             display: 'none'
                         })
                     }) : ($('.origem-menu-container')['css']({
                         width: '0px',
                         display: 'block'
                     }), $('.origem-menu-container')['animate']({
                         width: '250px'
                     }, 400))
                 },
                 toggleSubmenu: function (a) {
                     var b = $('.origem-submenu-opener.active');
                     if ($('.origem-submenu-opener')['removeClass']('active'), $('.origem-menu-subcontainer')['removeClass']('active'), !(b['length'] > 0 && b['attr']('data-target') === a)) {
                         var c = $('.origem-submenu-opener[data-target=' + a + ']');
                         $(c)['addClass']('active'), $('.origem-menu-submenu')['css']('display', 'none'), $('#origem-submenu-' + a)['css']('display', 'block'), $('.origem-menu-subcontainer')['addClass']('active')
                     }
                 },
                 updatePage: function () {
                     var a = $('#origem-menu-page-selector')['val']();
                     $('.origem-submenu-opener')['removeClass']('active'), $('.origem-menu-subcontainer')['removeClass']('active'), $('.origem-menu-page-visible')['removeClass']('origem-menu-page-visible'), $('#origem-menu-page-' + a)['addClass']('origem-menu-page-visible')
                 },
                 updateColorSelector: function (b) {
                     var c = $('#origem-color-' + b)['val'](),
                         d = $('#origem-color-label-' + b);
                     d['css']('color', '#' + c), a['attr']['chatColors'][b] = c, a['storage']['save'](), a['gui']['util']['generateColorCss']()
                 }
             },
             util: {
                 fixMenuLocation: function () {
                     var a = $('#plugcubed')['length'] > 0 ? 108 : 54,
                         b = parseInt($('#now-playing-bar')['css']('left')['substr'](0, $('#now-playing-bar')['css']('left')['length'] - 2)) - (54 + a),
                         c = b - 87;
                     $('#room-bar')['css']('width', b + 'px'), $('#room-name')['css']('width', c + 'px'), $('.origem-menu-opener')['css']('left', a + 'px')
                 },
                 remfs: function () {
                     $('#tp-fs')['remove'](), $('#tp-fs-hv')['remove']()
                 },
                 fullScreen: function () {
                     a['gui']['util']['remfs']();
                     var b = $('.app-right')['position']()['left'],
                         c = $('.app-right')['height'](),
                         d = $('#footer')['position']()['top'] - $('#vote')['height'](),
                         e = (b - $('#playback-controls')['width']()) / 2,
                         f = 'tp-fs';
                     f = f['replace'](/\{VW\}/, b)['replace'](/\{VH\}/, c)['replace'](/\{VT\}/, d)['replace'](/\{CT\}/, e);
                     var g = 'tp-fs-hv';
                     $('head')['append'](f), a['attr']['hv'] || $('head')['append'](g)
                 },
                 pages: {},
                 addMenu: function () {
                     $('<div>')['addClass']('origem-menu-opener')['append']('origem-menu-icon')['appendTo']('#app'), a['gui']['util']['fixMenuLocation']();
                     var c = $('<div>')['addClass']('origem-menu-container')['appendTo']('#app'),
                         d = $('<div>')['addClass']('origem-menu-heading origem-menu-section')['html']('owtitle' + a['util']['chat']['parseLang']('subtitle') + 'title-variant')['appendTo'](c),
                         e = $('<div>')['attr']('id', 'origem-menu-close')['appendTo'](d);
                     $('<i>')['addClass']('icon icon-arrow-left')['appendTo'](e);
                     var g = $('<div>')['addClass']('origem-menu-pages origem-menu-section')['appendTo'](c);
                     $('<select>')['attr']('id', 'origem-menu-page-selector')['appendTo'](g), $('<div>')['addClass']('origem-menu-subcontainer')['appendTo'](c), a['gui']['util']['addMenuPage']('tools', a['util']['chat']['parseLang']('ow-tools')), a['gui']['util']['addMenuPage']('visuals', a['util']['chat']['parseLang']('ow-cust')), a['gui']['util']['addMenuPage']('staff', a['util']['chat']['parseLang']('ow-stafftools')), a['gui']['util']['addSubMenu']('backgrounds', a['util']['chat']['parseLang']('backgrounds')), a['gui']['util']['addSubMenu']('chatcolors', a['util']['chat']['parseLang']('chatcolors')), a['gui']['util']['addChatColorMenu'](), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('aw'), 'autowoot', a['attr']['aw']), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('aj'), 'autojoin', a['attr']['aj']), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('uuj'), 'userJoin', a['attr']['uuj']), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('uul'), 'userLeave', a['attr']['uul']), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('fj'), 'friendJoin', a['attr']['fj']), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('fs'), 'fullscreen', a['attr']['fs']), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('hv'), 'hidevideo', a['attr']['hv']), a['gui']['util']['addMenuSeperator']('tools'), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('afkResp'), 'afk', a['attr']['afk']['on']), a['gui']['util']['addTextMenuItem']('tools', 'afkmessage', a['util']['chat']['parseLang']('afkTextF'), a['attr']['afk']['msg']), a['gui']['util']['addMenuSeperator']('tools'), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('pc'), 'privateChat', a['attr']['pc']), a['gui']['util']['addCheckboxMenuItem']('tools', a['util']['chat']['parseLang']('id'), 'infoDJ', a['attr']['id']), a['gui']['util']['addCheckboxMenuItem']('visuals', a['util']['chat']['parseLang']('shwUsrs'), 'userlist', a['attr']['ul']['on']), a['gui']['util']['addDropdownMenuItem']('visuals', a['util']['chat']['parseLang']('orderBy'), 'userlist-order', [{
                         value: 0,
                         text: a['util']['chat']['parseLang']('default')
                     }, {
                         value: 1,
                         text: a['util']['chat']['parseLang']('waitList')
                     }], a['attr']['ul']['ol']), a['gui']['util']['addSubmenuOpenerMenuItem']('visuals', a['util']['chat']['parseLang']('mbg'), 'backgrounds'), a['gui']['util']['addSubmenuOpenerMenuItem']('visuals', a['util']['chat']['parseLang']('chatcolors'), 'chatcolors'), a['gui']['util']['addButtonMenuItem']('visuals', a['util']['chat']['parseLang']('emotes'), 'owEmotes'), a['gui']['util']['addCheckboxMenuItem']('visuals', a['util']['chat']['parseLang']('chtImgs'), 'chatimg', a['attr']['ci']), a['gui']['util']['addCheckboxMenuItem']('visuals', a['util']['chat']['parseLang']('ct'), 'customTheme', a['attr']['ct']), a['gui']['util']['addCheckboxMenuItem']('visuals', a['util']['chat']['parseLang']('oc'), 'oldChat', a['attr']['oc']), a['gui']['util']['addCheckboxMenuItem']('visuals', a['util']['chat']['parseLang']('gm'), 'groupMessage', a['attr']['gm']), a['gui']['util']['addCheckboxMenuItem']('visuals', a['util']['chat']['parseLang']('eta'), 'eta', a['attr']['eta']['on']), a['gui']['util']['addCheckboxMenuItem']('staff', a['util']['chat']['parseLang']('hc'), 'histcheck', a['attr']['hc']), a['gui']['util']['addCheckboxMenuItem']('staff', a['util']['chat']['parseLang']('sm'), 'showmehs', a['attr']['sm']), a['gui']['util']['addCheckboxMenuItem']('staff', a['util']['chat']['parseLang']('sg'), 'usergrab', a['attr']['sg']), a['gui']['util']['addMenuSeperator']('staff'), a['gui']['util']['addButtonMenuItem']('staff', a['util']['chat']['parseLang']('ls'), 'lockskip'), a['gui']['util']['addButtonMenuItem']('staff', a['util']['chat']['parseLang']('skpdj'), 'skipdj'), a['gui']['util']['addButtonMenuItem']('staff', a['util']['chat']['parseLang']('remdj'), 'remdj'), a['gui']['util']['addButtonMenuItem']('staff', a['util']['chat']['parseLang']('clrcht'), 'clearchat'), a['gui']['util']['addMenuSeperator']('staff'), a['gui']['util']['addSliderMenuItem']('staff', a['util']['chat']['parseLang']('max_len'), 'slider-maxLength', 600, a['attr']['ml'])
                 },
                 addSubMenu: function (b, c) {
                     a['gui']['util']['pages'][b] = $('<div>')['addClass']('origem-menu-submenu')['attr']('id', 'origem-submenu-' + b)['appendTo']($('.origem-menu-subcontainer')), $('<div>')['addClass']('origem-submenu-heading')['html'](c)['appendTo'](a['gui']['util']['pages'][b])
                 },
                 addMenuPage: function (b, c) {
                     $('#origem-menu-page-selector')['append']('\', \'' + b + '</option>' + c + 'origem-menu-page-'), a['gui']['util']['pages'][b] = $('<div>')['addClass']('keys')['attr']('id', 'origem-menu-page' + b)['appendTo']($('.origem-menu-container')), 1 === Object['origem-menu-element origem-submenu-opener'](a['gui']['util']['pages'])['length'] && a['gui']['util']['pages'][b]['addClass']('origem-menu-page-visible')
                 },
                 addSubmenuOpenerMenuItem: function (b, c, d) {
                     var e = $('<div>')['addClass']('arrowicon')['attr']('data-target', d)['appendTo'](a['gui']['util']['pages'][b]),
                         c = $('<div>')['html'](c)['appendTo'](e);
                     $('<div>')['addClass']('toggleSubmenu')['appendTo'](e), $(e)['on']('click', function () {
                         a['gui']['events']['<p>'](d)
                     })
                 },
                 addSliderMenuItem: function (b, c, d, e, f) {
                     var g = 0 === f ? 'off' : a['util']['getTimeString'](f)['substring'](3),
                         h = $('<div>')['addClass']('origem-')['append']('</p>' + c + 'origem-menu-element')['appendTo'](a['gui']['util']['pages'][b]);
                     $('<div>')['addClass']('\', \'')['attr']('id', '-value' + d + 'origem-slider-value')['html'](g)['appendTo'](h), $('<div>')['addClass'](', ')['append']('range' + d + '\', \'' + e + '\', ' + f + '</option>')['appendTo'](h)
                 },
                 addCheckboxMenuItem: function (b, c, d, e) {
                     var f = $('<div>')['addClass'](', ')['appendTo'](a['gui']['util']['pages'][b]),
                         g = $(', ')['attr'](', ', ', ' + d)['html'](c)['appendTo'](f);
                     $(', \'<span class=')['attr'](', ', ', ')['attr'](', ', d)['attr']('id', ', ' + d)['prop']('checked', e)['appendTo'](g), g['append']('>\', ')
                 },
                 addButtonMenuItem: function (b, c, d) {
                     var e = $('<div>')['addClass']('origem-')['appendTo'](a['gui']['util']['pages'][b]);
                     $('<div>')['addClass'](', ')['attr']('id', d)['html'](c)['appendTo'](e)
                 },
                 addCustomMenuItem: function (b, c) {
                     $(c)['appendTo'](a['gui']['util']['pages'][b])
                 },
                 addDropdownMenuItem: function (b, c, d, e, f) {
                     for (var i, g = $('<div>')['addClass']('origem-')['addClass'](', ')['append']('</p>' + c + 'origem-menu-element')['appendTo'](a['gui']['util']['pages'][b]), h = $('<select>')['attr']('id', d)['appendTo'](g), j = 0; j < e['length']; j++) i = $(', ')['attr'](', ', e[j][', '])['html'](e[j][', '])['appendTo'](h), e[j][', '] === f && i['attr'](', ', !0)
                 },
                 addTextMenuItem: function (b, c, d, e) {
                     e = e ? e : '';
                     var f = $('<div>')['addClass']('origem-')['addClass'](', ')['appendTo'](a['gui']['util']['pages'][b]);
                     $(', \'<span class=')['attr']('id', c)['attr'](', ', d)['val'](e)['appendTo'](f)
                 },
                 addMenuSeperator: function (b) {
                     $('<div>')['addClass'](', ')['appendTo'](a['gui']['util']['pages'][b])
                 },
                 addChatColorMenu: function () {
                     a['gui']['util'][', ']('chatcolors', ', ', a['util']['chat']['parseLang'](', '), 'FFDD6F'), a['gui']['util'][', ']('chatcolors', ', ', a['util']['chat']['parseLang'](', '), ', '), a['gui']['util'][', ']('chatcolors', ', ', a['util']['chat']['parseLang'](', '), ', '), a['gui']['util'][', ']('chatcolors', ', ', a['util']['chat']['parseLang'](', '), ', '), a['gui']['util'][', ']('chatcolors', ', ', a['util']['chat']['parseLang'](', '), ', '), a['gui']['util'][', ']('chatcolors', ', ', a['util']['chat']['parseLang'](', '), ', '), a['gui']['util'][', ']('chatcolors', ', ', a['util']['chat']['parseLang'](', '), ', '), a['gui']['util'][', ']('chatcolors', ', ', a['util']['chat']['parseLang'](', '), '89BE6C')
                 },
                 addChatColorSelectorItem: function (b, c, d, e) {
                     var f = $('<div>')['addClass'](', ')['appendTo'](a['gui']['util']['pages'][b]);
                     $(', ')['attr']('id', ', ' + c)['attr'](', ', c)['css']('color', '#' + a['attr']['chatColors'][c])['html'](d)['appendTo'](f), $(', \'<span class=')['attr']('id', ', ' + c)['val'](a['attr']['chatColors'][c])['attr'](', ', c)['appendTo'](f), $('<div>')['addClass'](', ')['attr'](', ', e)['appendTo'](f)
                 },
                 updMenuTitle: function () {
                     var b = '',
                         c = ', ';
                     try {
                         b = a['tmp']['itens'][', '][window['location']['pathname']['substring'](1)][', '] || c
                     } catch (d) {}
                     b = b || c, $(', \'<div class=')[', '](b)
                 },
                 addListBg: function () {
                     var b = ' style=' + (a['attr']['bg'] || '') + '>\r							<input id=' + a['util']['chat']['parseLang'](' type=') + ' value=';
                     b += ' placeholder=';
                     for (var c = 1; c < a['tmp']['itens']['bgs']['length']; c++) b += 'bgTextF' + (c - 1) + ' maxlength=' + a['util']['chat']['parseLang'](' size=') + '>\', \'<div><p id=' + c + ' class=';
                     a['gui']['util'][' class=']('backgrounds', b + '>Default BG</p></div>\', \'<div><p id=')
                 },
                 addHeadUL: function () {
                     var b = '>\', ' + (a['attr'][', ']['ul'] && a['attr'][', ']['ul']['top'] ? a['attr'][', ']['ul']['top'] : 55) + 'px',
                         c = (a['attr'][', ']['ul'] && a['attr'][', ']['ul']['left'] ? ', ' + a['attr'][', ']['ul']['left'] : ', ') + 'px',
                         d = ', ' + (a['attr']['ul']['on'] ? 'block' : 'none'),
                         e = ', ' + b + ', ' + c + ', ' + d + ', ';
                     $(', ')['append'](e), $('#plugbot-userlist')['css']('max-height', $('#app')['height']() - 193 + 'px')
                 },
                 addButtonPm: function (a) {
                     var b = null == a ? !0 : !1;
                     a = a || ', ';
                     var c = JSON[' style=']($(' tabindex=')[', \'<div id=']()['length']);
                     $('\r					class=' + c + ')')['append'](';' + a + '>\r					<div id=' + (b ? '><table border=' : 'width=' + a + 'cellspacing=') + 'cellpadding='), $('\r					class=' + c + ')')['align='](function () {
                         return $(this)['width=']('><tbody><tr><td rowspan=')['css']('display', 'block')
                     }), $('\r					class=' + c + ')')['valign='](function () {
                         return $(this)['width=']('><tbody><tr><td rowspan=')['css']('display', 'none')
                     })
                 },
                 menuInfo: {
                     OIonSettingsClick: function () {
                         $('>&nbsp;OrigemWoot</a></div></td></tr></tbody></table></div></div>\', ')['html'](' class=' + '>+</td><td colspan=' + '><div class=' + a['gui']['util']['style='].OIgetSettingsHtml() + '>Default BG</p></div>\', \'<div><p id=' + '>\r					<a class=' + '>Default BG</p></div>\', \'<div><p id=')['show']()
                     },
                     OIgetSettingsHtml: function () {
                         return ', ' + ', ' + ', ' + ', ' + a['util']['chat']['parseLang'](', \'<div id=') + ' class=' + ', ' + ' style=' + ', ' + ' onclick=' + a['util']['chat']['parseLang'](', \'<div id=') + '\'/pmall \'' + ', ' + '\'/pm @' + a['util']['chat']['parseLang'](', \'<div id=') + ': \'' + ', ' + '>/PM&nbsp;</div>\', ' + ', '
                     },
                     OIcloseSettingsDialog: function () {
                         $('>&nbsp;OrigemWoot</a></div></td></tr></tbody></table></div></div>\', ')['html']('')['hide']()
                     }
                 },
                 generateCss: function (a) {
                     var b, c, d, e, f = '';
                     for (b in a) {
                         f += b + ', ', e = a[b];
                         for (c in e) d = e[c], f += c + ', ' + d + ', ';
                         f += ', '
                     }
                     return f
                 },
                 generateColorCss: function () {
                     var c, b = ', \'<div class=' + ' id=' + ' style=' + '>\', \'<div class=' + '><span class=',
                         d = API[' style=']()[' id='];
                     1 === d ? c = a['attr']['chatColors'][', '] : 2 === d ? c = a['attr']['chatColors'][', '] : 3 === d ? c = a['attr']['chatColors'][', '] : 4 === d ? c = a['attr']['chatColors'][', '] : 5 === d && (c = a['attr']['chatColors'][', ']);
                     var e = {};
                     c && (e['>Info Origem<spam class='] = {
                         color: '#' + c
                     }), e['>woot</span><i class=' + API[' style=']()['id'] + ' onclick='] = {
                         color: '#' + a['attr']['chatColors'][', ']
                     }, e['></i></div>\', \'<div class='] = {
                         color: '#' + a['attr']['chatColors'][', ']
                     }, e[b['replace'](/%%role%%/g, ' style=')] = {
                         color: '#' + a['attr']['chatColors'][', ']
                     }, e[b['replace'](/%%role%%/g, ', ')] = {
                         color: '#' + a['attr']['chatColors'][', ']
                     }, e[b['replace'](/%%role%%/g, ', ')] = {
                         color: '#' + a['attr']['chatColors'][', ']
                     }, e[b['replace'](/%%role%%/g, ', ')] = {
                         color: '#' + a['attr']['chatColors'][', ']
                     }, e[b['replace'](/%%role%%/g, ', ')] = {
                         color: '#' + a['attr']['chatColors'][', ']
                     }, e[b['replace'](/%%role%%/g, '>\', ')] = {
                         color: '#' + a['attr']['chatColors'][', ']
                     };
                     var f = a['gui']['util'][', \'<div class='](e);
                     $('><div class=')['remove'](), $('head')['append'](' style=' + f + ' onclick=')
                 }
             }
         },
         api: {
             events: {
                 voteUpdate: function (b) {
                     a['attr']['sm'] && 1 != b['><span>OK</span></div></div>\', '] && -1 == a['tmp']['control']['>\', \'<li><h3>Copyright &copy; by: <a href=']['indexOf'](b[', \'<ul style=']['id']) && (a['util']['chat'][' id='](' target=', a['util'][' style='](' id='), a['util']['chat']['parseLang']('>Mr. Assis</a> <a href=', {
                         User: b[', \'<ul style='][' target=']
                     })), a['tmp']['control']['>\', \'<li><h3>Copyright &copy; by: <a href='][' style='](b[', \'<ul style=']['id'])), a['attr']['ul']['on'] && ($('#' + b[', \'<ul style=']['id'])['length'] ? $('#' + b[', \'<ul style=']['id'])['attr']('>Sweet</a> <a href=', ' target=' + (-1 == b['><span>OK</span></div></div>\', '] ? '>\', \'<li><h3>Copyright &copy; by: <a href=' : ' id=')) : $($('#list-users')[', \'<div id=']()[a['util']['ul']['userListSort'](b)])['>Caipira</a></label></li>\', '](a['util']['ul'][' style='](b))), a['util'][', \'<li><h3>Special thanks: <a href=']()
                 },
                 advance: function (b) {
                     a['attr']['aw'] && $('#woot')['click'](), a['tmp']['control']['ow_site'] = [], a['tmp']['control']['>\', \'<li><h3>Copyright &copy; by: <a href='] = [], a[' style='][' id='][' target='] || a['util']['joinQueue'](), a['util']['eta']['getMed'](), a['attr']['ul']['on'] && 0 == API['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href=']()['length'] && a['util']['ul']['userListSort'](!0), a['tmp'][' target='] && a['util']['ow_site']['>Click here</a></h3></li>\', \'<li><h3>Bug report: <a href='](a['tmp'][' style='][a['tmp'][' id=']]), a['attr']['id'] && a['util'][' id='][' target='](b), a['attr']['hc'] && (a['util']['history'][' style='](b), a['util']['history']['>Click here</a></h3></li>\', \'<li><h3>Tutorial and Commands: <a href='](b)), a['util'][' id='][' target='](b)
                 },
                 waitListUpdate: function (b) {
                     a[' style='][' id='][' target='] || a['util']['joinQueue'](), API[' id='](API[' style=']()['id']), a['util']['eta']['threadUpdate'](), a['util']['>Click here</a></label></li>\', '][' style='](b);
                     for (var d in a['tmp'][', '][', ']) {
                         var e = document[', '](d);
                         e && e['remove']()
                     }
                     b && a['attr']['ul']['on'] && a['util']['ul']['userListSort'](!0)
                 },
                 chat: function (b, c) {
                     var d = API[' style='](b[', ']);
                     if (!a['tmp'][' id='] || c) {
                         if (d[' id='] >= 3 || !API[' style='](b[', '])[', ']) {
                             if (a['attr']['afk']['on'] && b[', '][', ']() == ', ') return document[', '](', ')['checked'] = !1, a['attr']['afk']['on'] = !1, a['tmp']['afk']['pm'] = {}, API[', '](a['util']['chat']['parseLang'](', ', {
                                 User: b[', ']
                             }), !0), API[', '](', \'#chat .cm[data-cid^=' + b['] .msg .un\', '] + ', '), void 0;
                             if (a['attr']['aj'] && b[', '][', ']() == ', ') return document[', '](', ')['checked'] = !1, a['attr']['aj'] = !1, API[', '](a['util']['chat']['parseLang'](', ', {
                                 User: b[', ']
                             }), !0), void 0
                         } - 1 != b[', ']['indexOf'](', \'<style id=') && a['util']['chat']['>\', '](), -1 != b[', ']['indexOf'](', \'<style id=') && a['attr']['afk']['on'] && a['attr']['afk']['msg'] && (new Date)[', ']() - a['tmp']['afk']['ls'] > 3e5 && API[', '](', ' + b['] .msg .un\', '] + '>\', \'<div><p id=' + a['attr']['afk']['msg']), a['attr']['afk']['on'] && API[' style=']()['id'] == b[', '] && (a['tmp']['afk']['ls'] = (new Date)[', ']())
                     }
                     var e = '',
                         f = Object['origem-menu-element origem-submenu-opener'](a['tmp'][', '][', ']),
                         g = '';
                     for (var h in f) if (a['tmp'][', '][', '][f[h]][', '] && -1 != a['tmp'][', '][', '][f[h]][', ']['indexOf'](b[', '])) {
                         g = f[h], e = ', ' + g;
                         break
                     }
                     if (a['tmp'][' id='] || $(', ' + b[', '] + ', ')['addClass'](', ' + API[' style='](b[', '])[' id='] + e), c) b[', '] += ', ' + API[' style='](b[', '])[' id='] + e, b[', '] = a['util']['chat'][', '](b[', ']);
                     else {
                         a['util']['chat'][', '](b);
                         var i = $(' tabindex=')[', \'<div id='](', ' + b[', '] + ', ');
                         if (a['tmp'][' id='] || a['util']['chat'][', '](i['width='](', ')), a['attr']['ci']) for (var j = i['width='](', '), k = j[', ']()['trim']()[', ']('>\', \'<div><p id='), h = 0; h < k['length']; h++) / .(gif | png | jpe ? g) / i[', '](k[h]) && /^https?:\/\//i [', '](k[h]) && a['util']['chat'][', '](k[h], j);
                         try {
                             var l = ', ' + b[', '] + ', ';
                             e && !$(l + ', ')['length'] && $(l)['append'](', ')
                         } catch (m) {}
                     }
                 },
                 userJoin: function (b) {
                     if (a['attr']['fj'] && b[', '] ? a['util']['chat'][' id='](', ', a['util'][' style='](''), a['util']['chat']['parseLang'](', ', {
                         User: b[' target=']
                     }), a['util']['chat']['parseLang']('fj'), a['util'][' style='](', ')) : a['attr']['uuj'] && a['util']['chat'][' id='](null, a['util'][' style='](''), a['util']['chat']['parseLang'](', ', {
                         User: b[' target=']
                     }), a['util']['chat']['parseLang']('uuj'), a['util'][' style='](', ')), a['attr']['ul']['on'] && !document[', '](b['id'])) {
                         var c = document[', '](', '),
                             d = a['util']['ul']['userListSort'](b),
                             e = a['util']['ul'][' style='](b);
                         c[', \'<div id='][d] ? $(c[', \'<div id='][d])['>Caipira</a></label></li>\', '](e) : $(c)['append'](e)
                     }
                     a['tmp'][', '][', '] && !a['tmp'][', ']['tmp'][b['id']] && -1 != a['tmp'][', '][', '][', '][', '][', ']['indexOf'](b['id']) && (a['tmp'][', ']['tmp'][b['id']] = b, $(' tabindex=')['append'](', ' + a['util']['chat']['parseLang'](', ', {
                         User: b[' target=']
                     }) + ', '), $(' tabindex=')[', ']($(' tabindex=')['prop'](', ')))
                 },
                 userLeave: function (b) {
                     var c = a['tmp'][', '][', '][b['id']];
                     a['attr']['uul'] && (null == c || isNaN(c) ? a['util']['chat'][' id='](null, a['util'][' style='](''), a['util']['chat']['parseLang'](', ', {
                         User: b[' target=']
                     }), a['util']['chat']['parseLang']('uul'), a['util'][' style='](', ')) : (c = parseInt(c), a['util']['chat'][' id='](null, a['util'][' style='](''), a['util']['chat']['parseLang'](', ', {
                         User: b[' target='],
                         Position: c ? c : ', '
                     }), a['util']['chat']['parseLang']('uul'), a['util'][' style='](', ')), delete a['tmp'][', '][', '][b['id']])), a['attr']['ul']['on'] && (c ? a['util']['ul']['userListSort'](!0) : $('#' + b['id'])['remove']()), a['tmp'][', ']['tmp'][b['id']] && delete a['tmp'][', ']['tmp'][b['id']]
                 },
                 grabUpdate: function (b) {
                     if (a['attr']['sg'] && -1 == a['tmp']['control']['ow_site']['indexOf'](b[', \'<ul style=']['id'])) {
                         var c = API['>Click here</a></h3></li>\', \'<li><h3>Bug report: <a href='](),
                             d = {
                                 User: b[', \'<ul style='][' target='],
                                 Author: c[', '],
                                 Name: c[', ']
                             };
                         a['util']['chat'][' id='](', ', a['util'][' style='](', '), a['util']['chat']['parseLang'](', ', d)), a['tmp']['control']['ow_site'][' style='](b[', \'<ul style=']['id'])
                     }
                     if (a['attr']['ul']['on']) {
                         var e = $($('#' + b[', \'<ul style=']['id'])[0][', \'<div id='][0][', \'<div id='][0][', \'<div id='][1][', \'<div id='][3][', \'<div id='][0]);
                         $(e)['attr'](', ', ', '), $(e)['append'](', ')
                     }
                 },
                 chatCommand: function (b) {
                     var c = b['trim']()[', ']('>\', \'<div><p id=');
                     c[0] = c[0]['substring'](1)[', '](), a[', '][c[0]] && a[', '][c[0]](b, c)
                 }
             }
         },
         util: {
             transferConfigs: function () {
                 if (localStorage[', ']) try {
                     var b = JSON[', '](localStorage[', ']);
                     a['attr']['aw'] = b[', '], a['attr']['aj'] = b[', '], a['attr']['fs'] = b[', '], a['attr']['hv'] = b[', '], a['attr']['sm'] = b[', '], a['attr']['sg'] = b[', '], a['attr']['uuj'] = b[', '], a['attr']['uul'] = b[', '], a['attr']['mbg'] = b[', '], a['attr']['ci'] = b[', '], a['attr']['bg'] = b['bg'], a['attr']['sc'] = b[', '], a['attr']['ul']['on'] = b[', '], a['attr']['ul']['ol'] = b[', \'.cm[data-cid^='], a['attr']['afk']['on'] = b['afk'], a['attr']['afk']['msg'] = b['cid'], a['attr'][', \'[data-cid^='][']\', '] = b['.text'], a['attr'][', ']['custEmotes'] = b['split'], a['attr'][', ']['bg'] = b['test'], a['attr'][', ']['ul'] = b['chatImage'], a['attr']['ml'] = b['ml'], a['attr']['chatColors'] = b['chatColors'], delete localStorage[', '], a['storage']['save']()
                 } catch (c) {}
             },
             djAdvance: {
                 djScore: function (b) {
                     if (b['\', \'']) {
                         var c = {
                             User: b['\', \'']['>\', '][' target=']
                         },
                             d = b['\', \''][' > .icon'],
                             e = b['\', \'']['icon icon-chat-dj'],
                             f = {
                                 Author: d[', '],
                                 Media: d[', '],
                                 Woot: e[' role-'],
                                 Add: e['custEmotesContext'],
                                 Meh: e['friend']
                             };
                         a['util']['chat'][' id=']('icon icon-friends-white', a['util'][' style='](''), a['util']['chat']['parseLang']('friend_join', f), a['util']['chat']['parseLang']('aqua', c), a['util'][' style='](''))
                     }
                 },
                 checkMaxDuration: function (b) {
                     if (b[' > .icon']) {
                         var c = 1 == b[' > .icon']['user_join'] ? 'list-users' : 'dev';
                         0 !== a['attr']['ml'] && b[' > .icon']['join'] > a['attr']['ml'] && (a['util']['chat']['>\', '](), a['util']['chat'][' id=']('cm system', a['util'][' style='](''), a['util']['chat']['parseLang']('background: linear-gradient(to right, rgba(255, 118, 118, 0.0470588) 0px, rgba(255, 0, 194, 0.270588) 100%);', {
                             Type: a['util']['chat']['parseLang'](c)
                         }), a['util']['chat']['parseLang']('msg'), a['util'][' style='](', ')))
                     }
                 }
             },
             history: {
                 getHistory: function () {
                     a['tmp']['box'] = [], a['util']['</div></div></div>'](a['util']['staff']['top: 8px; left: 15px']['icon icon-dev'] + 'from', null, null, function (b) {
                         for (var c in b['data']) a['tmp']['box'][c] = new Object, a['tmp']['box'][c][', '] = b['data'][c][' > .icon'][', '], a['tmp']['box'][c]['text cid-undefined'] = new Date(b['data'][c]['dev_join'])
                     })
                 },
                 addMedia: function (b) {
                     if (b[' > .icon']) {
                         var c = new Date,
                             d = {
                                 cid: b[' > .icon'][', '],
                                 date: new Date(c[', ']() + 6e4 * c['scrollHeight']())
                             };
                         a['tmp']['box']['scrollTop'](d) > 50 && a['tmp']['box']['user_dc']()
                     }
                 },
                 check: function (b) {
                     if (b[' > .icon']) for (var c in a['tmp']['box']) if (a['tmp']['box'][c][', '] == b[' > .icon'][', ']) {
                         var d = Math['DJ']((new Date((new Date)[', ']() + 6e4 * (new Date)['scrollHeight']())[', ']() - a['tmp']['box'][c]['text cid-undefined'][', ']()) / 1e3),
                             e = {
                                 Type: a['util']['chat']['parseLang'](1 == b[' > .icon']['user_join'] ? 'list-users' : 'dev'),
                                 Position: parseInt(c) + 1,
                                 Total: a['tmp']['box']['length'],
                                 Time: a['util']['getTimeString'](d)
                             };
                         7200 > d && a['util']['chat']['>\', '](), a['util']['chat'][' id=']('icon icon-friends-white', a['util'][' style='](''), a['util']['chat']['parseLang']('orange', e), a['util']['chat']['parseLang']('user_leave'), a['util'][' style='](', '));
                         break
                     }
                 }
             },
             room: {
                 removeCustomSettings: function () {
                     $('author')['remove'](), $('icon icon-grab')['remove'](), $('Grabbed!')['attr']('yellow', a['tmp']['addnotif']), a['gui']['events']['tbg'](a['tmp']['itens']['bgs'][0])
                 },
                 refreshChatTheme: function () {
                     a['attr']['oc'] ? $('ul-icon-grab')['length'] || $('head')['append']('icon icon-grab') : $('ul-icon-grab')['remove']()
                 },
                 refreshCSSSettings: function () {
                     var b = a['tmp']['itens'][', '][a['tmp']['commands']];
                     $('author')['remove'](), b ? b['css'] ? b['ossettings'] ? (a['tmp']['ossettings'] = !0, $('icon icon-grab')['remove'](), $('autoWoot')['append']('parse' + b['css'] + '</option>')) : $('head')['append']('autoJoin' + b['css'] + '</option>') : a['tmp']['ossettings'] && (a['tmp']['ossettings'] = !1, $('icon icon-grab')['remove']()) : a['tmp']['ossettings'] && (a['tmp']['ossettings'] = !1, $('icon icon-grab')['remove']()), $('icon icon-grab')['length'] || $('head')['append']('cfullScreen' + a['tmp']['css'] + '</option>')
                 },
                 refreshCustomSettings: function () {
                     if (a['attr']['hc'] && a['util']['history']['getHistory'](), a['gui']['util']['hideVideo'](), a['util']['eta']['getMed'](), a['attr']['ct']) {
                         var b = a['tmp']['itens'][', '][a['tmp']['commands']];
                         if (b) {
                             b[' size='] && a['gui']['events']['tbg'](b[' size=']), b['msg'] && a['util']['chat'][' id='](null, a['util'][' style='](', '), b['msg']);
                             var c = document[', ']('mehShow')[', \'<div id='][0][', \'<div id='][0];
                             b['userGrab'] ? b['userGrab'] != c['yellow'] && (c['yellow'] = b['userGrab']) : a['tmp']['addnotif'] != c['yellow'] && (c['yellow'] = a['tmp']['addnotif'])
                         }
                         a['util']['room']['userJoinLeave']()
                     }
                 }
             },
             eta: {
                 getMed: function () {
                     var b = API['getHistory'](),
                         c = parseInt(b['length'] / 2),
                         d = [];
                     for (var f in b) d[' style='](b[f][' > .icon']['join']);
                     d['showMenuBG'](function (a, b) {
                         return a - b
                     }), a['tmp']['eta']['cImage'] = parseInt((d[c] + d[c + 1]) / 2)
                 },
                 updateETA: function () {
                     var b = API[' id='](API[' style=']()),
                         c = API['staffColors'](),
                         d = 'userList' + (-1 != b ? b + 1 + 'order' : '') + API['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href=']()['length'] + ')'; - 1 == b && c && c['id'] != API[' style=']()['id'] && (b = API['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href=']()['length']), a['tmp']['eta']['cImage'] || a['util']['eta']['getMed']();
                     var e = a['util']['getTimeString'](API['afkMessage']() + b * a['tmp']['eta']['cImage']);
                     a['attr']['eta']['on'] && -1 != b && e != 'dlc' || (e == 'dlc', clearInterval(a['snd']['eta']), a['snd']['eta'] = null), a['tmp']['eta']['dlcMention'] = 'op' + e + '>\', \'<div><p id=' + d, $('opp')[', '](a['tmp']['eta']['dlcMention'])
                 },
                 threadUpdate: function () {
                     var b = API[' id='](API[' style=']()),
                         c = API['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href=']()['length'],
                         d = API['staffColors'](); - 1 == b && c && (b = c), a['attr']['eta']['on'] && !a['snd']['eta'] && d && d['id'] != API[' style=']()['id'] ? a['snd']['eta'] = setInterval(a['util']['eta']['bgpp'], 1e3) : (!a['attr']['eta']['on'] || a['snd']['eta'] && -1 == b) && (clearInterval(a['snd']['eta']), a['snd']['eta'] = null, a['util']['eta']['bgpp']()), a['util']['eta']['ulpp']()
                 },
                 refreshButtonText: function () {
                     return a['attr']['eta']['on'] ? ($('opp')['length'] || $('media')['length'] || !$('score')[', ']() || $('score')['html']($('score')[', ']() + 'positive' + a['tmp']['eta']['dlcMention'] + 'grabs'), void 0) : ($('lastPlay')['length'] && $('lastPlay')['remove'](), void 0)
                 }
             },
             ul: {
                 getWaitListPosition: function (a) {
                     var b = API['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href=']();
                     for (var c in b) if (b[c]['id'] == a) return parseInt(c);
                     return -1
                 },
                 userListSort: function (b) {
                     if (a['attr']['ul']['on']) {
                         var c = API['negative'](),
                             d = API['staffColors'](),
                             e = 0;
                         for (var f in c) d && d['id'] == c[f]['id'] ? c[f]['icon icon-history-white'] = 0 : (e = API[' id='](c[f]['id']), c[f]['icon icon-history-white'] = -1 != e ? e + 1 : 500 + f);
                         if (1 == a['attr']['ul']['ol'] && (c = c['showMenuBG'](function (a, b) {
                             return b['icon icon-history-white'] - a['icon icon-history-white']
                         })['dj_played_info']()), b && typeof b == 'dj_played_title') {
                             for (var f in c) if (c[f]['id'] == b['id']) return f;
                             return -1
                         }
                         if (!b) {
                             $('#list-users')['remove'](), $('#plugbot-userlist')['append']('format');
                             var g = '';
                             for (var f in c) g += a['util']['ul'][' style='](c[f]);
                             return $('#list-users')['append'](g), a['socket']['session'] && a['socket']['session']['msg']({
                                 m: 'video'
                             }), void 0
                         }
                         a['util']['ul']['music'](c)
                     }
                 },
                 updateUlField: function (b) {
                     var c = $('#list-users')[', \'<div id=']();
                     if (c['length'] != b['length']) return a['util']['ul']['userListSort'](), void 0;
                     try {
                         for (var d in b) {
                             var e = 'duration' + (0 == b[d]['icon icon-history-white'] ? 'icon icon-current-dj' : 1 == b[d]['><span>OK</span></div></div>\', '] ? 'ml_exc_msg' : -1 == b[d]['><span>OK</span></div></div>\', '] ? 'ml_exc_title' : b[d]['ow_site'] ? 'hist' : ''),
                                 f = $($(c[d]))[', \'<div id='](0)[', \'<div id='](0)[', \'<div id='](0),
                                 g = 0 == b[d]['icon icon-history-white'] ? ', ' : b[d]['icon icon-history-white'] < 999 ? b[d]['icon icon-history-white'] : '',
                                 h = '';
                             h = b[d][', '] ? b[d][', '] < 5 ? ' style=' : 'urlbase' : 5 == b[d][' id='] || 4 == b[d][' id='] ? ', ' : 3 == b[d][' id='] ? ', ' : 2 == b[d][' id='] ? ', ' : 1 == b[d][' id='] ? '>\', ' : '', $(c[d])['attr']('id') != b[d]['id'] && $(c[d])['attr']('id', b[d]['id']), $(c[d])['attr']('>Sweet</a> <a href=') != e && $(c[d])['attr']('>Sweet</a> <a href=', e);
                             var i = f[0][', \'<div id='][0][', \'<div id='][0];
                             $(i)[', ']() != g && $(i)[', '](g);
                             var j = f[0][', \'<div id='][1][', \'<div id='][1],
                                 k = 'resul' + (h || ', \'<ul style=');
                             $(j)['attr']('>Sweet</a> <a href=') != k && $(j)['attr']('>Sweet</a> <a href=', k), h = h ? 'rooms/history' + h : '';
                             var l = f[0][', \'<div id='][1][', \'<div id='][0];
                             l[', \'<div id='][0] ? $(l[', \'<div id='][0])['attr']('>Sweet</a> <a href=') != h && (h ? $(l[', \'<div id='][0])['attr']('>Sweet</a> <a href=', h) : $(l[', \'<div id='][0])['remove']()) : $(l)['append']('date' + h + 'timestamp');
                             var m = j[', \'<div id='][0];
                             $(m)[', ']() != b[d][' target='] && ($(m)[', '](b[d][' target=']), $(m)['attr']('ajax', 'getTimezoneOffset' + b[d][' target='] + 'unshift'));
                             var n = f[1][', \'<div id='][2][', \'<div id='][0];
                             $(n)[', ']() != b[d]['pop'] && $(n)[', '](b[d]['pop']);
                             var o = f[1][', \'<div id='][3][', \'<div id='][0];
                             b[d]['ow_site'] ? ($(o)['attr'](', ', ', '), $(o)[', \'<div id='](0)[0] || $(o)['append'](', ')) : ($(o)['attr'](', ', 'round'), $(o)[', \'<div id='](0)[0] && $($(o)[', \'<div id='](0)[0])['remove']());
                             var p = f[1][', \'<div id='][0][', \'<div id='][0][', \'<div id='][0],
                                 q = b[d]['med_in_hist_msg']; - 1 != q['indexOf']('med_in_hist_title') && (q += '#cssroomcust'), $(p)['attr']('>Sweet</a> <a href=') != '#owcss' + q && $(p)['attr']('>Sweet</a> <a href=', '#owcss' + q);
                             var r = 'getTimezoneOffset' + b[d][' target='] + 'src',
                                 s = f[1][', \'<div id='][1][', \'<div id='][0];
                             $(s)['attr']('ajax') != r && $(s)['attr']('ajax', r);
                             var t = f[1][', \'<div id='][4][', \'<div id='][0],
                                 u = a['util']['chat']['parseLang']('pbgp', {
                                     User: b[d][' target=']
                                 });
                             if (t[', \'<div id='][0]) if (-1 != a['tmp']['pm'][', ']['indexOf'](b[d]['id'])) {
                                 var v = '#playback > .background > img' + b[d][' target='] + '#cssoldchat';
                                 $(t[', \'<div id='][0])['attr'](', ') != u && ($(t[', \'<div id='][0])['attr'](', ', u), $(t[', \'<div id='][0])['attr']('ajax', v))
                             } else t[', \'<div id='][0]['remove']();
                             else - 1 != a['tmp']['pm'][', ']['indexOf'](b[d]['id']) && $(t)['append']('cssoldchat' + u + 'stylesheet' + b[d][' target='] + 'text/css')
                         }
                     } catch (w) {
                         a['util']['ul']['userListSort']()
                     }
                 },
                 addUserListElement: function (b) {
                     var c = '';
                     c = b[', '] ? b[', '] < 5 ? ' style=' : 'urlbase' : 5 == b[' id='] || 4 == b[' id='] ? ', ' : 3 == b[' id='] ? ', ' : 2 == b[' id='] ? ', ' : 1 == b[' id='] ? '>\', ' : '';
                     var d = b['med_in_hist_msg'];
                     return -1 != d['indexOf']('med_in_hist_title') && (d += '#cssroomcust'), 'https://dl.dropboxusercontent.com/s/teefx7fq89kn457/oldchat.css' + b['id'] + 'url' + (0 == b['icon icon-history-white'] ? 'icon icon-current-dj' : 1 == b['><span>OK</span></div></div>\', '] ? 'ml_exc_msg' : -1 == b['><span>OK</span></div></div>\', '] ? 'ml_exc_title' : b['ow_site'] ? 'hist' : '') + 'overridecss' + (0 == b['icon icon-history-white'] ? ', ' : b['icon icon-history-white'] < 999 ? b['icon icon-history-white'] : '') + 'owcss' + (c ? 'stylesheet' + c + 'timestamp' : '') + 'text/css' + (c || ', \'<ul style=') + '\', ' + b[' target='] + ', \'<link id=' + b[' target='] + ' rel=' + d + 'type=' + b[' target='] + 'href=' + b['pop'] + 'owcss' + (b['ow_site'] ? ', ' : 'round') + 'stylesheet' + (b['ow_site'] ? ', ' : '') + 'text/css' + (-1 != a['tmp']['pm'][', ']['indexOf'](b['id']) ? 'cssoldchat' + a['util']['chat']['parseLang']('pbgp', {
                         User: b[' target=']
                     }) + '\', ' + b[' target='] + 'text/css' : '') + ', '
                 }
             },
             wl: {
                 userExistsInArray: function (a, b) {
                     for (var c in a) if (a && null != a[c] && a[c]['id'] == b) return !0;
                     return !1
                 },
                 getWaitList: function () {
                     a['tmp'][', ']['>Click here</a></label></li>\', '] = API['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href='](), a['tmp'][', ']['>Click here</a></label></li>\', ']['scrollTop'](API['staffColors']())
                 },
                 updateWaitList: function (b) {
                     if (!b) return a['util']['>Click here</a></label></li>\', ']['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href='](), void 0;
                     if (b['scrollTop'](API['staffColors']()), a['tmp'][', ']['>Click here</a></label></li>\', ']['length']) try {
                         for (var c in a['tmp'][', ']['>Click here</a></label></li>\', ']) a['tmp'][', ']['>Click here</a></label></li>\', '][c] && !a['util']['>Click here</a></label></li>\', '][', '](b, a['tmp'][', ']['>Click here</a></label></li>\', '][c]['id']) && null == API[' style='](a['tmp'][', ']['>Click here</a></label></li>\', '][c]['id'])['id'] && (a['tmp'][', '][', '][a['tmp'][', ']['>Click here</a></label></li>\', '][c]['id']] = c)
                     } catch (d) {}
                     a['tmp'][', ']['>Click here</a></label></li>\', '] = b
                 }
             },
             chat: {
                 playSound: function () {
                     !a['tmp']['focus'] && $(', ')['length'] && (a['attr'][', \'[data-cid^='][']\', '] <= -1 ? document[', '](', ')[', ']() : document[', '](', ' + (0 == a['attr'][', \'[data-cid^='][']\', '] ? Math[', '](Math[', ']() * a['tmp']['itens'][', ']['len']) + 1 : a['attr'][', \'[data-cid^='][']\', ']))[', ']())
                 },
                 parseLang: function (b, c) {
                     var d = a['tmp'][', '][', '][b];
                     if (!d) return ', ' + b + ', ';
                     if (!c) return d;
                     for (var e in c) d = d['replace'](', ' + e + ', ', c[e]);
                     return d
                 },
                 htmlEscape: function (a) {
                     return String(a)['replace'](/&/g, ', ')['replace'](/"/g, ', ')['replace'](/'/g, ', ')['replace'](/</g, ', ')['replace'](/>/g, ', ')
                 },
                 parseLinks: function (b) {
                     if (b = a['util']['chat'][', '](b), !b[', \'<div id='](/https?/)) return b;
                     var c = b[', ']('>\', \'<div><p id='),
                         d = '';
                     for (var e in c) c[e][', \'<div id='](/^https?/) && (c[e] = '><small class=' + c[e] + '>\', ' + c[e] + ', '), d += c[e] + '>\', \'<div><p id=';
                     return d['trim']()
                 },
                 addChatLog: function (a, b, c, d, e) {
                     var f = new Date,
                         g = f[', '](),
                         h = f[', '](),
                         i = ', ',
                         j = !0,
                         k = $(', \'<div id=')[', \'<div id='](0)['attr']('>Sweet</a> <a href='),
                         l = $(' tabindex='),
                         m = l[', ']() > l[0][', '] - l['height']() - 28; - 1 != k['indexOf']('></div>\', ') && (g >= 12 && (g -= 12, i = 'pm'), 0 == g && (g = 12)), -1 != k['indexOf'](', ') && (i = ''), -1 != k['indexOf']('off') && (j = !1), 10 > h && (h = ', ' + h);
                     var n = null;
                     n = d ? ', ' + a + ', ' + (e ? e : ', \'<i class=') + '</option>' + d + ', ' + (j ? ', ' + g + ', ' + h + (i ? i : '') + ', ' : '') + ', ' + b + '</option>' + c + ', ' : ', ' + a + ', ' + (j ? ', ' + g + ', ' + h + (i ? i : '') + ', ' : '') + ', ' + b + '</option>' + c + ', ', API[', '](' id=', !0), $(', ')['></i>\', ']()['html'](n), m && l[', '](l['prop'](', '))
                 },
                 chatImage: function (a, b) {
                     var c = new Image;
                     c[', '] = function () {
                         c[', '] += ', ', c[', '] += c['width'] > 280 && c['height'] > 350 ? ', ' : c['width'] > 280 ? ', ' : c['height'] > 350 ? ', ' : ', ';
                         var d = b['html']()['replace']('><small class=' + a + '>\', ' + a + ', ', ', ' + a + '>\', ' + c[', '] + ', ');
                         b[', ']()['append'](', '), b[', ']()['align='](function () {
                             $(this)['width='](', \'<span class=')['css']('display', 'block')
                         }, function () {
                             $(this)['width='](', \'<span class=')['css']('display', 'none')
                         }), b[', ']()['width='](', \'<span class=')['click'](function () {
                             var a = $(this)[', ']()['width='](' title=')[0]['yellow'];
                             $(this)[', ']()['width=']('  style=')['remove'](), $(this)[', ']()['width='](' title=')[', ']()['append'](a)['width='](' title=')['remove'](), $(this)['remove']()
                         });
                         var e = $(' tabindex='),
                             f = e[', ']() > e[0][', '] - e['height']() - 28;
                         b['html'](d), f && e[', '](e[0][', '])
                     }, c['yellow'] = a
                 },
                 addDeleteButton: function (b) {
                     if (b[', '] == API[' style=']()['id'] && API[' style=']()[' id='] >= 2 && -1 == b[', ']['indexOf'](' onclick=')) {
                         var c = JSON[' style=']($(' tabindex=')[', \'<div id=']()['length']);
                         $('\r					class=' + c + ')')['append'](': \').focus();\">/pm</span>' + b[', '][', ']('>\', \'<div><p id=')[0] + '\', \'' + a['util']['chat']['parseLang']('userInfo\', \'') + '>Default BG</p></div>\', \'<div><p id='), $('\r					class=' + c + ')')['align='](function () {
                             return $(this)['width=']('><tbody><tr><td rowspan=')['css']('display', 'block')
                         }), $('200' + b[', '][', ']('>\', \'<div><p id=')[0])['on']('click', function () {
                             a['util']['</div></div></div>']('margin-bottom:0px;width:220px;height:auto;' + b[', '][', ']('>\', \'<div><p id=')[0], '0')
                         }), $('\r					class=' + c + ')')['valign='](function () {
                             return $(this)['width=']('><tbody><tr><td rowspan=')['css']('display', 'none')
                         })
                     }
                 },
                 custEmotes: function (b) {
                     if (Object['origem-menu-element origem-submenu-opener'](a['tmp']['emotes'])['length']) {
                         var c = b['html']();
                         if (typeof c == '0') {
                             var e = (c[', '](), $(' tabindex=')),
                                 f = e[', ']() > e[0][', '] - e['height']() - 28,
                                 g = a['tmp']['emotes'];
                             for (var h in g) if (!g[h]['0']) {
                                 var i = ', ' + h[', ']() + ', ';
                                 c = c['replace'](new RegExp(i, 'border-collapse:collapse;background-color:#1c1f25;border-bottom:1px solid #444;background: linear-gradient(to left,rgba(0, 0, 0, 0.45) 0,rgba(0, 0, 0, 25) 100%)'), '2' + (g[h]['0'] ? '25' : ', ' + h + ', ') + 'center' + g[h]['commands'] + 'middle' + g[h]['width'] + 'votedBackgroundColor' + g[h]['height'] + 'WaitListPozicia')
                             }
                             b['html'](c), f && e[', '](e[0][', '])
                         }
                     }
                 },
                 custEmotesContext: function (b) {
                     if (Object['origem-menu-element origem-submenu-opener'](a['tmp']['emotes'])['length']) {
                         emotes = a['tmp']['emotes'];
                         for (var c in emotes) if (!emotes[c]['0']) {
                             var d = '5' + c[', ']() + '5';
                             b = b['replace'](new RegExp(d, 'border-collapse:collapse;background-color:#1c1f25;border-bottom:1px solid #444;background: linear-gradient(to left,rgba(0, 0, 0, 0.45) 0,rgba(0, 0, 0, 25) 100%)'), '2' + (emotes[c]['0'] ? '25' : ', ' + c + ', ') + 'center' + emotes[c]['commands'] + 'middle' + emotes[c]['width'] + 'votedBackgroundColor' + emotes[c]['height'] + 'WaitListPozicia')
                         }
                         return b
                     }
                 }
             },
             gui: {
                 applyStaffColors: function (a) {
                     a ? $('head')['append']('StaffImage') : $('icon icon-chat-\', \'</span><div class=')['remove']()
                 }
             },
             ajax: function (a, b, c, d, e, f) {
                 $['</div></div></div>']({
                     cache: !1,
                     type: b || ' style=',
                     url: a,
                     contentType: f || '>\', \'</span></div></td></tr><tr><td width=',
                     data: c
                 })['\">&nbsp;&nbsp;<span onclick=\"$(\'#chat-input-field\').val($(\'#chat-input-field\').val()+\'@'](function (a) {
                     d && d(a, e)
                 })
             },
             grab: {
                 getMedia: function (b) {
                     try {
                         var c = require[' style=']['></i></div></td><td width='][' style=']['><i class=']['><div class='][' style='],
                             d = {
                                 data: [playback = {
                                     historyID: c['><span title='],
                                     media: c[' > .icon'][' style=']
                                 }]
                             };
                         a['util']['ow_site'][' onclick='](d, playlists)
                     } catch (e) {
                         a['util']['</div></div></div>'](a['util']['staff']['top: 8px; left: 15px']['icon icon-dev'] + ' style=', null, null, a['util']['ow_site'][' onclick='], b)
                     }
                 },
                 insert: function (b, c) {
                     var d = {
                         historyID: b['data'][0]['mehShow']['><span title='],
                         playlistID: c['id']
                     },
                         e = {
                             playlist: c,
                             media: {
                                 media: [b['data'][0]['mehShow'][' > .icon']]
                             }
                         };
                     a['util']['</div></div></div>'](a['util']['staff']['top: 8px; left: 15px']['icon icon-dev'] + 'custEmotesContext', '>@</span></td><td width=', JSON[' style='](d), a['util']['><span title='][' style='], e)
                 }
             },
             joinQueue: function (b) {
                 b = b || API['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href='](), a['attr']['aj'] && b['length'] < 50 && -1 == API[' id=']() && (!API['staffColors']() || API['staffColors']()['id'] != API[' style=']()['id']) && API[' style=']()
             },
             getTimeString: function (a) {
                 if (0 >= a) return 'dlc';
                 var b = [3600, 60, 0],
                     c = [0, 0, 0],
                     d = '';
                 for (var e in b) {
                     for (; a >= b[e] && b[e] > 0;) c[e]++, a -= b[e];
                     e == b['length'] - 1 && (c[e] = a), d += c[e] < 10 ? ', ' + c[e] : c[e], e < b['length'] - 1 && (d += ', ')
                 }
                 return d
             },
             getHexaColor: function (a) {
                 switch (a[', ']()) {
                 case ', ':
                     return '>\', \'</span></td><td width=';
                 case ' align=':
                     return ' id=';
                 case '><span title=':
                     return ' style=';
                 case '>\', \'</span></td><td align=':
                     return ' style=';
                 case ', ':
                     return ' style=';
                 case 'active':
                     return '><div id=';
                 case 'cursor:help;font-weight:bold;font-size:10px;cursor:pointer':
                     return '>\', \'';
                 case ', ':
                     return '$(\\'#chat - input - field\\').val(\\' / pm@\', ';
                 case ', ':
                     return ', ';
                 case ' id=':
                     return ', ';
                 case ', ':
                     return ', ';
                 case ', ':
                     return ', ';
                 default:
                     return ', \'<i class='
                 }
             },
             refreshMehs: function () {
                 if ($(', ')[', '](', ') && $(', ')[', '](', ')) {
                     $(', \'[Error : key not found ')['remove']();
                     var a = $(API['negative']())['&gt;'](function () {
                         return -1 == this['><span>OK</span></div></div>\', '] && !this['%%']
                     });
                     a['&quot;'](function (b) {
                         $('&#39;')['&gt;'](function () {
                             return $(this)[', ']() == a[b][' target=']
                         })[', ']()['append']('&lt;')
                     })
                 }
             },
             staff: {
                 resul: {
                     data: null,
                     urlbase: '&amp;',
                     pos: 0
                 },
                 apiSkipDJ: function () {
                     return API[' style=']()[' id='] < 2 && !API[' style=']()[', '] ? (API[', '](a['util']['chat']['parseLang']('htmlEscape')), void 0) : (API['match'](), void 0)
                 },
                 removeDJ: function () {
                     if (API[' style=']()[' id='] < 2 && !API[' style=']()[', ']) return API[', '](a['util']['chat']['parseLang']('\', \'')), void 0;
                     var b = a['tools'];
                     a['util']['</div></div></div>'](b['staff']['top: 8px; left: 15px']['icon icon-dev'] + '_blank' + API['staffColors']()['id'], '0')
                 },
                 clearChat: function () {
                     if (API[' style=']()[' id='] < 2 && !API[' style=']()[', ']) return API[', ']('</a>'), API[', '](a['util']['chat']['parseLang']('getHours')), void 0;
                     var b = $('getMinutes');
                     for (var c in b) {
                         if (!$(b[c])['attr']('>Sweet</a> <a href=')) break;
                         var d = $(b[c])['attr']('>Sweet</a> <a href=')[', ']('>\', \'<div><p id=')['&gt;'](function (a) {
                             return -1 != a['indexOf']('am')
                         });
                         for (var e in d) {
                             if (0 == d[e]['indexOf']('#chat-timestamp-button')) {
                                 $(b[c])['24']('12')['remove']();
                                 break
                             }
                             a['util']['</div></div></div>'](a['util']['staff']['top: 8px; left: 15px']['icon icon-dev'] + '0' + d[e]['substring'](4), '0')
                         }
                     }
                     API[', '](API[' style=']()[' target='] + 'cm system')
                 },
                 getRoomDetails: function (b, c) {
                     a['util']['</div></div></div>'](a['util']['staff']['top: 8px; left: 15px']['icon icon-dev'] + ' style=', ' style=', null, function (d) {
                         a['util']['staff']['top: 8px; left: 15px']['data'] = d['data'][0], b && b(c)
                     })
                 },
                 cycleOn: function (b, c) {
                     a['util']['staff']['top: 8px; left: 15px']['data']['box']['msg'] ? b && b(c) : a['util']['</div></div></div>'](a['util']['staff']['top: 8px; left: 15px']['icon icon-dev'] + '\', \'', 'top: 5px; left: 8px', 'from', b, c)
                 },
                 cycleOff: function (b, c) {
                     a['util']['staff']['top: 8px; left: 15px']['data']['box']['msg'] ? b && b(c) : a['util']['</div></div></div>'](a['util']['staff']['top: 8px; left: 15px']['icon icon-dev'] + '\', \'', 'top: 5px; left: 8px', 'timestamp', b, c)
                 },
                 skipDJ: function (b, c) {
                     var d = a['util']['staff']['top: 8px; left: 15px'];
                     a['util']['</div></div></div>'](d['icon icon-dev'] + 'display: inline;', '>@</span></td><td width=', '</span>' + d['data']['box']['text cid-undefined'] + 'color: \', \'<div class=' + d['data']['mehShow']['><span title='] + '><div class=', b, c)
                 },
                 moveDJ: function (b, c, d) {
                     var e = a['util']['staff']['top: 8px; left: 15px'];
                     a['util']['</div></div></div>'](e['icon icon-dev'] + '><i class=', '>@</span></td><td width=', ' style=' + e['data']['box']['text cid-undefined'] + '></i></div><div class=' + (d >= 0 ? d : 0) + ', ', b, c)
                 },
                 lockskip: function (b) {
                     return API[' style=']()[' id='] < 3 && !API[' style=']()[', '] ? (API[', '](a['util']['chat']['parseLang']('>\r								<div class=')), void 0) : (a['util']['staff']['top: 8px; left: 15px'][', '] = isNaN(b) ? 1 : b, a['util']['staff']['last'](function () {
                         a['util']['staff']['.'](function () {
                             a['util']['staff']['#FFFFFF'](function () {
                                 a['util']['staff']['><span class=']();
                                 var b = a['util']['staff']['top: 8px; left: 15px'][', '];
                                 b > 0 && b < API['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href=']()['length'] && a['util']['staff'][' style='](null, null, b - 1)
                             })
                         })
                     }), void 0)
                 }
             },
             playlist: {
                 addVideoByURL: function (b, c) {
                     var d = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
                         e = c[', \'<div id='](d);
                     if (e && 11 == e[2]['length']) {
                         var f = {
                             vid: e[2],
                             pl: b
                         };
                         a['util']['</div></div></div>']('.cm.system' + e[2], ' style=', null, a['util']['><span title=']['onload'], f, 'className')
                     } else API[', ']('ow-img', !0)
                 },
                 parseData: function (b, c) {
                     var d = (new XMLSerializer)[' high'](b[' wide'])[', '](' max'),
                         e = 0,
                         f = '',
                         g = '';
                     for (var h in d) if (-1 == d[h]['indexOf']('\', ')) - 1 == d[h]['indexOf'](', ') ? -1 == d[h]['indexOf'](' style=') || (g = d[h][', '](' style=')[1][', ']('>X</div>\', ')[0]) : f = d[h][', '](', ')[1][', '](', \'<div class=')[0];
                     else {
                         var i = d[h][', ']('\', ');
                         e = parseInt(i[i['length'] - 1])
                     }
                     if (isNaN(e) || !f || !g) return API[', '](a['util']['chat']['parseLang'](', '), !0), void 0;
                     var j = {
                         media: [{
                             id: 0,
                             format: 1,
                             cid: c[', '],
                             author: g,
                             title: f,
                             image: ', ' + c[', '] + ', ',
                             duration: e
                         }],
                         append: !1
                     },
                         k = {
                             playlist: c[' style='],
                             media: j
                         };
                     a['util']['</div></div></div>'](', \'<div id=' + c[' style=']['id'] + ' class=', '>@</span></td><td width=', JSON[' style='](j), a['util']['><span title='][' style='], k)
                 },
                 sendRequestInsert: function (a, b) {
                     a[' style='] == '>\', ' ? API[', '](', ' + b[' > .icon'][' > .icon'][0][', '] + ', ' + b[' > .icon'][' > .icon'][0][', '] + ', ' + b['><span title='][', '], !1) : API[', '](', ' + a[', '][0], !0)
                 },
                 listByCommand: function (b) {
                     a['tmp'][' style=']['length'] ? a['util']['><span title='][', \'<div class='](b) : a['util']['</div></div></div>'](', ', ' style=', null, function (c) {
                         a['tmp'][' style='] = c['data'], a['util']['><span title='][', \'<div class='](b)
                     })
                 },
                 showOptions: function (b) {
                     var c = '',
                         d = '';
                     for (var e in a['tmp'][' style=']) {
                         b && b['length'] && (d = 'order' + b[0] + '>\', \'<div><p id=' + (parseInt(e) + 1) + '>\', \'<div><p id=' + (null != b[1] ? b[1] : ''), d = d['trim']());
                         var f = d ? ' title=' + d + 'Hidden Emote!' + d + ' style=' : '';
                         c += (c ? ');width:' : '') + ';height:' + f + '></div>\', ' + (parseInt(e) + 1) + ', ' + a['tmp'][' style='][e][', '] + ', '
                     }
                     a['util']['chat'][' id='](null, a['util'][' style='](''), c, a['util']['chat']['parseLang'](', \'<link id='), a['util'][' style='](', '))
                 },
                 download: function () {
                     a['util']['</div></div></div>'](', ', ' style=', null, a['util']['><span title='][' rel='], null, 'type=')
                 },
                 getPlaylist: function (b) {
                     a['tmp']['href='][' style='] = b['data'];
                     for (var c in a['tmp']['href='][' style=']) a['tmp']['href=']['>\', ']++, a['tmp']['href='][' style='][c][', '] = [], a['tmp']['href='][' style='][c][', '] && (a['tmp']['href='][', ']++, a['util']['</div></div></div>'](', \'<div id=' + a['tmp']['href='][' style='][c]['id'] + ', ', ' style=', null, a['util']['><span title='][', '], c, 'type='))
                 },
                 getItensPlaylist: function (b, c) {
                     a['tmp']['href='][' style='][c][', '] = b['data'];
                     for (var d in a['tmp']['href='][' style='][c][', ']) a['tmp']['href='][', ']++, 1 == a['tmp']['href='][' style='][c][', '][d]['user_join'] ? a['tmp']['href='][' style='][c][', '][d]['commands'] = ', ' + a['tmp']['href='][' style='][c][', '][d][', '] : (a['tmp']['href='][', ']++, a['tmp']['href=']['sc']++, SC[', '](', ', {
                         ids: a['tmp']['href='][' style='][c][', '][d][', ']
                     }, a['util']['><span title='][', ']));
                     a['util']['><span title='][', ']()
                 },
                 parseSCResponse: function (b) {
                     if (b && b[0] && b[0]['id']) for (var c in a['tmp']['href='][' style=']) for (var d in a['tmp']['href='][' style='][c][', ']) 2 == a['tmp']['href='][' style='][c][', '][d]['user_join'] && a['tmp']['href='][' style='][c][', '][d][', '] == b[0]['id'] && (a['tmp']['href='][' style='][c][', '][d]['commands'] = b[0][', ']);
                     a['util']['><span title='][', ']()
                 },
                 threadDone: function () {
                     0 == --a['tmp']['href='][', '] && (API[', '](', ' + a['tmp']['href=']['>\', '] + ', ' + a['tmp']['href='][', '] + ', ' + a['tmp']['href=']['sc'] + ', '), a['util']['><span title='][', '](', ', a['tmp']['href='][', '] || 'csv', a['tmp']['href='][' style=']), a['tmp']['href='][' style='] = [], a['tmp']['href='][', '] = 0, a['tmp']['href='][', '] = 0, a['tmp']['href=']['sc'] = 0, a['tmp']['href=']['>\', '] = 0)
                 },
                 getAsFile: function (b, c, d) {
                     var e = document[', '](', '),
                         f = '';
                     switch (c[', ']()) {
                     case 'type=':
                         f = JSON[' style='](JSON[' style='](d));
                         break;
                     case 'csv':
                         f = ', ' + encodeURIComponent(a['util']['><span title='][', '](d));
                         break;
                     default:
                         f = ', ' + encodeURIComponent(a['util']['><span title='][', '](d)), c = 'csv'
                     }
                     e[', '](', ', ', ' + c[', ']() + ', ' + f), e[', '](', ', b + ' id=' + c), e['click']()
                 },
                 getPlaylistCSV: function (a) {
                     var b = ', ';
                     if (!a || !a['length']) return b;
                     for (var c in a) {
                         b += ', ' + (parseInt(c) + 1) + ', ', b += ', ' + a[c]['active'] + ', ', b += ', ' + a[c][', '] + ', ', b += ', ' + a[c]['id'] + ', ', b += ', ' + a[c][', '] + ', ', b += ', ';
                         for (var d in a[c][', ']) b += ', ', b += ', ' + a[c][', '][d][', '] + ', ', b += ', ' + a[c][', '][d][', '] + ', ', b += ', ' + a[c][', '][d]['join'] + ', ', b += ', ' + a[c][', '][d]['user_join'] + ', ', b += ', ' + a[c][', '][d]['id'] + ', ', b += ', ' + a[c][', '][d][', '] + ', ', b += ', ' + a[c][', '][d][', '] + ', ', b += ', ' + a[c][', '][d]['commands'] + ', '
                     }
                     return b
                 }
             },
             user: {
                 getUserID: function (a) {
                     if (null == a) return -1;
                     var b = API['negative']();
                     for (var c in b) if (a == b[c][' target=']) return b[c]['id'];
                     return -1
                 },
                 getNickUserByMention: function (a, b) {
                     if (b['length'] <= a) return null;
                     for (var c = b[a], d = a + 1; d < b['length']; d++) c += '>\', \'<div><p id=' + b[d];
                     return c['substring'](1)
                 },
                 getIDUserByMention: function (b, c) {
                     if (b == c['length']) return API[' style=']()['id'];
                     var d = a['util'][', \'<ul style='][', '](a['util'][', \'<ul style='][', '](b, c));
                     return -1 == d && API[', '](', ', !0), d
                 },
                 getRank: function (a) {
                     var b = a[' id='],
                         c = '';
                     if (a[', ']) switch (a[', ']) {
                     case 5:
                         b = 10;
                     case 4:
                     case 3:
                     case 2:
                         b = 8;
                     default:
                         return b = 6, a[' id=']
                     }
                     switch (b) {
                     case 10:
                         c = ', ';
                         break;
                     case 8:
                         c = ', ';
                         break;
                     case 5:
                         c = ', ';
                         break;
                     case 4:
                         c = ', \'<i class=';
                         break;
                     case 3:
                         c = '></i>\', ';
                         break;
                     case 2:
                         c = ', ';
                         break;
                     case 1:
                         c = ', ';
                         break;
                     case 0:
                         c = ', ';
                         break;
                     default:
                         c = ', '
                     }
                     return c
                 }
             },
             owapi: {
                 fpublic: {
                     chat: {
                         event: []
                     }
                 },
                 executeAssync: function (a, b, c) {
                     setTimeout(function () {
                         a(b)
                     }, c)
                 },
                 event: function (b, c) {
                     if (b[', ']() == 'chat' && Array[', '](a['util'][', '][', ']['chat'][', ']) && a['util'][', '][', ']['chat'][', ']['length']) for (var d in a['util'][', '][', ']['chat'][', ']) a['util'][', '][', \'div[class*='](a['util'][', '][', ']['chat'][', '][d], c, 0)
                 }
             }
         },
         commands: {
             lock: function () {
                 API[']\', '](!0)
             },
             cmd: function () {
                 var d = '';
                 for (var e in a[', ']) d += (d ? ', ' : '') + ', ' + e;
                 a['util']['chat'][' id='](null, a['util'][' style='](''), d, a['util']['chat']['parseLang'](', '), a['util'][' style='](', '))
             },
             unlock: function () {
                 API[']\', '](!1)
             },
             reload: function () {
                 API[', '](a['util']['chat']['parseLang'](', ')), a[' style='][', ']()
             },
             reset: function (b, c) {
                 (1 == c['length'] || c[1] && c[1][', ']() == ', ') && (delete localStorage[', '], API[', '](a['util']['chat']['parseLang'](', ')), a[' style='][', ']())
             },
             kill: function () {
                 a[' style='][', ']()
             },
             lang: function (b, c) {
                 if (1 == c['length']) {
                     var d = '';
                     for (var e in a['tmp']['itens'][', ']) d += (d ? ');width:' : '') + ', \'{' + a['util']['chat']['parseLang'](':true}\', \'{') + ':false}\', ' + e + ', \'{' + a['tmp']['itens'][', '][e][', '] + ', ';
                     var f = a['util']['chat']['parseLang'](d ? ':\', ' : ', \',');
                     return a['util']['chat'][' id='](null, a['util'][' style='](''), d ? d : '', f, a['util'][' style='](', ')), void 0
                 }
                 c[1] && a['tmp']['itens'][', '][c[1][', ']()] && a['attr'][', '][':'] != c[1] && (a['attr'][', '][':'] = c[1][', '](), a['storage']['save'](), a[' style='][', ']())
             },
             theme: function (b, c) {
                 var d = a['tmp']['itens'][', '][a['tmp']['commands']],
                     e = c[1];
                 return e && e[', ']() == 'bg' ? (d[' size='] && a['gui']['events']['tbg'](d[' size=']), void 0) : (e = parseInt(c[1]), c['length'] <= 1 || isNaN(e) || 1 > e || !d['}\', '] ? d && d['}\', '] ? (a['util']['chat'][' id=']('', a['util'][' style='](', '), a['util']['chat']['parseLang'](':', {
                     Themes: d['}\', ']['length']
                 })), void 0) : (a['util']['chat'][' id=']('', a['util'][' style='](', '), a['util']['chat']['parseLang'](', \'{')), void 0) : e <= d['}\', ']['length'] ? (a['gui']['events']['tbg'](d['}\', '][e - 1]), a['util']['chat'][' id=']('', a['util'][' style='](', '), a['util']['chat']['parseLang'](',', {
                     Theme: e
                 })), void 0) : (a['util']['chat'][' id=']('', a['util'][' style='](', '), a['util']['chat']['parseLang'](':', {
                     Themes: d['}\', ']['length']
                 })), void 0))
             },
             cycle: function () {
                 $(':\', ')['click']()
             },
             skip: function () {
                 API['match']()
             },
             image: function () {
                 var d = API['>Click here</a></h3></li>\', \'<li><h3>Bug report: <a href=']();
                 1 == d['user_join'] && a['util']['chat'][' id='](', ', a['util'][' style='](', '), a['util']['chat']['parseLang'](', ') + ', ' + d[', '] + ', ' + a['util']['chat']['parseLang'](', ') + ', ')
             },
             origem: function (a, b) {
                 return 2 == b['length'] && b[1][', ']() == ', ' ? (API[', '](', '), void 0) : (API[', '](', '), void 0)
             },
             link: function () {
                 var d = API['>Click here</a></h3></li>\', \'<li><h3>Bug report: <a href=']();
                 1 == d['user_join'] ? a['util']['chat'][' id='](', ', a['util'][' style='](', '), a['util']['chat']['parseLang'](', \'') + 'documentElement' + d[', '] + '>\', ' + a['util']['chat']['parseLang'](', ') + ', ') : SC[', '](', ', {
                     ids: d[', ']
                 }, function (b) {
                     a['util']['chat'][' id='](', ', a['util'][' style='](', '), a['util']['chat']['parseLang'](', \'') + 'serializeToString' + b[0][', '] + '>\', ' + a['util']['chat']['parseLang'](', ') + ', ')
                 })
             },
             lockskip: function (b, c) {
                 if (API[' style=']()[' id='] < 3 && !API[' style=']()[', ']) return API[', '](a['util']['chat']['parseLang']('>\r								<div class=')), void 0;
                 var d = c[1];
                 d = d && !isNaN(d) && d <= API['>Click here</a></h3></li>\', \'<li><h3> Plug DJ room: <a href=']()['length'] ? d : 1, a['util']['staff']['lockskip'](d)
             },
             whois: function (b, c) {
                 var d = a['util'][', \'<ul style=']['\', \'title type='](1, c); - 1 != d && a['util']['</div></div></div>']('>\', \'</title><content type=' + d, ' style=', null, function (b) {
                     var c = b['data'][0];
                     a['util']['chat'][' id='](null, a['util'][' style='](' id='), '>\', ' + c[' target='] + ', ' + c['id'] + ', ' + c['pop'] + ', ' + API['negative']()['length'] + ', ' + c[', '] + ', ' + a['util'][', \'<ul style='][', '](API[' style='](c['id'])) + ', ' + (c[', '] ? ', ' + c[', '] + ', ' : '') + (c[', '] ? ', ' + c[', '] + ', ' : '') + (c[', '] ? ', ' + c[', '] + ', ' : ''))
                 })
             },
             addfriend: function (b, c) {
                 var d = a['util'][', \'<ul style=']['\', \'title type='](1, c); - 1 != d ? a['util']['</div></div></div>'](', ', '>@</span></td><td width=', JSON[' style=']({
                     id: d
                 }), function (b) {
                     b[' style='] == '>\', ' && a['util']['chat'][' id='](', ', a['util'][' style='](''), a['util']['chat']['parseLang'](', \'title=', {
                         User: API[' style='](d)[' target=']
                     }), a['util']['chat']['parseLang'](' style='), a['util'][' style='](', '))
                 }) : API['\');\"'](a['util']['chat']['parseLang'](' onclick='), !0)
             },
             maxlength: function (b, c) {
                 if (1 == c['length']) return a['util']['chat'][' id=']('', a['util'][' style='](''), a['util']['chat']['parseLang']('<br/>', {
                     Time: a['util']['getTimeString'](a['attr']['ml'])['substring'](3) || a['util']['chat']['parseLang']('off')
                 }), a['util']['chat']['parseLang']('max_len'), a['util'][' style='](', ')), void 0;
                 var d = -1;
                 if (isNaN(c[1])) if (c[1][', \'<div id='](/\d{1,2}\:\d{1,2}/)) {
                     var e = c[1][', '](', '),
                         f = parseInt(e[0]),
                         g = parseInt(e[1]);
                     d = f > 10 || g > 59 ? -1 : 60 * f + g
                 } else d = -1;
                 else d = Math['DJ'](parseInt(c[1]));
                 return -1 >= d || d > 600 ? (a['util']['chat'][' id=']('', a['util'][' style='](''), a['util']['chat']['parseLang']('<span '), a['util']['chat']['parseLang']('max_len'), a['util'][' style='](', ')), void 0) : (a['gui']['events']['>'](d), a['util']['chat'][' id=']('', a['util'][' style='](''), a['util']['chat']['parseLang']('<br/>', {
                     Time: a['util']['getTimeString'](a['attr']['ml'])['substring'](3) || a['util']['chat']['parseLang']('off')
                 }), a['util']['chat']['parseLang']('max_len'), a['util'][' style='](', ')), void 0)
             },
             playlists: function () {
                 a['tmp'][' style='] = [], a['util']['><span title=']['pl_list']()
             },
             "export": function (b, c) {
                 a['tmp']['href='][', '] = c[1] || 'csv', API[', ']('getPlaylist'), a['util']['><span title='][', ']()
             },
             addvideo: function (b, c) {
                 if (1 == c['length']) return API[', ']('json'), void 0;
                 if (2 == c['length']) return a['util']['><span title=']['pl_list'](['dlpl', c[1]]), void 0;
                 if (!isNaN(c[1]) && c[1] <= a['tmp'][' style=']['length'] && c[1] >= 1) {
                     if (200 == a['tmp'][' style='][parseInt(c[1] - 1)][', ']) return API[', '](a['util']['chat']['parseLang']('plcont'), !0), void 0;
                     a['util']['><span title=']['items'](a['tmp'][' style='][parseInt(c[1]) - 1], c[2])
                 }
             },
             autograb: function (b, c) {
                 if (1 == c['length']) return a['util']['><span title=']['pl_list'](['count']), void 0;
                 if (c[1] && c[1][', ']() == 'off') return a['tmp'][' target='] = !1, API[', '](a['util']['chat']['parseLang']('cont'), !0), void 0;
                 if (!isNaN(c[1]) && c[1] <= a['tmp'][' style=']['length'] && c[1] >= 1) {
                     if (200 == a['tmp'][' style='][parseInt(c[1]) - 1][', ']) return API[', '](a['util']['chat']['parseLang']('plcont'), !0), void 0;
                     a['tmp'][' target='] = !0, a['tmp'][' id='] = parseInt(c[1]) - 1, API[', '](a['util']['chat']['parseLang']('/media'), !0), API[' style=']()['ow_site'] || a['util']['ow_site']['>Click here</a></h3></li>\', \'<li><h3>Bug report: <a href='](a['tmp'][' style='][a['tmp'][' id=']])
                 }
             },
             delicia: function (b, c) {
                 if (a['attr'][', '][':'] != 'getItensPlaylist') return API[', ']('icont', !0), void 0;
                 var d = a['tmp']['itens'][', ']['length'];
                 if (null == c[1] || null == c[2]) return API[', ']('https://youtu.be/' + d + '/tracks', !0), API[', ']('parseSCResponse' + d + 'get', !0), API[', ']('threadDone' + d + 'permalink_url', !0), void 0;
                 if (c[1][', ']() == ', ') {
                     if (isNaN(c[2]) || parseInt(c[2]) < 0 || parseInt(c[2]) > d) return API[', ']('Done! Playlists: ' + d + ')', !0), void 0;
                     document[', '](', ' + (0 == c[2] ? Math[', '](Math[', ']() * d) + 1 : c[2]))[', ']()
                 }
                 if (c[1][', ']() == ', items: ') {
                     if (c[2][', ']() == 'off' || c[2] < 0) return a['attr'][', \'[data-cid^='][']\', '] = -1, API[', '](' (', !0), a['storage']['save'](), void 0;
                     if (0 == c[2]) return a['attr'][', \'[data-cid^='][']\', '] = 0, API[', '](' soundcloud musics)', !0), a['storage']['save'](), void 0;
                     if (isNaN(c[2]) || parseInt(c[2]) < 0 || parseInt(c[2]) > d) return API[', ']('Done! Playlists: ' + d + ')', !0), void 0;
                     a['attr'][', \'[data-cid^='][']\', '] = c[2], API[', ']('playlists' + (0 == c[2] ? 'fmt' : c[2]), !0), a['storage']['save']()
                 }
             },
             pm: function (b, c) {
                 if (1 == c['length']) {
                     var b = '';
                     for (var d in a['tmp']['pm'][', ']) {
                         var e = API[' style='](a['tmp']['pm'][', '][d])[' target='];
                         e && (b += (b ? ');width:' : '') + ', \'{' + a['util']['chat']['parseLang']('pbgp', {
                             User: e
                         }) + 'getAsFile' + e + 'a' + e + ', ')
                     }
                     var f = a['util']['chat']['parseLang'](b ? 'createElement' : '﻿');
                     return a['util']['chat'][' id='](null, a['util'][' style='](''), b ? b : '', f, a['util'][' style='](', ')), void 0
                 }
                 if (c[1] && c[1][', ']() == 'getPlaylistCSV') return API[', '](a['util']['chat']['parseLang']('href'), !1), void 0;
                 if (!c[1] || -1 != c[1]['indexOf'](', \'#chat .cm[data-cid^=')) {
                     var g = Math['DJ'](((new Date)[', ']() - a['tmp']['pm']['data:text/']) / 1e3);
                     if (3 > g) return API[', '](a['util']['chat']['parseLang'](';charset=utf-8,'), !0), void 0;
                     var h = b['substring'](b['indexOf'](', \'#chat .cm[data-cid^=') + 1, b['indexOf'](', '))['trim'](),
                         i = b['substring'](b['indexOf'](', ') + 1)['trim'](),
                         j = API['negative'](),
                         k = null,
                         l = null;
                     for (var d in j) if (j[d][' target='] == h) {
                         k = 'id', l = j[d]['id'];
                         break
                     }
                     l || (k = 'setAttribute', l = h), a['socket']['session']['msg']({
                         m: 'pm',
                         t: k,
                         to: l,
                         from: API[' style=']()['id'],
                         d: i
                     }), a['tmp']['pm']['data:text/'] = (new Date)[', ']()
                 }
             },
             pmall: function (b, c) {
                 if (1 == c['length']) return API[', '](a['util']['chat']['parseLang']('download'), !1), void 0;
                 var d = Math['DJ'](((new Date)[', ']() - a['tmp']['pm']['data:text/']) / 1e3);
                 return 3 > d ? (API[', '](a['util']['chat']['parseLang'](';charset=utf-8,'), !0), void 0) : (a['socket']['session']['msg']({
                     m: 'index',
                     from: API[' style=']()['id'],
                     d: b['substring'](c[0]['length'] + 1)['trim']()
                 }), a['tmp']['pm']['data:text/'] = (new Date)[', '](), void 0)
             }
         },
         storage: {
             load: function () {
                 if (localStorage[', ']) {
                     try {
                         a['attr'] = JSON[', '](localStorage[', '])
                     } catch (b) {}
                     null == a['attr']['pc'] && (a['attr']['pc'] = !0), null == a['attr']['ct'] && (a['attr']['ct'] = !0), a['attr']['active'] && (a['attr']['uuj'] = !0, a['attr']['uul'] = !0), null == a['attr']['ml'] && (a['attr']['ml'] = 390), null == a['attr']['gm'] && (a['attr']['gm'] = !0), null == a['attr']['gm'] && (a['attr']['gm'] = !0), null == a['attr']['chatColors'] && (a['attr']['chatColors'] = {
                         you: 'FFDD6F',
                         admin: '42A5DC',
                         ba: '89BE6C',
                         host: 'ac76ff',
                         cohost: 'ac76ff',
                         manager: 'ac76ff',
                         bouncer: 'ac76ff',
                         resdj: 'ac76ff',
                         normal: '777f92'
                     })
                 }
             },
             save: function () {
                 localStorage[', '] = JSON[' style='](a['attr'])
             }
         },
         main: {
             init: function () {
                 window['count'] = !0, SockJS['id']['msg'] || (SockJS['id']['msg'] = function (a) {
                     3 != this['name'] && this['author'](JSON[' style='](a))
                 }), $('cid')['remove'](), $('head')['append']('duration'), a['util']['format'](), a['storage']['id'](), a[' style=']['image']()
             },
             loadItens: function () {
                 $['</div></div></div>']({
                     cache: !1,
                     url: 'title',
                     dataType: 'type=',
                     success: function (b) {
                         a['tmp']['itens'] = b, a['util']['room']['refreshCustomSettings'](), a['util']['room']['refreshChatTheme'](), a[' style=']['url']()
                     },
                     error: function () {
                         window['count'] = !1, API[', ']('\', \'', !0)
                     }
                 })
             },
             loadEmotes: function () {
                 $['</div></div></div>']({
                     cache: !1,
                     url: ',,,,,,,\n',
                     dataType: 'type=',
                     success: function (b) {
                         for (var c in b) for (var d in b[c]) a['tmp']['emotes'][d] = b[c][d]
                     },
                     error: function () {
                         window['count'] = !1, API[', '](a['util']['chat']['parseLang'](',,,,,'), !0)
                     }
                 })
             },
             loadLang: function () {
                 a['tmp']['itens'][', '][a['attr'][', '][':']] || (a['attr'][', '][':'] = a['tmp']['itens'][', '][API[' style=']()['image']] ? API[' style=']()['image'] : '\n\', '), $['</div></div></div>']({
                     cache: !1,
                     url: a['tmp']['itens'][', '][a['attr'][', '][':']]['commands'],
                     dataType: 'type=',
                     success: function (b) {
                         a['tmp'][', '][', '] = b, a[' style='][', '](), a[' style='][', ']()
                     },
                     error: function () {
                         window['count'] = !1, API[', '](', ', !0)
                     }
                 })
             },
             reload: function () {
                 a[' style='][', '](), $[', '](a['tmp'][', '])
             },
             end: function () {
                 a[' style='][', ']()
             },
             loadItems: function () {
                 if (a['util']['chat'][' id='](', ', a['util'][' style=']('active'), a['util']['chat']['parseLang'](', ', {
                     Version: a['tmp'][', ']
                 })), a['util']['chat'][' id='](', ', a['util'][' style='](', '), a['util']['chat']['parseLang'](', ') + ', ' + a['util']['chat']['parseLang'](', \'<div id=') + '>\', ' + a['util']['chat']['parseLang'](', ') + ', '), a['attr']['pc'] ? (a['socket']['stop'] = !1, a['socket']['init']()) : a['socket']['stop'] = !0, a['gui']['util'][', '](), a['gui']['util']['generateColorCss'](), a['gui']['util'][', '](), a['gui']['util'][', '](), a[' style='][', '](), a['util']['eta']['getMed'](), a['util']['eta']['threadUpdate'](), a[', ']['init'](), a['attr']['bg'] && a['gui']['events']['tbg'](a['attr']['bg']), a['attr']['aw'] && $('#woot')['click'](), a['attr']['aj'] && a['util']['joinQueue'](), a['attr']['hv'] && $('#playback')[', '](), a['attr']['fs']) {
                     var b = $('#dj-button'),
                         c = $('#avatars-container');
                     a['attr']['fs'] ? (b['hide'](), c['hide']()) : (b['show'](), c['show']()), a['gui']['util']['fullScreen']()
                 }
                 a['util']['gui']['applyStaffColors'](a['attr']['sc']), a['gui']['util']['hideVideo'](), a[' style='][', ']['init'](), a['util']['ul']['userListSort']()
             },
             addEvents: function () {
                 $('head')['append']($(', ', {
                     id: ', ',
                     src: ', '
                 })), $(', ')['on']('click', {
                     bg: a['tmp']['itens']['bgs'][0]
                 }, a['gui']['events'][', ']);
                 for (var b = 1; b < a['tmp']['itens']['bgs']['length']; b++) $(', ' + (b - 1))['on']('click', {
                     bg: a['tmp']['itens']['bgs'][b]
                 }, a['gui']['events'][', ']);
                 if (API[' style=']()['image'] == 'getItensPlaylist') for (var b = 0; b < a['tmp']['itens'][', ']['length']; b++) $('head')['append']($(', ', {
                     id: ', ' + (b + 1),
                     src: a['tmp']['itens'][', '][b]
                 }));
                 else delete a['tmp']['itens'][', '];
                 window[', '] = a['util'][', '][', ']['chat'], $(', ')['click'](a['gui']['events'][', ']), $('#origem-menu-page-selector')['langChange_title'](a['gui']['events'][', \'<span title=']), $(' style=')['on']('click', function () {
                     a['gui']['events']['<p>']('backgrounds')
                 }), $(' onclick=')['on']('langChange_title', a['gui']['events']['aw']), $('\');\">')['on']('langChange_title', a['gui']['events']['aj']), $('langList')['on']('langChange_title', a['gui']['events']['hv']), $('langList_fail')['on']('langChange_title', a['gui']['events']['fs']), $(_0x97a1[1e3])['on']('langChange_title', a['gui']['events']['sm']), $('temas')['on']('langChange_title', a['gui']['events']['sg']), $('notheme')['on']('langChange_title', a['gui']['events']['uuj']), $('themes_list')['on']('langChange_title', a['gui']['events']['fj']), $('theme_en')['on']('langChange_title', a['gui']['events']['uul']), $('image_link')['icon icon-chat-imagelink'](a['gui']['events']['.cycle-toggle']), $('_blank')['on']('click', a['gui']['events']['http://i.ytimg.com/vi/\', \'/maxresdefault.jpg']), $('ext')['on']('langChange_title', a['gui']['events']['clk_here']), $('OrigemWoot link: http://goo.gl/C7Nb85')['on']('langChange_title', a['gui']['events']['OrigemWoot Chrome Extension: http://goo.gl/00Fs6N']), $('#afkmessage')['song_link'](a['gui']['events']['icon icon-chat-songlink']), $('#bgurl')['song_link'](a['gui']['events']['https://youtu.be/\', \'&nbsp;<a href=']), $('https://plug.dj/_/users/')['on']('langChange_title', a['gui']['events']['getIDUserByMention']), $('</span><br>ID: <span>')['on']('click', function () {
                     a['gui']['events']['Username: <span>'](0)
                 }), $('</span><br>Level: <span>')['on']('click', function () {
                     a['gui']['events']['Username: <span>'](1)
                 }), $('</span><br>Users: <span>')['langChange_title'](function () {
                     a['gui']['events']['Username: <span>'](parseInt($(this)['val']()))
                 }), $('</span><br>Joined: <span>')['on']('click', a['util']['staff']['lockskip']), $('</span><br>Rank: <span>')['on']('click', a['util']['staff']['joined']), $('xp')['on']('click', a['util']['staff']['getRank']), $('ep')['on']('click', a['util']['staff']['<br>Xp: <span>']), $('slug')['on']('langChange_title', a['gui']['events']['<br>Plug Points: <span>']), $('https://plug.dj/_/friends')['on']('click', function () {
                     window['_blank']('https://plug.dj/@/\', \'')
                 }), $('icon icon-add-friend')['on']('langChange_title', a['gui']['events']['id']), $('addfriend_reqdone')['on']('langChange_title', a['gui']['events']['pc']), $('addfriend')['on']('langChange_title', a['gui']['events']['ct']), $('chaLog')['on']('langChange_title', a['gui']['events']['user_notfound']), $('max_length_val')['on']('langChange_title', a['gui']['events']['gm']), $('max_length_valerr')['on']('langChange_title', a['gui']['events']['hc']), $('#slider-maxLength')['on']('maxLength', a['gui']['events']['>']), $('listByCommand')['on']('langChange_title', a['gui']['events']['eta']), $('addvideo')['on']('Loading playlists and links, wait...', function () {
                     a['gui']['events']['URL missing. Try /addvideo youtube_url']($(this)['attr'](', '))
                 }), $('addVideoByURL')['on']('click', function () {
                     var b = $(this)['attr'](', '),
                         c = $(this)[', ']()['width=']('pl_full');
                     c['val'](b), a['gui']['events']['URL missing. Try /addvideo youtube_url'](c['attr'](', '))
                 }), $('#dj-button')['ag_off']('autograb', a['util']['eta']['ulpp']);
                 var c = {
                     distance: 20,
                     handle: 'image_link',
                     start: function () {
                         a['gui']['control']['lockdrag'] = !0
                     },
                     stop: function (b, c) {
                         a['gui']['control']['lockdrag'] = !1, a['attr'][', ']['custEmotes'] = c['position'], a['storage']['save']()
                     }
                 },
                     d = {
                         distance: 20,
                         handle: 'ag_on',
                         stop: function (b, c) {
                             a['attr'][', ']['bg'] = c['position'], a['storage']['save']()
                         }
                     },
                     e = {
                         handle: 'pt',
                         stop: function (b, c) {
                             a['attr'][', ']['ul'] = c['position'], a['storage']['save']()
                         }
                     };
                 void 0 == $['Command not avaliable to your language.'] ? $[', ']('Receba uma menção deliciosa com ', function () {
                     $('#origemscriptOther')[' sons diferentes! Para escolher ou ouvir as delícias, use os seguintes comandos:'](d), $('/delicia play 0 - sendo 0 para ouvir um som aleatório ou um valor entre 1 e ')[' sons diferentes! Para escolher ou ouvir as delícias, use os seguintes comandos:'](c), $('#plugbot-userlist')[' sons diferentes! Para escolher ou ouvir as delícias, use os seguintes comandos:'](e)
                 }) : ($('#origemscriptOther')[' sons diferentes! Para escolher ou ouvir as delícias, use os seguintes comandos:'](d), $('/delicia play 0 - sendo 0 para ouvir um som aleatório ou um valor entre 1 e ')[' sons diferentes! Para escolher ou ouvir as delícias, use os seguintes comandos:'](c), $('#plugbot-userlist')[' sons diferentes! Para escolher ou ouvir as delícias, use os seguintes comandos:'](e)), $('Som inválido! (0-')['align='](function () {
                     $('autoWoot')['append'](' para ouvir uma delícia específica;' + API['>Click here</a></h3></li>\', \'<li><h3>Bug report: <a href=']()[', '] + ', ' + API['>Click here</a></h3></li>\', \'<li><h3>Bug report: <a href=']()[', '] + '/delicia set 0 - sendo 0 para definir um som aleatório ou um valor entre 1 e ')
                 }, function () {
                     $(' para ouvir uma delícia específica ao receber uma menção, ou off para desativar.')['remove']()
                 }), $('addVideoByURL')['align='](function () {
                     var b = $(this)['set']()['top'] - 20,
                         c = $(this)['set']()['left'] + 20;
                     $('autoWoot')['append']('Delícia desativada!' + b + 'A delícia será tocada aleatoriamente!' + c + 'Som delícia definido: som ' + a['util']['chat']['parseLang']('aleatório') + '/delicia set 0 - sendo 0 para definir um som aleatório ou um valor entre 1 e ')
                 }, function () {
                     $(' para ouvir uma delícia específica ao receber uma menção, ou off para desativar.')['remove']()
                 }), $('image_link')['on'](': \').focus();\">', function () {
                     $('autoWoot')['append']('pm_users' + a['util']['chat']['parseLang']('pm_none') + 'info'), $(' para ouvir uma delícia específica ao receber uma menção, ou off para desativar.')['append']('pm_help')['css']('left', $('image_link')['set']()['left'] - 44)['css']('top', $('image_link')['set']()['top'] - 22)
                 })['on'](' onclick=', function () {
                     $(' para ouvir uma delícia específica ao receber uma menção, ou off para desativar.')['remove']()
                 })['on'](' style=', function () {
                     $(' para ouvir uma delícia específica ao receber uma menção, ou off para desativar.')['remove']()
                 }), window[', '] = [], window[', ']['style='] = a['gui']['util']['style='], $('pmall')['width=']('pm_allusers')['nick']('lspm' + 'pm_interv' + '>Default BG</p></div>\', \'<div><p id='), $('owc')['on'](': \').focus();\">', function () {
                     $('autoWoot')['append']('jl'), $(' para ouvir uma delícia específica ao receber uma menção, ou off para desativar.')['append']('pm_help')['css']('left', $('owc')['set']()['left'] - 97)['css']('top', $('owc')['set']()['top'] - 34)
                 })['on'](' onclick=', function () {
                     $(' para ouvir uma delícia específica ao receber uma menção, ou off para desativar.')['remove']()
                 })['on'](' style=', function () {
                     $(' para ouvir uma delícia específica ao receber uma menção, ou off para desativar.')['remove']()
                 }), jQuery['</div></div></div>']({
                     type: ' style=',
                     dataType: ', ',
                     url: 'prototype',
                     success: function () {
                         var a = {
                             hwacceleration: !0,
                             horizrailenabled: !1,
                             autohidemode: !1,
                             hidecursordelay: 0
                         };
                         $('#origemscriptOther')['readyState'](), $('#plugbot-userlist')['readyState'](), $(' tabindex=')['readyState'](a)
                     }
                 }), $(window)['resize'](a['send']['events']['resize']), $(document)['owmenucss'](a['send']['events']['owmenucss'])['song_link'](a['send']['events']['song_link']), API['on'](a['owmenucss']['events']), a[' style='][' id=']['init']()
             },
             remEvents: function () {
                 API['off'](a['owmenucss']['events']), a['tmp'][' id='] && a[' style='][' id='][' id=']['off']('stylesheet', a[' style='][' id=']['text/css']), a['util']['room']['removeCustomSettings'](), a['socket']['stop'] = !0;
                 for (var b in a['snd']) window['https://dl.dropboxusercontent.com/s/aezb86stwsc6glu/OrigemCSS-main.css'](a['snd'][b]);
                 try {
                     a['socket']['session']['close']()
                 } catch (c) {}
                 $(', ')['off'](), a['gui']['events']['tbg'](a['tmp']['itens']['bgs'][0]), $(document)['off']('click', a[', ']['transferConfigs']), $(document)['off']('maxLength', a[', ']['transferConfigs']), $(document)['off']('owmenucss', a['send']['events']['owmenucss']), $(document)['off']('song_link', a['send']['events']['song_link']), $(window)['off']('resize', a['send']['events']['resize']), $('#dj-button')['load']('autograb', a['util']['eta']['ulpp']), $('.origem-menu-opener')['off'](), $('.origem-menu-container')['off'](), $('#origem-menu-page-selector')['off'](), $(' style=')['off'](), $('image_link')['off'](), $('loadItens')['remove'](), $('icon icon-chat-\', \'</span><div class=')['remove'](), $('https://dl.dropboxusercontent.com/s/a8qt772ropw99mu/itens.json')['width=']('pl_full')['off'](), $('https://dl.dropboxusercontent.com/s/a8qt772ropw99mu/itens.json')['width=']('loadLang')['off'](), $('https://dl.dropboxusercontent.com/s/a8qt772ropw99mu/itens.json')['width=']('Failed to load default settings from Origem Woot, refresh or try again!')['off'](), $('https://dl.dropboxusercontent.com/s/a8qt772ropw99mu/itens.json')['width=']('https://dl.dropboxusercontent.com/s/3y8esza21i4v5i5/Emotes.json')['off'](), $('owc')['off'](), $('Som inválido! (0-')['off'](), $['Command not avaliable to your language.'] && ($('#origemscriptOther')[' sons diferentes! Para escolher ou ouvir as delícias, use os seguintes comandos:']('loadEmotes_fail'), $('/delicia play 0 - sendo 0 para ouvir um som aleatório ou um valor entre 1 e ')[' sons diferentes! Para escolher ou ouvir as delícias, use os seguintes comandos:']('loadEmotes_fail'), $('#plugbot-userlist')[' sons diferentes! Para escolher ou ouvir as delícias, use os seguintes comandos:']('loadEmotes_fail'));
                 try {
                     $('#plugbot-userlist')['getNiceScroll']()['remove'](), $(' tabindex=')['getNiceScroll']()['remove']()
                 } catch (c) {}
                 $('ul-icon-grab')['remove'](), $('#plugbot-userlist')['remove'](), $('owc')['remove'](), $('language')['remove'](), $('lastPlay')['remove'](), $('.origem-menu-opener')['remove'](), $('.origem-menu-container')['remove'](), $('#origem-menu-page-selector')['remove'](), $(' style=')['remove'](), delete window[', '], delete window[', '], window['count'] = !1
             },
             context: {
                 context: null,
                 wlc: null,
                 id: API[' style=']()['id'],
                 preChat: function (b) {
                     a['owmenucss']['events']['chat'](b, !0);
                     var c = a['attr']['gm'] ? a[' style='][' id='][' id=']['loadEmotes']['stylesheet'][2][' id=']['en'] : '';
                     a[' style='][' id='][' id=']['loadEmotes']['stylesheet'][2][' id=']['en'] = c
                 },
                 waitListChange: function () {
                     if (a['attr']['aj']) try {
                         var b = a[' style='][' id='][' target='][' style='];
                         !b['loadItems'] && b['Failed to load lang, refresh or try again later!']['length'] < 50 && -1 == b['Failed to load lang, refresh or try again later!']['indexOf'](id) && b['text cid-undefined'] != id && $['</div></div></div>']({
                             type: '>@</span></td><td width=',
                             url: 'script',
                             contentType: '>\', \'</span></div></td></tr><tr><td width='
                         })
                     } catch (c) {
                         a['util']['joinQueue']()
                     }
                 },
                 init: function () {
                     try {
                         if (a[' style='][' id='][' id='] = require[' style=']['></i></div></td><td width='][' style=']['><i class=']['getScript'], !a[' style='][' id='][' id=']) return a['tmp'][' id='] = !1, void 0;
                         a['tmp'][' id='] = !0, a[' style='][' id='][' id=']['on']('stylesheet', a[' style='][' id=']['text/css']), a[' style='][' id='][' id=']['loadEmotes']['stylesheet']['scrollTop'](a[' style='][' id='][' id=']['loadEmotes']['stylesheet']['user_dc']()), window[' id='] = a[' style='][' id='][' id=']
                     } catch (b) {
                         a['tmp'][' id='] = !1
                     }
                     try {
                         a[' style='][' id='][' target='] = require[' style=']['></i></div></td><td width='][' style=']['><i class=']['remEvents'], a[' style='][' id='][' id=']['on']('icon icon-origem-active', a[' style='][' id=']['owload']), a[' style='][' id='][' id=']['loadEmotes']['icon icon-origem-active'][1][' id='] = a[' style='][' id='][' id=']['loadEmotes']['icon icon-origem-active'][0][' id='], a[' style='][' id='][' id=']['loadEmotes']['icon icon-origem-active'][1]['version'] = a[' style='][' id='][' id=']['loadEmotes']['icon icon-origem-active'][0]['version']
                     } catch (b) {
                         a[' style='][' id='][' target='] = null
                     }
                 }
             },
             updateRoom: {
                 init: function () {
                     a['snd']['icon icon-clock-orange'] = setInterval(function () {
                         a['tmp']['commands'] != document['location']['pathname']['substring'](1) && API['negative']()['length'] && (a['tmp']['commands'] = document['location']['pathname']['substring'](1), a[' style='][', '][', ']())
                     }, 1e3)
                 },
                 test: function (b) {
                     a['tmp']['commands'] = document['location']['pathname']['substring'](1), a['socket']['session']['msg']({
                         m: 'room',
                         d: a['tmp']['commands']
                     }), a['util']['eta']['getMed'](), a['util']['eta']['threadUpdate'](), a['util']['room']['refreshCustomSettings'](), a['attr']['aw'] && !API[' style=']()['><span>OK</span></div></div>\', '] && setTimeout(a[' style='][', '][' id='], 1e3), a[' style='][', ']['ow_loaded'](b)
                 },
                 woot: function () {
                     $('#woot')['click'](), -1 == $('#woot')['attr']('>Sweet</a> <a href=')['indexOf'](', ') && setTimeout(a[' style='][', '][' id='], 1e3)
                 },
                 test2: function () {
                     try {
                         a['util']['joinQueue'](), a['attr']['ul']['on'] && a['util']['ul']['userListSort']()
                     } catch (c) {
                         console['\', '](c), setTimeout(a[' style='][', ']['ow_loaded'], 1e3)
                     }
                 }
             }
         },
         socket: {
             url: ', ',
             interv: 5,
             stop: !1,
             session: null,
             init: function () {
                 a['socket']['session'] = 0 == a['socket']['commands'][', ']()['indexOf'](', ') ? new WebSocket(a['socket']['commands']) : new SockJS(a['socket']['commands']), a['socket']['session'][', '] = function () {
                     console['\', '](', '), a['socket']['session']['msg']({
                         m: ', ',
                         puser: API[' style='](),
                         room: document['location']['pathname']['substring'](1)
                     })
                 }, a['socket']['session'][', '] = function (b) {
                     var c;
                     try {
                         c = JSON[', '](b['data'])
                     } catch (d) {
                         return
                     }
                     if (a['util'][', '][', ']('chat', c), c[' style='] == 'pm') {
                         var e = {
                             User: c[', '] == 'id' ? API[' style='](c[', '])[' target='] || c[', '] : c[', '] + ', ' + c[', '] + ')',
                             Message: ''
                         };
                         if (a['util']['chat'][' id='](', ', a['util'][' style='](''), a['util']['chat'][', '](c[', ']), a['util']['chat']['parseLang'](c[' style='], e), a['util'][' style=']('')), a['gui']['util'][', '](API[' style='](c[', '])[' target='] || c[', ']), a['util']['chat']['>\', '](), a['attr']['afk']['on'] && a['attr']['afk']['msg']) {
                             var f = (new Date)[', ']();
                             (!a['tmp']['afk']['pm'][c[', ']] || Math['DJ']((f - a['tmp']['afk']['pm'][c[', ']]['ls']) / 1e3) > 300) && (a['socket']['session']['msg']({
                                 m: 'pm',
                                 t: c[', '],
                                 to: c[', '],
                                 from: API[' style=']()['id'],
                                 d: ', ' + a['attr']['afk']['msg']
                             }), a['tmp']['afk']['pm'][c[', ']] = {
                                 ls: f
                             })
                         }
                     }
                     if (c[' style='] == 'index') {
                         var e = {
                             User: API[' style='](c[', '])[' target='] || c[', '],
                             Message: ''
                         };
                         a['util']['chat'][' id='](', ', a['util'][' style='](''), a['util']['chat'][', '](c[', ']), a['util']['chat']['parseLang'](c[' style='], e), a['util'][' style=']('')), a['gui']['util'][', ']()
                     }
                     if ((c[' style='] == ', ' || c[' style='] == ', ') && API[', '](a['util']['chat']['parseLang'](', ' + c[' style='], {
                         Message: c[', ']
                     }), !0), c[' style='] == ', ') {
                         if (!c[', ']) return;
                         if (a['tmp']['pm'][', '][' style='](c[', ']), a['attr']['ul']['on']) try {
                             var g = document[', '](c[', ']);
                             if (g) {
                                 var h = document[', '](c[', '])[', \'<div id='][0][', \'<div id='][0][', \'<div id='][1][', \'<div id='][4][', \'<div id='][0];
                                 h[', \'<div id='][0] || $(h)['append']('cssoldchat' + a['util']['chat']['parseLang']('pbgp', {
                                     User: API[' style='](c[', '])[' target=']
                                 }) + '\', ' + API[' style='](c[', '])[' target='] + 'text/css')
                             } else a['util']['ul']['userListSort'](!0)
                         } catch (d) {
                             a['util']['ul']['userListSort'](!0)
                         }
                     }
                     if (c[' style='] == ', ') {
                         if (!c[', ']) return;
                         if (a['tmp']['pm'][', '][', '](a['tmp']['pm'][', ']['indexOf'](c[', ']), 1), a['attr']['ul']['on']) {
                             var g = document[', '](c[', ']);
                             if (!g) return;
                             var h = g[', \'<div id='][0][', \'<div id='][0][', \'<div id='][1][', \'<div id='][4][', \'<div id='][0];
                             h[', \'<div id='][0] && h[', \'<div id='][0]['remove']()
                         }
                     }
                     if (c[' style='] == 'video' && (a['tmp']['pm'][', '] = c[', '], a['attr']['ul']['on'] && a['util']['ul']['userListSort'](!0)), c[' style='] == 'close' && (a['socket'][', '] = c[', '], a['socket']['session']['close']()), c[' style='] == ', ') {
                         var e = {
                             User: c[', '] == 'id' ? API[' style='](c[', '])[' target='] : c[', '] + ', ' + c[', '] + ')',
                             Message: ''
                         };
                         a['util']['chat'][' id='](', ', a['util'][' style='](''), a['util']['chat'][', '](c[', ']), a['util']['chat']['parseLang'](c[' style='], e), a['util'][' style=']('')), a['gui']['util'][', '](API[' style='](c[', '])[' target='] || c[', '])
                     }
                     c[' style='] == ', ' && (a['util']['chat'][' id='](', ', a['util'][' style='](''), a['util']['chat'][', '](c[', ']), a['util']['chat']['parseLang'](c[' style='], {
                         Message: ''
                     }), a['util'][' style=']('')), a['gui']['util'][', ']()), c[' style='] == ', ' && (a['util']['chat'][' id='](nulll, a['util'][' style='](''), ', '), a[' style='][', ']()), c[' style='] == 'commands' && (a['socket']['commands'] = c[', '], a['socket']['session']['close']())
                 }, a['socket']['session'][', '] = function () {
                     a['socket']['session']['name'] > 1 && (a['socket']['session']['close'](), a['socket'][', '] && a['socket']['init']())
                 }, a['socket']['session'][', '] = function () {
                     a['tmp']['pm'][', '] = [], a['attr']['ul']['on'] && $(', ')['remove'](), a['socket']['stop'] || setTimeout(function () {
                         a['socket'][', '] >= 0 && a['socket']['init']()
                     }, 5e3)
                 }
             }
         },
         team: {
             init: function () {
                 jQuery['</div></div></div>']({
                     type: ' style=',
                     dataType: 'type=',
                     url: ', ',
                     success: function (b) {
                         a['tmp'][', '][', '] = b, window[', '] = a['tmp'][', '][', '], $(document)['click'](a[', ']['transferConfigs']), $(document)['maxLength'](a[', ']['transferConfigs']), a[', ']['transferConfigs']()
                     }
                 })
             },
             parseTeamRollover: function (b, c, d, e, f) {
                 -1 == $[', ']($(', ')[', '](), a['tmp'][', '][', '][b][', ']) || $(', ' + c)['length'] || ($(', ')['append'](', ' + c + '</option>' + a['util']['chat']['parseLang'](', ') + ', '), $(', ' + c)['html'](', ' + d + ', ' + a['util']['chat']['parseLang'](e) + ', ' + a['util']['chat']['parseLang'](e) + ', ')['css']('color', f), $(', ')['attr']('>Sweet</a> <a href=', ', ' + b + ', '))
             },
             teamRollover: function () {
                 a[', '][', '](', ', ', ', ', ', ', ', ', '), a[', '][', '](', ', ', ', ', ', ', ', ', '), a[', '][', '](', ', ', ', ', ', ', ', ', '), a[', '][', '](', ', ', ', ', ', ', ', ', '), a[', '][', '](', ', ', ', ', ', ', ', ', ')
             }
         }
     };
     window['count'] ? (API[', '](', '), setTimeout(a[' style=']['init'], 1e3)) : a[' style=']['init']()
 }();
