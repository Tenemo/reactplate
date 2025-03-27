export default {
    plugins: {
        'postcss-flexbugs-fixes': {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production'
            ? {
                  cssnano: {
                      preset: 'default',
                  },
              }
            : {}),
    },
};
