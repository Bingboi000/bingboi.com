let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let number_of_tries = 5

let answer = '\xa0'//space character
let guessed = []
let wordStatus = null


function scaffold(){
	ctx.lineWidth = "5"
	ctx.beginPath()
	ctx.moveTo(60, 140)
	ctx.lineTo(120, 140)
	ctx.moveTo(80, 140);
	ctx.lineTo(80, 20);
	ctx.lineTo(180, 20);
	ctx.lineTo(180, 30);
	ctx.moveTo(80, 60);
	ctx.lineTo(120, 20);
	ctx.stroke();
	ctx.closePath();
}
scaffold()


//Grid
let gridSize = 20;
let gridRows = canvas.height / gridSize;
let gridCols = canvas.width / gridSize;
//Draw Grid
function drawGrid() {
    for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
			ctx.lineWidth = "1";
            ctx.strokeStyle = "grey";
            ctx.strokeRect(j * gridSize, i * gridSize, gridSize, gridSize);
        }
    }
}
//drawGrid();


let animals_bank = ['DOG', 'CROCODILE']
let countries_bank = ['USA', 'PHILIPPINES']
let fruits_bank = ['PEAR', 'WATERMELON']


function randomAnimal() {answer = animals_bank[Math.floor(Math.random() * animals_bank.length)]}
function randomCountry() {answer = countries_bank[Math.floor(Math.random() * countries_bank.length)]}
function randomFruit() {answer = fruits_bank[Math.floor(Math.random() * fruits_bank.length)]}


function animalsButton() {
	resetButton(); randomAnimal(); guessedWord();
	document.getElementById('category_header').innerHTML = 'Category is: ' + document.getElementById('animals_button').innerHTML
}
function countriesButton() {
	resetButton(); randomCountry(); guessedWord();
	document.getElementById('category_header').innerHTML = 'Category is: ' + document.getElementById('countries_button').innerHTML

}
function fruitsButton() {
	resetButton(); randomFruit(); guessedWord();
	document.getElementById('category_header').innerHTML = 'Category is: ' + document.getElementById('fruits_button').innerHTML
}


function guessedWord() {
	wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
	document.getElementById('word_container').innerHTML = wordStatus;
}


ctx.font = '20px arial'
ctx.fillText(number_of_tries, 30, 50)

let letters_in_alphabet_array = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
	'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let chosenLetter = ''
for(let i = 0; i < letters_in_alphabet_array.length; i++) {
	let funcName = "disableWhenClick" + letters_in_alphabet_array[i];
	window[funcName] = function(){
		document.getElementById('letter'+letters_in_alphabet_array[i]).disabled = true
		chosenLetter = letters_in_alphabet_array[i]

		handleGuess(chosenLetter)
	}
}	

function handleGuess(asd){
	guessed.indexOf(asd) === -1 ? guessed.push(asd) : null

	if(answer.indexOf(asd) >= 0){
		guessedWord();
		checkGameStatus()
	}else if(answer.indexOf(asd) === -1){
		decreaseGuessCount()
		updateHangmanImage()
		checkGameStatus()
	}
}

function updateHangmanImage(){
	ctx.lineWidth = "5";
	
	if(number_of_tries === 4){
		ctx.beginPath();
		ctx.arc(180,45,15,Math.PI*1.5,Math.PI*1.499,false);//head 
		ctx.moveTo(180, 60);//torso 
		ctx.lineTo(180, 83);
	}else if(number_of_tries === 3){
		ctx.moveTo(180, 60);//right arm 
		ctx.lineTo(200, 80);
	}else if(number_of_tries === 2){
		ctx.moveTo(180, 60);//left arm 
		ctx.lineTo(160, 80);
	}else if(number_of_tries === 1){
		ctx.moveTo(180, 80);//right leg 
		ctx.lineTo(200, 120);
	}else if(number_of_tries === 0){
		ctx.moveTo(180, 80);//left left 
		ctx.lineTo(160, 120);
	}
	
	ctx.stroke(); // Draw it
	ctx.closePath();

}


function checkGameStatus(){
	//if won
	if (wordStatus === answer) {
		disableKeyboard()
		document.getElementById('category_header').innerHTML = 'You Won!';
		
	}
	//if lose
	if (number_of_tries === 0) {
		disableKeyboard()
		document.getElementById('category_header').innerHTML = 'You Lost! The answer is: ';
	}
}


function decreaseGuessCount(){
	ctx.fillStyle = 'grey'
	ctx.fillRect(30, 30, 30, 20)//x y w h
	ctx.fillStyle = 'black'
	number_of_tries =  number_of_tries-1
	ctx.fillText(number_of_tries, 30, 50)
}



function disableKeyboard() {
	for (let i = 0; i < document.getElementById('alphabet').getElementsByTagName('button').length; i++) {
		document.getElementById('alphabet').getElementsByTagName('button')[i].disabled = true;
		document.getElementById('word_container').innerHTML = answer;
	}
}

function resetButton(){
	number_of_tries = 5
	for (let i = 0; i < document.getElementById('alphabet').getElementsByTagName('button').length; i++) {
		document.getElementById('alphabet').getElementsByTagName('button')[i].disabled = false;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = 'black'
		ctx.fillText(number_of_tries, 30, 50)
		
		scaffold()
	}
	guessed = []
}


disableKeyboard()