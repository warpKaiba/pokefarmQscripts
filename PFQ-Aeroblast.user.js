// ==UserScript==
// @name         PFQ - Aeroblast
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hewwo
// @author       You
// @include      https://pokefarm.com/fields*
// @grant        none
// @require     http://cdn.craig.is/js/mousetrap/mousetrap.min.js?9d308


// ==/UserScript==

(function() {

    Mousetrap.bind('o', function() {
        'use strict';
        //    ajax("marketboard/load", {item: 530}).success(function(a) {});

        var user = document.getElementById("field_field").getAttribute("data-user");

        var fieldList = [];

        var iteration = 1;
        var tempOut;
        var iteration1 = 0;
        var doneYet = false;


        function getFieldList() {
            ajax("fields/fieldlist", {
                uid: user
            }).success(function(a) {
                var fieldList = [];
                tempOut = a
                for (var j = 0; j < a.fields.length; j++) {
                    setTimeout(function() {
                        console.log(tempOut.fields[iteration1].id);
                        fieldList.push(tempOut.fields[iteration1].id);
                        getFieldPokemon(fieldList[iteration1]);
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
                var b = a.html.match(/(summary.{6})/g);
                var pokeList = [];
                if (b !== null) {
                    for (var i = 0; i < b.length; i++) {
                        if (b[i].endsWith('"')) {
                            pokeList.push({pid: b[i].slice(-5).slice(0,-1), berry: "aspear", check: false}); //4 character pkmn id
                        } else if(b[i].endsWith('>')) {
                            pokeList.push({pid: b[i].slice(-5).slice(0,-2), berry: "aspear", check: false}); //3 character pid
                        } else if(b[i][11] == '>') {
                            pokeList.push({pid: b[i].slice(-5).slice(0,-3), berry: "aspear", check: false}); //2 character pid, last character is random so this checks second to last
                        } else {
                            pokeList.push({pid: b[i].slice(-5), berry: "aspear", check: false}); // 5 character pid
                        }
                    }
                }
                setTimeout(function() {

                    sendClickBomb(pokeList);
                    iteration += 1;
                }, 500 * iteration);
            });

            console.log("getfieldpokemon for " + fieldId)
        }

        //    getFieldPokemon(fieldList[0]);

        function sendClickBomb(pokes) {
            ajax("summary/interact", {
                pid: pokes,
                berry: "aspear",
                ismulticlick: true
            }).success(function(a) {
                console.log(iteration1 + "  " + tempOut.fields.length)
//                 if (iteration1 == fieldList.length) {window.alert("done")}
            });
        }
    });
})();



