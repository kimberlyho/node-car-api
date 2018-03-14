const {CARADISIAC} = require('./constants');
const cheerio = require('cheerio');
const get = require('./get');

const parse = async body => {
  const $ = cheerio.load(body);
  const section = $('a[name="ChronoModeles2"]').parent();

  return section.find('.txtModeleGalerie a').map((i, element) => {
    return {
      'name': $(element).attr('title'),
      'url': `${CARADISIAC}/${$(element).attr('href')}`
    };
  }).get();
};

/**
 * Get only today models records
 * @param  {Object} brand
 * @param  {Object} configuration
 * @return {Array}
 */
module.exports = async (brand, configuration) => {
  try {
    const text = await get(brand.url, configuration);

    if (text) {
      return parse(text);
    }

    return Promise.reject('NOT_AVAILABLE');
  } catch (e) {
    return Promise.reject(e);
  }
};
