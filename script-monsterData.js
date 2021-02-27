 



document.getElementById('get').addEventListener('click', function(e) {
  e.preventDefault();
  let box = document.getElementById('textBox').value
  
  fetch('http://www.dnd5eapi.co/api/monsters/' + getCorrectFormate(box))
     .then(function(response) {

	if(response.status != 200) {
		return {
			text: "Error calling the API:" + response.statusText
		}
	}
	return response.json();
     }).then(function(json) {
	if(typeof json === "string") {
		return;
	}
	updateDocument(json);
     });

 });



//makes sure input is in the right formate
function getCorrectFormate(string) {
	let word = string.replaceAll(" ", "-");
	console.log(word.toLowerCase());
	return word.toLowerCase();
}


//updates the text
function updateDocument(json) {
  console.log(json);
  if(typeof json === 'string') {
	document.getElementById('final').innerHTML = '<p>' + json + '</p>';
	return;
  } 
  let report = '<h1 id=\'name\'>' + json.name + '</h1>';
  
  report += getChallengeRating(json);
  report += getSize(json);
  report += getType(json);
  report += getAlignment(json);
  report += getArmor(json);
  report += getHitPoints(json);
  report += getSpeed(json);
  report += getStats(json);
  report += getProficiencies(json);
  report += getActions(json);
  report += getVulnerabilities(json);
  report += getResistances(json);
  report += getImmunities(json);
  report += getSenses(json);
  report += getLanguages(json);
  report += getSpecialAbilities(json);
  report += getLegendaryActions(json);

  document.getElementById('final').innerHTML = report;
}



function getSize(json) {
	let output = "";
	if (document.getElementById('size-check').checked) {
		output += "<h2 id=\'size\'>Size: " + json.size + "</h2>";
	}
	return output;
}


function getType(json) {
	let output = "";
	if (document.getElementById('type-check').checked) {
		output += "<h2 id=\'type\'>Type: " + json.type + "</h2>";
	}

	return output;
}


function getAlignment(json) {
	let output = "";
	if (document.getElementById('alignment-check').checked) {
		output += "<h2 id=\'alignment\'>Alignment: " + json.alignment + "</h2>";
	}

	return output;
}


function getArmor(json) {
	let output = "";
	if (document.getElementById('armor-check').checked) {
		output += "<h2 id=\'armor\'>Armor: " + json.armor_class + "</h2>";
	}

	return output;
}


function getHitPoints(json) {
	let output = "";
	if (document.getElementById('hitpoint-check').checked) {
		output += "<h2 id=\'hitpoints\'> Hit Points: " + json.hit_points + "</h2>";
	}

	return output;
}


function getSpeed(json) {
	let output = "";
	if (document.getElementById('speed-check').checked) {
		output += "<h2 id=\'speed\'> Speed:</h2><ul id=\'speedList\'>"
		if (typeof json.speed.walk !== "undefined") {
			output += "<li> Walking Speed: " + json.speed.walk + "</li>";
		}
		if (typeof json.speed.fly !== "undefined") {
			output += "<li> Flying Speed: " + json.speed.fly + "</li>";
		}
		if (typeof json.speed.swim !== "undefined") {
			output += "<li> Swimming Speed: " + json.speed.swim + "</li>";
		}
		if (typeof json.speed.burrow !== "undefined") {
			output += "<li> Burrowing Speed: " + json.speed.burrow + "</li>";
		}
		if (typeof json.speed.climb !== "undefined") {
			output += "<li> Climbing Speed: " + json.speed.climb + "</li>";
		}

		output += "</ul>";
	}

	return output;
}


function getStats(json) {
	let output = "";
	if (document.getElementById('stats-check').checked) {
		output += "<h1> Stats </h1><ul id=\'stats\'><li> Strength: " + json.strength + "</li><li> Dexterity: " + json.dexterity + "</li><li> Constitution: " + json.constitution + "</li><li> Intellegence: " + json.intelligence + "</li><li> Wisdom: " + json.wisdom + "</li><li> Charisma: " + json. charisma + "</li></ul>";
	}

	return output;
}


