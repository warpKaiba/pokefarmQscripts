// ==UserScript==
// @name         PFQ - AJAX Un/Lock all fields
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds Lock/Unlock All buttons above fields page
// @author       you know :)
// @include      https://pokefarm.com/fields
// @grant        none
// @require     http://cdn.craig.is/js/mousetrap/mousetrap.min.js?9d308


// ==/UserScript==

(function() {

    'use strict';

    // *~*~*~*~* ~* ~* ~* ~* ~*

    var user = "reaperkun";

    // *~ ~* ~* ~*~*~* ~* ~*~*~


    var randomMultE = Math.random() * 10;
    var randomMult = Math.random() * randomMultE;

    var fieldCounter;
    var bullshitTimeoutCounterFuck = 0;
    var keepGoing = true;

    function lockAll() {
        ajax("fields/fieldlist", {
            uid: user
        }).success(function(a) {
            keepGoing = true;
            fieldCounter = a.fields.length;

            lockField(bullshitTimeoutCounterFuck);
        });

    }

    function lockField(x) {
        ajax("fields/visibility", {
            id: x,
            mode: "set",
            visible: 0
        }).success(function(a) {
            bullshitTimeoutCounterFuck += 1;

            if (bullshitTimeoutCounterFuck >= fieldCounter) {
                window.alert("Locked all")
                bullshitTimeoutCounterFuck = 0;
                keepGoing = false;
            }
            if (keepGoing == true) {
                lockField(bullshitTimeoutCounterFuck);
            }
        });

    }


    function unlockAll() {
        ajax("fields/fieldlist", {
            uid: user
        }).success(function(a) {
            keepGoing = true;
            fieldCounter = a.fields.length;

            unlockField(bullshitTimeoutCounterFuck)

        });

    }

    function unlockField(x) {
        ajax("fields/visibility", {
            id: x,
            mode: "set",
            visible: 1
        }).success(function(a) {
            bullshitTimeoutCounterFuck += 1;

            if (bullshitTimeoutCounterFuck >= fieldCounter) {
                window.alert("Unlocked all")
                bullshitTimeoutCounterFuck = 0;
                keepGoing = false;
            }
            if (keepGoing == true) {
                unlockField(bullshitTimeoutCounterFuck);
            }
        });
    }



    document.getElementById("myfarmname").insertAdjacentHTML('beforeend', "<span><button id='lockallfields'>Lock All</button> </span>");
    document.getElementById("lockallfields").addEventListener("click", lockAll);

    document.getElementById("myfarmname").insertAdjacentHTML('beforeend', "<span><button id='unlockallfields'>Unlock All</button> </span>");
    document.getElementById("unlockallfields").addEventListener("click", unlockAll);

})();



