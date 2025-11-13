Social Media Scheduler
A Next.js application for scheduling and displaying social media posts with image upload functionality.

Setup Instructions
Prerequisites
Node.js 18+

PostgreSQL database (I used local)

Installation
Clone the repository

bash
git clone https://github.com/garendeveloper/social-media-scheduler.git
cd social-media-scheduler
Install dependencies

bash
npm install
Set up environment variables
Create a .env.local file in the root directory with the following variables:

Initialize the database

bash
npx prisma generate
npx prisma db push
Run the application

bash
npm run dev
Open http://localhost:3000 in your browser.

Environment Variables
Create a .env.local file with these variables:

env
# Database Configuration (Required)
DATABASE_URL="postgresql://username:password@localhost:5432/social_valet_scheduler"

# Cloudinary Configuration (Required for image uploads)
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

#Database Setup Options

Option A: Local PostgreSQL

sql
CREATE DATABASE social_valet_scheduler;

Option B: Cloud PostgreSQL
Create a free account at Supabase or Neon
Create a new project and use the provided connection string

How to Run the Project Locally
Start the development server:

bash
npm run dev

# Access the application:
Main application: http://localhost:3000

Available scripts:

bash
npm run dev      # Development server

# Assumptions Made
Image Format: Only JPEG images are supported
File Size: Maximum 3MB file size limit for images
Scheduling: Posts can only be scheduled for future dates/times
User Management: Single-user system (no authentication implemented)
Timezone: Uses the client's local timezone for scheduling and display
Image Storage: Cloudinary is used for production-ready image handling
Post Status: Status is calculated dynamically (UPCOMING/PAST) based on current time