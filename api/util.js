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
            else console.log('Bucket created', data.location);
        })
    } catch (e) {
        console.log(err.message);
    }
}
createBucket();

exports.uploadToBucket = (params) => {
    try{
        s3.upload(params, function(err, data) {
            if (err) throw err;
            console.log('file uploaded');
            return data.location;
        })
    } catch (e) {
        console.log(e.message);
    }
}