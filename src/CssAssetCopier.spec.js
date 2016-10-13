import chai from 'chai';
import fse from 'fs-extra';

import CssUrlRewriter from './CssUrlRewriter';
import CssAssetCopier from './CssAssetCopier';

const expect = chai.expect;

describe('CssAssetCopier', () => {
  after(() => {
    fse.removeSync('.tmp-src');
    fse.removeSync('.tmp-dest');
  });

  it('copy assets', () => {
    const filename = '.tmp-src/test-package/test.css';
    const content = '.test { background: url(image.png) }';

    fse.outputFileSync('.tmp-src/test-package/image.png', 'test');

    const rewriter = new CssUrlRewriter();
    const assetCopier = new CssAssetCopier('.tmp-dest');

    rewriter.rewrite(filename, content);

    return assetCopier.copyAssets(rewriter.getLocalAssetList())
      .then(() => {
        const assetCopyExists = fse.existsSync('.tmp-dest/.tmp-src/test-package/image.png');
        expect(assetCopyExists).to.be.true; // eslint-disable-line no-unused-expressions
      });
  });
});
