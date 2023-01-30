const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const S3Client = new S3Client({ region: "ap-south-1" });

function fetchPresignedUrl(key, expiesInSeconds) {
  const command = new GetObjectCommand({
    Key: key,
    Bucket: "pft-netflix-demo2",
  });
  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

module.exports = {
  fetchPresignedUrl,
};
