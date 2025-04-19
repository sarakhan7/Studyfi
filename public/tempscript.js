let OPENROUTER_API_KEY = "";
let apiKeyReady = false;

async function fetchApiKey() {
  try {
    const response = await fetch("/api-key");
    const data = await response.json();
    OPENROUTER_API_KEY = data.apiKey;
    apiKeyReady = true;
  } catch (err) {
    console.error("Failed to fetch API key:", err);
  }
}

fetchApiKey();

async function openRouterCompletion(prompt, context) {
  if (!OPENROUTER_API_KEY) {
    console.error("API key is missing.");
    return "❌ Error: API key is missing.";
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // ✅ working model
        messages: [
          {
            role: "user",
            content: `${context}\n\n${prompt}`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API error:", response.status, data);
      return `Error ${response.status}: ${data.error?.message || "Unknown error"}`;
    }

    const reply = data.choices?.[0]?.message?.content;
    return reply || "No response received from OpenRouter.";
  } catch (err) {
    console.error("Fetch error:", err);
    return "Failed to get response - try again.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitButton");
  const container = document.getElementById("chat-output");
  const userInputField = document.getElementById("userInput");

  submitButton.addEventListener("click", async () => {
    if (!apiKeyReady) {
      alert("Hold up! API key still loading...");
      return;
    }

    const userInput = userInputField.value.trim();
    if (!userInput) return;

    container.innerHTML += `<p><strong class="user-text">User:</strong> ${userInput}</p>`;

    const response = await openRouterCompletion(
      userInput,
      "You are a helpful AI coding tutor. Keep answers short, easy, and beginner-friendly."
    );

    container.innerHTML += `<p><strong class="gpt-text">Gemini:</strong> ${response}</p>`;
    userInputField.value = "";
    container.scrollTop = container.scrollHeight;
  });
});
