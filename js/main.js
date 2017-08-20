require([
    "../js/var/tetris.js",
    "../js/engine.js",
    "../js/lib/jquery.js"
], function (tetris) {

    tetris.container = $("#container");

    // Initialize all components
    tetris.inits.forEach(function (init) {
        init && init();
    });

    // Start the engine
    tetris.engine.start();
});