var path = require('path');
var _ = require('lodash-node/modern');

module.exports = function() {

  var Page = this.Page;
  var pages = Page.all();

  var Template = this.Template;

  function replaceDefaultLayoutWithBlank(template) {
    if (template.layout) {
      template.layout = template.layout.clone();

      if (path.basename(template.layout.filename, '.html') == 'default') {
        delete template.layout;
        return;
      }
      replaceDefaultLayoutWithBlank(template.layout);
    }
  }

  this.events.on('beforeRender', function() {

    /*
    pages.forEach(function(p) {

      var template = p.template.clone();
      replaceDefaultLayoutWithBlank(template);

      // Remove the default layout from the template layout chain
      // so create a partial

      var page = new Page(template, p.config);
      var filename = page.permalink.toString();

      filename = !path.extname(filename)
        ? filename + '_index.html'
        : path.dirname(filename) + '_' + path.basename(filename);

      page.permalink = filename;

    });
    */

    pages.forEach(function(p) {

      // Instead of cloning the template, just clone the page
      // which should recursively clone the post, template, and layout
      // heirarchy, etc.
      var page = p.clone();
      replaceDefaultLayoutWithBlank(page.template);

      var filename = page.permalink.toString();

      filename = !path.extname(filename)
        ? filename + '_index.html'
        : path.dirname(filename) + '_' + path.basename(filename);

      page.permalink = new Permalink(filename);

    });


  });

};
