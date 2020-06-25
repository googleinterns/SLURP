/**
 * Parse URL <pre><code>NAME.html?key1=value1&key2=value2...</code></pre> into {key1: value1, ...}.
 * @param {string} url The URL to be parsed. 
 * @returns {Object.<string, string>} Dictionary of the parsed URL parameters. 
 */
export function parseUrl(url) {
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