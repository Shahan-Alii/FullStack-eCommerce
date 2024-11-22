// import cloudinary from 'cloudinary';

// cloudinary.v2.config({
//     cloud_name: 'dw24cvnds',
//     api_key: '736296542167235',
//     api_secret: 'FvZsG2HApcoKrRrH82AVLVNmJUU',
// });

// export default cloudinary;

import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({
    cloud: {
        cloudName: 'dw24cvnds',
    },
    url: {
        secure: true,
    },
});
