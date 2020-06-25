/**
 * Parse URL from NAME.html?key1=value1&key2=value2... into {key1: value1, ...}
 * @param {string} url The URL to be parsed. 
 * @returns {Object.<string, string>} Dictionary of the parsed URL parameters. 
 */
function parseUrl(url) {
  paramsUrl = url.substring(url.indexOf("?") + 1);
  paramPairs = paramsUrl.split("&");
  
  var params = {};
  for (pair of paramPairs) {
    splitIndex = pair.indexOf("=");
    
    key = pair.substring(0, splitIndex);
    value = pair.substring(splitIndex+1);

    params[key] = value;
  }

  return params;
}