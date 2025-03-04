
var grid = document.getElementById("grid");
var clipGame = '';
var game = {
	"clues": [['','1','','3','4','','','2','2','','2','1','','','2','','','','',''],
['1','2','3','','','','','','3','','','','','','','','3','1','0',''],
['','','','3','3','','1','1','2','','','2','1','','','3','2','2','','1'],
['3','','','','','1','','0','','1','','','3','2','','','','2','3','2'],
['','3','3','3','','0','','','1','','2','','4','','1','','','3','',''],
['3','','','','','','0','','','','','','','2','','1','','2','',''],
['','3','','','','','','1','','','','2','','2','','','2','','1',''],
['1','','3','4','','5','','','','3','2','','','','3','','3','','',''],
['','1','2','','','4','','1','2','2','','','0','','','3','','','0',''],
['','','','','3','3','','','2','','','1','','','1','','1','','',''],
['','','1','','','','','2','','4','','','','','','','1','0','',''],
['4','','','','0','','','','','','4','','','','2','3','2','2','2',''],
['','6','','','','2','3','2','1','','','','6','','','','','','3',''],
['','5','7','','','3','','','','','','6','8','7','','','3','','','1'],
['','','','','','3','','','0','','','','','','','4','','3','',''],
['','3','','6','','4','','3','','1','','','7','','','5','3','','4',''],
['','3','4','','2','','5','','','4','3','3','','','6','','','','',''],
['2','','3','','','5','','6','','5','','3','4','5','4','','3','5','7',''],
['3','','','','','4','','','6','','','4','','3','','','','5','','4'],
['','','4','3','2','','4','4','4','4','4','','','','3','4','4','4','4','']],
	"state": [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
}
generateGrid();


function generateGrid() {
	
  grid.innerHTML="";

  for (var i=0; i<20; i++) {

    row = grid.insertRow(i);

    for (var j=0; j<20; j++) {

      cell = row.insertCell(j);

      cell.onclick = function() { clickCell(this); };
  	  cell.innerHTML = game.clues[i][j];

    }

  }
  updateGrid();

}

function clickCell(cell) {
	
	var currentRow = cell.parentNode.rowIndex;
	var currentColumn = cell.cellIndex;
	var newState = game.state[currentRow][currentColumn];
	
	newState++
	newState = (newState % 3);

	game.state[currentRow][currentColumn] = newState;
	updateGrid();
}

function classMap(cellState){
	switch(cellState) {
		case 0:
			return "neutral";
		case 1:
			return "filled";
		case 2:
			return "empty";
		default:
			return "neutral";
	}
	return "neutral";
}

function updateGrid(){
  for (var i=0; i<20; i++) {
    for (var j=0; j<20; j++) {
		if (game.clues[i][j]===(''+countFilledCells(i,j)))
		{
			grid.rows[i].cells[j].style.color = '#070';
			grid.rows[i].cells[j].style.borderColor = '#070';
			grid.rows[i].cells[j].style.fontWeight= "bolder";
		}
		else
		{
			grid.rows[i].cells[j].style.color = 'black';
			grid.rows[i].cells[j].style.borderColor = 'black';
			grid.rows[i].cells[j].style.fontWeight= "normal";
		}
		grid.rows[i].cells[j].className = classMap(game.state[i][j]);
    }
  }
}
function saveGame(){
	saveToClip(JSON.stringify(game));
}

function saveToClip(newClip){
	navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
		if (result.state === "granted" || result.state === "prompt") {
			navigator.clipboard.writeText(newClip).then(
			() => {
				alert("Game saved to clipboard");
			},
			() => {
				alert("Unable to save game to clipboard");
			},
			);
		} else{
			alert("Unable to save game to clipboard. Permission Denied");
		}
	});
}

function loadFromClip(){
	
	navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
		if (result.state === "granted" || result.state === "prompt") {
			navigator.clipboard.readText().then(
			(clipText) => {
				alert("Game retrieved from clipboard");
				clipGame= importGame(clipText);
			},
			() => {
				alert("Unable to read clipboard");
			},
			);
		} else{
			alert("Unable to read clipboard. Permission Denied");
		}
	});
}



function loadGame(){
	loadFromClip();
}

function importGame(gameText){
	if(isValidGame(gameText))
	{
		game = JSON.parse(gameText);
		updateGrid();
		return;
	}
	alert("Game data not valid");
}

function isValidGame(gameText){
	return(gameText.match(/^{"clues":\[(?:\[(?:"[0-9]?",?){20}\],?){20}\],"state":\[(?:\[(?:[0-2],?){20}\],?){20}\]}$/g));
}

function countFilledCells(cellRow,cellCol){
	var cellCount =0;
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,19); i++) {

      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,19); j++) {

        if (game.state[i][j] === 1) cellCount++;

      }

    }
	return cellCount;
}


