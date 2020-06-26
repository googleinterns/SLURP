/**
 * Parse URL <pre><code>NAME.html?key1=value1&key2=value2...</code></pre> into {key1: value1, ...}.
 * @param {string} url The URL to be parsed. 
 * @returns {Object.<string, string>} Dictionary of the parsed URL parameters. 
 */
function parseUrl(url) {
  var paramsUrl = url.substring(url.indexOf("?") + 1);
  var paramPairs = paramsUrl.split("&");
  
  var params = {};
  for (var pair of paramPairs) {
    var splitIndex = pair.indexOf("=");
    
    var key = pair.substring(0, splitIndex);
    var value = pair.substring(splitIndex+1);

    params[key] = value;
  }

  return params;
}

/**
 * Make a random 32-digit UUID. 
 */
function getRandomUuid() {
  // https://gist.github.com/6174/6062387
  return Math.random().toString(36).substring(2, 15) 
    + Math.random().toString(36).substring(2, 15);
}

if (typeof exports !== 'undefined'){
  module.exports = {parseUrl, getRandomUuid};
}