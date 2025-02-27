/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {dirname, join, normalize, resolve} from 'path';
import {fileURLToPath} from 'url';
import glob from 'glob';
import rimraf from 'rimraf';

const excludedModules = [
  'e2e/global-setup-node-modules/node_modules/',
  'e2e/presets/cjs/node_modules/',
  'e2e/presets/js/node_modules/',
  'e2e/presets/js-type-module/node_modules/',
  'e2e/presets/json/node_modules/',
  'e2e/presets/mjs/node_modules/',
  'e2e/resolve-conditions/node_modules/',
  'e2e/retain-all-files/node_modules/',
].map(dir => normalize(dir));

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const e2eNodeModules = [
  ...glob.sync('e2e/*/node_modules/', {cwd: rootDir}),
  ...glob.sync('e2e/*/*/node_modules/', {cwd: rootDir}),
]
  .map(res => join(rootDir, res))
  .filter(dir => !excludedModules.includes(dir))
  .map(dir => resolve(rootDir, dir))
  .sort();

e2eNodeModules.forEach(dir => {
  rimraf.sync(dir, {glob: false});
});
