require([
    "../js/jquery.js",
    "../js/displace.js",
    "../js/render.js"
], function (jquery, displace, render) {

    var tetrisData = window.tetrisData = [];

    render.initialize("container", tetrisData);
    console.log(tetrisData);

});