const path = require('path')
const prettier = require('prettier')

const Image = require("@11ty/eleventy-img")

let options = {
  widths: [300, 600, 900, 1200, 2000],
  formats: ['webp', 'jpeg'],
  urlPath: "/assets/img/",
  outputDir: "./docs/assets/img",
}

async function imageShortcode(src, alt, sizes = "100vw") {
  if(alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, options);
  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<figure><picture>
  ${Object.values(metadata).map(imageFormat => {
    return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
  }).join("\n")}
    <img
      src="${lowsrc.url}"
      width="${highsrc.width}"
      height="${highsrc.height}"
      alt="${alt}"
      loading="lazy"
      decoding="async">
  </picture></figure>`;
}

async function coverShortcode(src, src2, alt, classname, sizes = "100vw") {
  if(alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, options);
  let metadata2 = await Image(src2, options);

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture class="${classname}">
  ${Object.values(metadata).map(imageFormat => {
    return `  <source type="${imageFormat[0].sourceType}" media="(orientation:landscape)" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
  }).join("\n")}
  ${Object.values(metadata2).map(imageFormat => {
    return `  <source type="${imageFormat[0].sourceType}" media="(orientation:portrait)" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
  }).join("\n")}
    <img
      src="${lowsrc.url}"
      width="${highsrc.width}"
      height="${highsrc.height}"
      alt="${alt}"
      loading="lazy"
      decoding="async">
  </picture>`;
}

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

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("cover", coverShortcode);

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
