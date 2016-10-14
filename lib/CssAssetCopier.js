'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CssAssetCopier = function () {
  /**
   * Constructor.
   *
   * @param {String} target
   */
  function CssAssetCopier(target) {
    _classCallCheck(this, CssAssetCopier);

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


  _createClass(CssAssetCopier, [{
    key: 'copyAssets',
    value: function copyAssets(tasks) {
      var _this = this;

      var promises = tasks.map(function (_ref) {
        var fromPath = _ref.fromPath;
        var toPath = _ref.toPath;

        var targetPath = _path2.default.join(_this.target, toPath);

        if (_path2.default.resolve(fromPath) !== _path2.default.resolve(targetPath)) {
          return _this.copyAsset(fromPath, targetPath);
        }

        return undefined;
      });

      return Promise.all(promises);
    }
  }, {
    key: 'copyAsset',
    value: function copyAsset(fromPath, toPath) {
      if (this.copyPromises[toPath]) {
        return this.copyPromises[toPath];
      }

      var promise = new Promise(function (resolve, reject) {
        _fsExtra2.default.copy(fromPath, toPath, function (error) {
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
  }]);

  return CssAssetCopier;
}();

exports.default = CssAssetCopier;
//# sourceMappingURL=CssAssetCopier.js.map