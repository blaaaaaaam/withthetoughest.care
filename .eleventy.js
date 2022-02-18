const path = require('path')
const prettier = require('prettier')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('CNAME')
  eleventyConfig.setTemplateFormats([
    'md',
    'njk'
  ])

  eleventyConfig.addTransform('prettier', function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
      case '.html':
        const parser = extname.replace(/^./, "");
        return prettier.format(content, { parser });
      default:
        return content;
    }
  })

  md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
  });
    eleventyConfig.addFilter('markdownify', (markdownString) =>
    md.render(markdownString)
  );

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    dir: {
      input: 'src',
      includes: '_layouts',
      data: '_data',
      output: 'docs'
    }
  }
}
