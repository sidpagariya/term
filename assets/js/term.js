$(window).on('load', function() {
    "use strict";

    /*=========================================================================
        Theme Toggling
    =========================================================================*/
    window.toggleThemes = function(change = true){
      var $theme = localStorage.getItem('theme') || 'light';
      var $alttheme = ($theme === 'light')?('white'):('dark');
      var $newtheme = ($theme === 'light')?('dark'):('light');
      var $altnewtheme = ($theme === 'light')?('dark'):('white');
      if (!change) {
        $newtheme = $theme;
        $altnewtheme = $alttheme;
        $theme = 'light';
        $alttheme = 'white';
      }
      var $elt = $('.'+$theme);
      var $bgelt = $('.bg-'+$alttheme);
      var $shadowelt = $('.shadow-'+(($theme === 'light')?('dark'):('light')));
      $elt.toggleClass($newtheme);
      $elt.toggleClass($theme);
      $bgelt.toggleClass('bg-'+$altnewtheme);
      $bgelt.toggleClass('bg-'+$alttheme);
      $shadowelt.toggleClass('shadow-'+(($newtheme === 'light')?('dark'):('light')));
      $shadowelt.toggleClass('shadow-'+(($theme === 'light')?('dark'):('light')));
      localStorage.setItem('theme', $newtheme);
    }
    window.toggleThemes(false);

    /*=========================================================================
        Preloader
    =========================================================================*/
    $("#preloader").delay(350).fadeOut('slow');
    // Because only Chrome supports offset-path, feGaussianBlur for now
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if(!isChrome) {
        document.getElementsByClassName('infinityChrome')[0].style.display = "none";
        document.getElementsByClassName('infinity')[0].style.display = "block";
    }

    /*=========================================================================
     Spacer with Data Attribute
     =========================================================================*/
    var list = document.getElementsByClassName('spacer');

    for (var i = 0; i < list.length; i++) {
      var size = list[i].getAttribute('data-height');
      list[i].style.height = "" + size + "px";
    }

    /*=========================================================================
     Background Color with Data Attribute
     =========================================================================*/
     var list = document.getElementsByClassName('data-background');

     for (var i = 0; i < list.length; i++) {
       var color = list[i].getAttribute('data-color');
       list[i].style.backgroundColor = "" + color + "";
     }
});

var config = {
  "title": "Sid's Site terminal",
  "prompt": "you@sids-site:/ $",
  "commands": [
    {
      "name": "about",
      "syntax": "about [sid|life|skills|languages]",
      "description": "learn more about me",
      "exec": "about",
      "data": {
        "sid": "Hi! I am Sid Pagariya, a senior at the University of Michigan, Ann Arbor. I am a passionate pumped programmer who loves to code for fun, make music, do origami, bike, and read (documentation). Oh, and I'm just getting into cooking :)\nIf you want to find out more about me, try `help about`.\n",
        "life": "I was born in December 2000 in the Malabar Hills neighborhood, Mumbai. My family and I immediately moved to Bangalore, where we stayed until I finished my upper kindergarten. We then moved back to Mumbai until I completed part of my 3rd grade. Once again, moving back to Bangalore, I completed my education until I got to 7th grade. When we moved to Navi (New) Mumbai, I completed seventh and part of my 8th grade. This is when I got the opportunity to move to the United States. I soon completed my 8th grade living in Kalamazoo, Michigan and then moved to Portage, Michigan where I completed all of my high school education. I am now currently enrolled for the 3rd academic year and I am a senior at the University of Michigan and reside in Ann Arbor, Michigan.\n",
        "skills": "I started programming when I was 8 years old. Over the past 10 years I've acquired numerous soft skills as well as hard skills all of which are listed below.\nHard Skills:\n * Front-end: HTML, Javascript (and jQuery), AngularJS, ReactJS, CSS, SASS, Wordpress Site development, Liquid Syntax with Jekyll\n * Back-end: C/C++, Java, Python, Swift, NodeJS, SQL, mongoDB, PHP, .NET Framework (C#, ASP.NET, and VB.NET), IBM DB2\n * Full-stack: Kubernetes, Google Cloud Platform, AWS EC2, AWS SQS and SNS, z/OS\nSoft Skills:\n * Leadership\n * Innovation\n * Research\n * Public speaking\n * Collaboration\n * Time management\n * Problem solving\n",
        "languages": "Here is a comprehensive list of all the languages I have become proficient throughout my life:\nReal-world languages (in order of proficiency):\n * Marwari (Rajasthani)\n * English\n * Hindi\n * Marathi\n * Spanish\n * Sanskrit\n * Kannada\n * Gujarati\nProgramming Languages (in order of proficiency):\n * C/C++\n * Python\n * Java\n * HTML\n * CSS\n * Javascript\n * TeX\n * Assembly\n * Basic\n * Bash\n * Fish\n * Batch\n * PHP\n * SQL\n * Swift\n * MATLAB\n * Objective-C\n * C#\n * ASP.NET\n * Visual Basic\n * R\n * JCL\n * Go\n * Kotlin\n * LISP\n"
      }
    },
    {
      "name": "clear",
      "syntax": "clear",
      "description": "clear terminal history",
      "exec": "clear",
      "data": null
    },
    {
      "name": "contact",
      "syntax": "contact [phone|email]",
      "description": "display my contact information",
      "exec": "contact",
      "data": {
        "phone": ["tel:+12697433112", "+1(269)743-3112"],
        "email": ["mailto:siddhant.pagariya@gmail.com", "siddhant.pagariya@gmail.com"]
      }
    },
    {
      "name": "dark",
      "syntax": "dark on|off",
      "description": "turn on or off dark mode",
      "exec": "dark",
      "data": null
    },
    {
      "name": "help",
      "syntax": "help [command]",
      "description": "show list of available commands",
      "exec": "help",
      "data": null
    },
    {
      "name": "social",
      "syntax": "social [facebook|github|instagram|linkedin|twitter]",
      "description": "display my social links",
      "exec": "social",
      "data": {
        "facebook": "https://www.facebook.com/sidpagariya",
        "github": "https://github.com/sidpagariya",
        "instagram": "https://www.instagram.com/sidpagariya",
        "linkedin": "https://www.linkedin.com/in/sidpagariya",
        "twitter": "https://www.twitter.com/sidpagariya"
      }
    }
  ]
}

