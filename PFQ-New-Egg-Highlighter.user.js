// ==UserScript==
// @name         PFQ - New Egg Highlighter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  goop
// @author       You
// @match        https://pokefarm.com/shelter
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var eggs, doit, pkmn;
    const targetNode = document.getElementById('shelterarea');

    const config = { attributes: true, childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        doit = false;
        //console.log(mutationsList);
        for(let mutation of mutationsList) {
            if (mutation.type == "childList"){
                doit = true;
            }
        }
        if (doit) {
            main();
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    function main(){
        console.log('yahoo')
        eggs = $('.pokemon[data-stage]');
        for (var i = 0; i < eggs.length; i++) {
            if (eggs.next()[i].childNodes[0].textContent == "Egg " || eggs.next()[i].childNodes[0].textContent.includes("Pokémon")) {
                eggs[i].style = "border: 15px yellow double; border-radius: 100%";
            }
        }
        pkmn = $('.pokemon[data-stage=pokemon]');
        //$('.pokemon[data-stage=pokemon]').next()[0].innerHTML.includes('[SHINY]')
        for (i = 0; i < pkmn.length; i++) {
            if (pkmn.next()[i].innerHTML.includes('[SHINY]') || pkmn.next()[i].innerHTML.includes('[ALBINO]') || pkmn.next()[i].innerHTML.includes('[MELANISTIC]') || pkmn.next()[i].innerHTML.includes('[MEGA]') || pkmn.next()[i].innerHTML.includes('[DELTA') || pkmn.next()[i].innerHTML.includes('[CUSTOM SPRITE]') || pkmn.next()[i].innerHTML.includes('[STARTER]')) {
                pkmn[i].style = "border: 20px magenta double; border-radius: 100%";
                $('button[data-shelter=reload]')[0].disabled = true
            }
        }
    }

    // Your code here...
})();
