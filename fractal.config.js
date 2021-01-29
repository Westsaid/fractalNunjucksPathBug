/* eslint-env node */
const path = require('path');

const fractal = (module.exports = require('@frctl/fractal').create());
const pkg = require(path.join(__dirname, 'package.json'));

/*-------------------------------------------------------*\
  Feel free to adapt Fractal config below to your needs
\*-------------------------------------------------------*/

/**
 * Metadata
 */
fractal.set('project.title', 'Path fail');
// Provide the package.json "version" to the templates
fractal.set('project.version', pkg.version);

/**
 * Files location
 */
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.web.set('static.path', path.join(__dirname, 'public'));

/**
 * Build options
 */
// If you change the build destination, you should adapt webpack.common.js "output.path" too.
fractal.web.set('builder.dest', 'build');

/**
 * Templating
 */
// Use Nunjucks as the template engine
const nunjucks = require('@frctl/nunjucks')({
  globals: {
    env: process.env.NODE_ENV || "production",
  },
});

fractal.components.engine(nunjucks);
fractal.docs.engine('@frctl/nunjucks');
// Look for templates with a ".nunj" extension
fractal.components.set('ext', '.nunj');

/**
 * Customs statuses
 */
fractal.components.set('statuses', {
  prototype: {
    label: 'Prototype',
    description: 'Do not implement in production.',
    color: '#D34361',
  },
  wip: {
    label: 'WIP',
    description: 'Work in progress. Implement with caution.',
    color: '#EFA00F',
  },
  ready: {
    label: 'Ready',
    description: 'Ready to implement.',
    color: '#A4C339',
  },
});

/*----------------------------------------*\
  Change the following at your own risk
\*----------------------------------------*/

/**
 * Server configuration
 */
fractal.web.set('server.port', 4000);
fractal.web.set('server.sync', true);
fractal.web.set('debug', true);

/**
 * Prevent Bluebird warnings like "a promise was created in a handler but was not returned from it"
 * caused by Nunjucks from polluting the console
 */
const bluebird = require('bluebird');
bluebird.config({
  warnings: false,
});
