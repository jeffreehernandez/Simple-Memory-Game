let emojis = ["😀","😀","😎","😎","😡","😡","🤡","🤡","🤖","🤖","👻","👻","🐱","🐱","🐶","🐶"];
let grid = document.getElementById("grid");
let firstCard = null;
let secondCard = null;
let lock = false;

function startGame() {
    grid.innerHTML = "";
    firstCard = secondCard = null;
    let shuffled = emojis.sort(() => Math.random() - 0.5);

    shuffled.forEach((emoji) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = emoji;
        card.innerHTML = "";
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (lock || card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    card.innerHTML = card.dataset.value;

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lock = true;

        setTimeout(checkMatch, 700);
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
    } else {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.innerHTML = "";
        secondCard.innerHTML = "";
    }

    firstCard = null;
    secondCard = null;
    lock = false;

    checkWin();
}

function checkWin() {
    let matchedCards = document.querySelectorAll(".matched");
    if (matchedCards.length === emojis.length) {
        setTimeout(() => alert("🎉 You Win!"), 200);
    }
}

startGame();
