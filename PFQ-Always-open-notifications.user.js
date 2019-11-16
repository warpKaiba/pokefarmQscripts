// ==UserScript==
// @name         PFQ - Always open notifications
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Keeps your notifications open on the right side on pages with room
// @author       You
// @include      https://pokefarm.com/use*
// @include      https://pokefarm.com/fields/*
// @include      https://pokefarm.com/shelter
// @include      https://pokefarm.com/forum/*
// @include      https://pokefarm.com/dex
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var target = document.getElementById('notifications');
    document.getElementById('content').appendChild(target);

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle('div#notifications {position: absolute; right: 1%; width: 15%; background: #000; border: 1px solid #00f; border-radius: 6px; padding: 5px; top: 26%;}');


    setInterval(function(){
        var fieldflavor = document.querySelector('[data-action="jump"]').innerHTML.toLowerCase();
        var fieldnext = document.querySelector('[data-action="next"]').outerHTML.toLowerCase();
        console.log(fieldflavor);
        if (fieldflavor.includes("sour")) {
            document.getElementById('notifications').style.background = '#ff0';
        }
        if (fieldflavor.includes("spicy")) {
            document.getElementById('notifications').style.background = '#f00';
        }
        if (fieldflavor.includes("dry")) {
            document.getElementById('notifications').style.background = '#00f';
        }
        if (fieldflavor.includes("sweet")) {
            document.getElementById('notifications').style.background = '#f0f';
        }
        if (fieldflavor.includes("bitter")) {
            document.getElementById('notifications').style.background = '#0ff';
        }
        var eggCount = (document.getElementById('notifications').textContent.match(/An.Egg/g) || []).length;
        if (eggCount > 5) {
            console.log('egg!');
            document.getElementById('notifications').style.background = '#fff';
        }
        document.getElementById("field_berries").firstChild.style.background = '#000';
        if (fieldnext.includes('disabled')) {
            document.getElementById("field_berries").firstChild.style.background = '#fff';
        }
    }, 200);



    //      var fieldflavor = document.querySelector('[data-action="jump"]').innerHTML;
    //    console.log(fieldflavor);

})();