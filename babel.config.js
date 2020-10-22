module.exports = {
    presets: ['next/babel'],
    plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ["@babel/plugin-syntax-decorators", {legacy: true}],
        ["react-hot-loader/babel"]
    ],
};
