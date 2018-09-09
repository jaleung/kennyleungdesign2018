
/* Script to generate a sitemap.xml */


var axios = require('axios');
var builder = require('xmlbuilder');
var fs = require('fs');

const baseApiUrl = 'https://api.kennyleung.design/portfolios?_format=json';
const baseUrl = 'https://kennyleung.design/';
const portfoItemUrl = baseUrl + 'portfolio/';
const portfoUrl = url => url.toLowerCase().replace(/ /g, "-"); 
const lastMod  = new Date().toISOString();
console.log(lastMod);

const addUrl = (item, url , modDate = lastMod ,freq = 'monthly', priority = 1) => {
  return item.ele('url')
  .ele('loc', url).up()
  .ele('lastmod', modDate).up()
  .ele('changefreq', freq).up()
  .ele('priority', priority).up();
}

var request = axios.get(baseApiUrl).then(function (results) {
  console.log('Getting sitemap data...')
  var portfolios = results.data;

  var xml = builder.create('urlset')
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

  var addBase = addUrl(xml, baseUrl);

  portfolios.forEach(item => {
    var itemUrl = portfoItemUrl + portfoUrl(item.title);
    addUrl(xml, itemUrl);
  });

  var finalXml = xml.end({pretty: true});

  fs.writeFile('build/sitemap.xml', finalXml, (err) => {
    if (err) throw err;
    else console.log('finished writing to sitemap.xml');
  });
});