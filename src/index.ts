import { Plugin, UserConfig, CSSOptions } from 'vite';

type PluginOptions = {
  componentNameRegExp?: RegExp
}

const defaultComponentNameRegExp = /\/([^/]*)\.module\.css$/

export const readableCssModules = (options:PluginOptions = {}): Plugin => {
  const {componentNameRegExp = defaultComponentNameRegExp} = options;

  return ({
    name: 'readable-css-modules',
    apply: 'serve' as const,
    config: (): UserConfig => {
      const cssOptions: CSSOptions = {
        modules: {
          generateScopedName:
            (name, filename, css) => {
              const i = css.indexOf('.' + name);
              const line = css.substring(0, i).split(/[\r\n]/).length;
              const matches = filename.match(componentNameRegExp);
              const component = matches ? matches[1] : '';

              return `${component}_${name}_${line}`;
            },
        }
      };
      return ({
        css: cssOptions,
      });
    },
  });
};
