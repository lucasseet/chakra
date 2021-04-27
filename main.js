//Outer
let comHealthBar = document.querySelector('#com-health')
let playerHealthBar = document.querySelector('#player-health')
let playerCells = document.querySelectorAll('.player-cell')
let comCells = document.querySelectorAll('.com-cell')
let fightDescription = document.querySelector('#fight-description')

//Chakra Elements
let cardElements = ['fire', 'water', 'wind', 'earth', 'lightning', 'health']

//Create empty Player & Com array
const playerDeckArray = []
const comDeckArray = []

//class
class Player {
  name = ""
  health = 100

  constructor(name, health){
    this.name = name
    this.health = health
  }

  damage(enemy){
    if(enemy.health !== 0) {
      enemy.health -= 20
      console.log(enemy.health)
    } else if (enemy.health === 0) {
      alert("You Win")
    }
  }
}

let computer = new Player("Com", 100)
let player = new Player("player", 100)


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
  let playerCells = document.querySelectorAll('.player-cell')

  


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
        const playerCard = playerDeckArray[index]
        card.classList.add(playerCard)
        card.addEventListener('click', handleSelect)
        
      })


  

    };
  };
};

//Get random element -> generate random number btn 0 & length of element
function randomElement(){
  let randomNum = Math.floor(Math.random() * cardElements.length)
  return cardElements[randomNum]
}

// Player Clicks 
function handleSelect(event) {
  let comCard = enemyMove ()
  let target = event.target
  let playerCard = target.classList[2]

  if(playerCard === "health"){
    playerHealthBar.style.width = `${player.health}%`
    playerHealthBar.innerHTML = `${player.health}%`
    player.health += 20
    console.log(`player add 20 health`)
    descriptionAppear(playerCard, comCard)
    setTimeout(function(){ newCardGenerator(playerCard); }, 500);
    return
  }

  if(comCard === "health"){
    comHealthBar.style.width = `${computer.health}%`
    comHealthBar.innerHTML = `${computer.health}%`
    computer.health += 20
    descriptionAppear(playerCard, comCard)
    setTimeout(function(){ newCardGenerator(playerCard); }, 500);
  }

  if(playerCard === comCard){
    comHealthBar.style.width = `${computer.health}%`
    comHealthBar.innerHTML = `${computer.health}%`
    computer.health -= 10

    playerHealthBar.style.width = `${player.health}%`
    playerHealthBar.innerHTML = `${player.health}%`
    player.health -= 10
  }


  playerWins(playerCard, comCard)
  descriptionAppear(playerCard, comCard)
  setTimeout(function(){ newCardGenerator(playerCard); }, 500);
  
}

// function that returns a number between 0 to 3
function generateRandomIndex() {
  let randomNum = Math.floor(Math.random() * 4)
  return randomNum
}

// Enemy move
function enemyMove() {
  const randomIndex = generateRandomIndex() // function for random index
  //generate a random element from comdeckarray
  var comCard = comDeckArray[randomIndex]
  // console.log("this is comCard " + comCard)
  //generate a random htmlDiv Element
  randomComCells = comCells[randomIndex]
  //let element appear in DOM by inserting class into HTML div element
  randomComCells.classList.add(comCard)
  //let DOM card be back of card
  setTimeout(function(){ 
  randomComCells.classList.remove();
  randomComCells.classList.add("back-of-card")
  }, 3000); 
  return comCard
}

function playerWins(playerCard, comCard){
  
  const losingRules = {
    fire:['water','earth'],
    water:['earth','lightning'],
    earth:['wind','lightning'],
    lightning:['wind','fire'],
    wind:['fire','water'],
  }
  // console.log('this is commm card ' + comCard)
  const elementsThatDefeatPlayer = losingRules[playerCard]

  if(elementsThatDefeatPlayer.includes(comCard)) {
    computer.damage(player)
    playerHealthBar.style.width = `${player.health}%`
    playerHealthBar.innerHTML = `${player.health}%`
    console.log(`computer damage player`)
  }else {
    player.damage(computer)
    comHealthBar.style.width = `${computer.health}%`
    comHealthBar.innerHTML = `${computer.health}%`
    console.log(`player damage computer`)
  }
}

//function to replace old with new card
function newCardGenerator(playerCard) {
  //random card
  let newCard = randomElement()
  //get playercard array index
  let playerCardIndex = playerDeckArray.indexOf(playerCard)
  // console.log("this is player card " + playerCard)
  //replace player card with newly generated card (in system array)
  playerDeckArray[playerCardIndex] = newCard
  //replace player card with newly generated card (on-screen)
  //replace old classlist with new e.g. fire to water
  // console.log(playerCard)
  playerCells[playerCardIndex].classList.remove(playerCard)
  playerCells[playerCardIndex].classList.add(newCard)
  // console.log("on-screen array " + playerDeckArray)
}

function descriptionAppear(playerCard, comCard){
  setTimeout(function(){
  fightDescription.style.color='yellow';  
  fightDescription.innerHTML=`You used ${playerCard} against Computer ${comCard}`
  console.log(`You used ${playerCard} against Computer ${comCard}`)
  }, 500);

  setTimeout(function(){
    fightDescription.style.color='transparent';  
    }, 3000);

  
}