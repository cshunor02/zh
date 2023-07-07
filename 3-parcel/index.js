const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

// Application state
const plane = {
  x: 0,
  y: 20,
  width: 60,
  height: 30,
  vx: 0,
  img: new Image(),
};
const parcel = {
  x: 0,
  y: plane.y + plane.height,
  width: 30,
  height: 30,
  vx: 0,
  vy: 0,
  ay: 0,
  img: new Image(),
};
const house = {
  x: 400,
  y: canvas.height - 120,
  width: 100,
  height: 100,
  img: new Image(),
};
let gameState = 0; // 0-start, 1-moving, 2-dropping, 3-hit, 4-missed

// ================= Game loop =====================

// Time-based animation (from the lecture slide)
let lastFrameTime = performance.now();

function next(now = performance.now()) {
  const dt = now - lastFrameTime;
  lastFrameTime = now;

  if (gameState != 0) update(dt); // Update current state
  render(); // Rerender the frame

  requestAnimationFrame(next);
}

function setState()
{
  gameState++;
  if (gameState == 2) window.removeEventListener('click', setState, false);
}

function update(dt) {
  plane.vx += 200 * (dt / 1000);
  plane.x += plane.vx * (dt / 1000);
  if (gameState != 3) parcel.x = plane.x;

  if (gameState == 2) //drop gift
  {
    parcel.ay += 300 * (dt / 300);
    parcel.y += parcel.ay * (dt / 1000);
  }

  if (isCollision(parcel, house))
  {
    gameState = 3;
  } else if (parcel.y > canvas.height)
  {
    gameState = 4;
  }

}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.fillRect(plane.x, plane.y, plane.width, plane.height);
  //ctx.fillRect(parcel.x, parcel.y, parcel.width, parcel.height);
  //ctx.fillRect(house.x, house.y, house.width, house.height);

  ctx.drawImage(plane.img, plane.x, plane.y, plane.width, plane.height);
  if (gameState != 4) ctx.drawImage(parcel.img, parcel.x, parcel.y, parcel.width, parcel.height);
  ctx.drawImage(house.img, house.x, house.y, house.width, house.height);

  if (gameState == 3) {
    ctx.font = '60px Consolas';
    ctx.fillStyle = 'white';
    ctx.fillText('Delivered', 20, 200); 
  } else if (gameState == 4)
  {
    ctx.font = '60px Consolas';
    ctx.fillStyle = 'white';
    ctx.fillText('Missed', 20, 200); 
  }

}

// Start the loop
plane.img.src = "plane.png";
house.img.src = "house.png";
parcel.img.src = "parcel.png";
window.addEventListener('click', setState, false);
next(); 

// =============== Utility functions =================

function isCollision(box1, box2) {
  return !(
    box2.y + box2.height < box1.y ||
    box1.x + box1.width < box2.x ||
    box1.y + box1.height < box2.y ||
    box2.x + box2.width < box1.x
  );
}