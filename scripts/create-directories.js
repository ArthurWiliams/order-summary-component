const { mkdirSync } = require("fs");

function createDirectories(...paths) {
    for (let i = 0; i < paths.length; i++) {
        try {
            mkdirSync(paths[i], { recursive: true });
        } catch (error) {}
    }
}

module.exports = createDirectories;
