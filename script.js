let isMouseDown = false;

document.body.addEventListener("mousedown", (e) => {
    if (e.button === 0) isMouseDown = true;
});
document.body.addEventListener("mouseup", () => {
    isMouseDown = false;
});

function createGrid(size = 16) {
    const container = document.getElementById("gridContainer");
    container.innerHTML = "";

    const containerSizeRem = 32;
    const squareSizeRem = containerSizeRem / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        square.style.width = `${squareSizeRem}rem`;
        square.style.height = `${squareSizeRem}rem`;
        container.appendChild(square);
    }
}

function addHoverEffect() {
    const squares = document.querySelectorAll(".grid-square");

    squares.forEach(square => {
        square.addEventListener("mouseenter", () => {
            if (isMouseDown) {
                applyRandomColor(square);
                applyRandomColorWithDarkening(square);
            }
        });

        square.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                applyRandomColor(square);
                applyRandomColorWithDarkening(square);
            }
        });
    });
}

function applyRandomColor(square) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
function applyRandomColorWithDarkening(square) {
    let darkness = parseFloat(square.dataset.darkness) || 0;
    darkness = Math.min(darkness + 0.1, 1.0);
    square.dataset.darkness = darkness;

    // Generate random base color each time
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Apply color with increasing black overlay via opacity simulation
    square.style.backgroundColor = `rgba(${r * (1 - darkness)}, ${g * (1 - darkness)}, ${b * (1 - darkness)}, 1)`;
}


function resetGrid(size = 16) {
    createGrid(size);
    addHoverEffect();
}

document.getElementById("resetBtn").addEventListener("click", () => resetGrid());

document.getElementById("setSizeBtn").addEventListener("click", () => {
    const input = prompt("Enter grid size (1–100):");
    const size = parseInt(input);

    if (isNaN(size) || size < 1 || size > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
    }

    resetGrid(size);
});

resetGrid();
