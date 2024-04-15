let bg = "#14213d"; // 修改背景顏色

let c = ["#1f2041", "#4ec5c1", "#e5e338", "#fbc2eb", "#fed6e3", "#f5efef"];

var balls = [];
var ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 20; i++) {
      let x = i * (windowWidth / 20);
      let y = j * (windowHeight / 10);
      let rotate_num = (int(random(4)) * 360) / 4;

      ball = new ball_class({
        p: { x: x + windowWidth / 40, y: y + windowHeight / 20 },
        rotate: rotate_num
      });
      balls.push(ball);
    }
  }
}

function draw() {
  background(bg); // 設置背景色
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }
}

function mousePressed() {
  // 按下滑鼠時，隨機變換所有球的顏色
  for (let i = 0; i < balls.length; i++) {
    balls[i].changeColor();
  }
}

class ball_class {
  constructor(args) {
    this.p = args.p || { x: width / 2, y: height / 2 };
    this.rotate = args.rotate || 0;
    this.color = random(c);
  }
  draw() {
    push();
    translate(this.p.x, this.p.y);
    rotate(this.rotate);
    for (let a = 0; a < TWO_PI; a += 0.8) {
      let xoff = cos(a) + 1;
      let yoff = sin(a) + 1;
      let r = map(noise(xoff, yoff), 0, 1, windowHeight / 20 / 3, windowHeight / 20 / 2);
      let x = r * cos(a);
      let y = r * sin(a);

      let d = windowWidth / 20 / 1.5;

      noFill();
      stroke(this.color);
      strokeCap(ROUND);
      vertex(x, y);
      line(0, 0, x, y);
      endShape(CLOSE);
    }
    pop();
  }
  update() {
    // 球的移動更新這裡省略不寫，可參考程式一的移動方式
  }
  // 新增的方法：改變顏色
  changeColor() {
    this.color = random(c);
  }
}
