// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'ddqainpv9',
      api_key: '695869362496188',
      api_secret: 'sW497viGpcyVD_UR37LF3GvwlVs',
    });
  },
};
