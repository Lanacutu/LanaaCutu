const questions = [
  {
    question: "What month was I born in?",
    options: ["November", "December", "October", "September"],
    correctAnswer: 0,
    gifts: ["Fried Rice made by AK", "Biryani made by AK", "Maggi made by AK", "Cholle Bhature made by AK"],
  },
  {
    question: "Where did we first talk?",
    options: ["Tinder", "Aisle", "Bumble", "OKC"],
    correctAnswer: 2,
    gifts: ["Dance by AK on Sweat", "Pole Dance by AK", "Tango by AK", "Belly Dance by AK"],
  },
  {
    question: "Which song did I first sent you?",
    options: ["Iraadey", "Aya na tu", "Mera Mann", "Jo tu na mila"],
    correctAnswer: 0,
    gifts: ["Complete day help by AK in the black outfit ;)", "Complete day help by Cutu to AK ;)", "one wish (can be anything)", "Complete day of relaxation by AK in cozy clothes XXXL one"],
  },
];

let currentQuestion = 0;
let correctAnswers = 0;
let selectedGifts = [];
let attemptMade = false; // Flag to track if the user has made an attempt

function startQuiz() {
  displayQuestion();
}

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options-container");

  questionElement.textContent = questions[currentQuestion].question;

  optionsContainer.innerHTML = "";
  questions[currentQuestion].options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.onclick = function () {
      checkAnswer(this);
    };
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  if (!attemptMade) {
    attemptMade = true;
    const selectedIndex = Array.from(selectedOption.parentNode.children).indexOf(
      selectedOption
    );

    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      // Correct answer
      showAnswerPopup();
      correctAnswers++;
    } else {
      // Incorrect answer
      showMissedPopup();
    }
  }
}

function showAnswerPopup() {
  const answerPopup = document.getElementById("answer-popup");
  const giftList = document.getElementById("gift-list");

  giftList.innerHTML = "";
  questions[currentQuestion].gifts.forEach((gift, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<input type="radio" name="gift" value="${index}" id="gift${index}"><label for="gift${index}">${gift}</label>`;
    giftList.appendChild(listItem);
  });

  answerPopup.style.display = "block";
}

function selectGift() {
  const selectedGift = document.querySelector('input[name="gift"]:checked');

  if (selectedGift) {
    selectedGifts.push(questions[currentQuestion].gifts[selectedGift.value]);
    alert("You selected: " + questions[currentQuestion].gifts[selectedGift.value]);
    document.getElementById("answer-popup").style.display = "none";
    nextQuestion();
  } else {
    alert("Please select a gift.");
  }
}

function showMissedPopup() {
  const missedPopup = document.getElementById("missed-popup");
  const correctAnswerSpan = document.getElementById("correct-answer");
  const missedGiftList = document.getElementById("missed-gift-list");

  correctAnswerSpan.textContent = questions[currentQuestion].options[questions[currentQuestion].correctAnswer];

  missedGiftList.innerHTML = "";
  questions[currentQuestion].gifts.forEach((gift) => {
    const listItem = document.createElement("li");
    listItem.textContent = gift;
    missedGiftList.appendChild(listItem);
  });

  missedPopup.style.display = "block";
  setTimeout(() => {
    nextQuestion();
  }, 7000); // Move to the next question after 7 seconds for incorrect answers
}

function nextQuestion() {
  const answerPopup = document.getElementById("answer-popup");
  const missedPopup = document.getElementById("missed-popup");

  answerPopup.style.display = "none";
  missedPopup.style.display = "none";

  currentQuestion++;
  attemptMade = false; // Reset attempt flag

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("mumbai-container").style.display = "block";
    teaseNoButton(); // Call teaseNoButton function after displaying mumbai container
  }
}

function teaseNoButton() {
  const noButton = document.getElementById("no-button-mumbai");
  document.addEventListener("mousemove", function (e) {
    const x = e.clientX;
    const y = e.clientY;
    const rect = noButton.getBoundingClientRect();
    const noButtonX = rect.x + rect.width / 2;
    const noButtonY = rect.y + rect.height / 2;

    const deltaX = x - noButtonX;
    const deltaY = y - noButtonY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 100) {
      moveNoButton();
    }
  });
}

function moveNoButton() {
  const noButton = document.getElementById("no-button-mumbai");
  noButton.style.left = Math.random() * window.innerWidth + "px";
  noButton.style.top = Math.random() * window.innerHeight + "px";
}

function showMumbaiGifts(answer) {
  const mumbaiMessage = document.getElementById("mumbai-message");
  const mumbaiGiftList = document.getElementById("mumbai-gift-list");
  const mumbaiGiftsContainer = document.getElementById("mumbai-gifts");

  if (answer === 'yes' && correctAnswers > 0) {
    mumbaiMessage.textContent = "Here are your gifts. Send me a screenshot of this page to avail your gifts cutu";
    mumbaiGiftList.innerHTML = "";

    for (let i = 0; i < Math.min(correctAnswers, 3); i++) {
      const listItem = document.createElement("li");
      listItem.textContent = "Gift " + (i + 1) + ": " + selectedGifts[i];
      mumbaiGiftList.appendChild(listItem);
    }

    mumbaiGiftsContainer.style.display = "block";
  } else {
    mumbaiMessage.textContent = "No gifts for you, cutu! Hehe";
    mumbaiGiftsContainer.style.display = "block";
  }
}

// Start the quiz when the page loads
startQuiz();