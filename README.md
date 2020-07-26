# pokefarmQscripts
Some scripts i've made for PFQ. You need the tampermonkey or greasemonkey browser extension to use these.

To install:
Install Tampermonkey or Greasemonkey.
Click the script's name.
Click the "Raw" button.
You should get a popup tab from tamper/greasemonkey asking if you want to install it.

## Script descriptions:


### PFQ-AJAX-Lock-all-fields.user.js
Adds a lock/unlock all fields button to your fields view. Use it if you want to lock or unlock all your fields at once


### PFQ-Aeroblast.user.js
If you go to someone's fields and press the "o" letter key, it will start attempting to send an interaction for every pokemon they own. It now tells you how far along it is in the title of the field. You'll probably get a bunch of errors from the site for doing this since it's trying to send interactions as fast as your internet connection can keep up. It doesn't stop if it get's a "you're interacting too much" error so you need to check that yourself.

#### Update: 7/26/20

![](https://i.imgur.com/z7G5qYm.png)

They discovered this script and came up with a cool counter measure, aeroblast would try to click a pokemon with a pid of "haxor", which would instantly mark your account as a cheater. The script will now NOT do this because it doesn't just look through raw html with a regex because I'm a lvl 2 script kiddie now 

### PFQ-Always-open-notifications.user.js
Keeps the notification box open all the time on the right side.


### PFQEasyflavormassmoveandrelease.user.js
Adds buttons to the mass-move and release menus to select all pokemon, or all of a certain flavor-preference.



I don't play this game anymore so I figured I'd share these for other peoples interest. These are all a bit old, so I can't gaurantee if they work (or have legible code lol). Also: if you get banned for using them, it's your problem, not mine.

Thank you pfq, your game was what inspired me to learn programming in the first place.
