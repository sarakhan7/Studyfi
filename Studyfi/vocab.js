// 🧠 Sample vocab list (you can replace this with AI-extracted content later)
let vocabList = [
    { word: "Photosynthesis", definition: "the process by which green plants use sunlight to synthesize foods" },
    { word: "Mitosis", definition: "a type of cell division that results in two daughter cells" },
    { word: "Osmosis", definition: "the diffusion of water through a semipermeable membrane" },
    { word: "Evaporation", definition: "the process of turning from liquid into vapor" }
  ];
  
  let current = 0;
  let known = 0;
  let unknown = 0;
  
  function loadWord() {
    document.getElementById("vocab-feedback").textContent = "";
    document.getElementById("vocab-input").value = "";
    document.getElementById("vocab-word").textContent = vocabList[current].word;
  }
  
  function checkDefinition() {
    const input = document.getElementById("vocab-input").value.trim().toLowerCase();
    const correctDef = vocabList[current].definition.toLowerCase();
  
    const feedback = document.getElementById("vocab-feedback");
    if (input && correctDef.includes(input) || input.includes(correctDef)) {
      feedback.textContent = " Correct!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = `Incorrect. Definition: ${vocabList[current].definition}`;
      feedback.style.color = "red";
    }
  }
  
  function skipWord() {
    current = (current + 1) % vocabList.length;
    loadWord();
  }
  
  function markKnown() {
    known++;
    skipWord();
  }
  
  function markUnknown() {
    unknown++;
    skipWord();
  }
  
  window.onload = loadWord;
  