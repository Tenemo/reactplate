import path from 'path';

module.exports = {
    process: (src, filename) =>
        `module.exports = ${JSON.stringify(path.basename(filename))}`,
};
