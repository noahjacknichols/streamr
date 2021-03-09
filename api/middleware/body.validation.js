const _ = require('lodash')
let Schemas = require('./validationSchemas');

module.exports = (schemaToUse) => {
  // Joi validation options
  const _validationOptions = {
    abortEarly: false,  // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true  // remove unknown keys from the validated data
  };
  let Schema = Schemas[schemaToUse]
  // return the validation middleware
  return (req, res, next) => {
    const route = req.route.path;
    if (_.has(Schema, route)) {
      // get schema for the current route
      const _schema = _.get(Schema, route)[req.method];
      if (_schema) {
        // Validate req.body using the schema and validation options
        const { error, value } = _schema.validate(req.body, _validationOptions);
        if (error) {
          // Joi Error
          const JoiError = {
            error: {
              original: error._object,
              // fetch only message and type from each error
              details: _.map(error.details, ({message, type}) => ({
                message: message.replace(/['"]/g, ''),
                type
              }))
            }
          };
          return res.status(400).json(JoiError);
        } else {
          // Replace req.body with the data after Joi validation
          req.body = value;
          next();
        }
      }else{
        next(); //if no schema defined, go to next middleware
      }
    }else {
      return res.status(400).json({error: 'no schema to validate request with'})
    }
  };
};