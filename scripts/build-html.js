const { readFile, writeFile } = require("fs").promises;

const HTML_MINIFIER = require("html-minifier-terser");

const CREATE_DIRECTORIES = require("./create-directories");
const { HTML_ENTRY, OUTPUT_HTML, BUILD_DIRECTORY } = require("./paths");

async function buildHtml(source, dest) {
    CREATE_DIRECTORIES(BUILD_DIRECTORY);

    const HTML = await (await readFile(source)).toString();

    const RESULT = await HTML_MINIFIER.minify(HTML, {
        collapseWhitespace: true,
        removeComments: true,
    });

    await writeFile(dest, RESULT);
}

if (require.main === module) {
    buildHtml(HTML_ENTRY, OUTPUT_HTML).catch((error) => console.log(error));
}

module.exports = buildHtml;
