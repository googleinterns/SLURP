/**
 * Parse URL <pre><code>NAME.html?key1=value1&key2=value2...</code></pre> into {key1: value1, ...}.
 * @param {string} url The URL to be parsed. 
 * @returns {Object.<string, string>} Dictionary of the parsed URL parameters. 
 */
function parseUrl(url) {
  let paramsUrl = url.substring(url.indexOf('?') + 1);
  let paramPairs = paramsUrl.split('&');
  
  let params = {};
  for (let pair of paramPairs) {
    let splitIndex = pair.indexOf('=');
    
    let key = pair.substring(0, splitIndex);
    let value = pair.substring(splitIndex+1);

    params[key] = value;
  }

  return params;
}

/**
 * Make a random 32-digit UUID. 
 * @returns {string} 32-digit UUID as string.
 */
function getRandomUuid() {
  // https://gist.github.com/6174/6062387
  return Math.random().toString(36).substring(2, 15) 
    + Math.random().toString(36).substring(2, 15);
}

if (typeof exports !== 'undefined'){
  module.exports = {parseUrl};
}
