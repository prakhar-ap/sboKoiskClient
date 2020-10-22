const withImages = require('next-images');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');
const nextSourceMaps = require('@zeit/next-source-maps');
const path = require('path');

const appConfig = require('./config');

// Next.js settings
let nextConfig = {
    distDir: 'dist',
    generateEtags: false,
    poweredByHeader: false,
    ...appConfig,
};

// Plugin settings
nextConfig = {
    ...nextConfig,
    babelConfigFile: path.resolve('./babel.config.js'),
    webpack: (config, { isServer }) => {
        const originalEntry = config.entry;

        // Add CSS compression for prod only
        if (config.mode === 'production') {
            if (Array.isArray(config.optimization.minimizer)) {
                const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

                config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
            }
        }
        config.node = {
            // token client tpp requires fs(unsecuredFileCrypto uses it),
            // this is to bypass that requirement
            fs: 'empty',
        };

        config.entry = async () => {
            const entries = await originalEntry();

            if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
                entries['main.js'].unshift('./polyfills.js');
            }

            return entries;
        };

        if (!isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
        }

        return config;
    },
};

// Add support to load images
nextConfig = withImages(nextConfig);
// Add support for loading a javascript based babel file
nextConfig = withCustomBabelConfigFile(nextConfig);
// Add support for SourceMaps
nextConfig = nextSourceMaps(nextConfig);

module.exports = nextConfig;
