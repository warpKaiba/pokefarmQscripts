// ==UserScript==
// @name         PFQ - Aeroblast
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  hello*pokemon GSC aeroblast sfx*
// @author       You
// @include      https://pokefarm.com/fields*
// @grant        none
// @require      http://cdn.craig.is/js/mousetrap/mousetrap.min.js?9d308
// @downloadURL  https://github.com/warpKaiba/pokefarmQscripts/raw/master/PFQ-Aeroblast.user.js


// ==/UserScript==

(function() {

    var turboUsers = [ //they got alotta pokemon
        "Peachi",
        "Lirissea",
        "AriDae",
        "Caitlyn1999",
        "bubby",
        "Persona_Gear",
        "Beemo",
        "TechmasterSM4000",
        "Meu",
        "annador",
        "Scorpyia",
        "tape",
        "Kase",
        "Temporal",
        "Majamomse",
        "sword",
        "Psychotria",
        "Hakunamatatayolo",
        "Nudge",
        "QuillDrill",
        "LunaOokami",
        "mtp85",
        "HybridYuki",
        "ShadowWolf7",
        "diabeticgirl4",
        "Chaoman12345",
        "Naeriie",
        "Kannameyria",
        "TheDankerSide",
        "kaiforest",
        "SpikeyMouth",
        "aptitudefree",
        "sunshine22",
        "Tabitha_Mori",
        "Nuclear_Flygon",
        "EmeraldSands315",
        "michanne001",
        "Belthazar194",
        "cirn0",
        "The_Falling_Blue",
        "SpiderAlexander",
        "Suki_Kuchiki",
        "RedCydranth",
        "TokyoMewMew",
        "GoddessLady",
        "TuneSakuNatsu",
        "rolytic",
        "Soleste",
        "Precious",
        "FireWolf1117",
        "Discowing",
        "Blakbird",
        "Benihime",
        "Mucka33",
        "Eridor",
        "Richard2380",
        "Cenere",
        "peachimaris",
        "AglennA",
        "Duusu",
        "Tinebell",
        "Wolfette",
        "SkylarZ",
        "Balache404",
        "3abbie3",
        "WriterGirl48",
        "Wetned",
        "Setsuko",
        "Disney_Fan12",
        "Kells",
        "Mom",
        "TinyBishie",
        "Icebreath123",
        "MidnightRose",
        "Arebani",
        "Texasaswang",
        "Flareon95",
        "shadowtiger42",
        "nmp211990",
        "ChimericalRequem",
        "Stoutland",
        "Trebor",
        "Witchchylde",
        "lolottesX",
        "Denied",
        "Floss",
        "Tardigrade",
        "Elizadesu",
        "Sorrow",
        "Lindylou",
        "Towairaito",
        "ya_boy",
        "laipon",
        "superllama",
        "Pigmask",
        "Rhaegal",
        "Changeling",
        "bread",
        "Permafrost",
        "Kitty2449",
        "Zico",
        "toxel",
        "Draco1221",
        "Clow",
        "HibariChan",
        "DrakanAroh",
        "Archdruid",
        "Neikea",
        "Saefall",
        "gastlygirl",
        "czdarkwolf16",
        "Sansavii",
        "Acetron",
        "Jere",
        "Satorian",
        "RenxTheBirb",
        "BakaStitch",
        "Lyra1234",
        "candybutterfly",
        "Neonray3",
        "octopolis",
        "gizmo",
        "MadHatterRingo",
        "alliaaa",
        "BlackBlood1872",
        "polarGoddess",
        "Elara",
        "Dadesfriend",
        "Christmy",
        "Zoreia",
        "MyMaddog",
        "SparksSystem",
        "Dorugamon",
        "Porrim",
        "ScytheGewalt",
        "Kimie",
        "SleepyThursday",
        "Pip-pip-plover",
        "blindcat97",
        "SnowyVee",
        "Myrror",
        "Yukiko_Shi",
        "Winter_Night",
        "ErrahM",
        "ashtx",
        "MelodyAndHarmony",
        "lucariopuppeteer",
        "Vorkath",
        "BallenBAllen",
        "nikao",
        "Sable",
        "C10H12N2O",
        "Kryda",
        "Cats13567",
        "Kirozey",
        "Meppe",
        "Touka",
        "krookodilehunter",
        "Alayra",
        "Uzumi",
        "kimbolimbo",
        "Lorentius",
        "Luxac",
        "SilentWolf",
        "emiriee",
        "Danna",
        "Kaelwolfur",
        "StarJeevas",
        "Silver-lugia",
        "MiaSpirit",
        "Grubey",
        "Managodess",
        "kitsudraco",
        "Nibutani_Shinka",
        "Lgreenbunny",
        "KaiserMeowser",
        "Emmanectric",
        "kywrane",
        "havarti2",
        "Cerberus38",
        "Mekkor",
        "amaryyl",
        "Linya",
        "Xorpa",
        "Fyrena",
        "lilyfarseer",
        "Tyler",
        "Supernatural_1",
        "Lis",
        "TrevorSpencer",
        "Sylph"
    ]
    for (var u in turboUsers) {turboUsers[u] = turboUsers[u].toLowerCase()}

    var turboUserIndex = turboUsers.indexOf($('#field_field')[0].dataset.user.toLowerCase())
    var user = document.getElementById("field_field").getAttribute("data-user");

    var a = "<ul class=morestufflinks style=max-width:inherit;overflow:auto;padding-top:30px;display:flex;>";
    for (var i = 0; i < turboUsers.length; i++) {
        a += "<li><a ";
        if (i == turboUserIndex) {
            a += "style=background:magenta;";
        }
        a += "href=/fields/" + turboUsers[i] + ">" + turboUsers[i] + "</a></li>";
    }
    a += "</ul>"
    $('#field_controls').prepend(a)

    var fieldList = [];

    var iteration = 1;
    var fieldsList;
    var iteration1 = 0;
    var totalClicked = 0;
    var totalPopulation;
    var currentlyRunning = false;

    setTimeout(function(){
        if (currentlyRunning == false) {
            totalPopulation = parseInt($('#populationcount')[0].textContent.replace(',',''))
            if (turboUserIndex + 1) {
                console.log("turboUser account found; index: " + turboUserIndex +"; user: " + turboUsers[turboUserIndex])
                if (currentlyRunning == false) {
                    main();
                }
            }
        }
    }, 8000)

    const targetNode = document.getElementById('populationcount');

    const config = { attributes: true, childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            console.log(mutation);
            if (mutation.addedNodes.length > 0) {
                totalPopulation = parseInt($('#populationcount')[0].textContent.replace(',',''))
                if (turboUserIndex + 1) {
                    console.log("turboUser account found; index: " + turboUserIndex +"; user: " + turboUsers[turboUserIndex])
                    if (currentlyRunning == false) {
                        main();
                    }
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    totalPopulation = parseInt($('#populationcount')[0].textContent.replace(',',''))
    var doneYet = false;
    var temporarySecretary; //absolute dog shit song
    var having_a_bit_of_a_laugh = true;
    var infoHTML = document.createElement("div");
    var gubbo;

    var finishCheck = setInterval(function(){
        var click_act_sent = $("#clickcount_act_sent")[0].textContent.replace(",", "")
        if (turboUserIndex+1 && totalClicked >= totalPopulation-200 || click_act_sent >= totalPopulation-200) {
            let nextURL = 'https://pokefarm.com/fields/' + turboUsers[turboUserIndex + 1]
            window.location.href = nextURL
        }
    }, 5000);

    Mousetrap.bind('o', function() {
        'use strict';
        main();
    });

    Mousetrap.bind(']', function() {
        'use strict';
        let nextURL = 'https://pokefarm.com/fields/' + turboUsers[turboUserIndex + 1]
        window.location.href = nextURL
    });

    function main() {
        currentlyRunning = true;
        ajax("summary/interact-warning", {
            ok: true
        })

        infoHTML.innerText = "Clicked 0 Pokemans so far";
        $('[data-action=jump]').text("Starting clicking.. ^_^");
        gubbo = $(infoHTML).insertAfter('[data-action=jump]');

        getFieldList();


    }

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
            //var jqueryTipz = $(".fieldmontip a", $(temporarySecretary).context);
            //var jqueryTipz = $(".fieldmon[data-fed=0]", $(temporarySecretary).context);
            var pokemons = $('.field > .fieldmon[data-fed="0"]').not('[style*="display"]');
            if (pokemons != undefined) {

                for (var i = 0; i < pokemons.length; i++) {
                    //var pid = jqueryTipz[i].href.split("/")[jqueryTipz[i].href.split("/").length-1];
                    var pid = pokemons.get(i).dataset.id
                    if (pid != undefined && pid != "haxor") {
                        if (pid != "boxes" && pid.length < 6 && pokemons.get(i).firstChild.height>20 && pokemons.get(i).firstChild.width>20) {//lol
                            if (a.name.match(/sour/gi) != undefined) {pokeList.push({pid: pid, berry: "aspear", check: false});}
                            else if (a.name.match(/spicy/gi) != undefined) {pokeList.push({pid: pid, berry: "cheri", check: false});}
                            else if (a.name.match(/dry/gi) != undefined) {pokeList.push({pid: pid, berry: "chesto", check: false});}
                            else if (a.name.match(/sweet/gi) != undefined) {pokeList.push({pid: pid, berry: "pecha", check: false});}
                            else if (a.name.match(/bitter/gi) != undefined) {pokeList.push({pid: pid, berry: "rawst", check: false});}
                            else {pokeList.push({pid: pid, berry: "pecha", check: false});}
                        }
                    }
                } //me smart now =3

                setTimeout(function() {
                    if (pokeList.length > 0) {
                        sendClickBomb(pokeList, fieldId);
                        iteration += 1;
                    } else {
                        iteration += 1;
                        updateGUI(fieldId);
                    }
                }, 500 * iteration);
            }

        });

        console.log("getfieldpokemon for " + fieldId)
    }

    function getFieldList() {
        ajax("fields/fieldlist", {
            uid: user
        }).success(function(a) {
            var fieldList = [];
            fieldsList = a
            for (var j = 0; j < a.fields.length; j++) {
                setTimeout(function() {

                    fieldList.push(fieldsList.fields[iteration1].id);
                    getFieldPokemon(iteration1);
                    iteration1 += 1;

                }, 500 * j);

            }
        });

    }

    function sendClickBomb(pokes, numb) {
        ajax("summary/interact", {
            pid: pokes,
            berry: "pecha",
            ismulticlick: true
        }).success(function(a) {
            totalClicked += pokes.length;
            console.log(totalClicked + "  " + pokes.length);
            updateGUI(numb);
            gubbo[0].innerText = "Clicked " + totalClicked + " Pokemans so far"
            if (numb+1 == fieldsList.fields.length) {
                $('[data-action=jump]').text("All Done ^_^");
                //window.alert("Done ^_^");
            }
        });
    }

    function updateGUI(numb) {
        $('[data-action=jump]').text("Clicked " + (numb+1) + " out of " + (fieldsList.fields.length) + "...")
    }

})();

