# Airbnb Clone

## Description

This is a clone of the Airbnb website, designed to replicate the core functionalities and features of the original platform. The project demonstrates the use of modern web development technologies to create a responsive and interactive web application.

## Features

- **User Authentication:** Secure login and registration system with user sessions.
- **Property Listings:** Dynamic property addition and display with detailed information.
- **Search and Filtering:** Advanced search functionality with dynamic filtering options.
- **Geolocation:** Integration of geolocation services to show properties based on user location.
- **Responsive Design:** Optimized for various screen sizes and devices.

## Technologies Used

- **Frontend:** CSS, HTML
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Passport
- **Geolocation API:** Mapbox & Cloudinary

## .ENV Configuration

To run this project, you'll need to set up environment variables. Create a `.env` file in the `backend` directory with the following content:

```bash
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret
CLOUDINARY_URL=your_cloudinary_url

MAP_TOKEN=your_mapbox_token

ATLAS_URL=your_mongodb_connection_string

SECRET=your_session_secret
```

## How to Obtain Your Environment Variables

**Cloudinary:**

- Sign up for a Cloudinary account at Cloudinary.
- After creating an account, you will find your `CLOUD_NAME`, `CLOUD_API_KEY`, and `CLOUD_API_SECRET` in the Cloudinary dashboard under the "Account Details" section.
- The CLOUDINARY_URL will be automatically generated in the format:
` cloudinary://<CLOUD_API_KEY>:<CLOUD_API_SECRET>@<CLOUD_NAME> `

**Mapbox (MAP_TOKEN):**

- Sign up for a Mapbox account at Mapbox.
- After logging in, navigate to the `Tokens` section in your account settings to generate a new `MAP_TOKEN`.

**MongoDB Atlas (ATLAS_URL):**

- Sign up for a MongoDB Atlas account at MongoDB Atlas.
- Create a new `cluster`.
- Navigate to the `Database Access` and `Network Access` sections to set up user credentials and `IP whitelisting`.
- The connection string (ATLAS_URL) will be provided in the "Connect" section of your cluster dashboard. Make sure to replace the `<username>` and `<password>` placeholders with your actual database credentials.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/akash-wt/Airbnb_Clone.git
   ```
