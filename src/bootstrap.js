import "babel-polyfill";
import { actionEnum } from "./var/constants";
import engine from "./engine";
import action from "./action";
import announce from "./announcement";

// Register events
action.addActionHandler(actionEnum.TRANSITION_DOWN, engine.transition.down);
action.addActionHandler(actionEnum.TRANSITION_LEFT, engine.transition.left);
action.addActionHandler(actionEnum.TRANSITION_RIGHT, engine.transition.right);
action.addActionHandler(actionEnum.TRANSITION_ROTATE, engine.transition.rotate);
action.addActionHandler(actionEnum.TRANSITION_SPACE, engine.transition.space);
action.addActionHandler(actionEnum.ACTION_START, engine.start);
action.addActionHandler(actionEnum.ACTION_PAUSE, engine.pause);
action.addActionHandler(actionEnum.ACTION_STOP, engine.stop);

engine.addScoreChangedHandler(announce.handleScoreChange);
engine.addBlockChangedHandler(announce.handleBlockChange);

// Start the engine
engine.start();