var hist = $('#history');
var command = $('#command');
var prompt = $('#prompt');
var cmdInpt = $('#cmd-input');
var cmdHist = [];
var currPos = 0;
var key = {};
var theme = localStorage.getItem('theme') || 'light';
function appendToHist(str) {
  hist.append(`<pre class='${theme}'>${str}\n</pre>`)
}
appendToHist(`Welcome to ${config.title}!\nType 'help' and hit ENTER for more information.`);
prompt.html(`${config.prompt} `);
cmdInpt.focus();

cmdInpt.on('keypress', function(e){
  if (e.which == 13) {
    handleCommand();
  }
})

function test_key(selkey){
  var alias = {
    "ctrl": 17,
    "shift": 16,
    "up": 38,
    "down": 40,
    "a": 65,
    "c": 67,
    "d": 68,
    "e": 69,
    "l": 76
  };

  return key[selkey] || key[alias[selkey]];
}

function test_keys(){
  var keylist = arguments;
  for(var i = 0; i < keylist.length-1; i++) {
    if(!test_key(keylist[i])) {
      return false;
    }
  }
  keylist[keylist.length-1].preventDefault();
  return true;
}

cmdInpt.on('keydown', function(e){
  
  key[e.keyCode] = true;
  cmdInpt.focus();
  if (test_keys('ctrl', 'a', e)) {
    moveToBeginning();
  } else if (test_keys('ctrl', 'c', e)) {
    breakCmd();
  } else if (test_keys('ctrl', 'd', e)) {
    window.location = '/';
  } else if (test_keys('ctrl', 'e', e)) {
    moveToEnd();
  } else if (test_keys('ctrl', 'l', e)) {
    clear();
  } else if (test_keys('up', e)) {
    prevHist();
  } else if (test_keys('down', e)) {
    nextHist();
  }
})
cmdInpt.on('keyup', function(e){
  key[e.keyCode] = false;
  if (test_keys('ctrl', 'a', e) ||
    test_keys('ctrl', 'c', e) ||
    test_keys('ctrl', 'd', e) ||
    test_keys('ctrl', 'e', e) ||
    test_keys('ctrl', 'l', e) ||
    test_keys('up', e) ||
    test_keys('down', e)) {
    e.preventDefault();
  }
})

function prevHist() {
  if (currPos > 0) {
    currPos -= 1;
    cmdInpt.val(cmdHist[currPos]);
  }
}

