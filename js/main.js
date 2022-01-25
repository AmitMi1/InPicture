'use strict'

var gCurrQuestIdx = 0
var gQuests

function init() {
    // gCurrQuestIdx = 0
    createQuests()
    renderQuest()

}

function createQuests() {
    gQuests = [
        { id: 1, opts: ["Lamborghini", "Ferrari"], correctOptIndex: 1 },
        { id: 2, opts: ["Bugatti", "McLaren"], correctOptIndex: 0 },
        { id: 3, opts: ["Aston Martin", "Porsche"], correctOptIndex: 0 },
        { id: 4, opts: ["Koenigsegg", "Pagani"], correctOptIndex: 1 },
        { id: 4, opts: ["Jaguar", "Lexus"], correctOptIndex: 0 }
    ]
}

function renderQuest() {
    if (gCurrQuestIdx < gQuests.length) {
        var opt1 = gQuests[gCurrQuestIdx].opts[0]
        var opt2 = gQuests[gCurrQuestIdx].opts[1]
        var strHTML = `<img src="assets/${gCurrQuestIdx + 1}.png" class="car"><button class="answer answerDesign answer1" onclick="checkAnswer(0)">${opt1}</button><button class="answer answerDesign answer2" onclick="checkAnswer(1)">${opt2}</button>`
        var elBoard = document.querySelector('.board')
        elBoard.innerHTML = strHTML
        document.querySelector('.myGame').classList.add('boardInvisible')
        document.querySelector('img').addEventListener('load', showBoard)
    } else {
        gCurrQuestIdx = 0
        document.querySelector('p').classList.add('boardInvisible')
        document.querySelector('.myGame').classList.add('boardInvisible')

        document.querySelector('.board').innerHTML = `<div class="victory">
        <img src="assets/victory.png" class="victoryImg center">
        <button onclick="restartGame()" class="restart">PLAY AGAIN</button></div>`
        document.querySelector('.victoryImg').addEventListener('load', showBoard)

    }
}

function showBoard() {
    document.querySelector('.myGame').classList.remove('boardInvisible')
}

function checkAnswer(optIdx) {
    if (gCurrQuestIdx < gQuests.length) {
        var correctOptIndex = gQuests[gCurrQuestIdx].correctOptIndex
        var chosenOpt = (optIdx === 0) ? document.querySelector('.answer1') : document.querySelector('.answer2')
        if (correctOptIndex === optIdx) {
            chosenOpt.classList.add('correctAnswer', 'disableButton')
            gCurrQuestIdx++
            setTimeout(renderQuest, 500)
        } else {
            chosenOpt.classList.add('wrongAnswer')
            setTimeout(removeClass, 500, chosenOpt)
        }
    }
}

function removeClass(opt) {
    opt.classList.remove('wrongAnswer')
}

function restartGame() {
    document.querySelector('p').classList.remove('boardInvisible')
    init()
}
