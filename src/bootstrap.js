import "babel-polyfill";
import { actionEnum } from "./var/constants";
import engine from "./engine";
import action from "./action";
import announce from "./announcement";

// Register events
action.addTransitionDownHandler(engine.transition_down);
action.addTransitionLeftHandler(engine.transition_left);
action.addTransitionRightHandler(engine.transition_right);
action.addTransitionRotateHandler(engine.transition_rotate);
action.addTransitionSpaceHandler(engine.transition_space);
action.addActionStartHandler(engine.start);
action.addActionPauseHandler(engine.pause);
action.addActionStopHandler(engine.stop);

engine.addScoreChangedHandler(announce.scoreChangedHandler);
engine.addBlockChangedHandler(announce.blockChangedHandler);

// Start the engine
engine.start();