const { S3 } = require('@aws-sdk/client-s3')

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: 'https://nyc3.digitaloceanspaces.com',
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  }
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
    return `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`
  } catch (err) {
    console.error('Upload failed', err)
    throw err
  }
}

export { s3Client, uploadFileToSpaces }