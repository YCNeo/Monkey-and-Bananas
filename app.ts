input.onButtonPressed(Button.A, function () {
  led.unplot(monPos[0], monPos[1]);
  if (monPos[0] != 0) {
    monPos[0] = monPos[0] - 1;
  }
  led.plot(monPos[0], monPos[1]);
});
function drop() {
  for (let item of queue) {
    if (item[1] <= 4) {
      led.plotBrightness(item[0], item[1], 0);
      item[1] = item[1] + 1;
      led.plotBrightness(item[0], item[1], item[2]);
    }
  }
}
function judge() {
  let scoreArr: number[] = [];
  for (let item3 of queue) {
    if (item3[0] == monPos[0] && item3[1] == monPos[1]) {
      scoreArr = item3;
      score += scoreArr[2] / 14;
    }
  }
  return scoreArr;
}
input.onButtonPressed(Button.B, function () {
  led.unplot(monPos[0], monPos[1]);
  if (monPos[0] != 4) {
    monPos[0] = monPos[0] + 1;
  }
  led.plot(monPos[0], monPos[1]);
});
function generateBananas() {
  for (let index = 0; index < randint(1, 3); index++) {
    let y = 0;
    x = randint(0, 4);
    if (randint(0, 100) <= 50) {
      bright = 70;
    } else {
      bright = 140;
    }
    if (isValid(queue, x, y)) {
      led.plotBrightness(x, y, bright);
      queue.insertAt(0, [x, y, bright]);
    }
  }
}
function isValid(arr: number[][], x: number, y: number) {
  for (let item2 of arr) {
    if (item2[0] == x && item2[1] == y) {
      return false;
    }
  }
  return true;
}
let bright = 0;
let x = 0;
let queue: number[][] = [];
let monPos: number[] = [];
let score = 0;
let second = 1;
monPos = [2, 4];
// basic.showString("START!")
led.plot(monPos[0], monPos[1]);
while (second <= 60) {
  let popBan: number[] = [];
  drop();
  if (second % 2 == 1) {
    generateBananas();
    popBan = judge();
  }
  led.plotBrightness(popBan[0], popBan[1], 0);
  led.plot(monPos[0], monPos[1]);
  console.log(`sec: ${second}, score: ${score}`);
  basic.pause(1000);
  second += 1;
}
basic.clearScreen();
basic.showString("" + `SCORE:${score}`);
basic.showString("END");
