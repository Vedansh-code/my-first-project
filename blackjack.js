let cards = []
let sum = 0
let alive = false
let message = "";
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let purseEl = document.getElementById("purse-el")
let money = 500
purseEl.textContent = "Purse: " + money
let currentBet = 0
let betamount = document.getElementById("bet-input")

function startGame(){
    let enteredBet = parseInt(betamount.value)
    if(isNaN(enteredBet) || enteredBet <= 0){
        message = "Please enter a valid bet"
        messageEl.textContent = message
        return
    }
    if(money >= enteredBet){
    currentBet = enteredBet
    money -= currentBet
    purseEl.textContent = "Purse: " + money
    alive = true
    let first = getRandomNum()
    let second = getRandomNum()
    cards = [first, second]
    sum = sum = first.value + second.value
    checkAce()
    renderGame()
    }
    else{
        messageEl.textContent = "Not enought amount in you wallet."
        return
    }
}

function renderGame(){
    cardsEl.textContent = ""
    for(let i = 0; i < cards.length; i++){
        let img = document.createElement("img")
        img.src = getCardImage(cards[i])
        img.classList.add("card-img")
        cardsEl.appendChild(img)
    }

    // cardsEl.textContent = "Cards: "
    // for(let i = 0; i < cards.length; i++){
    //     cardsEl.textContent += cards[i] + " "
    // }
    sumEl.textContent = "Sum: " + sum

    if(sum < 21){
        message = "Do you want to pick another card?"
    }
    else if(sum === 21){
        message = "Congrats, its a blackjack!"
        alive = false
        money += currentBet*5
        purseEl.textContent = "Purse: " + money
    }
    else{
        message = "Oops! You Died"
        purseEl.textContent = "Purse: " + money
        alive = false
    }
    messageEl.textContent = message
}

function newCard(){
    if (alive && sum < 21) {
        let newcard = getRandomNum()
        cards.push(newcard)
        sum += newcard.value
        checkAce()
        renderGame()
    }
}

function getRandomNum(){
    let ranks = [2,3,4,5,6,7,8,9,"J","Q","K","A"]
    let suits = ["C", "D", "H", "S"]
    let rank = ranks[Math.floor(Math.random()*ranks.length)]
    let suit = suits[Math.floor(Math.random()*suits.length)]

    let value
    if(rank === "A") value = 11
    else if(["J", "Q", "K"].includes(rank)) value = 10
    else value = rank

    return {rank: rank.toString(), suit, value}

    // let randomNumber = Math.floor(Math.random()*13)+1;
    // if(randomNumber > 10){
    //     return 10
    // }
    // else if(randomNumber === 1){
    //     return 11
    // }
    // else{
    //     return randomNumber
    // }
}
function addone(){
    money += 100
    purseEl.textContent = "Purse: " + money
    console.log("100 added")
}
function addtwo(){
    money += 200
    purseEl.textContent = "Purse: " + money
}
function addfive(){
    money += 500
    purseEl.textContent = "Purse: " + money
}

function restartGame(){
    // money = 500
    cards = []
    sum = 0
    alive = false
    currentBet = 0

    // purseEl.textContent = "Purse: " + money
    cardsEl.textContent = "Cards: "
    sumEl.textContent = "Sum: "
    messageEl.textContent = "Game reset. Place your bet to start"
    betamount.value = "";
}

function getCardImage(card) {
    return `https://deckofcardsapi.com/static/img/${card.rank}${card.suit}.png`
}
function checkAce() {
    for (let i = 0; i < cards.length; i++) {
        if (sum > 21 && cards[i].rank === "A" && cards[i].value === 11) {
            cards[i].value = 1
            sum -= 10
        }
    }
}
