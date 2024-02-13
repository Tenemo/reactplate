import path from 'path';

module.exports = {
    process: (_src: string, filename: string) =>
        `module.exports = ${JSON.stringify(path.basename(filename))}`,
};
