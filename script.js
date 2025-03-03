
var grid = document.getElementById("grid");
var clues = [['','1','','3','4','','','2','2','','2','1','','','2','','','','',''],
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
['','','4','3','2','','4','4','4','4','4','','','','3','4','4','4','4','']];

generateGrid();


function generateGrid() {
	


  grid.innerHTML="";

  for (var i=0; i<20; i++) {

    row = grid.insertRow(i);

    for (var j=0; j<20; j++) {

      cell = row.insertCell(j);

      cell.onclick = function() { clickCell(this); };

      var cellStatus = document.createAttribute("cell-status");       

      cellStatus.value = "neutral";             

      cell.setAttributeNode(cellStatus);
	  
	  cell.className = cellStatus.value;
	  cell.innerHTML = clues[i][j];

    }

  }
		updateGrid();

}

function clickCell(cell) {
	switch(cell.getAttribute("cell-status")) {
		case "neutral":
			cell.setAttribute("cell-status", "black");
			break;
		case "black":
			cell.setAttribute("cell-status", "white");
			break;
		case "white":
			cell.setAttribute("cell-status", "neutral");
			break;
		default:
			cell.setAttribute("cell-status", "neutral");
	}
	cell.className = cell.getAttribute("cell-status");
	updateGrid();
}

function updateGrid(){
  for (var i=0; i<20; i++) {
    for (var j=0; j<20; j++) {
		if (grid.rows[i].cells[j].innerHTML===(''+countBlackCells(i,j)))
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
    }
  }
}
function saveGrid(){
saveToClip(JSON.stringify(clues));


}

function saveToClip(newClip){
	navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
		if (result.state === "granted" || result.state === "prompt") {
			navigator.clipboard.writeText(newClip).then(
			() => {
				alert("Grid state saved to clipboard");
			},
			() => {
				alert("Unable to save grid state to clipboard");
			},
			);
		} else{
			alert("Unable to save grid state to clipboard. Permission Denied");
		}
	});
}

function loadGrid(){
  for (var i=0; i<20; i++) {
    for (var j=0; j<20; j++) {
		if (grid.rows[i].cells[j].innerHTML===(''+countBlackCells(i,j)))
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
    }
  }
}



function countBlackCells(cellRow,cellCol){
	var cellCount =0;
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,19); i++) {

      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,19); j++) {

        if (grid.rows[i].cells[j].getAttribute("cell-status")=="black") cellCount++;

      }

    }
	return cellCount;
}


function clickCellm(cell) {

  
  //Check if the end-user clicked on a mine
  if (cell.getAttribute("data-mine")=="true") {


  } else {

    cell.className="clicked";

    //Count and display the number of adjacent mines

    var mineCount=0;

    var cellRow = cell.parentNode.rowIndex;

    var cellCol = cell.cellIndex;

    //alert(cellRow + " " + cellCol);

    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {

      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {

        if (grid.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;

      }

    }

    cell.innerHTML=mineCount;

    if (mineCount==0) { 

      //Reveal all adjacent cells as they do not have a mine

      for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {

        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {

          //Recursive Call

          if (grid.rows[i].cells[j].innerHTML=="") clickCell(grid.rows[i].cells[j]);

        }

      }

    }
    checkLevelCompletion();
  }

}