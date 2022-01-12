const { writeFile } = require("fs").promises;

const SASS_COMPILER = require("sass").compile;
const POSTCSS = require("postcss");

const { SASS_ENTRY, OUTPUT_CSS, OUTPUT_CSS_DIRECTORY } = require("./paths");
const CREATE_DIRECTORIES = require("./create-directories");

async function buildCss(source, dest) {
    const IS_DEVELOPMENT_ENV =
        process.env.NODE_ENV === "development" ? true : false;
    const PLUGINS = [require("autoprefixer")];

    if (!IS_DEVELOPMENT_ENV) {
        PLUGINS.push(require("postcss-preset-env"), require("cssnano"));
    }

    CREATE_DIRECTORIES(OUTPUT_CSS_DIRECTORY);

    const SASS_RESULT = SASS_COMPILER(source, {
        sourceMap: IS_DEVELOPMENT_ENV,
        style: IS_DEVELOPMENT_ENV ? "expanded" : "compressed",
    });

    const CSS_PROCESSOR = POSTCSS(PLUGINS);

    const POSTCSS_RESULT = await CSS_PROCESSOR.process(SASS_RESULT.css, {
        from: source,
        to: dest,
        map: IS_DEVELOPMENT_ENV
            ? {
                  annotation: true,
                  prev: SASS_RESULT.sourceMap,
              }
            : false,
    });

    await writeFile(dest, POSTCSS_RESULT.css);

    if (IS_DEVELOPMENT_ENV) {
        await writeFile(dest + ".map", POSTCSS_RESULT.map.toString());
    }
}

if (require.main === module) {
    buildCss(SASS_ENTRY, OUTPUT_CSS).catch((error) => console.log(error));
}

module.exports = buildCss;
