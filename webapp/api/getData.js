import request from 'superagent';
import safeJSONParse from '../util/safeJSONParse';

/**
 * Get data from the API.
 * @param {string} route - The route to call for the API request.
 * @param {function} cb - The callback to call with the error and data.
 */
function getData(route, cb) {
    request.get(`http://localhost:8000/${route}`)
    .end((err, res) => {
        if (err) {
            return cb(err);
        }
        const { error, data } = safeJSONParse(res.text);
        if (error) {
            return cb(error);
        }
        cb(null, data);
    });
}

export default getData;
