import { Plugin, UserConfig, CSSOptions } from 'vite';
import { createHash } from 'node:crypto';

type PluginOptions = {
  componentNameMatching?: 'file' | 'path';
  pathDepth?: number;
  includeLineNumber?: boolean;
  includeHash?: boolean;
  separator?: string;
  replacement?: string;
}

const pathRegExp = /([^/]+)/g;
const fileRegExp = /\/([^/]*)\.module\.css$/;

const sanitize = (src: string, replacement: string) => {
  return src.replace(/\W/g, replacement);
};

const hashText = (text: string) => createHash('md5').update(text).digest('base64url').substring(0, 4);

const getComponentNameFromFile = (filename: string, replacement: string) => {
  const matches = filename.match(fileRegExp);
  let match = matches ? matches[1] : '';
  return sanitize(match, replacement);
};

const getComponentNameFromPath = (filename: string, depth = Infinity, replacement: string, separator: string) => {
  const pathElements = filename.match(pathRegExp);
  if (!pathElements) {
    return replacement;
  }
  pathElements.splice(-1);

  const nameElements = pathElements.splice(-depth);
  return nameElements.map(el => sanitize(el, replacement)).join(separator);
};

const calculateLineNumber = (css: string, className: string) => {
  const i = css.indexOf('.' + className);
  return css.substring(0, i).split(/[\r\n]/).length;
};

export const readableCssModules = (options: PluginOptions = {}): Plugin => {
  const {
    componentNameMatching = 'file',
    pathDepth,
    includeHash = false,
    includeLineNumber = false,
    replacement = '_',
    separator = '_'
  } = options;

  return ({
    name: 'readable-css-modules',
    apply: 'serve' as const,
    config: (): UserConfig => {
      const cssOptions: CSSOptions = {
        modules: {
          generateScopedName:
            (className, filename, cssSource) => {
              const componentName = componentNameMatching === 'file'
                ? getComponentNameFromFile(filename, replacement)
                : getComponentNameFromPath(filename, pathDepth, replacement, separator);

              return [
                componentName,
                className,
                includeLineNumber && calculateLineNumber(cssSource, className),
                includeHash && hashText(filename)
              ]
                .filter(Boolean)
                .join(separator);
            },
        }
      };
      return ({
        css: cssOptions,
      });
    },
  });
};
