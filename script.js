const container = document.querySelector("#container");
const resizeBtn = document.querySelector("#resize-btn");
const sizeLabel = document.querySelector("#size-label");

const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;

const randomChannel = () => Math.floor(Math.random() * 256);
const randomColor = () =>
  `rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`;

function paintSquare(square) {
  const darkness = Number(square.dataset.darkness || 0);
  if (darkness >= 10) return;

  if (darkness === 0) {
    square.style.backgroundColor = randomColor();
    square.classList.add("drawn");
  }

  const next = darkness + 1;
  square.dataset.darkness = next;
  square.style.opacity = next / 10;
}

function createGrid(size) {
  container.replaceChildren();
  container.style.setProperty("--n", size);

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.opacity = 1;
    fragment.appendChild(square);
  }
  container.appendChild(fragment);

  sizeLabel.textContent = `${size} × ${size}`;
}

container.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("square")) paintSquare(e.target);
});

resizeBtn.addEventListener("click", () => {
  const input = prompt(`Squares per side (1–${MAX_SIZE}):`, DEFAULT_SIZE);
  if (input === null) return;

  const size = Number.parseInt(input, 10);
  if (Number.isNaN(size) || size < 1 || size > MAX_SIZE) {
    alert(`Enter a whole number between 1 and ${MAX_SIZE}.`);
    return;
  }

  createGrid(size);
});

createGrid(DEFAULT_SIZE);