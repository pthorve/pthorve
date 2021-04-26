const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(resourcePath, needsSlash) {
  const hasSlash = resourcePath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return resourcePath.substr(resourcePath, resourcePath.length - 1);
  }
  if (!hasSlash && needsSlash) {
    return `${resourcePath}/`;
  }
  return resourcePath;
}

const getPublicUrl = appPackageJson =>
  require(appPackageJson).homepage || envPublicUrl;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
// #Note: for local node instance remove homepage from package.json

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = publicUrl || '/' || envPublicUrl;
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appClientBuild: resolveApp('build/client'),
  appServerBuild: resolveApp('build/server'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/browser/index.js'),
  appServerIndexJs: resolveApp('src/server/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src/browser'),
  appServerSrc: resolveApp('src/server'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json'))
};
