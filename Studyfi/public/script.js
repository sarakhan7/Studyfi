document.addEventListener("DOMContentLoaded", function () {
  // Paste Notes Button
  const notesSubmitBtn = document.getElementById("submitNotes");
  if (notesSubmitBtn) {
    notesSubmitBtn.addEventListener("click", () => {
      const input = document.getElementById("inputNotes").value.trim();
      if (!input) {
        alert("Please paste some notes first!");
        return;
      }

      localStorage.setItem("userNotes", input);
      alert("Your notes were saved! You can now go to Vocab or Test pages to use them.");
    });
  }

  // Chat Submit Button
  const submitButton = document.getElementById("submitButton");
  const container = document.getElementById("container");

  if (submitButton) {
    submitButton.addEventListener("click", async function () {
      const userInput = document.getElementById("userInput").value;
      container.innerHTML += `<p id="user-message"> User: ${userInput} </p>`;

      const response = await openAICompletion(
        userInput,
        "Provide the response as plain text: no italics, no headers, no bullet points, no links, no code, Just alphanumeric characters, without any special characters. You are a great AI coding tutor."
      );

      container.innerHTML += `<p id="ai-message"> AI: ${response}</p>`;
    });
  }

  // Flag Guess Game Logic
  let countries = [];
  let current = 0;

  async function loadCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    countries = data
      .map((country) => ({
        name: country.name.common,
        flag: country.flags?.png || country.flags?.svg,
      }))
      .filter((country) => country.flag && country.name);

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

  // Optional: Call loadCountries if needed on game start
  // loadCountries();
});
