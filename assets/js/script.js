// Set all elements to be used in this script
var main = document.getElementsByTagName("main")
var viewHSLink = document.getElementById("view-hs-link")
var timeDisplay = document.getElementById("time-display")
var startQuizBtn = document.getElementById("start-quiz-btn")
var quizQuestion = document.getElementById("question-display")
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

// score tracking
const startingTime = questions.length * 8 // the amount of time the user will be given to answer all of the questions in seconds

const timePenalty = 10 // the amount of time that will be taken from the time remaining when an incorrect selection is made

var remainingTime // the amount of time that is left on the clock
var timer // the interval timer
var score // the number of correct questions

// What happens when the "Start Quiz" button gets pressed
function init(){
    startQuizBtn.addEventListener('click', event=> {
        event.preventDefault()
        displayQuestionPage()
    })
    quizAnswers.addEventListener('click', function(event){
        event.preventDefault()
        if (event.target.matches('button')){
            var button = event.target
            if(button.classList.contains('correct')){
                feedback.textContent = "Correct!"
            }
            else {
                feedback.textContent = "Wrong!"
                remainingTime -= timePenalty
            }
            if (remainingTime > 0) displayNextQuestion()
            else displayGetNamePage()
        }
    })
    submitInitials.addEventListener('click', event=>{
        event.preventDefault()
        let initials = getInitials.value.toUpperCase()
        if (initials){
            let highscores = JSON.parse(localStorage.getItem('highscores')) || []

            timestamp = Date.now()
            highscores.push({
                'timestamp': timestamp,
                'score': score,
                'initials': initials,
                'timeRemaining': remainingTime
            })

            highscores = highscores.sort((a, b) => {
                if (a.score != b.score) return b.score - a.score
                if (a.timeRemaining != b.timeRemaining) return b.timeRemaining - a.timeRemaining
                if (a.timestamp != b.timestamp) return a.timestamp - b.timestamp
                return 0
            })

            localStorage.setItem('highscores', JSON.stringify(highscores))

            displayHighScorePage()
            initialsInput.value = ""
        }
    })
    goBack.addEventListener('click', event=>{
        event.preventDefault()
        displayStartingPage()
    })
    clearHighScores.addEventListener('click', event=>{
        event.preventDefault()
        displayHighScorePage()
    })

    // display the starting page
    displayStartingPage()
}

function displayPage(id){
    main.querySelectorAll('.page').forEach(page =>{
        if(page.id == id){
            page.classList.remove('hidden')
        } else {
            page.classList.add('hidden')
        }
    })
    return 4
}

// Display starting page // 

function displayStartingPage(){
    displayPage('starting-page')

    clearInterval(timer)
    remainingTime = 0
    timeDisplay.textContent = formatSeconds(remainingTime)
}

var nextQuestionIndex // the index of questions that the user is seeing
var randomizedQuestions // a randomly sorted clone of the array with the quiz questions

// Display the questions page //

function displayQuestionPage(){
    displayPage('question-page')

    // create a randomly sorted clone of the questions array to use for this quiz
    randomizedQuestions = randomizeArray(questions)

    // reset the values to back to their defaults
    nextQuestionIndex = 0
    score = 0

    // start the timer
    startTimer()

    // setup the first question
    displayNextQuestion()
}

// Display the next question //
function displayNextQuestion(){
    if (nextQuestionIndex < questions.length){
        // get the question and answers from the array
        const question = randomizedQuestions[nextQuestionIndex].question
        const answers = randomizedQuestions[nextQuestionIndex].answers
        const randomizedAnswers = randomizeArray(answers)
        const correctAnswer = answers[randomizedQuestions[nextQuestionIndex].correct-index]

        questionDisplay.textContent = question
        quizAnswers.innerHTML = ""
        feedback.textContent = ""

        for (let i = 0; i < randomizedAnswers.length; i++) {
            let answer = randomizedAnswers[i]
            let button = document.createElement("button")
            button.classList.add('answer')
            if (answer == correctAnswer)
                button.classList.add('correct')
            button.textContent = `${i + 1}. ${answer}`
            quizAnswers.appendChild(button)
        }

        nextQuestionIndex++
    } else {
        clearInterval(timer)
        displayGetNamePage()
    }
}