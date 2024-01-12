import aws from 'aws-sdk'
import { nanoid } from 'nanoid';
aws.config.suppressDeprecationWarnings = true;
import axios from 'axios'

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
            Bucket: process.env.BUCKET_NAME,
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
    try {
        let { image } = req?.body;

        if (!image) {
            return res.status(403).json({ error: 'Image file is missing. Please provide an image file.' });
        }

        // Generate upload URL
        const url = await generateUploadURL();

        // Make the PUT request using Axios
        await axios({
            method: 'PUT',
            url,
            headers: { "Content-Type": "multipart/form-data" },
            data: image
        });

        // If the request is successful, send the response
        return res.status(200).json({ imageUrl: url?.split('?')[0] });
    } catch (err) {
        // Log and handle errors
        console.error('Error:', err);

        // Return an appropriate error response
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};


export { getUploadUrl }