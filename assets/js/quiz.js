const question = document.querySelector('#question');
const answers = Array.from(document.querySelectorAll('.letter-text'));
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
      a: "It consoles the user when they are crying",
      b: "It prints a message in the console tab",
      c: "It loops through an array",
      d: "It adds a new element",
    answer: "b",
   },
   {
    question: "What's JavaScript?",
      a: "It's a rule-based language for styling pages",
      b: "It's a scripting language",
      c:"It's the standar markup language for web pages",
      d:"It's a function on Python",
    answer: "b",
   },
   {
    question: "Which of the following examples is not an array?",
      a: "var house = new Array(10, 20, 30, 40, 50);",
      b: "var house1 = new Array(5);",
      c: "var = window.alert('Front door open')",
      d: "var house = ['living room', 'bedroom', 'bathroom']",
    answer: "c",
   },
   {
    question: "What does Array.from() allow you to do?",
      a: "It returns an array from any object with a length property",
      b: "It creates a new variable",
      c: "It gathers all arrays you've created into a new array",
      d: "It prints the array elements on the console bowser",
    answer: "a",
   },
   {
    question: "What's the usage of Array.forEach()?",
      a: "It sets a new name for each arry you've already writen",
      b: "It set a new index for each element in an array",
      c: "It creates a for loop in the arrays",
      d: "It calls a function for each element in an array",
    answer: "d",
   },
  
  ]
//

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

  // show ansers
 answers.forEach((answer) => {
  answer.innerText = currentQuestion[answer.dataset["answer"]];
  });

 // replace question 
 availableQuestions.splice(questionsIndex, 1)

 acceptingAnswers = true
}

// change colors of answers when correct and wrong
answers.forEach(function (answer) {
 answer.addEventListener('click', function (e) {
     if (!acceptingAnswers)
       return;

     acceptingAnswers = false;
     const clickedAnswer = e.target;
     const answeredLetter = clickedAnswer.dataset['answer'];

     let classToApply = answeredLetter == currentQuestion.answer ? 'correct' : 'incorrect';

     if (classToApply === 'correct') {
       incrementScore(SCORE_POINTS);
       console.log('right answer');
     } else {
       classToApply === 'incorrect'
       time -= 5
       console.log('wrong answer');
     }

     clickedAnswer.parentElement.classList.add(classToApply);

     setTimeout(function () {
       clickedAnswer.parentElement.classList.remove(classToApply);

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
