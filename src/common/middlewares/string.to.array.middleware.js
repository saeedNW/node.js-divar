/**
 * Creates middleware that converts a given field in the request body into an array.
 * @param {string} field - The field in the request body to be converted to an array.
 * @param {string} location - The location of the string input. [body, params, query]
 * @returns {function} - Express middleware function.
 */
const stringToArray = function (field, location = 'body') {
    return function (req, res, next) {
        /** Check if the field exists in the request body */
        if (req[location][field]) {
            /** Check if the field's value is a string */
            if (typeof req[location][field] === "string") {
                /** Check if the string contains '#' character */
                if (req[location][field].indexOf("#") >= 0) {
                    req[location][field] = (req[location][field].split("#")).map(item => item.trim());
                }

                /** Check if the string contains ',' character */
                else if (req[location][field].indexOf(",") >= 0) {
                    req[location][field] = (req[location][field].split(",")).map(item => item.trim());
                }

                /** If neither '#' nor ',' is found, create a single-item array */
                else {
                    req[location][field] = [req[location][field]];
                }
            } else if ((req[location][field].constructor).toString().toLowerCase().indexOf("array") >= 0) {
                /** If the field's value is already an array, trim each item in the array */
                req[location][field] = req[location][field].map(item => item.trim());
            }
        } else {
            /** If the field is not present, set it to an empty array */
            req[location][field] = [];
        }

        /** Move to the next middleware */
        next();
    }
}

module.exports = {
    stringToArray
}