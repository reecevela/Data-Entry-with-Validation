"use strict";
const $ = selector => document.querySelector(selector);

const names = ["Ben", "Joel", "Judy", "Anne"];
const scores = [88, 98, 77, 88];

document.addEventListener("DOMContentLoaded", () => {
	// add event handlers
	$("#add").addEventListener("click", addScore);
	$("#display_results").addEventListener("click", displayResults);
	$("#display_scores").addEventListener("click", displayScores);
	//move focus to Name field on DOMContentLoaded
	$('#name').focus();
});


//button functions
function addScore() {
	let name = $('#name').value;
	let score = $('#score').value;
	score = Number.parseFloat(score);

	//validation
	if (
		//validate number
		typeof score == 'number' &&
		score >= 0 &&
		score <= 100
		) {
			//validate name
			if (name == "") {
				//invalid name
				alertInvalid('name');
			} else {
				//valid
				//add results to arrays
				names.push(name);
				scores.push(score);
				//move focus back to name input and reset them
				$('#name').value = '';
				$('#name').focus();
				$('#score').value = '';
				//automatically update
				displayResults();
				displayScores();
			}
	} else {
		//invalid score
		if (name == '') {
			alertInvalid('both');
		} else {
			alertInvalid('score');
		}
	}
}

function displayResults() {
	//create elements
	const resultSection = $('#results');
	const resultLabel = document.createElement('h2')
	const averageScoreMessage = document.createElement('p');
	const highScoreMessage = document.createElement('p');

	//add content to them
	resultLabel.textContent = 'Results'
	averageScoreMessage.textContent = `Average Score = ${average(scores)}`;
	highScoreMessage.textContent = `High score = ${names[indexOfHighest(scores)]} with a score of ${highest(scores)}`;

	//remove any and all current elements
	while (resultSection.firstChild) {
		resultSection.removeChild(resultSection.firstChild);
	}

	//attach the elements
	resultSection.appendChild(resultLabel);
	resultSection.appendChild(averageScoreMessage);
	resultSection.appendChild(highScoreMessage);

}

function displayScores() {
	//remove any and all current elements
	const scoreSection = $('#scores');
	while (scoreSection.firstChild) {
		scoreSection.removeChild(scoreSection.firstChild);
	}

	//create the h2 label and add it
	const scoreLabel = document.createElement('h2');
	scoreLabel.textContent = 'Scores';
	scoreSection.appendChild(scoreLabel);


	for (let i = 0; i < names.length; i++) {
		const person = document.createElement('label')
		person.textContent = names[i];
		const score  = document.createElement('label');
		score.textContent = scores[i];
		const brElement = document.createElement('br');
		scoreSection.append(person, score, brElement);
	}
}

//called by validation errors
//'both' , 'name' , or 'score' will be the values
function alertInvalid(type) {
	const scoreAlert = $('#score').nextElementSibling;
	const nameAlert = $('#name').nextElementSibling;
	switch (type) {
		case 'both':
			nameAlert.textContent = 'Please enter a name';
			scoreAlert.textContent = 'Score must be between 0 and 100';
			break;
		case 'score':
			scoreAlert.textContent = 'Score must be between 0 and 100';
			nameAlert.textContent = '';
			break;
		case 'name':
			nameAlert.textContent = 'Please enter a name';
			scoreAlert.textContent = '';
			break;
		default:
			scoreAlert.textContent = nameAlert.textContent = '';
			break;
	}
}

//basic self explanatory functions
function average(list) {
	let sum = 0;
	for (let num of list) {
		sum += num;
	}
	return (sum / list.length);
}
function highest(list) {
	let high = 0;
	for (let i = 0; i < list.length; i++) {
		high = (list[i] > high) ? list[i] : high;
	}
	return high;
}
function indexOfHighest(list) {
	return list.findIndex(high => high == highest(list));
}