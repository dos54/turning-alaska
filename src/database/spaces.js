const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3')
require('dotenv').config()

// The client for Spaces
const s3Client = new S3Client({
  forcePathStyle: false,
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
})

/** Upload a file to the Spaces storage */
async function uploadFileToSpaces(fileBuffer, fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: fileName,
    Body: fileBuffer,
    ACL: 'public-read',
    ContentType: contentType,
  })

  try {
    await s3Client.send(command)
    return `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ORIGIN}/${fileName}`
  } catch (err) {
    console.error('Upload failed', err)
    throw err
  }
}

/** Delete a file from the Spaces storage */
async function deleteFileFromSpaces(url) {
  const key = new URL(url).pathname.slice(1)

  const command = new DeleteObjectCommand({
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: key,
  })

  try {
    await s3Client.send(command)
    console.log('Deleted:', key)
  } catch (err) {
    console.error('Delete failed:', err)
    throw err
  }
}

module.exports = {
  s3Client,
  uploadFileToSpaces,
  deleteFileFromSpaces,
}
