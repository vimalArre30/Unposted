import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function createSignedUploadUrl(input: { key: string; contentType: string }): Promise<string> {
  const region = process.env.AWS_REGION;
  const bucket = process.env.PRIVATE_AUDIO_BUCKET;

  if (!region || !bucket) {
    throw new Error("Missing AWS_REGION or PRIVATE_AUDIO_BUCKET env vars");
  }

  const client = new S3Client({ region });
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: input.key,
    ContentType: input.contentType,
  });

  return getSignedUrl(client, command, { expiresIn: 300 });
}
