/**
 * @file 启动模块
 * @module bootstrap
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

let containerDOM = document.getElementById("container");
if (!containerDOM) {
  throw new Error("Cannot find container.");
}

import gamePanel from "./gamepanel";
import screen from "./screen";

gamePanel.initialize(containerDOM);
screen.initialize(containerDOM, gamePanel.getScreenOptions());

// let block = [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }];
// let newBlock = [];
// block.forEach(b => {
//   newBlock.push({ x: b.x + 4, y: b.y + 7 });
// });

// screen.updateScore(12345);
// screen.updateEliminatedRowNum(34);
// screen.activate(newBlock);
// screen.updateNextBlock(block);
