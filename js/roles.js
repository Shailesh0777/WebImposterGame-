
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
    card.style.justifyContent = "space-between";
    card.style.height = "350px";
    card.style.padding = "20px";
    card.style.boxSizing = "border-box";

    // Player name at the top
    const playerName = document.createElement("div");
    playerName.classList.add("player-name");
    playerName.innerText = player.name;
    playerName.style.fontWeight = "bold";
    playerName.style.fontSize = "18px";
    playerName.style.textAlign = "center";

    // Role / imposter in the middle
    const roleText = document.createElement("div");
    roleText.classList.add("role-text");
    roleText.style.fontSize = "20px";
    roleText.style.fontWeight = "bold";
    roleText.style.color = "#eee";
    roleText.style.textAlign = "center";
    roleText.style.margin = "auto 0"; // center vertically
    roleText.innerText = "Tap to reveal"; // default before click

    // Category at the bottom
    const categoryText = document.createElement("div");
    categoryText.classList.add("category-text");
    categoryText.style.fontSize = "18px";
    categoryText.style.fontWeight = "bold";
    categoryText.style.textAlign = "center";
    categoryText.innerText = ""; // empty until click

    card.appendChild(playerName);
    card.appendChild(roleText);
    card.appendChild(categoryText);

    card.style.background = "linear-gradient(to right, rgba(247, 5, 211, 1), rgba(85, 6, 58, 1))";
    card.style.color = "white";

    card.addEventListener("click", () => {
      if (!revealed) {
        if (player.role.toLowerCase() === "imposter") {
          // Get all imposters
          const imposters = playersWithRoles.filter(p => p.role.toLowerCase() === "imposter");
          const imposterNames = imposters.map(p => p.name).join(" and ");

          roleText.innerText = `You are Imposter\n\nImposters: ${imposterNames}`;
          categoryText.innerText = player.displayText.replace("Category : ", "Category:\n ");
        } else {
          roleText.innerText = player.displayText.replace("Word : ", "The Word is  :\n ");
          categoryText.innerText = "";
        }
        revealed = true;
        card.style.background = "linear-gradient(to right, rgba(247, 5, 211, 1), rgba(85, 6, 58, 1))";
      }
    });

    return card;
  }


  function showPlayer(index) {
    container.innerHTML = "";

    if (index >= playersWithRoles.length) {
      nextBtn.style.display = "none";

      // Create "Start round" card
      function createInfoCard(text) {
        const card = document.createElement("div");
        card.classList.add("big-card-createinfo");
        card.style.background = "linear-gradient(to right, rgba(255, 0, 255, 1), rgba(85, 6, 58, 1))";
        card.style.color = "white";
        card.style.textAlign = "center";
        card.style.display = "flex";
        card.style.justifyContent = "center";
        card.style.alignItems = "center";
        card.style.height = "60px";
        card.style.width = "300px";
        card.style.fontSize = "20px";
        card.style.margin = "20px 0px 20px 0px";
        card.style.fontWeight = "600";
        card.innerText = text;       
        return card;
      }
   const randomIndex = Math.floor(Math.random() * playersWithRoles.length);
const randomPlayerName = playersWithRoles[randomIndex]?.name || "Player 1";
// Create the info card using the random player
const startCard = createInfoCard(`Start the discussion from "${randomPlayerName}"`);
      const secondCard = createInfoCard(`go in clockwise direction`);
      const thirdCard = createInfoCard("Tip: Watch carefully how others describe!");
      const fourthCard = createInfoCard("Be ready to vote!");
      container.appendChild(startCard);
      container.appendChild(secondCard);
      container.appendChild(thirdCard);
      container.appendChild(fourthCard);
      
      // Reveal Imposter button
      const btn = document.createElement("button");
      btn.innerText = "Reveal Imposter";
      btn.classList.add("revealimposter");
      btn.style.display = "block";
      btn.style.margin = "50px auto";

      // Glow effect from CSS
      const style = document.createElement("style");
      style.textContent = `
        .result-card {
          height: auto;
          width: auto;
          padding: 20px 20px 20px 20px;
          border-radius: 15px;
          background:linear-gradient(to right, rgba(247, 5, 211, 1), rgba(85, 6, 58, 1));
          text-align: center;
           justify-content: center;
          font-family: Arial, sans-serif;
          transition: all 0.3s ease;
          border:none;
          border-radius:20px

        }
        .result-card h2 {
          color: #f8f8f8ff;
          margin-bottom: 250px;
        }
        .result-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(167, 30, 177, 1);
        }

        .back-btn {
          margin-top: 40px;
          padding: 10px 20px;
          background:linear-gradient(to right, rgba(247, 5, 211, 1), rgba(85, 6, 58, 1));;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 120px;
          height: 50px;
          font-size:22px;
          font-weight: bold;
        }
        .back-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(167, 30, 177, 1);
        }
      `;
      document.head.appendChild(style);

      btn.addEventListener("click", () => {
        startCard.remove();
        secondCard.remove();
        thirdCard.remove();
        fourthCard.remove();
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
  <h2 class="reveal-title">Imposter Revealed!</h2>
  <p><strong class="label">Imposter(s):</strong> <span class="imposter-names">${imposterNames}</span></p>
  <p><strong class="label"></strong> <span class="word-text">${word}</span></p>
`;


        // Back button in a separate container
        const backContainer = document.createElement("div");
        backContainer.style.display = "flex";
        backContainer.style.justifyContent = "center";
        backContainer.style.marginTop = "20px";

        const backBtn = document.createElement("button");
        backBtn.textContent = "Back";
        backBtn.classList.add("back-btn");
        backBtn.addEventListener("click", () => {
          window.location.href = "/";
        });

        backContainer.appendChild(backBtn);

        container.appendChild(card);         // append result card first
        container.appendChild(backContainer); // append back button container separately
      });

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
