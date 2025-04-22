let isMouseDown = false;

// Track mouse down/up globally
document.body.addEventListener("mousedown", (e) => {
    if (e.button === 0) isMouseDown = true; // left button
});

document.body.addEventListener("mouseup", () => {
    isMouseDown = false;
});


function createGrid(size = 16) {
    const container = document.getElementById("container");
    container.innerHTML = ""; // Clear existing grid if needed

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");

        //   // Optional: add hover effect
        //   square.addEventListener("mouseenter", () => {
        //     square.style.backgroundColor = "black";
        //   });

        container.appendChild(square);
    }
}

function addHoverEffect() {
    const squares = document.querySelectorAll(".grid-square");
  
    squares.forEach(square => {
      square.addEventListener("mouseenter", () => {
        if (isMouseDown) {
          square.style.backgroundColor = "#333";
        }
      });
  
      // Optional: allow single-click painting too
      square.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
          square.style.backgroundColor = "#333";
        }
      });
    });
  }

function resetGrid() {
    createGrid();     // recreate grid
    addHoverEffect(); // reapply hover logic
}

createGrid(); // Default 16x16 grid
addHoverEffect();

// Reset button logic
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", resetGrid);