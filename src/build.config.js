// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");

const builder = require("@microsoft/azureportal-build").getExtensionBuilder();

//builder.addPlugin(new NodePolyfillPlugin());
//builder.addPlugin(new MonacoEditorWebpackPlugin({ languages: ["javascript", "typescript"] }));
