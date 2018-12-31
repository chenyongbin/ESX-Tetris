import Block from "./block";

const initialize = function(containerDOM, offsetX, offsetY, width, height) {};

const updateScore = function(score) {};

const updateEliminatedRowNum = function(rowNum) {};

const updateNextBlock = function() {};

const updateSystemState = function({
  currentTime = "",
  runningState = "",
  isTurnOnVoice = false
}) {};

export default {
  initialize,
  updateScore,
  updateEliminatedRowNum,
  updateNextBlock,
  updateSystemState
};
