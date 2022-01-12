const { dirname, join } = require("path");

const ROOT = dirname(__dirname);

const BUILD_DIRECTORY = join(ROOT, "build");
const SOURCE_DIRECTORY = join(ROOT, "src");

const SASS_DIRECTORY = join(SOURCE_DIRECTORY, "sass");
const OUTPUT_CSS_DIRECTORY = join(BUILD_DIRECTORY, "css");

const SASS_ENTRY = join(SASS_DIRECTORY, "main.scss");
const OUTPUT_CSS = join(OUTPUT_CSS_DIRECTORY, "main.css");

const HTML_ENTRY = join(SOURCE_DIRECTORY, "index.html");
const OUTPUT_HTML = join(BUILD_DIRECTORY, "index.html");

module.exports = {
    BUILD_DIRECTORY,
    SOURCE_DIRECTORY,
    SASS_DIRECTORY,
    OUTPUT_CSS_DIRECTORY,
    SASS_ENTRY,
    OUTPUT_CSS,
    HTML_ENTRY,
    OUTPUT_HTML,
};
