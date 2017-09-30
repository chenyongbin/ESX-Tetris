import "babel-polyfill";
import grid from "./grid";
import action from "./action";
import announce from "./announcement";
import engine from "./engine";


// combine action with engine
action.addTransitionDownHandler(engine.transition_down);
action.addTransitionLeftHandler(engine.transition_left);
action.addTransitionRightHandler(engine.transition_right);
action.addTransitionRotateHandler(engine.transition_rotate);
action.addTransitionSpaceHandler(engine.transition_space);
action.addActionStartHandler(engine.start);
action.addActionPauseHandler(engine.pause);
action.addActionStopHandler(engine.stop);

// combine announcement with engine
engine.addScoreChangedHandler(announce.scoreChangedHandler);
engine.addBlockChangedHandler(announce.blockChangedHandler);

// combine grid with engine
engine.addUpdateBlockStateFunc(grid.updateBlockState);
engine.addRefreshViewFunc(grid.refresh);
engine.addClearViewFunc(grid.clear);
engine.addViewConfig(grid.gridBoundary.x2, grid.gridBoundary.y2);

// Start the engine
engine.start();