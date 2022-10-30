const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors =['#4f7aaa', '#21ec06', '#d2f50c', '#d2f50ca6', '#f5a80ca6', '#f5210ca6', '#f5210c', '#783b02', '#347802', '#495d3b', '#80f494', '#09693e', '#59b1af', '#034f80', '#1733bf', '#65528c', '#5936a0', '#4f06e5', '#ab06e5', '#3d084f', '#41224b', '#de9af4', '#c100ff', '#c80eb6', '#833b7c', '#c898c3', '#ed0a5b', '#540622', '#856470', '#fa6198', '#6a3246', '#8e1919', '#c34a4a', '#f76060', '#540f0f', '#927474', '#ff0000', '#ffffff', '#000']

let time = 0
let score = 0

const getRandomColor = () => {
 const index = Math.floor(Math.random() * colors.length)
 return colors[index]
}

const setColor = elem => {
 const color = getRandomColor()
 elem.style.backgroundColor = color
 elem.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

startBtn.addEventListener('click', event => {
 event.preventDefault()
 screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
 if(event.target.classList.contains('time-btn')) {
  time = + event.target.getAttribute('data-time')
  screens[1].classList.add('up')
  startGame()
 }
})

board.addEventListener('click', event => {
 if(event.target.classList.contains('circle')) {
  score ++
  event.target.remove()
  createRandomCircle()
 }
})

function startGame () {
 setInterval(decreaseTime, 1000)
 createRandomCircle()
 setTime(time)
}

function decreaseTime () {
 if(time === 0) {
  finishGame()
 }else {
  let current = --time;
 if(current < 10) {
  current = `0${current}`
 }
 setTime(current)
 }
}

function finishGame() {
 timeEl.parentNode.classList.add('hide')
 board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

function setTime(value) {
 timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
 const circle = document.createElement('div')
 circle.classList.add('circle')
 setColor(circle)
 const size = getRandomNumber(10, 60)
 const {width, height} = board.getBoundingClientRect();
 const x = getRandomNumber(0, width - size)
 const y = getRandomNumber(0, height - size)

 circle.style.width = `${size}px`
 circle.style.height = `${size}px`
 circle.style.top = `${y}px`
 circle.style.left = `${x}px`

 board.append(circle)
}

function getRandomNumber(min, max) {
 return Math.round(Math.random() * (max - min) + min)
}
