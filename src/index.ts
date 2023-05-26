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
              const file = filename.match(componentNameRegExp);

              return `${file}_${name}_${String(line).padStart(3, '0')}`;
            },
        }
      };
      return ({
        css: cssOptions,
      });
    },
  });
};
