// Lost to Found - Main JavaScript

document.addEventListener("DOMContentLoaded", () => {

  const lostButton = document.querySelector(".lost-btn");
  const foundButton = document.querySelector(".found-btn");
  const searchButton = document.querySelector(".search-row button");
  const searchInput = document.querySelector(".search-row input");

  // Lost Item
  lostButton.addEventListener("click", () => {
    showMessage(
      "🔴 Report Lost Item",
      "You selected Lost Item. The reporting form will open here."
    );
  });

  // Found Item
  foundButton.addEventListener("click", () => {
    showMessage(
      "🟢 Report Found Item",
      "You selected Found Item. The reporting form will open here."
    );
  });

  // Search
  searchButton.addEventListener("click", () => {
    const item = searchInput.value.trim();

    if (item === "") {
      showMessage(
        "🔎 Search",
        "Please enter an item name to search."
      );
    } else {
      showMessage(
        "🔎 Searching...",
        `Looking for "${item}" in Lost to Found.`
      );
    }
  });

  // Enter key search
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });

});

// Message popup
function showMessage(title, text) {

  const oldPopup = document.querySelector(".popup");

  if (oldPopup) {
    oldPopup.remove();
  }

  const popup = document.createElement("div");

  popup.className = "popup";

  popup.innerHTML = `
    <div class="popup-content">
      <button class="close-popup">✕</button>
      <h2>${title}</h2>
      <p>${text}</p>
      <button class="popup-ok">OK</button>
    </div>
  `;

  document.body.appendChild(popup);

  popup.querySelector(".close-popup").onclick = () => {
    popup.remove();
  };

  popup.querySelector(".popup-ok").onclick = () => {
    popup.remove();
  };
}
