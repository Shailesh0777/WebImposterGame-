
document.addEventListener("DOMContentLoaded", () => {
  let playersWithRoles = JSON.parse(localStorage.getItem("players")) || [];
  const container = document.getElementById("playerCards");
  const nextBtn = document.getElementById("nextBtn");

  if (playersWithRoles.length === 0) {
    container.innerHTML = "<p>No players found!</p>";
    nextBtn.style.display = "none";
    return;
  }

  // Assign words and categories
  playersWithRoles = assignWordsToPlayers(playersWithRoles);

  let currentIndex = 0;
  let revealed = false;

  function createPlayerCard(player) {
  const card = document.createElement("div");
  card.classList.add("big-card");
  card.style.cursor = "pointer";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.justifyContent = "space-between"; // spread elements
  card.style.height = "350px";
  card.style.padding = "20px";
  card.style.boxSizing = "border-box";

  const playerName = document.createElement("div");
  playerName.classList.add("player-name");
  playerName.innerText = player.name;
  playerName.style.fontWeight = "bold";
  playerName.style.fontSize = "18px";
  playerName.style.textAlign = "center";

  // Word in the middle
  const wordText = document.createElement("div");
  wordText.classList.add("word-text");
  wordText.style.fontSize = "20px";
  wordText.style.color = "#eee";
  wordText.style.textAlign = "center";
  wordText.style.margin = "auto 0"; // center vertically
  wordText.innerText = ""; // stays empty until revealed

  // Role at the bottom
  const roleText = document.createElement("div");
  roleText.classList.add("role-text");
  roleText.style.fontSize = "18px";
  roleText.style.fontWeight = "bold";
  roleText.style.textAlign = "center";
  roleText.innerText = "Tap to reveal"; // default before click

  card.appendChild(playerName);
  card.appendChild(wordText);
  card.appendChild(roleText);

  card.style.background = "linear-gradient(to right, rgb(247, 134, 5), rgb(113, 31, 3))";
  card.style.color = "white";

  card.addEventListener("click", () => {
    if (!revealed) {
      wordText.innerText = player.displayText.replace("The word is ", "");
      roleText.innerText = player.role;
      revealed = true;

      if (player.role.toLowerCase() === "imposter") {
        card.style.background = "linear-gradient(to right, #ff2209ff, rgba(43, 38, 38, 1))";
      } else {
        card.style.background = "linear-gradient(to right, #00ff6aff, rgba(43, 38, 38, 1))";
      }
    }
  });

  return card;
}
  function showPlayer(index) {
    container.innerHTML = "";

    if (index >= playersWithRoles.length) {
      nextBtn.style.display = "none";

      // Create "Start round" card
      const startCard = document.createElement("div");
      startCard.classList.add("big-card");
      startCard.style.background = "linear-gradient(to right, rgb(247, 134, 5), rgb(113, 31, 3))";
      startCard.style.color = "white";
      startCard.style.textAlign = "center";
      startCard.style.display = "flex";
      startCard.style.justifyContent = "center";
      startCard.style.alignItems = "center";
      startCard.style.height = "120px";
      startCard.style.fontSize = "20px";
      startCard.style.marginBottom = "20px";
      startCard.style.fontWeight = "600";

      const firstPlayerName = playersWithRoles[0]?.name || "Player 1";
      startCard.innerText = `Start the round from "${firstPlayerName}" in clockwise direction`;
      startCard.style.boxShadow = "box-shadow: 0 0 25px rgba(255, 60, 60, 1)";

      // Reveal Imposter button
      const btn = document.createElement("button");
      btn.innerText = "Reveal Imposter";
      btn.classList.add("revealimposter");
      btn.style.display = "block";
      btn.style.margin = "20px auto";

      // Glow effect from CSS
      const style = document.createElement("style");
      style.textContent = `
        .revealimposter {
          background-color: #ff3c3c;
          color: white;
          height: 250p
          padding: 15px 30px;
          border: none;
          border-radius: 10px;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .revealimposter:hover {
         box-shadow: 0 0 25px rgb(117, 100, 90);
          transform: scale(1.05);
        }

        .result-card {
          height: 500px
          margin-top: 30px;
          padding: 20px;
          border-radius: 15px;
          background:linear-gradient(to right, rgb(247, 134, 5), rgb(113, 31, 3));
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .result-card h2 {
          color: #f8f8f8ff;
          margin-bottom: 10px;
        }
        .back-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background:linear-gradient(to right, rgba(254, 0, 0, 1), rgba(6, 6, 6, 1));;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .back-btn:hover {
          background: linear-gradient(to right, rgba(254, 0, 0, 1), rgba(6, 6, 6, 1));
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(3, 3, 3, 1);

          
        }
      `;
      document.head.appendChild(style);

      btn.addEventListener("click", () => {
        startCard.remove();
        btn.remove();

        // Get imposters and word
        const imposters = playersWithRoles.filter(p => p.role.toLowerCase() === "imposter");
        const imposterNames = imposters.map(p => p.name).join(", ");
        const civilian = playersWithRoles.find(p => p.role.toLowerCase() === "civilian");
        const word = civilian ? civilian.displayText.replace("The word is ", "") : "";

        // Result card
        const card = document.createElement("div");
        card.classList.add("result-card");
        card.innerHTML = `
          <h2>Imposter Revealed!</h2>
          <p><strong>Imposter(s):</strong> ${imposterNames}</p>
          <p><strong></strong> ${word}</p>
        `;

        // Back button
        const backBtn = document.createElement("button");
        backBtn.textContent = "Back";
        backBtn.classList.add("back-btn");
        backBtn.addEventListener("click", () => {
          window.location.href = "/";
        });

        card.appendChild(backBtn);
        container.appendChild(card);
      });

      container.appendChild(startCard);
      container.appendChild(btn);
      return;
    }

    revealed = false;
    const card = createPlayerCard(playersWithRoles[index]);
    container.appendChild(card);
  }

  nextBtn.addEventListener("click", () => {
    if (!revealed) {
      alert("Please reveal the role first!");
      return;
    }
    currentIndex++;
    showPlayer(currentIndex);
  });

  showPlayer(currentIndex);
});
