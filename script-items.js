let numItems = Math.floor((Math.random() * 10 + 1) * (Math.random() * 3 + 1) + 2);

let index = 0;

fetch("https://www.dnd5eapi.co/api/equipment")
.then(function(result) {
	if(result.status != 200) {
		return "ERROR";
	}
	return result.json();
		

})
.then(function(json) {
	while(index < numItems) {
		let random = Math.floor((Math.random() * 231));
		addItem("https://www.dnd5eapi.co" + json.results[random].url);
		index++;
	}
})
	
	

	


let addItem = function(url) {
	fetch(url)
	.then(function(result) {
			if(result.status != 200) {
				return "Error";
			}
			return result.json();

	})
	.then(function(json) {
		console.log(json);
		let output = "<div class=\'item'\>";
		output += "<h2>" + json.name + "</h2>";
		if (typeof json.cost.quantity !== "undefined") {
			output += "<h4> Cost: " + json.cost.quantity + " " + json.cost.unit + "</h4>";
		}
		output += "<h4> Weight: " + json.weight + " pounds</h4>";
		output += "<p>" + combineDesc(json.desc) + "</p></div>"

		document.getElementById("results").innerHTML += output;
	});

}



let combineDesc = function(list) {
	if (typeof list == "undefined" || list.length == 0) {
		return "";
	}
	
	let output = "";
	let index = 0;
	while (index < list.length) {
		output += list[index] + " ";
		index++;
	}

	return output;
}
