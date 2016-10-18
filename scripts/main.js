var aiArr = [];
var humanArr = [];
var aiClickCount = 0;
var humanClickCount = 0;
var round = 0;
var i;
var gameMode = "normal";
var power = "off";
var turn = "ai";

document.getElementById("1").addEventListener('click', function() {
  if (turn === "human") {
    console.log("listen, userPick1");
    userPick(1);
  }
})
document.getElementById("2").addEventListener('click', function() {
  if (turn === "human") {
    console.log("listen, userPick2");
    userPick(2);
  }
})
document.getElementById("3").addEventListener('click', function() {
  if (turn === "human") {
    console.log("listen, userPick3");
    userPick(3);
  }
})
document.getElementById("4").addEventListener('click', function() {
  if (turn === "human") {
    console.log("listen, userPick4");
    userPick(4);
  }
})

document.getElementById('onOff').addEventListener('click', function() {
  if (power === "off") {
    on();
  } else if (power === "on") {
    off();
  }
})

document.getElementById("start").addEventListener('click', function() {
  if (power === "on") {
    start()
  }
})

document.getElementById('strict').addEventListener('click', function() {
  if (power === "on") {
    strict()
  }
})

function defaults() {
  aiArr = [];
  humanArr = [];
  round = 0;
  gameMode = "normal";
  aiClickCount = 0;
  humanClickCount = 0;
  turn = 'ai'
}

function on() {
  document.getElementById('switch').style.left = "37px";
  document.getElementById('count').innerHTML = "--";
  power = "on";
};

function off() {
  power = "off"
  defaults();
  document.getElementById('switch').style.left = "1px";
  document.getElementById('count').innerHTML = "";
}

function strict() {
  if (power === 'on') {
    console.log('strict');
    if (gameMode === "normal") {
      gameMode = "strict";
      document.getElementById('led').style.backgroundColor = "#ff1a1a";
    } else if (gameMode === "strict") {
      gameMode = "normal";
      document.getElementById('led').style.backgroundColor = "#cc0000";
    }
  }
}

function start() {
  console.log("start");
  randomNum();
}

function randomNum() {
  console.log('function: random')
  var num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  push("ai", num);
  num = null;
}

function push(user, num) {
  console.log('push', user, num);
  if (user === "ai") {
    humanClickCount = 0;
    round++;
    changeCount();
    aiArr.push(num);
    readArr();
  } else if (user === "human") {
    aiClickCount = 0;
    humanArr.push(num);
  }
}

function readArr() {
  setTimeout(click, 1200, "ai", aiArr[aiClickCount]);
}

function click(user, num) {
  console.log('function: click - user: ' + user + ' - Num: ' + num);
  if (num === 1) {
    document.getElementById('1').style.backgroundColor = "#ff1a1a";
    document.getElementById('sound1').play();
    setTimeout(changeBack, 500, 1);
  } else if (num === 2) {
    document.getElementById('2').style.backgroundColor = "#0080ff";
    document.getElementById('sound2').play();
    setTimeout(changeBack, 500, 2);
  } else if (num === 3) {
    document.getElementById('3').style.backgroundColor = "#47d147";
    document.getElementById('sound3').play();
    setTimeout(changeBack, 500, 3);
  } else if (num === 4) {
    document.getElementById('4').style.backgroundColor = "#ffff00";
    document.getElementById('sound4').play();
    setTimeout(changeBack, 500, 4);
  }
  increaseCount(user);
  next(user);
}

function increaseCount(user) {
  console.log('function: increaseCount - user: ' + user)
  if (user === 'ai') {
    aiClickCount++;
  } else if (user === 'human') {
    humanClickCount++;
  }
}

function next(user) {
  console.log('function: next - user: ' + user)
    if (user === 'ai' && aiClickCount !== round) {
      console.log("function: next - option 1 - aiClickCount: " + aiClickCount + ' - round: ' + round)
      turn = 'ai'
      readArr();
    } else if (user === 'ai' && aiClickCount === round) {
      console.log("function: next - option 2 - aiClickCount: " + aiClickCount)
      turn = "human"
    } else if (user === "human" && humanClickCount !== round) {
      console.log('function: next - option 3: - humanClickCount: ' + humanClickCount)
      turn = "human"
    } else if (user === "human" && humanClickCount === round) {
      console.log('function: next - option 4: - humanClickCount: ' + humanClickCount)
      turn = "ai"
      checkArr();
    }
}

function userPick(num) {
  push("human", num);
  click("human", num);
}

function checkArr() {
  if (aiArr.length !== humanArr.length) {
    console.log('aiArr Length: ' + aiArr.length + ' - humanArr Length: ' + humanArr.length)
    return;
  }

  console.log('function: checkArr');
  for (i = 0; i < aiArr.length; i++) {
    console.log("function: checkArr - i: " + i);
    if (aiArr[i] !== humanArr[i]) {
      console.log('function: checkArr - option 1: fail')
      fail();
      return;
    } else if (round === 3) {
      console.log('function: checkArr - option 1: win')
      win();
      return;
    }
  }
  console.log('function: checkArr - randomNum')
  humanArr = [];
  randomNum();
}

function changeBack(num) {
  if (num === 1) {
    document.getElementById('1').style.backgroundColor = "#cc0000";
  } else if (num === 2) {
    document.getElementById('2').style.backgroundColor = "#0059b3";
  } else if (num === 3) {
    document.getElementById('3').style.backgroundColor = "#29a329";
  } else if (num === 4) {
    document.getElementById('4').style.backgroundColor = "#ffdf00";
  }
}

function changeCount() {
  if (round < 10) {
    document.getElementById('count').innerHTML = "0" + round;
  } else if (round > 9) {
    document.getElementById('count').innerHTML = round;
  }
}

function fail() {
  if (gameMode === "strict") {
    restart();
  } else if (gameMode === "normal") {
    aiClickCount = 0;
    humanClickCount = 0;
    humanArr = [];
    readArr();
  }
}

function restart() {
  console.log('function: restart')
  setTimeout(blink, 300, "on")
  setTimeout(blink, 600, "off")
  setTimeout(blink, 900, "on")
  setTimeout(blink, 1200, "off")
  setTimeout(reset, 1500)
}

function blink(status){
  if (status === 'on') {
    document.getElementById('count').innerHTML = "!!";
  } else if (status === 'off') {
    document.getElementById('count').innerHTML = "";
  }
}

function reset() {
  defaults()
  document.getElementById('count').innerHTML = "--";
  setTimeout(start, 200)
}

function win() {
  alert("You Won!")
  defaults()
  document.getElementById('count').innerHTML = "--";
}