function nextHist() {
  if (currPos < cmdHist.length) {
    currPos += 1;
    cmdInpt.val(cmdHist[currPos]);
  } else {
    cmdInpt.val('');
  }
}

function moveToBeginning() {
  if (cmdInpt[0].createTextRange) {
    var part = cmdInpt[0].createTextRange();
    part.move("character", 0);
    part.select();
  } else if (cmdInpt[0].setSelectionRange) {
    cmdInpt[0].setSelectionRange(0, 0);
  }
}

function moveToEnd() {
  var cmd = cmdInpt.val();
  cmdInpt.val('');
  cmdInpt.val(cmd);
}

function breakCmd() {
  if (cmdInpt.val()) {
    appendToHist(`${config.prompt} ${cmdInpt.val()}^C`);
    cmdInpt.val('');
  }
}

function handleCommand() {
  if (cmdInpt.val()) {
    appendToHist(`${config.prompt} ${cmdInpt.val()}`);
    cmdHist.push(cmdInpt.val());
    currPos = cmdHist.length;
    var args = cmdInpt.val().replace(/[^a-z0-9\s]/gi, '').toLowerCase().split(' ');
    var cmd = _getCmdByName(args[0]);
    if (cmd) {
      window[cmd.exec](args, cmd.data);
    } else {
      unknown(args);
    }
  }
  cmdInpt.val('');
  cmdInpt.focus();
  $('#bottom')[0].scrollIntoView({block: "end", behavior: "smooth"});
}

function _getCmdByName(name) {
  for (let cmd of config.commands) {
    if (name == cmd.name) {
      return cmd;
    }
  }
  return;
}

function about(args, data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += data['sid'];
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (data.hasOwnProperty(cmdStr)) {
      outStr += data[cmdStr]
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
  }
  appendToHist(outStr);
}

function clear(_args, _data) {
  hist.html('');
}

function contact(args, data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += 'You can reach me at:\n'
    for (let way of Object.values(data)) {
      outStr += ` * <a href="${way[0]}">${way[1]}</a>\n`;
    }
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (data.hasOwnProperty(cmdStr)) {
      outStr += `You can reach me at: <a href="${data[cmdStr][0]}">${data[cmdStr][1]}</a>\n`;
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
  }
  appendToHist(outStr);
}

function dark(args, _data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += `EXPECTED ARGUMENT: on|off\n`
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (cmdStr == 'on') {
      if (theme != 'dark') {
        window.toggleThemes();
        outStr += 'Dark Mode now: ON'
      } else {
        outStr += 'Dark Mode already ON'
      }
    } else if (cmdStr == 'off') {
      if (theme != 'light') {
        window.toggleThemes();
        outStr += 'Dark Mode now: OFF'
      } else {
        outStr += 'Dark Mode already OFF'
      }
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
    theme = localStorage.getItem('theme') || 'light'
  }
  appendToHist(outStr);
}

function help(args, _data) {
  var outStr = '';
  if (args.length <= 1) {
    // outStr += 'Sid\'s Site Terminal HELP\n========================\n';
    for (let cmd of config.commands) {
      outStr += cmd.name + '\t' + cmd.description + '\n';
    }
    outStr += 'To find more about a certain command, enter `help [command]`\n';
  } else {
    var cmdStr = args.splice(1).join(" ");
    // outStr += `COMMAND ${cmdStr} HELP\n========================\n`;
    var cmd = _getCmdByName(cmdStr);
    if (cmd) {
      outStr += `USAGE: ${cmd.syntax}\n`;
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`;
    }
  }
  appendToHist(outStr);
}

function social(args, data) {
  var outStr = '';
  if (args.length <= 1) {
    outStr += 'You can find me at:\n'
    for (medium in data) {
      if (data.hasOwnProperty(medium)) {
        outStr += ` * <a href="${data[medium]}">${medium}</a>\n`;
      }
    }
  } else {
    var cmdStr = args.splice(1).join(" ");
    if (data.hasOwnProperty(cmdStr)) {
      outStr += `You can find me on ${cmdStr} <a href="${data[cmdStr]}">here</a>\n`;
    } else {
      outStr += `UNKNOWN ARGUMENT: ${cmdStr}\n`
    }
  }
  appendToHist(outStr);
}

function unknown(args, _data) {
  appendToHist(`UNKNOWN COMMAND: ${args.join(' ')}`);
}