const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDE_NAME , 
    api_key:process.env.CLOUDE_API_KEY  , 
    api_secret:process.env.CLOUDE_API_SECRET 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Airbnb_DEV',
      allowedFormats: ["png","jpeg","jpg"],
    },
  });


  module.exports={
    cloudinary,storage
  }

  