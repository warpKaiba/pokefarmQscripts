// ==UserScript==
// @name         PFQ - Show IVs in dojo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pokefarm.com/dojo/training
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var a = document.createElement("div");
    var b = document.createTextNode("Show IVs button!!!! CLick here!");
    a.appendChild(b)
    a.style = "width:200px;height:200px;background:blue;position:absolute;top:50%;z-index:1000;cursor:pointer;color:yellow;filter:drop-shadow(0 0 10px red);left:50px;font-size:20pt;font-family:Comic Sans MS;text-shadow:3px 3px #f0f;"
    
    document.body.appendChild(a);
    a.addEventListener("click", showIV)

    function showIV() {
        if ($('.fieldmon')) {
        for(var i = 0; i<$('.fieldmon').length; i++) {
            var n = $('.fieldmon').next()[i].children[0].children[$('.fieldmon').next()[i].children[0].children.length-3].textContent.slice(-3)
            var m = document.createElement('div')
            var o = document.createTextNode(n)
            m.appendChild(o)
            m.style = "background-color: hsl(" + (parseInt(n)*1.5).toString() + ",100%,30%);position: absolute;top: 75%;padding: 4px;border: 2px white solid;border-radius: 10px;left: 25%;"
            $('.fieldmon')[i].append(m)
        }
    }
}
    // Your code here...
})();
