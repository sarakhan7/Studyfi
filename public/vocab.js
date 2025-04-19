document.addEventListener("DOMContentLoaded", async () => {
  let vocabList = [];
  let current = 0;
  let known = 0;
  let unknown = 0;

  const vocabWord = document.getElementById("vocab-word");
  const vocabInput = document.getElementById("vocab-input");
  const vocabFeedback = document.getElementById("vocab-feedback");

  const submitBtn = document.getElementById("submit-btn");
  const skipBtn = document.getElementById("skip-btn");
  const knownBtn = document.getElementById("known-btn");
  const unknownBtn = document.getElementById("unknown-btn");

  const userNotes = localStorage.getItem("userNotes");

  if (userNotes) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-pro",
          messages: [
            {
              role: "user",
              content: `Extract exactly 5 vocabulary words and their definitions from these notes. 
Return ONLY valid JSON like: [{"word": "Term", "definition": "Definition"}, ...]. 
No extra text or formatting.

Notes:\n${userNotes}`
            }
          ]
        })
      });

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content?.trim();

      if (!text) throw new Error("Empty response from OpenRouter");

      try {
        vocabList = JSON.parse(text);
      } catch (jsonErr) {
        console.error("❌ Invalid JSON, using fallback.");
        vocabList = getFallbackList();
      }

    } catch (err) {
      console.error("❌ Fetch failed:", err);
      vocabList = getFallbackList();
    }
  } else {
    vocabList = getFallbackList();
  }

  if (!vocabList.length) {
    vocabWord.textContent = "No vocab found.";
    return;
  }

  function loadWord() {
    vocabFeedback.textContent = "";
    vocabFeedback.style.color = "#22223b";
    vocabInput.value = "";
    vocabWord.textContent = vocabList[current].word;
  }

  function checkDefinition() {
    const input = vocabInput.value.trim().toLowerCase();
    const correctDef = vocabList[current].definition.toLowerCase();

    if (input && (correctDef.includes(input) || input.includes(correctDef))) {
      vocabFeedback.textContent = "✅ Correct!";
      vocabFeedback.style.color = "green";
    } else {
      vocabFeedback.textContent = `❌ Nope! It was: ${vocabList[current].definition}`;
      vocabFeedback.style.color = "red";
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

  submitBtn.addEventListener("click", checkDefinition);
  skipBtn.addEventListener("click", skipWord);
  knownBtn.addEventListener("click", markKnown);
  unknownBtn.addEventListener("click", markUnknown);

  loadWord();

  function getFallbackList() {
    return [
      { word: "Photosynthesis", definition: "The process by which green plants use sunlight to synthesize food." },
      { word: "Mitosis", definition: "Cell division that results in two identical daughter cells." },
      { word: "Osmosis", definition: "Water diffusion through a semipermeable membrane." },
      { word: "Evaporation", definition: "Liquid turning into vapor." },
      { word: "Atom", definition: "The smallest unit of a chemical element." }
    ];
  }
});
