
  // call API
  fetch("https://www.dnd5eapi.co/api/monsters")
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the Numbers API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      updateResult(json);
    });


function updateResult(info) {

  document.getElementById('result').innerHTML = displayList(info.results);
}



function displayList(list) {
	let output = "<ul>";
	let index = 0;
	while (index < list.length) {
		output += "<h3 class=\"monster_list_item\">" + list[index].name + "</h3>";
		index++;
	}
	output += "</ul>";
	return output;
}