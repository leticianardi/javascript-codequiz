const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerCountdown = document.querySelector('#timerCountdown');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

var questionIndex = 0;

let questions = [
 {
  question: "What's JavaScript?",
    choice1: "It's a rule-based language for styling pages",
    choice2: "It's a scripting language",
    choice3:"It's the standar markup language for web pages",
    choice4:"It's a function on Python",
  answer: "It's a scripting language",
 },
 {
  question: 'pergunta aqui 2?',
  choice1: 'resp 1',
  choice2: 'resp 2',
  choice3: 'resp 3',
  choice4: 'certa',
  answer: 4,
 },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 2

function startGame() {
 questionCounter = 0
 score = 0
 time = 75
 availableQuestions = [...questions]

 timer = setInterval(function () {
   time--
   timerCountdown.textContent = time

   if (time <= 0) {
    return window.location.assign('/end.html')
   }
 }, 1000)

 getNewQuestion()
}

function getNewQuestion() {
  // store score and return to save score page 
 if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
  localStorage.setItem('mostRecentScore', score)

  return window.location.assign('/end.html')
  }

  //count questions on top of page
 questionCounter++
 progressText.innerText = 'Question' + questionCounter + ' of ' + MAX_QUESTIONS
 // progressBarFull.style.width = ` ${(questionCounter/MAX_QUESTIONS) * 100}% `

 // show the queston in a random order
 const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
 currentQuestion = availableQuestions[questionsIndex]
 question.innerText = currentQuestion.question

 // show the answers
 choices.forEach(function (choice)  {
  const number = choice.dataset['number']
  choice.innerText = currentQuestion['choice' + number]
 })

 // replace question 
 availableQuestions.splice(questionsIndex, 1)

 acceptingAnswers = true
}

// change colors of answers when correct and wrong
choices.forEach(function (choice) {
 choice.addEventListener('click', e => {
  if (!acceptingAnswers) return
  
  acceptingAnswers = false
  const selectedChoice = e.target
  const selectedAnswer = selectedChoice.dataset['number']

  let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
  
  if(classToApply === 'correct') {
   incrementScore(SCORE_POINTS)
  }

  selectedChoice.parentElement.classList.add(classToApply)

  setTimeout (() => {
   selectedChoice.parentElement.classList.remove(classToApply)
   getNewQuestion()
  }, 1000)
 })
})

// reduce score if the answer is wrong
incrementScore = num => {
 score += num
 scoreText.innerText = score
}

startGame()
