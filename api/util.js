const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

function createBucket() {
    const params = {
        Bucket: process.env.BUCKET_NAME
    }
    try{
        s3.createBucket(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log('Bucket created', data);
        })
    } catch (e) {
        console.log(err.message);
    }
}
createBucket();

exports.uploadToBucket = (params, callback) => {
    try{
        console.log('params:', params);
        return s3.putObject(params).promise().then( data => {
            console.log(data);
            callback(data);
        })
    } catch (e) {
        console.log('error uploading');
        throw e;
    }
    return 'test'

}