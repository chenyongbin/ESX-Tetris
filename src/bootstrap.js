import "babel-polyfill";
import { gridConfig } from "./var/constants";
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
engine.addUpdateCoordinatesFunc(grid.updateCoordinates);
engine.addRefreshViewFunc(grid.refresh);
engine.addClearViewFunc(grid.clear);
engine.addViewConfig(gridConfig.colCount, gridConfig.rowCount);

// Start the engine
engine.start();