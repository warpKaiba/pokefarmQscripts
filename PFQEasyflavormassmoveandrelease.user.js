// ==UserScript==
// @name         PFQ Easy flavor mass-move and release
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Adds useful buttons to mass-move and release menu
// @author       mileskitaro
// @match        https://pokefarm.com/*
// @grant        unsafeWindow
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// Version 1.0: Initial release
// 1.1: Added selection by gender, and prevented select all in release menu to include shinies, albinos, and melans
// 1.2: Added dump button
// This is the first function that executes. First, it runs the deploybuttons function which puts the buttons on the page,
// then the rest of this function actually makes them do something when clicked. This part was really dumb because javascript
// just sucks here. in order to pass parameters with a function with addEventListener, you need to use .bind or else it will
// give you an error. its dumb and i hate it but it works now so whatever.

// The lines under deploybuttons(); are basically saying :
// 1. Look in the document.. (thats the webpage)
// 2. For the Element with a certain Id.. (those would be the buttons we make in deploybuttons)
// 3. And start Listening for a "click", that, when activated, will execute the check function with a number 0-6

function deploylisteners() {
    deploybuttons();
    document.getElementById("sourbtn").addEventListener("click", check.bind(null, 0), false);
    document.getElementById("spicybtn").addEventListener("click", check.bind(null, 1), false);
    document.getElementById("drybtn").addEventListener("click", check.bind(null, 2), false);
    document.getElementById("sweetbtn").addEventListener("click", check.bind(null, 3), false);
    document.getElementById("bitterbtn").addEventListener("click", check.bind(null, 4), false);
    document.getElementById("allbtn").addEventListener("click", check.bind(null, 5), false);
    document.getElementById("anybtn").addEventListener("click", check.bind(null, 6), false);

    document.getElementById("malebtn").addEventListener("click", check.bind(null, 7), false);
    document.getElementById("fembtn").addEventListener("click", check.bind(null, 8), false);
    document.getElementById("agenbtn").addEventListener("click", check.bind(null, 9), false);

}


function deploybuttons() {
    'use strict';

    // This function first checks to see if we're on the massmove or massrelease menu, then sets the location of that menu to x

    if (document.getElementById("massmovelist") != null) {var x = document.getElementById("massmovelist");}
    if (document.getElementById("massreleaselist") != null) {var x = document.getElementById("massreleaselist");}

    // Then it checks if x is valid (not null), and starts adding the button HTML to the page
    // It sets the "li" or "List Items" inside the massmove/release menu to y so it can Insert Adjacent HTML before any "li".
    // (the "li" in the mass menus are the list of pokemon)

    if (x != null) {
        var y = x.getElementsByTagName("li");

        // The HTML it inserts first is a "ul", or "Unordered List" to contain our buttons

        x.insertAdjacentHTML('beforebegin', '<ul id=flavorbuttonsmove style="list-style-type:none; display: flex; justify-content: center;"><ul>');
        document.getElementById('flavorbuttonsmove').insertAdjacentHTML('afterend', '<ul id=genderbuttonsmove style="list-style-type:none; display: flex; justify-content: center;"><ul>');


        // Then it inserts some text before the list, and then it inserts the buttons in the beginning of the list.

        document.getElementById('flavorbuttonsmove').insertAdjacentHTML('beforebegin', '<p class="small"><center>- Quick flavor-field sort -</center></p>');

        document.getElementById('flavorbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="anybtn" style="background:#4f4; padding: 10px;"><span class="name">Any</span><span class="count"><img src="https://i.imgur.com/PbGgqbm.png" style="width:32px;height:32px;"></span></button></li>');
        document.getElementById('flavorbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="bitterbtn" style="background:#4ff; padding: 10px;"><span class="name">Bitter</span><span class="count"><img src="//pfq-static.com/img/berries/rawst.png/t=1444012236" style="width:32px;height:32px;"></span></button></li>');
        document.getElementById('flavorbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="sweetbtn" style="background:#f4f; padding: 10px;"><span class="name">Sweet</span><span class="count"><img src="//pfq-static.com/img/berries/pecha.png/t=1444012233" style="width:32px;height:32px;"></span></button></li>');
        document.getElementById('flavorbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="drybtn" style="background:#44f; padding: 10px;"><span class="name">Dry</span><span class="count"><img src="//pfq-static.com/img/berries/chesto.png/t=1444012231" style="width:32px;height:32px;"></span></button></li>');
        document.getElementById('flavorbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="spicybtn" style="background:#f44; padding: 10px;"><span class="name">Spicy</span><span class="count"><img src="//pfq-static.com/img/berries/cheri.png/t=1444012227" style="width:32px;height:32px;"></span></button></li>');
        document.getElementById('flavorbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="sourbtn" style="background:#ff4; padding: 10px;"><span class="name">Sour</span><span class="count"><img src="//pfq-static.com/img/berries/aspear.png/t=1444012223" style="width:32px;height:32px;"></span></button></li>');
        document.getElementById('flavorbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="allbtn" style="background:#fff; padding: 10px;"><span class="name">All</span><span class="count"><img src="https://i.imgur.com/WXV2FTl.png" style="width:32px;height:32px;" padding: 5px;></span></button></li>');

        document.getElementById('genderbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="agenbtn" style="background:#bfb; padding: 10px;"><span class="name">Genderless</span><span class="count"></span></button></li>');
        document.getElementById('genderbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="malebtn" style="background:#bbf; padding: 10px;"><span class="name">Male</span><span class="count"></span></button></li>');
        document.getElementById('genderbuttonsmove').insertAdjacentHTML('afterbegin', '<li><button id="fembtn" style="background:#fbf; padding: 10px;"><span class="name">Female</span><span class="count"></span></button></li>');

    }

    // This function is for changing the style of the website.
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    // Here I use it to make the menu a little wider to fit the new buttons
    addGlobalStyle("#fieldjumpnav{width: 640px}");
}

