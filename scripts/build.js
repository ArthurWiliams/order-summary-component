const DEL = require("del");

const BUILD_CSS = require("./build-css");
const BUILD_HTML = require("./build-html");
const {
    BUILD_DIRECTORY,
    SASS_ENTRY,
    HTML_ENTRY,
    OUTPUT_CSS,
    OUTPUT_HTML,
} = require("./paths.js");

DEL.sync(BUILD_DIRECTORY + "/*");

(async function () {
    await BUILD_HTML(HTML_ENTRY, OUTPUT_HTML);
    await BUILD_CSS(SASS_ENTRY, OUTPUT_CSS);
})();
