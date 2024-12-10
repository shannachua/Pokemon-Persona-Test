
const questions = [
    {
      question: "How do you usually handle challenges?",
      answers: [
        { text: "Face it head-on, no matter the difficulty!", type: "Charmander" },
        { text: "Strategize first, then take action.", type: "Bulbasaur" },
        { text: "Ask for help from friends and allies.", type: "Togepi" },
        { text: "Take a step back and wait for the right moment.", type: "Squirtle" },
      ],
    },
    {
      question: "What's your ideal way to spend a day off?",
      answers: [
        { text: "Exploring the outdoors or going on an adventure.", type: "Torchic" },
        { text: "Relaxing at home with a good book or movie.", type: "Mudkip" },
        { text: "Hanging out with friends and sharing laughs.", type: "Pikachu" },
        { text: "Trying something new, like painting or cooking.", type: "Eevee" },
      ],
    },
    {
      question: "Your friend is in trouble. What do you do?",
      answers: [
        { text: "Rush to their side and help them immediately.", type: "Bulbasaur" },
        { text: "Calm them down and work together to solve the problem.", type: "Chikorita" },
        { text: "Encourage them from the sidelines—they’ve got this!", type: "Torchic" },
        { text: "Analyze the situation and offer advice.", type: "Meowth" },
      ],
    },
  ];
  
  let currentQuestionIndex = 0;
  let scores = {
    Charmander: 0,
    Bulbasaur: 0,
    Togepi: 0,
    Squirtle: 0,
    Torchic: 0,
    Mudkip: 0,
    Pikachu: 0,
    Eevee: 0,
    Meowth: 0,
  };
  
  function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const imageEl = document.getElementById("question-image");

    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersEl.innerHTML = "";
    imageEl.src = `images/question${currentQuestionIndex + 1}.png`; // Example path

    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.classList.add("answer");
      button.textContent = answer.text;
      button.onclick = (event) => selectAnswer(event, answer.type);
      answersEl.appendChild(button);
    });
  }
  
  function selectAnswer(event, type) {
    scores[type]++;
    document.getElementById("next-btn").disabled = false;
    
    // Deselect previously selected button
    const buttons = document.querySelectorAll(".answer");
    buttons.forEach(button => button.classList.remove("selected"));

    // Highlight the clicked button
    event.target.classList.add("selected");
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      document.getElementById("next-btn").disabled = true;
    } else {
      showResult();
    }
  }
  
  function showResult() {
    const resultContainer = document.getElementById("result-container");
    const questionContainer = document.getElementById("question-container");
    const resultDescription = document.getElementById("result-description");
    const resultPokemon = document.getElementById("result-pokemon");

    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const highestScore = Math.max(...Object.values(scores));
    const result = Object.keys(scores).find((key) => scores[key] === highestScore);

    resultDescription.textContent = `You are ${result}!`;
    resultPokemon.textContent = getPokemonDescription(result);

    // Add Pokémon image
    const image = document.createElement("img");
    const imageMap = {
        Charmander: "charmander.gif",
        Bulbasaur: "bulbasaur.gif",
        Togepi: "togepi.gif",
        Squirtle: "squirtle.gif",
        Torchic: "torchic.gif",
        Mudkip: "mudkip.png",
        Pikachu: "pikachu.gif",
        Eevee: "eevee.gif",
        Meowth: "meowth.png"
    };
    image.src = imageMap[result];
    image.alt = result;
    image.style.maxWidth = "200px";
    resultPokemon.appendChild(image);
  }
  
  function getPokemonDescription(pokemon) {
    const descriptions = {
      Charmander: "Brave and determined, a fiery spirit.",
      Bulbasaur: "Reliable and supportive, grounded in nature.",
      Togepi: "Optimistic and cheerful, a bundle of joy.",
      Squirtle: "Calm and strategic, a reliable ally.",
      Torchic: "Adventurous and bold, always ready to explore.",
      Mudkip: "Easygoing and kind, a peaceful soul.",
      Pikachu: "Energetic and friendly, loved by everyone.",
      Eevee: "Creative and adaptive, full of surprises.",
      Meowth: "Clever and resourceful, always finds a way.",
    };
    return descriptions[pokemon];
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    scores = {
      Charmander: 0,
      Bulbasaur: 0,
      Togepi: 0,
      Squirtle: 0,
      Torchic: 0,
      Mudkip: 0,
      Pikachu: 0,
      Eevee: 0,
      Meowth: 0,
    };
    document.getElementById("result-container").classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    document.getElementById("next-btn").disabled = true;
    showQuestion();
  }
  
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
  
  showQuestion();
