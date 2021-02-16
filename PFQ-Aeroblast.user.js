// ==UserScript==
// @name         PFQ - Aeroblast
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  >:3 hello ^^;
// @author       You
// @include      https://pokefarm.com/fields*
// @grant        none
// @require      http://cdn.craig.is/js/mousetrap/mousetrap.min.js?9d308
// @downloadURL  https://github.com/warpKaiba/pokefarmQscripts/raw/master/PFQ-Aeroblast.user.js


// ==/UserScript==

(function() {

    Mousetrap.bind('o', function() {
        'use strict';

        var user = document.getElementById("field_field").getAttribute("data-user");

        var fieldList = [];

        var iteration = 1;
        var tempOut;
        var iteration1 = 0;
        var totalClicked = 0;
        var doneYet = false;
        var temporarySecretary; //absolute dog shit song
        var having_a_bit_of_a_laugh = true;
        var infoHTML = document.createElement("div");
        infoHTML.innerText = "Clicked 0 Pokemans so far";

        $('[data-action=jump]').text("Starting clicking.. ^_^");
        var gubbo = $(infoHTML).insertAfter('[data-action=jump]');


        function getFieldList() {
            ajax("fields/fieldlist", {
                uid: user
            }).success(function(a) {
                var fieldList = [];
                tempOut = a
                for (var j = 0; j < a.fields.length; j++) {
                    setTimeout(function() {

                        fieldList.push(tempOut.fields[iteration1].id);
                        getFieldPokemon(iteration1);
                        iteration1 += 1;

                    }, 500 * j);

                }
            });

        }

        getFieldList();

        function doSetTimeout(func) {
            setTimeout(function() { func; }, iteration * 1000);
            console.log(iteration)
        }


        function getFieldPokemon(fieldId) {
            ajax("fields/field", {
                id: fieldId,
                uid: user,
                mode: "public"
            }).success(function(a) {
                temporarySecretary = new DOMParser().parseFromString(a.html, "text/html");
                console.log(temporarySecretary);
                var pokeList = [];
                var jqueryTipz = $(".fieldmontip a", $(temporarySecretary).context);
                var pokemons = $('.field > .fieldmon[data-fed="0"]').not('[style*="display"]');
                if (pokemons != undefined) {

                    for (var i = 0; i < pokemons.length; i++) {
                        var pid = pokemons.get(i).dataset.id;
                        if (pid != undefined && pid != "haxor" && pid != "boxes" && pid.length < 6 && pokemons.get(i).firstChild.height>20 && pokemons.get(i).firstChild.width>20) { //lol
                            pokeList.push({pid: pid, berry: "pecha", check: false});
                        }
                    } //me smart now =3

                    setTimeout(function() {
                        if (pokeList.length > 0) {
                            sendClickBomb(pokeList, fieldId);
                            iteration += 1;
                        }
                    }, 500 * iteration);
                }


                //                 var b = a.html.match(/(summary.{6})/g);
                //                 var pokeList = [];
                //                 if (b !== null) {
                //                     for (var i = 1; i < b.length; i++) {
                //                         if (b[i].endsWith('"')) {
                //                             pokeList.push({pid: b[i].slice(-5).slice(0,-1), berry: "aspear", check: false}); //4 character pkmn id
                //                         } else if(b[i].endsWith('>')) {
                //                             pokeList.push({pid: b[i].slice(-5).slice(0,-2), berry: "aspear", check: false}); //3 character pid
                //                         } else if(b[i][11] == '>') {
                //                             pokeList.push({pid: b[i].slice(-5).slice(0,-3), berry: "aspear", check: false}); //2 character pid, last character is random so this checks second to last
                //                         } else {
                //                             pokeList.push({pid: b[i].slice(-5), berry: "aspear", check: false}); // 5 character pid
                //                         }
                //                     }
                //                 }
                //                 setTimeout(function() {

                //                     sendClickBomb(pokeList);
                //                     iteration += 1;
                //                 }, 500 * iteration);
            });

            console.log("getfieldpokemon for " + fieldId)
        }

        //    getFieldPokemon(fieldList[0]);

        function sendClickBomb(pokes, numb) {
            ajax("summary/interact", {
                pid: pokes,
                berry: "pecha",
                ismulticlick: true
            }).success(function(a) {
                totalClicked += pokes.length;
                console.log(totalClicked + "  " + pokes.length);
                $('[data-action=jump]').text("Clicked " + (numb+1) + " out of " + (tempOut.fields.length) + "...")
                gubbo[0].innerText = "Clicked " + totalClicked + " Pokemans so far"
                if (numb+1 == tempOut.fields.length) {$('[data-action=jump]').text("All Done ^_^")}
            });
        }
    });
})();

