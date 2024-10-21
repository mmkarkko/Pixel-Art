const container = document.getElementById("container");
const button = document.getElementById("btn").addEventListener("click", reset);
const buttonSize = document.getElementById("toggle-btn").addEventListener("click", toggleGridSize);
const colorContainer = document.getElementById("color-container");

// By default, grid is small.
let isLargeGrid = false;
let currentPaint = "rgb(0, 0, 0)";

// Add color buttons to page
function addColorButtons() {
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPaint = btn.style.backgroundColor;
        });
    });
    // By default, color is black
    colorButtons[0].classList.add('active');
}

// Creates grid. isLargeGrid defines the size. By default, grid is small.
function createGrid(isLarge) {
    container.innerHTML = "";

    // Defining gridsize for smaller and larger grid.
    const size = isLarge ? 900 : 100;
    const colsAndRows = isLarge ? 30 : 10;
    document.documentElement.style.setProperty('--colsAndRows', colsAndRows);

    // Fill container with divs defined by size.
    for (let i = 0; i < size; i++) {
        const div = document.createElement("div");
        div.className = "grid-item";
        div.id = `square${i + 1}`;
        div.addEventListener("click", onClick);
        container.appendChild(div);
    }
}

// Toggles gridsize. Small or large.
function toggleGridSize() {
    isLargeGrid = !isLargeGrid;
    createGrid(isLargeGrid);
}

// Reset grid and starts fresh.
function reset() {
    container.innerHTML = "";
    createGrid(isLargeGrid);
}

// Turn div black on click.
// If color is already added, changes it to white (background color).
function onClick(event) {
    const currentColor = getComputedStyle(event.target).backgroundColor;
    // If element color is other than white, changes it back to white.
    if (currentPaint === currentColor) {
        event.target.style.backgroundColor = "rgb(255, 255, 255)";
    }
    else event.target.style.backgroundColor = currentPaint;
}

createGrid(isLargeGrid);
addColorButtons();