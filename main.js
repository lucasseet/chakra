//Outer
let comHealthBar = document.querySelector("#com-health");
let playerHealthBar = document.querySelector("#player-health");
let playerCells = document.querySelectorAll(".player-cell");
let comCells = document.querySelectorAll(".com-cell");
let fightDescription = document.querySelector("#fight-description");
let winAlert = document.querySelector('#win');
let loseAlert = document.querySelector('#lose');
let playAgainBtn = document.querySelector('#play-again')
let comEffect = document.querySelector('#fire-effect')
let playerEffect = document.querySelector('#fire-effect2')

//Chakra Elements
let cardElements = ["fire", "water", "wind", "earth", "lightning", "health"];

//Create empty Player & Com array
const playerDeckArray = [];
const comDeckArray = [];

//class
class Player {
  name = "";
  health = 100;

  constructor(name, health) {
    this.name = name;
    this.health = health;
  }

  damage(enemy) {
    if (enemy.health !== 0) {
      enemy.health -= 20;
      // console.log(enemy.health);
    } else if (enemy.health === 0) {
      alert("You Win");
    }
  }
}

let computer = new Player("Com", 100);
let player = new Player("player", 100);

window.onload = function () {
  console.log("All Linked!");

  //Global Scope
  let landingPagePlayNow = document.querySelector("#landing-button");
  let landingPageDiv = document.querySelector("#landing-page");
  let backgroundImage = document.querySelector("#background-wrapper");
  let chakraInstruction = document.querySelector("#inner-background-wrapper");
  let nameInput = document.querySelector("#name-input");
  let chakraPlayNowBtn = document.querySelector("#button");
  let gameElements = document.querySelector("#name-progress-cell");
  let playerName = document.querySelector("#player-name");
  let playerNameDoor = document.querySelector("#name-out-player");
  let comCells = document.querySelectorAll(".com-cell");
  let playerCells = document.querySelectorAll(".player-cell");

  //Attached event handler to Landing page playnow button
  landingPagePlayNow.onclick = (event) => {
    event.preventDefault();

    //Transit landing page to chakra instruction page
    landingPageDiv.style.display = "none";
    backgroundImage.style.display = "block";
    chakraInstruction.style.display = "block";

    //Auto resize screen to 1350px by 800px
    window.resizeTo(1350, 500);

    //Attach event handler on ChakraPlayNow Button
    chakraPlayNowBtn.onclick = (event) => {
      event.preventDefault();

      //Get name value, and trim away whitespaces
      let nameVal = nameInput.value;
      nameVal = nameVal.trim();
      nameVal = nameVal.toUpperCase();

      //perform validation
      if (nameVal === "") {
        alert("Please enter your name");
        return;
      }

      //Transit from ChakraInstruction to GameMap
      chakraInstruction.style.display = "none";
      gameElements.style.display = "block";

      //Insert nameValue onto healthbar & door [IF IT HAS LONG NAME IT DOESNT CENTRALIZE]
      playerName.innerText = nameVal;
      playerNameDoor.innerText = nameVal;

      // Start Game, Distribute cards

      //Create a deck with random element pushing it into player deck
      for (let i = 0; i < playerCells.length; i++) {
        playerDeckArray.push(randomElement());
        // console.log(playerDeckArray);
      }

      //Create a deck with random element pushing it into com deck
      for (let i = 0; i < comCells.length; i++) {
        comDeckArray.push(randomElement());
        // console.log(comDeckArray);
      }

      //Make player cards appear in DOM
      playerCells.forEach((card, index) => {
        const playerCard = playerDeckArray[index];
        card.classList.add(playerCard);
        card.addEventListener("click", (event) => handleSelect(event, index));
      });

      //reset game and play again 
      playAgainBtn.addEventListener("click", function(){
        location.reload()
      });

    };
  };
};

//Get random element -> generate random number btn 0 & length of element
function randomElement() {
  let randomNum = Math.floor(Math.random() * cardElements.length);
  return cardElements[randomNum];
}

