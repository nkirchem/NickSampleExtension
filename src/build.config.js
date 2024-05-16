// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");

const builder = require("@microsoft/azureportal-build").getExtensionBuilder();

//builder.addPlugin(new NodePolyfillPlugin());
//builder.addPlugin(new MonacoEditorWebpackPlugin({ languages: ["javascript", "typescript"] }));

//const { default: FluentUIReactIconsFontSubsettingPlugin } = require("@fluentui/react-icons-font-subsetting-webpack-plugin");

//builder.addPlugin(new FluentUIReactIconsFontSubsettingPlugin());
//builder.addRule({
//    test: /\.woff2?$/,
//    type: 'asset/resource',
//});

//const webpackConfig = builder.ejectWebpackConfig();
//webpackConfig.resolve.conditionNames = ["import"];
//webpackConfig.resolve.conditionNames = ["fluentIconFont", "import"];
//webpackConfig.optimization.usedExports = true;

/*module.exports = {
    module: {
        rules: [
            // Treat the font files as webpack assets
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset',
            }
        ]
    },
    resolve: {
        // Include 'fluentIconFont' to use the font implementation of the Fluent icons
        conditionNames: ['fluentIconFont', 'import']
    },
    plugins: [
        // Include this plugin
        new FluentUIReactIconsFontSubsettingPlugin(),
    ],
};*/