const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let avaibleQuestions = []

let questions = [
 {
  question: 'pergunta aqui?',
  choice1: 'resp 1',
  choice2: 'certa',
  choice3: 'resp 3',
  choice4: 'resp 4',
  answer: 2,
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
