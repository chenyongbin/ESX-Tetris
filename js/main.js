require([
    "../js/var/tetris.js",
    "../js/engine.js",
    "../js/action.js",
    "../js/announcement.js",
    "../js/var/actionEnumeration.js",
    "../js/common.js",
    "../js/lib/jquery.js"
], function (tetris, engine, action, announce, actionEnum, comm) {

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
});