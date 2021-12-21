// Set all elements to be used in this script
var main = document.getElementsByTagName("main")
var viewHSLink = document.getElementById("view-hs-link")
var timeDisplay = document.getElementById("time-display")
var startQuizBtn = document.getElementById("start-quiz-btn")
var quizQuestion = document.getElementById("questions-display")
var quizAnswers = document.getElementById("answer-list")
var feedback = document.getElementById("feedback")
var scoreDisplay = document.getElementById("score-display")
var getInitials = document.getElementById("initials-input")
var submitInitials = document.getElementById("submit-initials-btn")
var highScoreList = document.getElementById("highscore-list")
var goBack = document.getElementById("go-to-starting-page-btn")
var clearHighScores = document.getElementById("clear-highscores-btn")

// the questions and answers to be asked in the quiz
const questions = [ // an array that holds the list of questions and their answers
    {
        'question': 'Inside which HTML element do we put the JavaScript?',
        'answers': ['<js>', '<javascript>', '<script>', '<scripting>'],
        'correct-index': 2
    }, {
        'question': 'Commonly used data types DO NOT include:',
        'answers': ['alerts', 'booleans', 'strings', 'numbers'],
        'correct-index': 0
    }, {
        'question': 'The condition in an if / else statement is enclosed within _____.',
        'answers': ['curly brackets', 'parentheses', 'quotes', 'square brackets'],
        'correct-index': 1
    }, {
        'question': 'Arrays in JavaScript can be used to store _____.',
        'answers': ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        'correct-index': 3
    }, {
        'question': 'String values must be enclosed within _____ when being assigned to variables.',
        'answers': ['commas', 'curly brackets', 'quotes', 'parentheses'],
        'correct-index': 2
    }, {
        'question': 'A very useful tool used during development and debugging for printing content to the debugger is:',
        'answers': ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
        'correct-index': 3
    }, {
        'question': 'DOM stands for:',
        'answers': ['Document Objective Modal', 'Doctrine  of Manliness', 'Document Object Model', 'Document Original Memorandum'],
        'correct-index': 2
    }, {
        'question': 'What is the correct place to insert a JavaScript?',
        'answers': ['The <body> section', 'The <head> section', 'The <main> section', 'Both the <head> section and the <body> section are correct'],
        'correct-index': 0
    }
]

