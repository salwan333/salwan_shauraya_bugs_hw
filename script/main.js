// variables always go at the top -> this is step 1
// these are the connections that you're making to elements on the page 
// use CSS selectors to make connections to elements with JavaScript

// create a 1 to 1 connection with a variable -> querySelector("queryString")
// let theButton = document.querySelector("#buttonOne");

// create a 1 to many connection with a variable -> querySelectorAll("queryString")
let theButtons = document.querySelectorAll("#buttonHolder img"),
	theHeading = document.querySelector("#headLine h1"),
	puzzleBoard = document.querySelector(".puzzle-board"),
	puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
	dropZones = document.querySelectorAll('.drop-zone'),
	// store the dragged piece in a global variable
	// because we need it in the handleDrop function
	draggedPiece;

function changeBGImage() {
	// bug fix #2: reset the puzzle pieces when changing the background image
	resetPuzzlePieces();

	puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;
}

function handleStartDrag() { 
	console.log('started dragging this piece:', this);

	// store a reference to the puzzle piece image that we're dragging
	// so we can use it later and move it to a drop zone
	draggedPiece = this;
}

function handleDragOver(e) { 
	e.preventDefault(); // e is shorthand for event
	// this overrides the default dragover behaviour
	console.log('dragged over me'); 
}

function handleDrop(e) { 
	e.preventDefault();
	console.log('dropped something on me');

	// bug fix #1: check if there's already a puzzle piece in this drop zone
	if (this.children.length === 0) {
		this.appendChild(draggedPiece);
		draggedPiece.classList.add('dropped'); // add a class to indicate that the piece has been dropped
	} else {
		console.log("Can't drop here - already a piece");
	}
}

function resetPuzzlePieces() {
	// go through each drop zone and remove any pieces that are there
	dropZones.forEach(zone => {
		if (zone.children.length > 0) {
			zone.removeChild(zone.children[0]);
			// move the puzzle piece back to the left side
			puzzlePieces.forEach(piece => {
				if (piece.classList.contains('dropped')) {
					puzzleBoard.appendChild(piece);
					piece.classList.remove('dropped');
				}
			});
		}
	});
}

// step 2
// event handling always goes at the bottom => 
// how do we want users to interact with our app

// 1 to many event handling
// add event handling to each button in the collection of buttons, one at a time
theButtons.forEach(button => button.addEventListener("click", changeBGImage));

// add the drag event handling to the puzzle pieces
puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

// add the dragover AND the drop event handling to the drop zones
dropZones.forEach(zone => {
	zone.addEventListener("dragover", handleDragOver);
	zone.addEventListener("drop", handleDrop);
});
