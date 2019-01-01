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

import GamePanel from "./gamepanel";
import Screen from "./screen";
import Control from "./control";

GamePanel.initialize(containerDOM);
Screen.initialize(containerDOM, GamePanel.getScreenOptions());
Control.initialize(containerDOM, GamePanel.getControlOptions());

Control.addDropButtonEventHandler(function() {
  console.log("处理【掉落】事件");
});
Control.addLeftButtonEventHandler(function() {
  console.log("处理【左移】事件");
});
Control.addRightButtonEventHandler(function() {
  console.log("处理【右移】事件");
});
Control.addDownButtonEventHandler(function() {
  console.log("处理【下移】事件");
});
Control.addRotateButtonEventHandler(function() {
  console.log("处理【旋转】事件");
});
Control.addRestartButtonEventHandler(function() {
  console.log("处理【重新开始】事件");
});
Control.addPauseButtonEventHandler(function() {
  console.log("处理【暂停】事件");
});