const path = require('path');

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = {
    dotenv: resolvePath('.env'),
    appPath: resolvePath('.'),
    appBuild: resolvePath('build'),
    appIndexTs: resolvePath('src/index.ts'),
    appSrc: resolvePath('src'),
    appTsConfig: resolvePath('tsconfig.json'),
    appTemplate: resolvePath('src/index.html'),
    appNodeModules: resolvePath('node_modules'),
    appWebpackCache: resolvePath('node_modules/.cache'),
    appTsBuildInfoFile: resolvePath('node_modules/.cache/tsconfig.tsbuildinfo'),
};
