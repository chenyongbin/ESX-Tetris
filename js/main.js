require([
    "../js/var/tetris.js",
    "../js/engine.js",
    "../js/action.js",
    "../js/announcement.js",
    "../js/var/actionEnumeration.js",
    "../js/lib/jquery.js"
], function (tetris, engine, action, announce, actionEnum) {

    // Register events
    action.addActionHandler(actionEnum.TRANSFORM_DOWN, engine.transform.down);
    action.addActionHandler(actionEnum.TRANSFORM_LEFT, engine.transform.left);
    action.addActionHandler(actionEnum.TRANSFORM_RIGHT, engine.transform.right);
    action.addActionHandler(actionEnum.TRANSFORM_ROTATE, engine.transform.rotate);

    engine.addScoreChangeHandler(announce.handleScoreChange);
    engine.addBlockChangeHandler(announce.handleBlockChange);

    // Start the engine
    engine.start();
});