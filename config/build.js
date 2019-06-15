/* eslint-disable no-console */
import webpack from 'webpack';
import config from './webpack/webpack.prod.babel';
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig';

console.log(chalkProcessing('Generating production bundle...'));

webpack(config).run((error, stats) => {
    if (error) {
        console.log(chalkError(error));
        return 1;
    }
    const jsonStats = stats.toJson();
    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(err => console.log(chalkError(err)));
    }
    if (jsonStats.hasWarnings) {
        console.log(chalkWarning('Webpack generated the following warnings: '));
        jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
    }
    console.log(`Webpack stats: ${stats}`);
    console.log();
    console.log(chalkSuccess('App successfully compiled in production mode'));
    return 0;
});
