<h3>Vite Plugin: Readable CSS Module Classes</h3>

<p>   
<a href="https://github.com/arusak/vite-plugin-readable-css-modules/actions/workflows/ci.yml">
    <img alt="CI Status" src="https://github.com/arusak/vite-plugin-readable-css-modules/actions/workflows/ci.yml/badge.svg"/>
</a>
<a href="https://www.npmjs.com/package/vite-plugin-readable-css-modules">
    <img alt="Install count" src="https://img.shields.io/npm/dm/vite-plugin-readable-css-modules.svg">
</a>
<span>
    <img alt="Current version" src="https://img.shields.io/github/tag/arusak/vite-plugin-readable-css-modules.svg?color=3498DB&label=version">
</span>
</p>

### Setup

This plugin requires [vite](https://vitejs.dev/) of v3 or greater.
It only makes sense to use if you're using [css modules](https://vitejs.dev/config/shared-options.html#css-modules).
Works in development mode only.

```sh
$ npm install --save-dev vite-plugin-readable-css-modules
```

In your [`vite.config.ts`](https://vitejs.dev/config/#configuring-vite) simply add the plugin:

```ts
import { readableCssModules } from 'vite-plugin-readable-css-modules';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    readableCssModules()
  ]
})
```

And that's it. When running `vite build` your generated CSS should be significantly smaller.

### How does it work?

In Vite, when using css modules, you don't know, from which component does a specific rendered element come from. It generates names like `._wrapper_pzatx_32`.

Because of that, the dom tree in devtools gives you no clue what are those component that are rendered.  

By using this module, you get more meaningful class names, containing the name of your component and name of the selector: `.views_Card_wrapper`
Optionally, number of line in CSS file and hash can be added: `.Card_wrapper_1_Az7P`

### Options
* componentNameMatching: `file` or `path` 
* pathDepth: how many path components to use
* includeLineNumber: `false` by default
* includeHash: `false` by default
* separator: string to separate name components, `_` by default
* replacement: string to replace non-alphanumeric chars, `_` by default

