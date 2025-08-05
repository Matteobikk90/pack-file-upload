import { S3_ACCESS_KEY_ID, S3_REGION, S3_SECRET_ACCESS_KEY } from '$env/static/private';

import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
	region: S3_REGION,
	endpoint: `https://s3.${S3_REGION}.amazonaws.com`,
	credentials: {
		accessKeyId: S3_ACCESS_KEY_ID,
		secretAccessKey: S3_SECRET_ACCESS_KEY
	}
});
