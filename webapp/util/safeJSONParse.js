/**
 * Parse a JSON string using try..catch.
 * @param  {String} JSONstring - The JSON string to attempt parsing.
 * @return {Object} Object with the error value if parsing failed, or the parsed
 * data if successful.
 */
function safeJSONParse(JSONstring) {
    let data;
    try {
        data = JSON.parse(JSONstring);
    } catch (error) {
        return { error };
    }
    return { data };
}

module.exports = safeJSONParse;
