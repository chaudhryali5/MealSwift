<!-- # Deployment Guide for MealSwift

This guide explains how to deploy the **MealSwift** project (Client, Admin, and Backend) to **Vercel**.

Since your project is a monorepo (contains multiple projects in one repository), you will import the same GitHub repository **three times** into Vercel, configuring each one for a specific folder (`backend`, `client`, `admin`).

## Prerequisites

1.  **GitHub Repository**: Push your code to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **MongoDB Atlas**: Ensure your Database is hosted (e.g., MongoDB Atlas) and accessible.
    *   **Important**: In MongoDB Atlas Network Access, whitelist `0.0.0.0/0` (Allow Access from Anywhere) so Vercel can connect.
4.  **Cloudinary & Stripe**: Have your API keys ready.

---

## Step 1: Deploy Backend

1.  Log in to Vercel and click **"Add New..."** -> **"Project"**.
2.  Import your **MealSwift** GitHub repository.
3.  **Configure Project**:
    *   **Project Name**: `mealswift-backend` (or similar).
    *   **Root Directory**: Click "Edit" and select `backend`.
    *   **Framework Preset**: Select `Other` (or Vercel will auto-detect, stick to defaults if `vercel.json` is present).
4.  **Environment Variables**:
    Add the following variables (copy values from your local `.env` file):
    *   `MONGO_URI`
    *   `JWT_SECRET`
    *   `CLOUDINARY_CLOUD_NAME`
    *   `CLOUDINARY_API_KEY`
    *   `CLOUDINARY_API_SECRET`
    *   `STRIPE_SECRET_KEY` (if used)
    *   `ADMIN_EMAIL` (if used)
    *   `ADMIN_PASSWORD` (if used)
5.  Click **Deploy**.
6.  Once deployed, **copy the deployment URL** (e.g., `https://mealswift-backend.vercel.app`). You will need this for the Client and Admin deployments.

---

## Step 2: Deploy Admin Panel

1.  Go to Vercel Dashboard and click **"Add New..."** -> **"Project"**.
2.  Import the **SAME** GitHub repository again.
3.  **Configure Project**:
    *   **Project Name**: `mealswift-admin`.
    *   **Root Directory**: Click "Edit" and select `admin`.
    *   **Framework Preset**: Vercel should automatically detect **Vite**.
4.  **Environment Variables**:
    *   `VITE_API_URL`: Paste your **Backend URL** from Step 1 (e.g., `https://mealswift-backend.vercel.app`).
        *   *Note: Do not add a trailing slash `/` or `/api/v1` here, the code appends it automatically.*
5.  Click **Deploy**.

---

## Step 3: Deploy Client (Frontend)

1.  Go to Vercel Dashboard and click **"Add New..."** -> **"Project"**.
2.  Import the **SAME** GitHub repository again.
3.  **Configure Project**:
    *   **Project Name**: `mealswift-client`.
    *   **Root Directory**: Click "Edit" and select `client`.
    *   **Framework Preset**: Vercel should automatically detect **Vite**.
4.  **Environment Variables**:
    *   `VITE_API_URL`: Paste your **Backend URL** from Step 1.
5.  Click **Deploy**.

---

## Troubleshooting

*   **Database Connection Errors**: Check your MongoDB Atlas Network Access whitelist. Vercel IPs change, so `0.0.0.0/0` is recommended.
*   **CORS Errors**: If the frontend cannot talk to the backend, ensure your backend `server.js` has `app.use(cors())` (which allows all origins) or configure it to allow your specific Vercel frontend domains.
*   **Images Not Loading**: Ensure your Cloudinary credentials are correct in the Backend environment variables.
*   **"Command not found"**: If build fails, ensure `package.json` in each folder is correct.

## Code Changes Made for Deployment

We have automatically applied the following changes to prepare your project:
1.  **Backend**: Verified `vercel.json` configures serverless deployment and updated `server.js` to export the app.
2.  **Admin**: Updated API configuration to use `VITE_API_URL` environment variable.
3.  **Client**: Updated API configuration to use `VITE_API_URL`. -->
