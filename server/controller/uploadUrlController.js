import aws from 'aws-sdk'
import { nanoid } from 'nanoid';
aws.config.suppressDeprecationWarnings = true;


// setting up s3 aws bucket

const s3 = new aws.S3({
    region: 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const generateUploadURL = async () => {
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

    try {
        const url = await s3.getSignedUrlPromise('putObject', {
            Bucket: 'BlogApp',
            Key: imageName,
            Expires: 1000,
            ContentType: 'image/jpeg'
        });
        return url;
    } catch (error) {
        console.error('AWS SDK Error:', error);
        throw error;
    }
    
}

const getUploadUrl = async (req, res) => {
    generateUploadURL().then((url) => res.status(200).json({ uploadURL: url })).catch((err) => {
        console.log(err,' : error ')
        return res.status(500).json({ error: err?.message })
    })
}

export { getUploadUrl }