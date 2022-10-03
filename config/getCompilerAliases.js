"use strict";

const fs = require("fs");
const path = require("path");
const paths = require("./paths");
const resolve = require("resolve");

// NOTE: 참고 https://velog.io/@ricale/CRA-webpack-%EB%B6%84%EC%84%9D-1-resolve.alias-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
function getCompilerAliases() {
  const { baseUrl, paths: tsPaths } = getCompilerOptions();

  // baseUrl 값이 없으면 tsconfig.json 의 paths 가 제대로 적용되지 않는다.
  // 따라서 해당 값으로 aliases 를 설정할 필요도 없다.
  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  //  앱의 루트 디렉토리와 baseUrl 이 동일한 디렉토리가 아니라면
  // alias를 설정하지 않는다.
  //  이는 `config/modules.js` 에서도 사용하는 예외처리인데,
  // convention over configuration 을 따르면서
  // 복잡한 예외 처리를 하지 않으려는 의도 같다.
  if (path.relative(paths.appPath, baseUrlResolved) !== "") {
    return {};
  }

  // `"components": ["src/components"],` 형태를
  // `"components": path.resolve(__dirname, `../src/components`)`
  // 형태로 변환
  return Object.keys(tsPaths).reduce((cfg, key) => {
    const moduleName = key.replace("/*", "");
    const modulePath = tsPaths[key][0].replace("/*", "");
    cfg[moduleName] = path.resolve(__dirname, `../${modulePath}`);
    return cfg;
  }, {});
}

// NOTE: duplicated with `getModules` in ./modules.js
function getCompilerOptions() {
  const hasTsConfig = fs.existsSync(paths.appTsConfig);

  if (!hasTsConfig) {
    throw new Error("You don't have a tsconfig.json.");
  }

  const ts = require(resolve.sync("typescript", {
    basedir: paths.appNodeModules,
  }));
  const config =
    ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config || {};
  return config.compilerOptions || {};
}
module.exports = getCompilerAliases();
