# Social Media Scheduler

[![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-v14-blue)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-blue)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blueviolet)](https://www.prisma.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Storage-orange)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A **Next.js** application for scheduling and displaying social media posts with image upload functionality. Quickly plan, organize, and manage posts with a simple interface and Cloudinary integration.

---

## 📑 Table of Contents

- [Features](#-features)  
- [Screenshots](#-screenshots)  
- [Prerequisites](#-prerequisites)  
- [Installation & Setup](#-installation--setup)  
  - [Database Setup Options](#database-setup-options)  
- [Running the Application](#-running-the-application)  
- [Available Scripts](#-available-scripts)  
- [Assumptions & Notes](#-assumptions--notes)  
- [Author](#-author)  

---

## 🌟 Features

- Create and schedule social media posts  
- Upload images via **Cloudinary**  
- Dynamic post status: UPCOMING / PAST  
- Single-user setup for quick testing  
- Fully responsive design  

---

## 🖼️ Screenshots

![Create Post - Main](https://drive.google.com/uc?export=view&id=16S74tL6ThMEMkOPGefmJ4rSBnUt5GmRH)  
*Create post showing no posts yet*

![Upcoming Example](https://drive.google.com/uc?export=view&id=1AmUry11uM3M15L5tIv6wy6Y55JkLEEgt)  
*Create and schedule new posts with image uploads (upcoming)*

![Past Example](https://drive.google.com/uc?export=view&id=1hG9h3G2-FBWsxo_mWFH_VZZhIGM528Jq)  
*Create and schedule new posts with image uploads (past)*
---

## 🛠️ Prerequisites

- **Node.js** v18+  
- **PostgreSQL** (local or cloud)  

---

## 📦 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/garendeveloper/social-media-scheduler.git
cd social-media-scheduler
Install dependencies

bash
Copy code
npm install
Set up environment variables

Create a .env file in the root directory:

env
Copy and paste the content below and paste your cloudinary credentials
#----#
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/social_valet_scheduler"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
#-----#

Database Setup Options
Option A: Local PostgreSQL
sql
CREATE DATABASE social_valet_scheduler;

Option B: Cloud PostgreSQL
Create a free account at Supabase or Neon

Initialize the database
npx prisma generate
npx prisma db push


🏃 Running the Application
Start the development server:
npm run dev
Open http://localhost:3000 in your browser to access the app.

⚙️ Available Scripts
npm run dev      # Start development server

📌 Assumptions & Notes
Image Format: Only JPEG images supported
File Size: Maximum 3MB
Scheduling: Posts can only be scheduled for future dates/times
User Management: Single-user system (no authentication implemented)
Timezone: Uses client's local timezone for scheduling and display
Image Storage: Cloudinary is used for production-ready image handling
Post Status: Calculated dynamically as UPCOMING or PAST based on current time

📚 Author
Garendeveloper

