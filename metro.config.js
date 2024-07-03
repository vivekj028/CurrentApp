const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// module.exports = {
// 	transformer: {
// 		babelTransformerPath: require.resolve('@dynatrace/react-native-plugin/lib/dynatrace-transformer')
// 	},
// 	reporter: require("@dynatrace/react-native-plugin/lib/dynatrace-reporter")
// };
