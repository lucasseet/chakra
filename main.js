//Chakra Elements
let cardElements = ['fire', 'water', 'wind', 'earth', 'lightning', 'health']
console.log(cardElements)

window.onload = function () {
  console.log("All Linked!");

  //Global Scope
  let landingPagePlayNow = document.querySelector("#landing-button");
  let landingPageDiv = document.querySelector("#landing-page");
  let backgroundImage = document.querySelector("#background-wrapper");
  let chakraInstruction = document.querySelector("#inner-background-wrapper");
  let nameInput = document.querySelector("#name-input");
  let chakraPlayNowBtn = document.querySelector("#button");
  let gameElements = document.querySelector('#name-progress-cell')
  let playerName = document.querySelector('#player-name')
  let playerNameDoor = document.querySelector('#name-out-player')
  let comCells = document.querySelectorAll('.com-cell')
  let comDeck = document.querySelectorAll('.com-deck')
  let playerCells = document.querySelectorAll('.player-cell')
  let playerDeck = document.querySelectorAll('.player-deck')

  //Attached event handler to Landing page playnow button
  landingPagePlayNow.onclick = (event) => {
    event.preventDefault();
    

    //Transit landing page to chakra instruction page
    landingPageDiv.style.display = "none";
    backgroundImage.style.display = "block";
    chakraInstruction.style.display = "block";

    //Auto resize screen to 1350px by 800px
    window.resizeTo(500, 500);
  
    //Attach event handler on ChakraPlayNow Button
    chakraPlayNowBtn.onclick = (event) => {
      event.preventDefault();

      //Get name value, and trim away whitespaces
      let nameVal = nameInput.value;
      nameVal = nameVal.trim();
      nameVal = nameVal.toUpperCase()

      //perform validation
      if (nameVal === "") {
        alert("Please enter your name");
        return;
      }

      //Transit from ChakraInstruction to GameMap
      chakraInstruction.style.display = "none";
      gameElements.style.display = "block"

      //Insert nameValue onto healthbar & door [IF IT HAS LONG NAME IT DOESNT CENTRALIZE]
      playerName.innerText = nameVal
      playerNameDoor.innerText = nameVal


      // Start Game, Distribute cards
      
      //Create empty Player & Com array
      const playerDeckArray = []
      const comDeckArray = []

      //Create a deck with random element pushing it into player deck
      for (let i = 0; i < playerCells.length; i++) {
        playerDeckArray.push(randomElement())
        console.log(playerDeckArray)
      }

      //Create a deck with random element pushing it into com deck
      for (let i = 0; i < comCells.length; i++) {
        comDeckArray.push(randomElement())
        console.log(comDeckArray)
      }

      //Make player cards appear in DOM
      playerCells.forEach((card, index) => {
        const element = playerDeckArray[index]
        card.classList.add(element)
        card.addEventListener('click', () => handleSelect(element))
        console.log(`Clicked ${element}`)
      })


  

    };
  };
};

//Get random element -> generate random number btn 0 & length of element
function randomElement(){
  let randomNum = Math.floor(Math.random() * (cardElements.length -1))
  return cardElements[randomNum]
}

//Making a move function
function makeMove(event) {
    event.stopPropagation()
    console.log('making a move now!')
}
// Player Clicks 
function handleSelect() {
  let comCard = enemyMove ()
  console.log(comCard)
}

// Enemy move
function enemyMove() {
  let comDeck = document.querySelectorAll('.com-deck')
  const randomIndex = generateRandomIndex()
  const cardElement = comDeck[randomIndex]
}

// function that returns a number between 0 to 3
function generateRandomIndex() {
  let randomNum = Math.floor(Math.random() * 3)
  console.log(randomNum)
}

// function playerWins(playerCard, comCard) {

// }

