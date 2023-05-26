<h3>Vite Plugin: Readable CSS Module Classes</h3>

<a href="https://github.com/arusak/vite-plugin-readable-css-modules/actions/workflows/ci.yml">
    <img alt="CI Status" src="https://github.com/arusak/vite-plugin-readable-css-modules/actions/workflows/ci.yml/badge.svg"/>
</a>
<a href="https://www.npmjs.com/package/vite-plugin-readable-css-modules">
    <img alt="Install count" src="https://img.shields.io/npm/dm/vite-plugin-readable-css-modules.svg">
</a>
<img alt="Current version" src="https://img.shields.io/github/tag/arusak/vite-plugin-readable-css-modules.svg?color=3498DB&label=version">

### Setup

This plugin requires [vite](https://vitejs.dev/) of v3 or greater.
It only makes sense to use if you're using [css modules](https://vitejs.dev/config/shared-options.html#css-modules).
Works in development mode only.

```sh
$ npm install --save-dev vite-plugin-readable-css-modules
```

In your [`vite.config.ts`](https://vitejs.dev/config/#configuring-vite) simply add the plugin:

```ts
import { readableCssClasses } from 'vite-plugin-readable-css-modules';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    readableCssClasses()
  ]
})
```

And that's it. When running `vite build` your generated CSS should be significantly smaller.

### How does it work?

By default, when using css modules, you end up with hashes in your css files:

```css
._card_pzatx_32 {
  /* ...css */
}
```

By using this module, you get more meaningful class names

```css
.Card_wrapper_001 {
  /* ...css */
}
```
