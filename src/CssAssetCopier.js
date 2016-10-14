import 'core-js';

import path from 'path';
import fse from 'fs-extra';

export default class CssAssetCopier {
  /**
   * Constructor.
   *
   * @param {String} target
   */
  constructor(target) {
    this.target = target || '.';
    this.copyPromises = {};
  }

  /**
   * Copy local assets from URLs for distribution.
   *
   * @param   {Array[{ fromPath, toPath }]} tasks
   *
   * @returns {Promise} which will be resolved once all files will be copied
   */
  copyAssets(tasks) {
    const promises = tasks.map(({ fromPath, toPath }) => {
      const targetPath = path.join(this.target, toPath);

      if (path.resolve(fromPath) !== path.resolve(targetPath)) {
        return this.copyAsset(fromPath, targetPath);
      }

      return undefined;
    });

    return Promise.all(promises);
  }

  copyAsset(fromPath, toPath) {
    if (this.copyPromises[toPath]) {
      return this.copyPromises[toPath];
    }

    const promise = new Promise((resolve, reject) => {
      fse.copy(fromPath, toPath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    this.copyPromises[toPath] = promise;

    return promise;
  }
}
