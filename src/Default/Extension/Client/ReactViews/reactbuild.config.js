// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getReactViewBuild } = require("@microsoft/azureportal-reactview-tools/webpack.config");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const builder = getReactViewBuild();
builder.enableLazyLoadedBundleCache();
builder.enableDataFetcher();
builder.setDevServerConfigPath("../../devServerConfig.json");
builder.addPlugin(new NodePolyfillPlugin(), NodePolyfillPlugin);
