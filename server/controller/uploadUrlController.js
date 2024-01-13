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
    const imageName = `${nanoid()}-${date.getTime()}.png`;

    try {
        const url = await s3.getSignedUrlPromise('putObject', {
            Bucket: process.env.BUCKET_NAME,
            Key: imageName,
            Expires: 1000,
            ContentType: 'image/png'
        });
        return url;
    } catch (error) {
        console.error('AWS SDK Error:', error);
        throw error;
    }
}

const getUploadUrl = async (req, res) => {
    let image = req?.file;

    try {
        if (!image) return res.status(403).json({ error: 'Image file is missing. Please provide an image file.' });

        // Generate upload URL
        const url = await generateUploadURL();

        // Upload the file directly to S3
        const result = await axios.put(url, image.buffer, {
            headers: {
                'Content-Type': 'image/png',
            },
        });
        return res.status(200).json({ imageUrl: url?.split('?')[0] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};


export { getUploadUrl }