function getProficiencies(json) {
	let output = ''
	if (document.getElementById('proficiencies-check').checked) {
		output = "<h2 id=\'proficiencies\'>Proficiencies</h2>";
		if (json.proficiencies.length > 0) {
			output += loopProficiencies(json.proficiencies);
		}
	}

	return output;
}



function loopProficiencies(list) {
	let output = "<ul>";
	let index = 0;
	while (index < list.length) {
		output += "<li> " + list[index].proficiency.name + " +" + list[index].value + "</li>";
		index++;
	}

	output += "</ul>";
	return output;
}


function getActions(json) {
	let output = "";
	if (document.getElementById('action-check').checked) {
		output += "<h1>Actions</h1>" + loopActions(json.actions);
	}

	return output;
}


function loopActions(list) {
	if (typeof list === "undefined") {
		return "";
	}
	let output = "<ul>";
	let index = 0;
	while (index < list.length) {
		output += "<li><h4> " + list[index].name + "</h4></li><p>" + list[index].desc + "</p>";
		index++;
	}

	output += "</ul>";
	return output;
}


function getVulnerabilities(json) {
	let output = "";
	if (document.getElementById('vulnerabilities-check').checked) {
		output += "<h2 id=\'vulnerabilities\'>Vulnerabilities: </h2>" + loopList(json.damage_vulnerabilities);
	}

	return output;
}


function loopList(list) {
	let output = "<h4>";
	let index = 0;
	while (index < list.length) {
		if (index !== 0) {
			output += ", ";
		}
		output += list[index];
		
		index++;
	}

	output += "</h4>";
	return output;
}


function getResistances(json) {
	let output = "";
	if (document.getElementById('resistances-check').checked) {
		output += "<h2 id=\'resistances\'>Resistances: " + loopList(json.damage_resistances) + "</h2>";
	}

	return output;
}


function getImmunities(json) {
	let output = "";
	if (document.getElementById('immunities-check').checked) {
		output += "<h2 id=\'immunities\'>Immunities: " + loopList(json.damage_immunities) + "</h2>";
	
	}

	return output;
}



function getLanguages(json) {
	let output = "";
	if (document.getElementById('languages-check').checked) {
		if (typeof json.langauges === "undefined") {
			return "<h2 id=\'languages\'>Languages: Cannot speak any language</h2>";
		}
		output += "<h2 id=\'languages'>Languages: " + json.langauges + "</h2>";
	}

	return output;
}



function getSenses(json) {
	let output = "";
	if (document.getElementById('senses-check').checked) {
		if (typeof json.senses.darkvision === "undefined" ) {
			return "<h2 id = \'senses\'>Darkvision: none</h2>";
		}
		output += "<h2>Darkvision: " + json.senses.darkvision + "</h2>";
	}

	return output;
}



function getChallengeRating(json) {
	let output = "";
	if (document.getElementById('challenge-rating-check').checked) {
		output += "<h2> Challenge Rating: " + json.challenge_rating + "</h2>";
	}

	return output;
}


function getSpecialAbilities(json) {
	let output = "";
	if (document.getElementById('special-abilities-check').checked) {
		output += "<h2> Special Abilities:</h2>" + loopAbilities(json.special_abilities);
	}

	return output;
}

function loopAbilities(list) {
	if (typeof list === "undefined" || list.length === 0) {
		return "";
	}
	let output = "<ul>";
	let index = 0;
	while (index < list.length) {
		output += "<li><h4>" + list[index].name + "</h4><p>" + list[index].desc;
		
		if (typeof list[index].usage !== "undefined") {
			output += " Usage: " + list[index].usage.times + " " + list[index].usage.type;
		}
		output += "</p></li>";
		index++;
	}

	output += "</ul>";
	return output;
}


function getLegendaryActions(json) {
	let output = "";
	if (document.getElementById('legendary-actions-check').checked) {
		output += "<h1>Legendary Actions</h1>" + loopActions(json.legendary_actions);
	}

	return output;
}
