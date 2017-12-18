const fs = require('fs');
const path = require('path');
const concat = require('concat');
const Prism = require('prismjs');
const dirResolve = require('dir-resolve');
const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');
const prismMainFile = require.resolve('prismjs');
const prismComponentPath = dirResolve('prismjs/components/');
const prismPluginsPath = dirResolve('prismjs/plugins/');
const prismThemesPath = dirResolve('prismjs/themes/');
const prismExtraThemesPath = dirResolve('prism-themes/themes/');
const standardThemes = fs.readdirSync(prismThemesPath)
  .map(themeFileName => toThemeMap(prismThemesPath, themeFileName));
const extraThemes = fs.readdirSync(prismExtraThemesPath)
  .map(themeFileName => toThemeMap(prismExtraThemesPath, themeFileName));
const themes = standardThemes.concat(extraThemes).filter(Boolean);
themes.push({
  name: 'default',
  filename: 'prism.css',
  path: path.join(prismThemesPath, 'prism.css')
});

// user-config

/**
 * If you want to add another language, 
 * add the language name to prismDefalutComponents.
 * @see http://prismjs.com/#languages-list
 */
var prismDefalutComponents = [
  'core', 'markup', 'css', 'clike', 'javascript'
];
/**
 * If you want to add another plugin, 
 * add the plugin name to prismPlugins.
 * @see http://prismjs.com/#plugins
 */
var prismPlugins = [
  'line-highlight', 'line-numbers', 'keep-markup'
];
/**
 * If you want to use another theme, change theme name
 * @see http://prismjs.com/ (basic themes)
 * @see https://github.com/PrismJS/prism-themes (extra themes)
 */
const prismThemeName = 'xonokai';


/* ============================================================ */


fs.existsSync('plugin/prismjs') || fs.mkdirSync('plugin/prismjs');

// remove pre-exists files
if( fs.existsSync('plugin/prismjs/prism.js') ){
  fs.unlink('plugin/prismjs/prism.js');
}
if( fs.existsSync('plugin/prismjs/prism.min.js') ){
  fs.unlink('plugin/prismjs/prism.min.js');
}
if( fs.existsSync('plugin/prismjs/prism.css') ){
  fs.unlink('plugin/prismjs/prism.css');
}
if( fs.existsSync('plugin/prismjs/prism.min.css') ){
  fs.unlink('plugin/prismjs/prism.min.css');
}



/**
 * Wrap theme file to unified format
 * @param {String} basePath
 * @param {String} filename
 * @return {Object}
 */
function toThemeMap(basePath, filename) {
  const matches = filename.match(/^prism-(.*).css$/);
  if (!matches)
    return;

  return {
    name: matches[1],
    filename,
    path: path.join(basePath, filename)
  };
}

var jsAsset = [];
var cssAsset = [];
var prismTheme = themes.find(theme => theme.name === prismThemeName);

if( !prismTheme ){
  throw new Error('Invalid theme ' + prismThemeName);
}

cssAsset.push(prismTheme.path);

prismDefalutComponents.map( (component) => {
  jsAsset.push(path.join(prismComponentPath, 'prism-' + component + '.js'));
});

prismPlugins.map( (plugin) => {
  var jsFile = path.join(prismPluginsPath + '\\' + plugin, 'prism-' + plugin + '.js');
  var cssFile = path.join(prismPluginsPath + '\\' + plugin, 'prism-' + plugin + '.css');
  if( fs.existsSync( jsFile ) ){
    jsAsset.push(jsFile);
  }
  if( fs.existsSync( cssFile ) ){
    cssAsset.push(cssFile);
  }
});

concat(jsAsset).then( (result) => {
  fs.writeFileSync(
    'plugin/prismjs/prism.js', 
    result, 
    'utf8'
  );

  fs.writeFileSync(
    'plugin/prismjs/prism.min.js', 
    UglifyJS.minify(result, {mangle: false}).code, 
    'utf8'
  );
} );

concat(cssAsset).then( (result) => {
  result = result.replace(/(font-size:)([^;]*).*/gi, '$1 inherit; ');
  fs.writeFileSync(
    'plugin/prismjs/prism.css', 
    result, 
    'utf8'
  );
  fs.writeFileSync(
    'plugin/prismjs/prism.min.css', 
    new CleanCSS({rebase: false, report: 'min', sourceMap: false})
        .minify(result).styles, 
    'utf8');
} );
