const { S3 } = require('@aws-sdk/client-s3')
require('dotenv').config()

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
})

async function uploadFileToSpaces(fileBuffer, fileName, contentType) {
  const params = {
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: fileName,
    Body: fileBuffer,
    ACL: 'public-read',
    ContentType: contentType,
  }

  try {
    const result = await s3Client.putObject(params)
  return `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ORIGIN}/${fileName}`
  } catch (err) {
    console.error('Upload failed', err)
    throw err
  }
}

module.exports = { s3Client, uploadFileToSpaces }
