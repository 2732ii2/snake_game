var a = document.querySelector("#set");
var side_bar = document.querySelector(".sidebar");
var one = document.querySelector(".one");
var two = document.querySelector(".two");
var three = document.querySelector(".three");
var submit = document.querySelector("#submit");
a.addEventListener("click", () => {
  console.log("clicked");
  if (getComputedStyle(side_bar).display == "none") {
    side_bar.style.display = "block";
  } else if (getComputedStyle(side_bar).display == "block") {
    side_bar.style.display = "none";
  }
});

var snake_body = [{ x: 10, y: 10 }];
const food = [{ x: 3, y: 15 }];
var expansion_value = 1;
var input_Direction = { x: 0, y: 0 };
var lastInputDirection = input_Direction;
var snake_time = 7;
submit.addEventListener("click", () => {
  console.log("game");
  console.log(one.value);
  if (one.value != "") {
    snake_time = one.value;
  }

  one.value = "";
});
var score = document.querySelector("#score");
score.innerText = parseInt(0);
const paint = (curr_time) => {
  setTimeout(() => {
    requestAnimationFrame(paint);
  }, 1000 - snake_time * 100);

  update();
  draw();

  // console.log(parseInt(curr_time/1000));
};

setTimeout(() => {
  window.requestAnimationFrame(paint);
}, 1000 - snake_time * 100);

const game_board = document.querySelector(".con");

const draw = () => {
  snake_draw();
  draw_food();
};
function draw_food() {
  const { x, y } = food[0];
  var food_element = document.createElement("div");
  food_element.style.gridColumnStart = x;
  food_element.style.gridRowStart = y;
  food_element.classList.add("food");
  game_board.appendChild(food_element);
}
//snake showing part in grid
function snake_draw() {
  return snake_body.forEach((segment, index) => {
    const { x, y } = segment;
    var snake_element = document.createElement("div");
    snake_element.style.gridColumnStart = x;
    snake_element.style.gridRowStart = y;
    // console.log("this is index",index);
    snake_element.style.transform = "rotate(0deg)";
    if (index == 0) {
      snake_element.classList.add("head");

      if (input_Direction.x == 1) {
        snake_element.style.transform = "rotate(-180deg)";
      } else if (input_Direction.x == -1) {
        snake_element.style.transform = "rotate(0deg)";
      } else if (input_Direction.y == 1) {
        snake_element.style.transform = "rotate(-90deg)";
      } else if (input_Direction.y == -1) {
        snake_element.style.transform = "rotate(90deg)";
      }
    } else if (index < expansion_value) {
      snake_element.classList.add("snake");
    }
    game_board.appendChild(snake_element);
  });
}

////snake moving part in grid

const update = () => {
  game_board.innerHTML = "";
  snakemove();
  snake_eat_food();
};

getDirection();
function snakemove() {
  console.log(typeof snake_body[0].x);
  // console.log(input_Direction.x,input_Direction.y);

  input_Direction = getDirection();
  for (i = snake_body.length; i >= 0; i--) {
    snake_body[i + 1] = { ...snake_body[i] };
  }

  // console.log("snake_move");
  snake_body[0].x += input_Direction.x;
  snake_body[0].y += input_Direction.y;
  if (
    snake_body[0].x < 0 ||
    snake_body[0].x > 15 ||
    snake_body[0].y > 15 ||
    snake_body[0].y < 0
  ) {
    location.reload();
    alert("game over");
  }
}
var a = 0;
function getDirection() {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (lastInputDirection.y == 1) {
          break;
        }
        a = 0;
        input_Direction = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (lastInputDirection.y == -1) break;
        a = 1;
        input_Direction = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (lastInputDirection.x == 1) break;
        input_Direction = { x: -1, y: 0 };
        a = 2;
        break;
      case "ArrowRight":
        if (lastInputDirection.x == -1) break;
        a = 3;
        input_Direction = { x: 1, y: 0 };
        break;
    }
  });
  lastInputDirection = input_Direction;
  return input_Direction;
}

function snake_eat_food() {
  var random_ = Math.floor(Math.random() * 15);
  while (random_ > 15) {
    random_ = Math.floor(Math.random() * 15);
  }
  if (isEat()) {
    console.log("eated");
    food[0].x = random_;
    food[0].y = random_;
    score.innerText = 10 + parseInt(score.innerText);
    expansion_value += 2;
  }
}

function isEat() {
  if (snake_body[0].x == food[0].x && snake_body[0].y == food[0].y) {
    return true;
  } else {
    return false;
  }
}
