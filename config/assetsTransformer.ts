// false positive, possibly related to https://github.com/import-js/eslint-plugin-import/issues/2297

import path from 'path';

module.exports = {
    process: (_src: string, filename: string) =>
        `module.exports = ${JSON.stringify(path.basename(filename))}`,
};
