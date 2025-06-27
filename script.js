async function getAIResponse() {
  const topic = document.getElementById("topicInput").value.trim();
  const output = document.getElementById("output");

  if (!topic) {
    output.innerHTML = "<p>Please enter a topic!</p>";
    return;
  }

  output.innerHTML = `<p><strong>Thinking about "${topic}"...</strong></p>`;

  try {
    const response = await fetch("https://gpt-proxy-backend.michaelfrueh558.repl.co/ask", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: `Explain the topic "${topic}" in simple terms.`
  }),
});

    const data = await response.json();
    output.innerHTML = `
      <h3>What is "${topic}"?</h3>
      <p>${data.response}</p>
    `;
  } catch (error) {
    output.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    console.error(error);
  }
}