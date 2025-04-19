let GEMINI_API_KEY = ""; // Initialize as empty
let apiKeyReady = false; // ✅ NEW: Track if key is ready

// ✅ Fetch API key from backend
async function fetchApiKey() {
  try {
    const response = await fetch("http://localhost:3000/api-key");
    const data = await response.json();
    GEMINI_API_KEY = data.apiKey;
    apiKeyReady = true; // ✅ now ready!
  } catch (err) {
    console.error("Failed to fetch API key:", err);
  }
}

// ✅ Call this early when the page loads
fetchApiKey();

// ✅ Ask Gemini
async function geminiCompletion(prompt, context) {
  if (!GEMINI_API_KEY) {
    console.error("API key is missing.");
    return "❌ Error: API key is missing.";
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${context}\n\n${prompt}` }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API error:", response.status, data);
      return `Error ${response.status}: ${data.error?.message || "Unknown error"}`;
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "No response received from Gemini.";
  } catch (err) {
    console.error("Fetch error:", err);
    return "Failed to get response - try again.";
  }
}

// ✅ Handle button click
const submitButton = document.getElementById("submitButton");
const container = document.getElementById("chat-output");

submitButton.addEventListener("click", async function () {
  if (!apiKeyReady) {
    alert("Hold up! API key still loading...");
    return;
  }

  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  container.innerHTML += `<p><strong class="user-text">User:</strong> ${userInput}</p>`;

  const response = await geminiCompletion(
    userInput,
    "Provide the response as plain text. You are a helpful AI coding tutor. Keep it short and easy to understand."
  );

  container.innerHTML += `<p><strong class="gpt-text">Gemini:</strong> ${response}</p>`;
  document.getElementById("userInput").value = "";
  container.scrollTop = container.scrollHeight;
});
