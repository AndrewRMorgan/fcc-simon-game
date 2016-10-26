let aiArr = []
let humanArr = []
let aiClickCount = 0
let humanClickCount = 0
let round = 0
let i
let gameMode = "normal"
let power = "off"
let turn = "ai"
let ready = true

document.getElementById("1").addEventListener('click', function() {
  if (turn === "human" && ready === true) {
    userPick(1)
  }
})
document.getElementById("2").addEventListener('click', function() {
  if (turn === "human" && ready === true) {
    userPick(2)
  }
})
document.getElementById("3").addEventListener('click', function() {
  if (turn === "human" && ready === true) {
    userPick(3)
  }
})
document.getElementById("4").addEventListener('click', function() {
  if (turn === "human" && ready === true) {
    userPick(4)
  }
})
document.getElementById('onOff').addEventListener('click', function() {
  if (power === "off") {
    on()
  } else if (power === "on") {
    off()
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
  aiArr = []
  humanArr = []
  round = 0
  gameMode = "normal"
  aiClickCount = 0
  humanClickCount = 0
  turn = 'ai'
}

function on() {
  power = "on"
  document.getElementById('switch').style.left = "37px"
  document.getElementById('count').innerHTML = "--"
}

function off() {
  power = "off"
  defaults()
  pauseSound()
  resetSound()
  originalColor()
  document.getElementById('switch').style.left = "1px"
  document.getElementById('count').innerHTML = ""
}

function strict() {
  if (power === "off") {
    return
  }
  if (gameMode === "normal") {
    gameMode = "strict"
    document.getElementById('led').style.backgroundColor = "#ff1a1a"
  } else if (gameMode === "strict") {
    gameMode = "normal"
    document.getElementById('led').style.backgroundColor = "#cc0000"
  }
}

function start() {
  if (power === "off") {
    return
  }
  randomNum()
}

function randomNum() {
  if (power === "off") {
    return
  }
  let num = Math.floor(Math.random() * (4 - 1 + 1)) + 1
  push("ai", num)
}

function push(user, num) {
  if (power === "off") {
    return
  }
  if (user === "ai") {
    humanClickCount = 0
    round++
    changeCount()
    aiArr.push(num)
    readArr()
  } else if (user === "human") {
    aiClickCount = 0
    humanArr.push(num)
  }
}

function readArr() {
  if (power === "off") {
    return
  }
  setTimeout(click, 1200, "ai", aiArr[aiClickCount])
}

function click(user, num) {
  if (power === "off") {
    return
  }
  if (num === 1) {
    document.getElementById('1').style.backgroundColor = "#ff1a1a"
    document.getElementById('sound1').play()
    setTimeout(changeBack, 500, 1)
  } else if (num === 2) {
    document.getElementById('2').style.backgroundColor = "#0080ff"
    document.getElementById('sound2').play()
    setTimeout(changeBack, 500, 2)
  } else if (num === 3) {
    document.getElementById('3').style.backgroundColor = "#47d147"
    document.getElementById('sound3').play()
    setTimeout(changeBack, 500, 3)
  } else if (num === 4) {
    document.getElementById('4').style.backgroundColor = "#ffff00"
    document.getElementById('sound4').play()
    setTimeout(changeBack, 500, 4)
  }
  ready = false
  increaseCount(user)
  next(user)
}

function increaseCount(user) {
  if (power === "off") {
    return
  }
  if (user === 'ai') {
    aiClickCount++
  } else if (user === 'human') {
    humanClickCount++
  }
}

function next(user) {
  if (power === "off") {
    return
  }
  if (user === 'ai' && aiClickCount !== round) {
    turn = 'ai'
    readArr();
  } else if (user === 'ai' && aiClickCount === round) {
    turn = "human"
  } else if (user === "human" && humanClickCount !== round) {
    turn = "human"
  } else if (user === "human" && humanClickCount === round) {
    turn = "ai"
    checkArr();
  }
}

function userPick(num) {
  if (power === "off") {
    return
  }
  push("human", num)
  click("human", num)
}

function checkArr() {
  if (aiArr.length !== humanArr.length || power === "off") {
    return
  }
  for (i = 0; i < aiArr.length; i++) {
    if (aiArr[i] !== humanArr[i]) {
      fail()
      return
    } else if (round === 20) {
      win()
      return
    }
  }
  humanArr = []
  randomNum()
}

function changeBack(num) {
  if (power === "off") {
    return
  }
  if (num === 1) {
    document.getElementById('1').style.backgroundColor = "#cc0000"
  } else if (num === 2) {
    document.getElementById('2').style.backgroundColor = "#0059b3"
  } else if (num === 3) {
    document.getElementById('3').style.backgroundColor = "#29a329"
  } else if (num === 4) {
    document.getElementById('4').style.backgroundColor = "#ffdf00"
  }
  ready = true
}

function originalColor() {
  document.getElementById('1').style.backgroundColor = "#cc0000"
  document.getElementById('2').style.backgroundColor = "#0059b3"
  document.getElementById('3').style.backgroundColor = "#29a329"
  document.getElementById('4').style.backgroundColor = "#ffdf00"
}

function pauseSound() {
  document.getElementById('sound1').pause()
  document.getElementById('sound2').pause()
  document.getElementById('sound3').pause()
  document.getElementById('sound4').pause()
}

function resetSound() {
  document.getElementById('sound1').currentTime = 0
  document.getElementById('sound2').currentTime = 0
  document.getElementById('sound3').currentTime = 0
  document.getElementById('sound4').currentTime = 0
}

function changeCount() {
  if (round < 10) {
    document.getElementById('count').innerHTML = "0" + round
  } else if (round > 9) {
    document.getElementById('count').innerHTML = round
  }
}

function fail() {
  if (gameMode === "strict") {
    restart()
  } else if (gameMode === "normal") {
    aiClickCount = 0
    humanClickCount = 0
    humanArr = []
    readArr()
  }
}

function restart() {
  setTimeout(blink, 300, "on")
  setTimeout(blink, 600, "off")
  setTimeout(blink, 900, "on")
  setTimeout(blink, 1200, "off")
  setTimeout(reset, 1500)
}

function blink(status){
  if (status === 'on') {
    document.getElementById('count').innerHTML = "!!"
  } else if (status === 'off') {
    document.getElementById('count').innerHTML = ""
  }
}

function reset() {
  defaults()
  document.getElementById('count').innerHTML = "--"
  setTimeout(start, 200)
}

function win() {
  defaults()
  document.getElementById('count').innerHTML = "--"
  setTimeout(winAlert, 500)
}

function winAlert() {
  alert("You Won!")
}
