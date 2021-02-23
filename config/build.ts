/* eslint-disable no-console */
import webpack from 'webpack';
import config from './webpack/webpack.prod.babel';
import {
    chalkError,
    chalkSuccess,
    chalkWarning,
    chalkProcessing,
} from './chalkConfig';

console.log(chalkProcessing(`Generating production bundle...`));

webpack(config).run((runError, stats) => {
    if (runError) {
        console.log(chalkError(runError));
        return 1;
    }
    const jsonStats = stats?.toJson();
    if (jsonStats) {
        if (jsonStats.hasErrors) {
            return jsonStats.errors?.map((error) =>
                console.log(chalkError(error)),
            );
        }
        if (jsonStats.hasWarnings) {
            console.log(
                chalkWarning('Webpack generated the following warnings: '),
            );
            jsonStats.warnings?.map((warning) =>
                console.log(chalkWarning(warning)),
            );
        }
    }
    console.log();
    console.log(chalkSuccess(`App successfully compiled in production mode`));
    return 0;
});