// Player Clicks
function handleSelect(event, index) {
  let comCard = enemyMove();
  let target = event.target;
  let playerCard = target.classList[2];
  console.log(`this is playercard `+ playerCard)
  console.log(`this is comCard ` + comCard)

  function replaceCardCallBack() {
    newCardGenerator(index);
  }

  if(player.health !== 100 && playerCard === "health"){
      player.health += 20;
      playerHealthBar.style.width = `${player.health}%`;
      playerHealthBar.innerHTML = `${player.health}%`;
      descriptionAppear(playerCard, comCard);
      setTimeout(replaceCardCallBack(), 500);
      console.log("player add 20 health")
      return
  }else if(computer.health !== 100 && comCard === "health"){
          computer.health += 20;
          comHealthBar.style.width = `${computer.health}%`;
          comHealthBar.innerHTML = `${computer.health}%`;
          descriptionAppear(playerCard, comCard);
          setTimeout(replaceCardCallBack(), 500);
          console.log("computer add 20 health")
          return
        }

  if(player.health === 100 && playerCard === "health"){
    descriptionAppear(playerCard, comCard);
    setTimeout(replaceCardCallBack(), 500);
    console.log("No action taken as player health is full")
    return
  }else if(computer.health === 100 && comCard === "health"){
    descriptionAppear(playerCard, comCard);
    setTimeout(replaceCardCallBack(), 500);
    console.log("No action taken as com health is full")
    return
  }

  if(playerCard === comCard){
    descriptionAppear(playerCard, comCard);
    setTimeout(replaceCardCallBack(), 500);
    console.log("Its a draw")
    return
  }


  

  playerWins(playerCard, comCard, index);
  console.log(`this is com deck ` + comDeckArray) 
  console.log(`this is player deck ` + playerDeckArray)
}

// function that returns a number between 0 to 3
function generateRandomIndex() {
  let randomNum = Math.floor(Math.random() * 4);
  return randomNum;
}

// Enemy move
function enemyMove() {
  const randomIndex = generateRandomIndex(); // function for random index
  const comCard = comDeckArray[randomIndex];
  console.log(`enemy move comCard ` + comCard)
  const randomComCells = comCells[randomIndex];
  randomComCells.setAttribute("class", `cell com-cell ${comCard}`);
  setTimeout(function () {
    randomComCells.setAttribute("class", `cell com-cell back-of-card`);
  }, 3000);
  comDeckArray[randomIndex] = randomElement()
  console.log(`newlygenerate comCard to replace ` + comDeckArray[randomIndex])
  return comCard;

}

function playerWins(playerCard, comCard, index) {
  
  function replaceCardCallBack() {
    newCardGenerator(index);
  }

  const losingRules = {
    fire: ["water", "earth"],
    water: ["earth", "lightning"],
    earth: ["wind", "lightning"],
    lightning: ["wind", "fire"],
    wind: ["fire", "water"],
  };
  // console.log('this is commm card ' + comCard)
  const elementsThatDefeatPlayer = losingRules[playerCard];

  if (elementsThatDefeatPlayer.includes(comCard)) {
    computer.damage(player);
    playerHealthBar.style.width = `${player.health}%`;
    playerHealthBar.innerHTML = `${player.health}%`;
    playerEffect.style.display='block'
    setTimeout(function(){ 
      playerEffect.style.display='none'; 
    }, 1200);
    checkWin();
    descriptionAppear(playerCard, comCard);
    setTimeout(replaceCardCallBack(), 500);
    console.log(`computer damage player`);
  } else {
    player.damage(computer);
    comHealthBar.style.width = `${computer.health}%`;
    comHealthBar.innerHTML = `${computer.health}%`;
    comEffect.style.display='block'
    setTimeout(function(){ 
      comEffect.style.display='none'; 
    }, 1200);
    
    checkWin();
    descriptionAppear(playerCard, comCard);
    setTimeout(replaceCardCallBack(), 500);
    console.log(`player damage computer`);
  }
}

//function to replace old with new card
function newCardGenerator(index) {
  console.log(index);
  playerDeckArray[index] = randomElement();
  console.log("this is newGenerated player card" + playerDeckArray[index]);
  playerCells[index].setAttribute(
    "class",
    `cell player-cell ${playerDeckArray[index]}`
  );

}

function descriptionAppear(playerCard, comCard) {
  setTimeout(function () {
    fightDescription.style.color = "yellow";
    fightDescription.innerHTML = `You used ${playerCard} against Computer ${comCard}`;
    // console.log(`You used ${playerCard} against Computer ${comCard}`);
  }, 500);

  setTimeout(function () {
    fightDescription.style.color = "transparent";
  }, 3000);
}
//check winning and alert who win
function checkWin() {
  if (player.health === 0) {
    loseAlert.style.display='block'
    playAgainBtn.style.display='block'
  } else if (computer.health === 0) {
    winAlert.style.display='block'
    playAgainBtn.style.display='block'
  }
}

