document.addEventListener("DOMContentLoaded", () => {
  const notesSubmitBtn = document.getElementById("submitNotes");

  if (notesSubmitBtn) {
    notesSubmitBtn.addEventListener("click", () => {
      const input = document.getElementById("inputNotes").value.trim();
      if (!input) {
        alert("Please paste some notes first!");
        return;
      }

      try {
        localStorage.setItem("userNotes", input);
        alert("✅ Notes saved! Head to Vocab Study to use them.");
      } catch (err) {
        alert("❌ Failed to save your notes: " + err.message);
      }
    });
  }
});
