const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyper Text Makeup Language", correct: false},
            {text: "Hypen Text Markup Language", correct: false},
            {text: "Hypen Text Makeup Language", correct: false},
        ]
    },
    {
        question: " Is JavaScript a case-sensitive language?",
        answers: [
            {text: "false", correct: false},
            {text: "true", correct: true},
            {text: "I dont know", correct: false},
            {text: "maybe", correct: false},
        ]
    },
    {
        question: "In an array the first value is?",
        answers: [
            {text: "1", correct: false},
            {text: "1.0", correct: false},
            {text: "0.1", correct: false},
            {text: "0", correct: true},
        ]
    },
    {
        question: "What does URL stand for?",
        answers: [
            {text: "Universal Resource Location", correct: false},
            {text: "Uniform Reserved Locator", correct: false},
            {text: "Uniform Resource Locator", correct: true},
            {text: "Universal Resource Location", correct: false},
        ]
    },
    
    {
        question: "What are the two methods of forms transfer?",
        answers: [
            {text: "Get and recieve", correct: false},
            {text: "Get and post", correct: true},
            {text: "Post and recieve", correct: false},
            {text: "Post and required", correct: false},
        ]
    },
    {
        question: "A collection of data containing both properties and methods is called?",
        answers: [
            {text: "Tag", correct: false},
            {text: "Selector", correct: false},
            {text: "Object", correct: true},
            {text: "Class", correct: false},
        ]
    },
    {
        question: "Which of the following is not an HTML tag?",
        answers: [
            {text: "Style", correct: false},
            {text: "Table", correct: false},
            {text: "P", correct: false},
            {text: "Doctype", correct: true},
        ]
    },
    {
        question: "How many ways can you apply colors in CSS?",
        answers: [
            {text: "3", correct: false},
            {text: "2", correct: false},
            {text: "1", correct: false},
            {text: "7", correct: true},
        ]
    },
    {
        question: "In JavaScript, 'this' refers to the object that ____ the object.",
        answers: [
            {text: "recieves", correct: false},
            {text: "owns", correct: true},
            {text: "directs", correct: false},
            {text: "depends", correct: false},
        ]
    },
    {
        question: "When using ____  the value of the variable can't be reassigned. ",
        answers: [
            {text: "let", correct: false},
            {text: "const", correct: true},
            {text: "var", correct: false},
            {text: "arr", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons  = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chooseAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function chooseAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Joy you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore(); 
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();

