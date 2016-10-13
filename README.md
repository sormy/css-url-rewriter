# CSS URL Rewrite Tools #

## Features ##

- Designed to be used as dependency for other libraries
- Rewrite CSS URLs to root path
- Rewrite CSS URLs with custom URL resolver
- Track all processed URLs
- Copy CSS related local assets
- Covered by unit tests

## TODO ##

- Add source maps support via `source-map` npm package

## Usage ##

### Standard Rewrite ###

```javascript
var rewriter = new CssUrlRewriter({ root: path.resolve('.') });
var fixedContent = rewriter.rewrite(filename, originalContent);
```

### Custom Resolver ###

- `function resolver(url, filename, option) { ... }`
- absolute and data urls are not resolved by default
- return `false` to skip rewrite
- return `undefined` or null to use default resolver
- return `string` with resolved url to use it

```javascript
var rewriter = new CssUrlRewriter({
  root: SystemJS.baseURL,
  resolver: function (url, filename, options) {
    // resolve jspm: paths here and use default for all others
    if (url.match(/^jspm:/)) {
      return SystemJS.normalizeSync(url.substr(5));
    }
  }
});
var fixedContent = rewriter.rewrite(filename, originalContent);
```

### Asset Copier ###

```javascript
const rewriter = new CssUrlRewriter();
const assetCopier = new CssAssetCopier('dist');

rewriter.rewrite(filename, content);

assetCopier.copyAssets(rewriter.getLocalAssetList())
  .then(() => {
    console.log('Done!');
  });
```
