// ==UserScript==
// @name         PFQ - Auto-fishing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        this one probaby doesnt work dont use it
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var mutex = $("#fishing")[0].dataset.mutex;
    var spot = 0;

    ajax("fishing/fish.start", {
        "area":1,
        "mutex":mutex,
        "newgame":true
    }).success(function(a){
        ajax("fishing/fish.cast", {
            "mutex":mutex,
            "spot":spot
        }).success(function(a){
            setTimeout(function(){lineCast(a)}, a.fishtimer*1010)
        })
    })

    function lineCast(a) {
        console.log(a.fishhook)
        ajax("fishing/fish.start", {
            "event":"hook",
            "mutex":mutex
        })
    }

})();
