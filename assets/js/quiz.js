const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const timerCountdown = document.querySelector('#timerCountdown');

let currentQuestion = {}
let acceptingAnswers = true
let score = 1000
let questionCounter = 0
let availableQuestions = []

var questionIndex = 0;


let questions = [
  {
    question: "What's the Console keyword?",
      choice1: "It consoles the user when they are crying",
      choice2: "It prints a message in the console tab",
      choice3: "It loops through an array",
      choice4: "It adds a new element",
    answer: 2,
   },
 {
  question: "What's JavaScript?",
    choice1: "It's a rule-based language for styling pages",
    choice2: "It's a scripting language",
    choice3:"It's the standar markup language for web pages",
    choice4:"It's a function on Python",
  answer: 2,
 },
 {
  question: "Which of the following examples is not an array?",
    choice1: "var house = new Array(10, 20, 30, 40, 50);",
    choice2: "var house1 = new Array(5);",
    choice3: "var = window.alert('Front door open')",
    choice4: "var house = ['living room', 'bedroom', 'bathroom']",
  answer: 3,
 },
 {
  question: "What does Array.from() allow you to do?",
    choice1: "It returns an array from any object with a length property",
    choice2: "It creates a new variable",
    choice3: "It gathers all arrays you've created into a new array",
    choice4: "It prints the array elements on the console bowser",
  answer: 1,
 },
 {
  question: "What's the usage of Array.forEach()?",
    choice1: "It sets a new name for each arry you've already writen",
    choice2: "It set a new index for each element in an array",
    choice3: "It creates a for loop in the arrays",
    choice4: "It calls a function for each element in an array",
  answer: 4,
 },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

function startGame() {
 questionCounter = 0
 score = 0
 time = 60
 availableQuestions = [...questions]

 timer = setInterval(function () {
   time--
   timerCountdown.textContent = time

   if (time <= 0) {
    return window.location.assign('./end.html')
   }
 }, 1000)

 getNewQuestion()
}

function getNewQuestion() {
  // store score and return to save score page 
 if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
  localStorage.setItem('mostRecentScore', score)

  return window.location.assign('./end.html')
  }

  //count questions on top of page
 questionCounter++
 progressText.innerText = 'Question ' + questionCounter + ' of ' + MAX_QUESTIONS

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
 choice.addEventListener('click', function (e) {
     if (!acceptingAnswers)
       return;

     acceptingAnswers = false;
     const selectedChoice = e.target;
     const selectedAnswer = selectedChoice.dataset['number'];

     let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

     if (classToApply === 'correct') {
       incrementScore(SCORE_POINTS);
     } else {
       classToApply === 'incorrect'
       time -= 5
     }

     selectedChoice.parentElement.classList.add(classToApply);

     setTimeout(function () {
       selectedChoice.parentElement.classList.remove(classToApply);

       getNewQuestion();
     }, 1000);
   })
})

// reduce score if the answer is wrong
function incrementScore(num) {
    let num1 = score
    let num2 = time
    score += time
    scoreText.innerText = score
  }

startGame()
