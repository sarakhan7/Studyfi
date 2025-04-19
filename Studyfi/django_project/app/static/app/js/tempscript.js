const GEMINI_API_KEY = "AIzaSyBESYOt2L3AZOEpgD9XmVlSTJjsnjsVh2Y";

async function geminiCompletion(prompt, context) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: `${context}\n\n${prompt}` }
        ]
      }]
    })
  });

  const data = await response.json();
  try {
    return data.candidates[0].content.parts[0].text;
  } catch {
    return "Failed to get response - try again";
  }
}

const submitButton = document.getElementById("submitButton");
const container = document.getElementById("chat-output");

submitButton.addEventListener("click", async function () {
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  container.innerHTML += `<p><strong class="user-text">User:</strong> ${userInput}</p>`;

  try {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput })
    });

    const data = await response.json();
    container.innerHTML += `<p><strong class="gpt-text">Gemini:</strong> ${data.text}</p>`;
  } catch (error) {
    container.innerHTML += `<p><strong class="gpt-text">Gemini:</strong> ❌ Error: Could not get a response</p>`;
  }

  document.getElementById("userInput").value = "";
  container.scrollTop = container.scrollHeight;
});
