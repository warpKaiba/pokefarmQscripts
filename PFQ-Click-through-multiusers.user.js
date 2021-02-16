// ==UserScript==
// @name         PFQ - Click through multiusers
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  fu
// @author       You
// @include      https://pokefarm.com/users/*
// @grant        none
// @require      http://cdn.craig.is/js/mousetrap/mousetrap.min.js?9d308
// @downloadURL  https://github.com/warpKaiba/pokefarmQscripts/raw/master/PFQ-Click-through-multiusers.user.js
// ==/UserScript==


(function() {
    'use strict';

    var usernames = window.location.pathname.split(",")
    usernames[0].split("/")[2]
    // Your code here...

    Mousetrap.bind('p', function() {
        var clickables = $('[data-berry=aspear]')
        for (var i = clickables.length-1; i >= 0; i--) {
            $('[data-berry=aspear]')[i].click();
        }
    })

    // Select the node that will be observed for mutations
    const targetNode = document.getElementById('multiuser');

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                //console.log('A child node has been added or removed.');
                if (mutation.target.id == "clickcount_act_sent") {
                    //console.log("#######interactions increase detected");
                    $('.mu_navlink.next').click();
                }
                if (mutation.target.className == "uname") {
                    console.log("#######next page detected");
                    var clickables = $('[data-berry=aspear]')
                    console.log($('[data-pid]').length)
                    if ($('[data-pid]').length < 1) {
                        $('.mu_navlink.next').click();
                        return;
                    }
                    for (var i = clickables.length-1; i >= 0; i--) {
                        $('[data-berry=aspear]')[i].click();
                    }
                }
            }
            else if (mutation.type === 'attributes') {
                //console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
            //console.log(mutation);
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    //observer.disconnect();

})();
