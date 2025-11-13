Social Media Scheduler
A Next.js application for scheduling and displaying social media posts with image upload functionality.

📋 Project Overview
This project implements a mini-feature for scheduling and displaying social media posts with the following functionality:

Post Creation Form - Create social media posts with text content, image upload, and scheduled publish date/time

Post Storage - Save posts to PostgreSQL database with all relevant information

Posts Display - Show all created posts with scheduled times and status (upcoming/past)

Image Handling - Handle image uploads and display uploaded images

Basic Validation - Ensure posts have required fields and scheduled times are in the future

🛠️ Technical Stack
Framework: Next.js 14 with TypeScript

Database: PostgreSQL with Prisma ORM

Styling: Tailwind CSS

Image Storage: Cloudinary

Form Handling: React Hook Form with Zod validation

🚀 Quick Start
Prerequisites
Node.js 18+

PostgreSQL database (local or cloud)

Installation
Clone the repository

bash
git clone https://github.com/garendeveloper/social-media-scheduler.git
cd social-media-scheduler
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.example .env.local
Edit .env.local with your configuration:

env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/social_valet_scheduler"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
Set up the database

bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push
Run the application

bash
npm run dev
Open http://localhost:3000 in your browser.

📖 How to Use
Creating a Post
Fill in the caption/text content

Upload an image (JPEG, max 3MB)

Select a future date and time for scheduling

Submit the form

Viewing Posts
See all posts displayed in the main area

Posts are categorized as "Upcoming" or "Past" based on scheduled time

View post details including images and scheduling information

🔧 Available Scripts
npm run dev - Start development server

npm run build - Build for production

npm run start - Start production server

npm run lint - Run ESLint

npx prisma generate - Generate Prisma client

npx prisma db push - Push schema to database

npx prisma studio - Open Prisma Studio for database management

🗃️ Environment Variables
Variable	Description	Required
DATABASE_URL	PostgreSQL connection string	Yes
CLOUDINARY_CLOUD_NAME	Cloudinary cloud name	For image uploads
CLOUDINARY_API_KEY	Cloudinary API key	For image uploads
CLOUDINARY_API_SECRET	Cloudinary API secret	For image uploads
NEXTAUTH_SECRET	Next.js secret key	Yes
🗂️ Project Structure
text
src/
├── app/
│   ├── api/
│   │   ├── posts/route.ts     # Post CRUD API
│   │   └── upload/route.ts    # Image upload API
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── PostForm.tsx           # Post creation form
│   ├── PostCard.tsx           # Individual post display
│   └── PostsList.tsx          # Posts collection
├── lib/
│   └── db.ts                  # Database configuration
├── services/
│   └── cloudinary.ts          # Image upload service
└── types/
    └── post.ts                # TypeScript definitions
🐛 Troubleshooting
Common Issues
Database Connection Error:

Verify PostgreSQL is running

Check DATABASE_URL format in .env.local

Ensure database exists

Prisma Errors:

bash
npx prisma generate --force
Image Upload Issues:

Verify Cloudinary credentials in .env.local

Check image is JPEG format and under 3MB

Test without image upload first

Environment Variables Not Loading:

Ensure file is named .env.local

Restart development server after changes

Check variable names match exactly

🤔 Assumptions Made
Image Format: Only JPEG images are supported

File Size: Maximum 3MB file size limit for images

Scheduling: Posts can only be scheduled for future dates/times

User Management: Single-user system (no authentication implemented)

Timezone: Uses the client's local timezone for scheduling and display

Image Storage: Cloudinary is used for production-ready image handling

Post Status: Status is calculated dynamically (UPCOMING/PAST) based on current time

Built for Social Valet Technical Assessment
Completed by Reygaren
November 2024

