const OPENROUTER_API_KEY = "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"; // 🔐 Use a .env in production

const submitButton = document.getElementById("submitButton");
const container = document.getElementById("chat-output");

submitButton.addEventListener("click", async function () {
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  container.innerHTML += `<p><strong class="user-text">User:</strong> ${userInput}</p>`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // or another model from https://openrouter.ai/docs#models
        messages: [
          { role: "user", content: userInput }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response.";

    container.innerHTML += `<p><strong class="gpt-text">GPT:</strong> ${reply}</p>`;
  } catch (error) {
    container.innerHTML += `<p><strong class="gpt-text">GPT:</strong> ❌ Error: ${error.message}</p>`;
  }

  document.getElementById("userInput").value = "";
  container.scrollTop = container.scrollHeight;
});