// This is the function thats run when you click a button. This is the part that actually checks what flavor a Pokemon likes.
// It has one parameter, f. Parameters allow you to pass data through a function.
// For example, a function called "addition(x, y)" could add the parameters x and y and then return the sum to you.
// So, every button runs the function 'check', but in a slightly different way because of the different parameter value.

function check(f) {
    // This is the text the script will look for to see what flavor a Pokemon likes.
    // The reason why it has up"> in each flavor name is because the name of the class for prefered flavor is "flavourup"
    // and the > is between the html tag and the flavor text thats displayed

    var tooltipflavors = ['up">Sour', 'up">Spicy', 'up">Dry', 'up">Sweet', 'up">Bitter', 'up', 'flavorup', '[M]', '[F]', '[N]'];

    if (document.getElementById("massmovelist") != null) {var x = document.getElementById("massmovelist");}
    if (document.getElementById("massreleaselist") != null) {var x = document.getElementById("massreleaselist");}
    var y = x.getElementsByTagName("label");

    // For every pokemon in the list, uncheck every box first
    for (var i = 1; i < y.length; i++)
    {
        var z = y[i].firstElementChild;
        z.checked = false; }

    // Then, for every pokemon in the list, it checks the parameter passed by the button, and looks for the corresponding flavor in tooltipflavors
    for (var i = 0; i < y.length; i++) {
        if (y[i].innerHTML.includes(tooltipflavors[f])) {

            var z = y[i].firstElementChild;
            z.checked = true;
            if (f == 5) {
                if (document.getElementById("massreleaselist") != null) {
                    if (y[i].innerHTML.includes('[SHINY]') || y[i].innerHTML.includes('[ALBINO]') || y[i].innerHTML.includes('[MELAN')) {
                        z.checked = false;
                    }
                }
            }
        }
        // This is for the 'any' flavor preference. If there is no 'flavourup' class, then it has an 'any' preference
        if ((f == 6) &! (y[i].innerHTML.includes('flavourup'))) {
            var z = y[i].firstElementChild;
            z.checked = true;
        }
    }
}

// This actually runs the code once the mass move/release menu is opened
waitForKeyElements (".bulkpokemonlist>ul", deploylisteners);

