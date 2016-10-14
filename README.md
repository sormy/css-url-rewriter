# CSS URL Rewriter #

## Features ##

- Designed to be used as dependency for other libraries (sass, less, stylus etc)
- Rewrite CSS URLs to project root path with default resolver
- Rewrite CSS URLs with custom URL resolver
- Track all processed URLs
- Could be used in combination with `asset-copier`

## TODO ##

- Add source maps support via `source-map` npm package

## Usage ##

### Installation ###

```shell
npm install css-url-rewriter-ex
```

### Default Resolver ###

```javascript
var CssUrlRewriter = require('css-url-rewriter-ex');
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
var CssUrlRewriter = require('css-url-rewriter-ex');

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
