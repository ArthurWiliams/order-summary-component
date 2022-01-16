const buildCss = require("./build-css");
const buildHtml = require("./build-html");
const SERVER = require("browser-sync").create();

const {
    SASS_DIRECTORY,
    SASS_ENTRY,
    OUTPUT_CSS,
    HTML_ENTRY,
    OUTPUT_HTML,
    BUILD_DIRECTORY,
} = require("./paths");

SERVER.watch(
    SASS_DIRECTORY,
    { awaitWriteFinish: true },
    async function (event, file) {
        if (event === "change") {
            await buildCss(SASS_ENTRY, OUTPUT_CSS);
        }
    }
);

SERVER.watch(
    HTML_ENTRY,
    { awaitWriteFinish: true },
    async function (event, file) {
        if (event === "change") {
            await buildHtml(HTML_ENTRY, OUTPUT_HTML);
        }
    }
);

SERVER.init({
    server: {
        baseDir: BUILD_DIRECTORY,
    },
    watch: true,
});
