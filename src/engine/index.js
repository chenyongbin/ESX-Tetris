import DB from "./db";
import TIMER from "./timer";
import BUILDER from "./builder";

const INTERVAL = 500,
  CHARACTERS = [],
  SCREEN = {
    matrixSizeX: 0,
    matrixSizeY: 0,
    activate: function() {},
    inactivate: function() {},
    highlight: function() {},
    unhighlight: function() {},
    updateScore: function() {},
    updateEliminatedRowNum: function() {},
    updateNextCharacter: function() {}
  };

let elapsingObject = {
  character: null,
  totalScore: 0,
  isHighlightAnimating: false,
  clear: function() {
    elapsingObject.character = null;
    elapsingObject.totalScore = 0;
    elapsingObject.isHighlightAnimating = false;
  }
};

const initialize = screenOptions => {
  SCREEN.matrixSizeX = screenOptions.matrixSizeX;
  SCREEN.matrixSizeY = screenOptions.matrixSizeY;
  SCREEN.activate = screenOptions.activate;
  SCREEN.inactivate = screenOptions.inactivate;
  SCREEN.highlight = screenOptions.highlight;
  SCREEN.unhighlight = screenOptions.unhighlight;
  SCREEN.updateScore = screenOptions.updateScore;
  SCREEN.updateEliminatedRowNum = screenOptions.updateEliminatedRowNum;
  SCREEN.updateNextCharacter = screenOptions.updateNextCharacter;

  DB.initialize(SCREEN.matrixSizeX, SCREEN.matrixSizeY);
  TIMER.initialize(INTERVAL, onTimerElapsed);
};

const onTimerElapsed = () => {
  if (elapsingObject.isHighlightAnimating) return;

  while (CHARACTERS.length < 2) {
    CHARACTERS.push(BUILDER.getCharacter(SCREEN.matrixSizeX));
  }

  if (!elapsingObject.character) {
    elapsingObject.character = CHARACTERS.pop();
    SCREEN.updateNextCharacter(CHARACTERS[0].getRawCoordinates());
  }

  elapsingObject.character.down();

  return onCharacterMoved(elapsingObject);
};

const onCharacterMoved = elapsingObject => {
  if (!elapsingObject.character) return;

  DB.update(
    elapsingObject.character.prevCoordinates,
    elapsingObject.character.coordinates
  );
  SCREEN.inactivate(elapsingObject.character.prevCoordinates);
  SCREEN.activate(elapsingObject.character.coordinates);

  if (DB.checkWhetherHasReachedBottom(elapsingObject.character.coordinates)) {
    onRowsFilled(DB.getFilledYCoordinates());
    elapsingObject.character = null;
  }
};

const onRowsFilled = yCoordinates => {
  if (!yCoordinates || yCoordinates.length == 0) {
    if (DB.isAllFilled()) {
      console.error("you lose.");
      stop();
    }
    return;
  }

  elapsingObject.totalScore += getScore(yCoordinates);
  SCREEN.updateScore(elapsingObject.totalScore);
  SCREEN.updateEliminatedRowNum(yCoordinates.length);

  elapsingObject.isHighlightAnimating = true;
  highlightAnimation(yCoordinates, 5, () => {
    DB.reset(yCoordinates, (inactives, actives) => {
      SCREEN.inactivate(inactives);
      SCREEN.activate(actives);
    });
    elapsingObject.isHighlightAnimating = false;
    onRowsFilled(DB.getFilledYCoordinates());
  });
};

const getScore = yCoordinates => {
  if (!yCoordinates || yCoordinates.length == 0) return 0;

  let newYCoordinates = [...yCoordinates];
  newYCoordinates.sort((a, b) => b - a);
  let score = 0,
    lastY = newYCoordinates.pop(),
    curY = newYCoordinates.pop(),
    n = 1;
  while (curY) {
    if (curY - lastY == 1) {
      n++;
    } else {
      score += fibonacciScore(n);
      n = 1;
      lastY = curY;
    }
    curY = newYCoordinates.pop();
  }
  return score + fibonacciScore(n);
};

const fibonacciScore = n => {
  if (n == 1) return 10;
  else if (n == 2) return 20;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const highlightAnimation = (yCoordinates, count, callback, timer) => {
  if (count % 2 == 0) {
    SCREEN.unhighlight(yCoordinates);
  } else {
    SCREEN.highlight(yCoordinates);
  }

  count--;
  timer && clearTimeout(timer);
  if (count >= 0) {
    timer = setTimeout(() => {
      return highlightAnimation(yCoordinates, count, callback, timer);
    }, 200);
  } else {
    callback && callback();
  }
};

const start = () => {
  TIMER.start();
};

const stop = () => {
  TIMER.stop();
  elapsingObject.clear();
};

const onMoveLeft = () => {
  if (
    elapsingObject.character &&
    DB.checkWhetherHasReachedLeft(elapsingObject.character.coordinates)
  )
    return;
  if (elapsingObject.character) {
    elapsingObject.character.left();
    return onCharacterMoved(elapsingObject);
  }
};

const onMoveRight = () => {
  if (
    elapsingObject.character &&
    DB.checkWhetherHasReachedRight(elapsingObject.character.coordinates)
  )
    return;
  if (elapsingObject.character) {
    elapsingObject.character.right();
    return onCharacterMoved(elapsingObject);
  }
};

const onMoveDown = () => {
  if (
    elapsingObject.character &&
    DB.checkWhetherHasReachedBottom(elapsingObject.character.coordinates)
  )
    return;
  if (elapsingObject.character) {
    elapsingObject.character.down();
    return onCharacterMoved(elapsingObject);
  }
};

const onMoveDrop = () => {
  while (elapsingObject.character) {
    elapsingObject.character.down();
    onCharacterMoved(elapsingObject);
  }
};

const onMoveRotate = () => {
  if (
    elapsingObject.character &&
    DB.checkWhetherHasReachedBottom(elapsingObject.character.coordinates)
  )
    return;
  if (elapsingObject.character) {
    elapsingObject.character.rotate();
    return onCharacterMoved(elapsingObject);
  }
};

const onGamePause = () => {
  TIMER.pause();
};

const onGameRestart = () => {
  TIMER.resume();
};

export default {
  initialize,
  start,
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onMoveDrop,
  onMoveRotate,
  onGamePause,
  onGameRestart
};
