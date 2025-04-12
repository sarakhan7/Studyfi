const token = "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";

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
  });

  const data = await response.json();
  try {
    return data.choices[0].message.content;
  } catch {
    return "Failed to get response – try again!";
  }
}

async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const container = document.getElementById("chat-output");
  const userInput = inputField.value.trim();

  if (!userInput) return;

  // Show user message
  container.innerHTML += `<p><strong class="user-text">User:</strong> ${userInput}</p>`;

  // Call OpenAI API
  const response = await openAICompletion(
    userInput,
    "Provide the response as plain text: no italics, no headers, no bullet points, no links, no code. You are a friendly and simple AI coding tutor for teens."
  );

  // Show GPT response
  container.innerHTML += `<p><strong class="gpt-text">GPT:</strong> ${response}</p>`;

  // Reset input + scroll
  inputField.value = "";
  container.scrollTop = container.scrollHeight;
}
