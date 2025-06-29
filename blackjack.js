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

function startGame(){
    if(money > 0){
    money -= 100
    purseEl.textContent = "Purse: " + money
    alive = true
    let first = getRandomNum()
    let second = getRandomNum()
    cards = [first, second]
    sum = first+second
    renderGame()
    }
}

function renderGame(){
    cardsEl.textContent = "Cards: "
    for(let i = 0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum

    if(sum < 21){
        message = "Do you want to pick another card?"
    }
    else if(sum === 21){
        message = "Congrats, its a blackjack!"
        alive = false
        money += 200
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
        sum += newcard
        renderGame()
    }
}

function getRandomNum(){
    let randomNumber = Math.floor(Math.random()*13)+1;
    if(randomNumber > 10){
        return 10
    }
    else if(randomNumber === 1){
        return 11
    }
    else{
        return randomNumber
    }
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