/* eslint-disable no-console */
import webpack from 'webpack';
import config from './webpack/webpack.prod.babel';
import { chalkError, chalkSuccess, chalkProcessing } from './chalkConfig';

console.log(chalkProcessing(`Generating production bundle...`));

webpack(config).run((error) => {
    if (error) {
        console.log(chalkError(error));
        return 1;
    }
    console.log(chalkSuccess(`App successfully compiled in production mode`));
    return 0;
});
