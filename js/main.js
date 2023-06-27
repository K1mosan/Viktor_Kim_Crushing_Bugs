console.log("JS file connected");
// Variables
const theButtons = document.querySelectorAll("#buttonHolder img"),
    puzzleBoard = document.querySelector(".puzzle-board"),
    puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    puzzlePiecesDiv = document.querySelector(".puzzle-pieces"),
    dropZones = document.querySelectorAll(".drop-zone");

let draggedPiece;

//functions
function changeBGImage() {
  const backgroundID = this.id;
  puzzleBoard.style.backgroundImage = `url(images/backGround${backgroundID}.jpg)`;

  dropZones.forEach((zone) => {
    if (zone.firstChild) {
      const piece = zone.firstChild;
      puzzlePiecesDiv.appendChild(piece);
      piece.classList.remove("dropped");
    }
  });

  for (let i = 0; i < puzzlePieces.length; i++) {
    const piece = puzzlePieces[i];
    const originalPieceImage = piece.getAttribute('src');
    const newPieceImage = originalPieceImage.replace(/\d/g, this.id);
    piece.src = newPieceImage;
}
}

function handleDragOver(e) {
  e.preventDefault();
  console.log("Dragged over me");
}

function handleStartDrag() {
  console.log("Started dragging this piece:", this);
  draggedPiece = this;
}

function handleDrop(e) {
  e.preventDefault();
  console.log("Dropped something on me");

  if (this.children.length >= 1) {
    return;
  }

  this.appendChild(draggedPiece);
}

function resetPuzzle() {
  puzzlePieces.forEach((piece) => {
    piece.classList.remove("dropped");
    piece.parentNode.removeChild(piece);
    puzzlePiecesDiv.appendChild(piece);
  });
}

// Event Listeners
theButtons.forEach((button) => button.addEventListener("click", changeBGImage));
puzzlePieces.forEach((piece) => piece.addEventListener("dragstart", handleStartDrag));
dropZones.forEach((zone) => {
  zone.addEventListener("dragover", handleDragOver);
  zone.addEventListener("drop", handleDrop);
});

const resetButton = document.getElementById("resetBut");
resetButton.addEventListener("click", resetPuzzle);