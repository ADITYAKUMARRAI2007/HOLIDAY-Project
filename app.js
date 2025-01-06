document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    { name: 'fries', img: 'fries (1).png' },
    { name: 'cheeseburger', img: 'cheeseburger (1).png' },
    { name: 'ice-cream', img: 'ice-cream.png' },
    { name: 'pizza', img: 'pizza.png' },
    { name: 'milkshake', img: 'milkshake.png' },
    { name: 'hotdog', img: 'hotdog.png' },
    { name: 'fries', img: 'fries (1).png' },
    { name: 'cheeseburger', img: 'cheeseburger (1).png' },
    { name: 'ice-cream', img: 'ice-cream.png' },
    { name: 'pizza', img: 'pizza.png' },
    { name: 'milkshake', img: 'milkshake.png' },
    { name: 'hotdog', img: 'hotdog.png' },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const winMessage = document.querySelector('#win-message');
  const restartButton = document.querySelector('#restart-button');

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  function createBoard() {
    grid.innerHTML = ''; 
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
    winMessage.classList.add('hidden'); 
    resultDisplay.textContent = 0; 
    cardsWon = [];
  }

  // Check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
      cards[optionOneId].setAttribute('src', 'blank.png');
      cards[optionTwoId].setAttribute('src', 'blank.png');
      alert('You clicked the same card!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', 'white.png');
      cards[optionTwoId].setAttribute('src', 'white.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', 'blank.png');
      cards[optionTwoId].setAttribute('src', 'blank.png');
      alert('Try again!');
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      showWinMessage();
    }
  }

 
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  function showWinMessage() {
    winMessage.classList.remove('hidden');
    grid.innerHTML = ''; 
  }

  
  restartButton.addEventListener('click', () => {
    createBoard();
  });

  createBoard();
});
