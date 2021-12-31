// false positive, possibly related to https://github.com/import-js/eslint-plugin-import/issues/2297
// eslint-disable-next-line import/no-import-module-exports
import path from 'path';

module.exports = {
    process: (_src: string, filename: string) =>
        `module.exports = ${JSON.stringify(path.basename(filename))}`,
};
