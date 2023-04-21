//javascript quiz questions
var questions = [
    {
        prompt: "JavaScript is what kind of language?",
        options: ["html", "Java", "Case Sensitive", "Backend"],
        answer: "Case Sensitive"
    },

    {
        prompt: "What is an advantage of using JavaScript?",
        options: ["Higher Server Interaction", "Simple Interfaces", "Slow Feedback", "Increased Interactivity"],
        answer: "Increased Interactivity"
    },

    {
        prompt: "Arrays in JavaScript are defined by which of the following statements?",
        options: ["It is an ordered list of values", "It is and ordered list of objects", "It is an ordered list of string", "It is and ordered list of functions"],
        answer: "It is an ordered list of values"
    },

    {
        prompt: "Which of the following is NOT JavaScript data types?",
        options: ["Null", "Undefined", "Number", "All of the Above"],
        answer: "All of the Above" 
    },

    {
        prompt: "Which of the following can be used to call a JavaScript Code Snippet?",
        options: ["Function/Method", "Preprocessor", "Triggering Event", "RMI"],
        answer: "Function/Method"
    }];

//setting variables 
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var viewHighScoresel= document.querySelector("#View-High-Scores")
var reStartBtn = document.querySelector("#restart");
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
        time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
    quizEnd();
    } else {
    getQuestion();
    }
}

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
    var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
        score: time,
        name: name
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;
submitBtn.onclick = saveHighscore;
startBtn.onclick = quizStart;
