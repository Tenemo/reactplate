module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: 3,
            },
        ],
        [
            "@babel/preset-react",
            {
                development: process.env.NODE_ENV === "development",
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                root: ["./src/"],
            },
        ],
        "@babel/plugin-proposal-class-properties",
    ],
    ignore: ["node_modules"],
};
