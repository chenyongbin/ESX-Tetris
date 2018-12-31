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