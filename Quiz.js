const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-btn')
let shuffledQuestions , currentQuestionIndex //we used let that they can be redefined later 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5) // it's shuffles all of our Qs
    currentQuestionIndex = 0 // to start at the very first Q in our shuffled Qs Array
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body) // for changing The colors depending on Answers status
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {  // thats mean if we have more Qs 
        nextButton.classList.remove('hide')                     
    } else {    // we are in the last Q
        startButton.innerText = 'Restart' // here we changed our start btn to Restar
        startButton.classList.remove('hide') // and removed our start Btn
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is The Capital of Turkey ?',
        answers: [
            { text: 'Ankara', correct: true},
            { text: 'Istanbul', correct: false},
            { text: 'Izmir', correct: false},
            { text: 'Antalya', correct: false}
        ]
    },
    {
        question: 'which Language is Frontend Language ?',
        answers: [
            { text: 'Php', correct: false},
            { text: 'java', correct: false},
            { text: 'javaScript', correct: true},
            { text: 'C', correct: false}
        ]
    },
    {
        question: 'Which Language is Backend Language ?',
        answers: [
            { text: 'HTML', correct: false},
            { text: 'java', correct: true},
            { text: 'Css', correct: false},
            { text: 'React', correct: false}
        ]
    },
    {
        question: 'Can we Change The World Using Softwares ?',
        answers: [
            { text: 'No', correct: false},
            { text: 'Maybe', correct: false},
            { text: 'Ofcourse', correct: true},
            { text: 'idk', correct: false}
        ]
    },
]