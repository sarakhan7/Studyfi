function sayHello(){
    alert("Hello");
}
openModalBtn.onclick = function() {
    vocabWord.textContent = "Example Word"; 
    modal.style.display = "block"
  }
  
  closeModalBtn.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function() {
    if (event.target === modal) {
      modal.classList = "none";
    }
  }
  
function nextButton() {
   
}

function studyVocab() {
    
}

function playGames() {
    
}


let countries = [];
let current = 0;


async function loadCountries() {
  
  const response = await fetch('https://restcountries.com/v3.1/all');
  
  const data = await response.json();
 
  countries = data.map(country => {
    return {
      name: country.name.common, 
      flag: country.flags?.png || country.flags?.svg  
    };
  });

  countries = countries.filter(country => country.flag && country.name);

  countries = shuffle(countries).slice(0, 10);

  showFlag();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function showFlag() {

  document.getElementById("flag").src = countries[current].flag;

  document.getElementById("userGuess").value = "";
  document.getElementById("feedback").textContent = "";
}

function checkGuess() {
  const guess = document.getElementById("userGuess").value.trim().toLowerCase();

  const correctAnswer = countries[current].name.toLowerCase();

  if (guess === correctAnswer) {
    document.getElementById("feedback").textContent = "Correct!";
    score++;
  } else {
    document.getElementById("feedback").textContent = `Nope! It was ${countries[current].name}`;
  }
  current++;

  
}

function playGames() {
  loadCountries(); 
}

const token = "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"

async function openAICompletion(prompt, context) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: context
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  })
  const data = await response.json();
  try {
    return data.choices[0].message.content;
  } catch {
    return "Failed to get response-try again";
  }

}

const submitButton = document.getElementById("submitButton");
const container = document.getElementById("container");

submitButton.addEventListener("click", async function(){
  const userInput = document.getElementById("userInput").value;
  container.innerHTML += `<p id="user-message"> User: ${userInput} </p>`;

  const response = await
  openAICompletion(userInput, "Provide the response as plain text: no italics, no headers, no bullet points, no links, no code, Just alphanumeric characters, without any special characters.`, You are a great AI coding tutor.")

  container.innerHTML += `<p id ="ai-message"> AI: ${response}</p>`;
})