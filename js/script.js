// <!-- this is my index .js -->

let currentPlayerCount = 0;
let selectedImposterCount = 0; // how many imposters to assign

function numberToWord(num) {
  const words = [
    "", "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen"
  ];
  return words[num] || num.toString();
}

/* ====== Create a player card with delete button ====== */
function createPlayerCardWithName(name, number) {
  const card = document.createElement("div");
  card.className = "card";
  card.onclick = function (e) {
    // Prevent renaming if delete button clicked
    if (!e.target.classList.contains("delete-btn")) {
      convertToInput(this);
    }
  };

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "&times;";
  deleteBtn.onclick = function (e) {
    e.stopPropagation(); // prevent card click
    card.remove();
    savePlayerNamesToLocalStorage();
    currentPlayerCount--;
  };

  const title = document.createElement("h5");
  title.className = "card-title";
  title.innerText = name || `Player ${numberToWord(number)}`;

  cardBody.appendChild(deleteBtn);
  cardBody.appendChild(title);
  card.appendChild(cardBody);

  const playerCards = document.getElementById("player-cards");
  const addPlayerCard = document.getElementById("add-player-card");
  if (addPlayerCard) playerCards.insertBefore(card, addPlayerCard);
  else playerCards.appendChild(card);
}

/* ====== Add new player card with delete button ====== */
function addNewPlayerCard() {
  if (currentPlayerCount >= 15) {
    alert("Maximum 15 players allowed.");
    const playerCards = document.getElementById("player-cards");
    const addPlayerCard = playerCards.lastElementChild;
    if (addPlayerCard) playerCards.removeChild(addPlayerCard);
    return;
  }

  currentPlayerCount++;
  const card = document.createElement("div");
  card.className = "card";
  card.onclick = function (e) {
    if (!e.target.classList.contains("delete-btn")) {
      convertToInput(this);
    }
  };

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "&times;";
  deleteBtn.onclick = function (e) {
    e.stopPropagation();
    card.remove();
    savePlayerNamesToLocalStorage();
    currentPlayerCount--;
  };

  const title = document.createElement("h5");
  title.className = "card-title";
  title.innerText = `Player ${numberToWord(currentPlayerCount)}`;

  cardBody.appendChild(deleteBtn);
  cardBody.appendChild(title);
  card.appendChild(cardBody);

  const playerCards = document.getElementById("player-cards");
  const addPlayerCard = playerCards.lastElementChild;
  playerCards.insertBefore(card, addPlayerCard);

  savePlayerNamesToLocalStorage();
}

/* ====== Convert card title to input field for editing ====== */
function convertToInput(cardElement) {
  const title = cardElement.querySelector(".card-title");
  if (title.querySelector("input")) return; // Prevent multiple inputs

  const currentText = title.innerText.trim();
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText.startsWith("Player") ? "" : currentText;
  input.className = "player-name-input";

  input.addEventListener("blur", () => {
    const newName = input.value.trim();
    title.innerText = newName !== "" ? newName : currentText;
    savePlayerNamesToLocalStorage();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input.blur();
    if (e.key === "Escape") {
      input.value = currentText;
      input.blur();
    }
  });

  title.innerHTML = "";
  title.appendChild(input);
  input.focus();
}

/* ====== Save player names to localStorage ====== */
function savePlayerNamesToLocalStorage() {
  const names = [];
  document.querySelectorAll("#player-cards .card").forEach(card => {
    const titleEl = card.querySelector(".card-title");
    if (!titleEl) return;
    const text = titleEl.innerText.trim();
    if (text && !text.startsWith("Player") && !text.includes("+ Add")) {
      names.push(text);
    }
  });
  localStorage.setItem("playerNames", JSON.stringify(names));
}

/* ====== Load player names from localStorage and rebuild cards ====== */
function loadPlayerNamesFromLocalStorage() {
  const saved = JSON.parse(localStorage.getItem("playerNames") || "[]");
  currentPlayerCount = saved.length;

  const container = document.getElementById("player-cards");
  container.innerHTML = ""; // clear all cards

  saved.forEach((name, i) => {
    createPlayerCardWithName(name, i + 1);
  });

  // Add the + Add Player card
  const addCard = document.createElement("div");
  addCard.className = "card";
  addCard.id = "add-player-card";
  addCard.onclick = addNewPlayerCard;
  addCard.innerHTML = `<div class="card-body"><h5 class="card-title">+ Add Player</h5></div>`;
  container.appendChild(addCard);
}
/* ====== Imposter selection logic ====== */
document.querySelectorAll(".imposter-card").forEach(card => {
  card.addEventListener("click", function () {
    document.querySelectorAll(".imposter-card").forEach(c => c.classList.remove("selected"));
    this.classList.add("selected");
    selectedImposterCount = parseInt(this.dataset.count);
  });
});

/* ====== Next button logic ====== */
function goToNextPage() {
  const names = [];
  document.querySelectorAll("#player-cards .card-title").forEach(title => {
    const name = title.innerText.trim();
    if (name && !name.startsWith("Player") && !name.startsWith("+")) {
      names.push(name);
    }
  });

  if (names.length === 0) {
    alert("Please add at least one player name!");
    return;
  }

  if (selectedImposterCount === 0) {
    alert("Please select the number of imposters first.");
    return;
  }

  if (names.length < selectedImposterCount) {
    alert("Not enough players for the selected number of imposters.");
    return;
  }

  // Shuffle function
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffle(names);
  // Assign roles
  let playersWithRoles = names.map((name, index) => ({
    name: name,
    role: index < selectedImposterCount ? "Imposter" : "Civilian"
  }));

  shuffle(playersWithRoles);

  localStorage.setItem("players", JSON.stringify(playersWithRoles));

  window.location.href = "roles.html";
}

/* ====== Initialize on page load ====== */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("player-cards");
  if (!document.getElementById("add-player-card")) {
    const addCard = document.createElement("div");
    addCard.className = "card";
    addCard.id = "add-player-card";
    addCard.onclick = addNewPlayerCard;
    addCard.innerHTML = `<div class="card-body"><h5 class="card-title">+ Add Player</h5></div>`;
    container.appendChild(addCard);
  }
  loadPlayerNamesFromLocalStorage();
});
