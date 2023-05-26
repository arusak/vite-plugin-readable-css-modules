import { Plugin, UserConfig, CSSOptions } from 'vite';
import {basename} from 'path';

export const readableCssModules = (): Plugin => ({
    name: 'readable-css-modules',
    apply: 'serve' as const,
    config: (): UserConfig => {
        const cssOptions: CSSOptions = {
            modules: {
                generateScopedName:
                  (name, filename, css) => {
                      const i = css.indexOf('.' + name);
                      const line = css.substring(0, i).split(/[\r\n]/).length;
                      const file = basename(filename, '.module.css');

                      return `${file}_${name}_${String(line).padStart(3, '0')}`;
                  },
            }
        };
        return ({
            css: cssOptions,
        });
    },
});
