const questions = [
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Hot Mail Transfer Language", correct: false },
        { text: "High-Level Text Machine Language", correct: false },
        { text: "Hyperloop Tag Management Language", correct: false }
      ]
    },
    {
      question: "Which is a JavaScript framework?",
      answers: [
        { text: "React", correct: true },
        { text: "Django", correct: false },
        { text: "Laravel", correct: false },
        { text: "Flask", correct: false }
      ]
    },
    {
      question: "Which HTML tag is used to link a CSS file?",
      answers: [
        { text: "<link>", correct: true },
        { text: "<style>", correct: false },
        { text: "<script>", correct: false },
        { text: "<css>", correct: false }
      ]
    },
    {
      question: "What keyword declares a constant in JavaScript?",
      answers: [
        { text: "let", correct: false },
        { text: "const", correct: true },
        { text: "var", correct: false },
        { text: "define", correct: false }
      ]
    }
  ];
  
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("start-btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
  
    if (correct) {
      selectedBtn.style.backgroundColor = "#4CAF50"; // green
      score++;
    } else {
      selectedBtn.style.backgroundColor = "#e63946"; // red
    }
  
    // Disable all buttons
    Array.from(answerButtons.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === "true") {
        button.style.border = "2px solid #4CAF50";
      }
    });
  
    nextButton.style.display = "inline-block";
  }
  
  function showScore() {
    resetState();
    questionText.innerText = `You scored ${score} out of ${questions.length}! 🎉`;
    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "inline-block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();
  