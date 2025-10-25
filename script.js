// DOM Elements
const startScreen = document.getElementById("start-screen"); 
const quizScreen = document.getElementById("quiz-screen"); 
const resultScreen = document.getElementById("result-screen"); 
const startButton = document.getElementById("start-btn"); 
const questionText = document.getElementById("question-text"); 
const answerContainer = document.getElementById("answer-container"); 
const currentQuestionSpan = document.getElementById("current-question"); 
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score")
const finalScoreSpan = document.getElementById("final-score"); 
const maxScoreSpan = document.getElementById("maximum-score"); 
const resultMessage = document.getElementById("result-message"); 
const restartButton = document.getElementById("restart-btn"); 
const progressBar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS

let currentQuestionIndex = 0; 
let score = 0; 
let answerDisabled = false; 


totalQuestionSpan.textContent = quizQuestions.length; 
maxScoreSpan.textContent = quizQuestions.length; 

// even listeners 

startButton.addEventListener("click", startQuiz); 
restartButton.addEventListener("click", restartQuiz); 

function startQuiz () {
  // reset vars
  currentQuestionIndex = 0; 
  score = 0;
  scoreSpan.textContent = 0; 

  startScreen.classList.remove("active"); 
  quizScreen.classList.add("active");

  showQuestion();

}

function showQuestion () {
  // reset state
  answerDisabled = false; 

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length ) * 100; 

  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question; 

  answerContainer.innerHTML = "";
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button")
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct; 

    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button); 
  })
}

function selectAnswer (event) {
  if (answerDisabled) return;

  answerDisabled = true; 
  const selectedButton = event.target; 
  const isCorrect = selectedButton.dataset.correct === "true"; 

  Array.from (answerContainer.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct"); 
    } else if(button === selectedButton) {
      button.classList.add("incorrect"); 

    }
  }); 
  if (isCorrect) {
    score++; 
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++; 
    if(currentQuestionIndex < quizQuestions.length) {
      // check if there are more questions or if the quiz is over 
      showQuestion()
    } else {
      showResults(); 
    }
  },1000)
}

function showResults() {
  quizScreen.classList.remove("active"); 
  resultScreen.classList.add("active"); 

  finalScoreSpan.textContent = score; 

  const precentage = (score / quizQuestions.length) * 100; 

  if(precentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!"; 
  } 
  else if ( precentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff"; 
  } 
  else if ( precentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!"; 
  } 
  else if ( precentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!"; 
  } 
  else{
    resultMessage.textContent = "Keep studying! You'll get better"; 
  } 
}

function restartQuiz () {
  resultScreen.classList.remove("active");
  startQuiz(); 
  
}




// ncaught ReferenceError: selectAnswer is not defined
    // showQuestion http://127.0.0.1:5500/script.js:113
    // showQuestion http://127.0.0.1:5500/script.js:107
    // startQuiz http://127.0.0.1:5500/script.js:89
    // EventListener.h