# 🗑️ TeamTrashTracker ♻️  
**Gamify Local Cleanups — One Pickup at a Time**

---

## 📌 Project Description

**TeamTrashTracker** is a full-stack environmental app that empowers users to **log, map, and gamify real-world trash pickups**.
Built for eco-conscious individuals and communities, the platform transforms cleanup efforts into a fun challenge — with **live maps**, **streaks**, **Google sign-in**, and a **points-based leaderboard**.
Whether you're cleaning a beach, road, or park — TeamTrashTracker lets you visualize your impact and inspire others.

---
## 🔗 Project Link

🌍 **Live App**: [https://teamtrashtracker.netlify.app](https://teamtrashtracker.netlify.app)

📦 **Frontend**: Deployed with [Netlify](https://www.netlify.com/)  
🧠 **Backend**: Deployed with [Railway](https://railway.app/)
---

## 🚀 Core Features

### 🔐 Authentication
- Firebase Google Auth – Secure sign-in with a single click
- JWT Verification – Firebase token validation on backend
- User Profile Sync – Display name, email, and unique ID persisted

### 🧤 Trash Pickup Logging
- Submit Pickup – Users can log cleanup data (lat/lng, optional image)
- Auto Geolocation – Uses browser's GPS to pinpoint pickup
- Image Uploads – Local Express file uploads with preview support
- MongoDB Storage – All pickup entries stored and referenced to user

### 🌍 Interactive Maps (Leaflet)
- Live Pickup Pins – All public pickups shown as map markers
- User Marker (Blue) – Shows your current location with popup
- Sri Lanka Optimized – Map centers around local (Colombo) region
- Responsive – Works across devices, scroll and zoom enabled

### 🔥 Streak System (Daily Tracker)
- Current Streak Counter – Tracks consecutive days of cleanups
- Longest Streak Memory – Stores personal best
- Timezone Aware – Adjusted for Sri Lanka (GMT+5:30)
- Auto Reset – Streak resets after inactivity

### 🏅 Badges & Achievements
- `first_pickup` – For your first cleanup submission
- `ten_pickups` – When 10 unique logs are made

### 📊 Pickup Dashboard
- Pickup List – Recent pickups shown with timestamp and image
- Points Summary – Each pickup awards points (default: 10)
- Live Updates – Instant feedback after new submission

### 🥇 Leaderboard
- `GET /api/leaderboard` – Top users by points
- Display Name + Total Points shown

---

## 🧠 Tech Stack

### Frontend (Client-side)
- React.js — UI framework
- TypeScript — Type-safe JavaScript
- Vite — Fast development/build tool
- Leaflet.js — Interactive map library
- React-Leaflet — Leaflet bindings for React
- Firebase SDK — Client-side authentication
- Axios — For API communication
- React Context API — Manages auth state
- CSS Modules / App.css — For styling

### Backend (Server-side)
- Node.js — JS runtime
- Express.js — RESTful API framework
- MongoDB Atlas — NoSQL cloud database
- Mongoose — ODM for MongoDB
- Firebase Admin SDK — Backend auth verification
- dotenv — Env var management
- CORS — Allow frontend/backend communication
- Nodemon — Auto-restart on file save
- Multer — Handles local image uploads

### Authentication & Security
- Firebase Auth — Google OAuth
- JWT (via Firebase) — Secure identification
- Base64 Key Encoding — To safely store service accounts

### Location & Maps
- Geolocation API — Fetch user’s current GPS location
- OpenStreetMap — Public tile server for Leaflet
- Custom Leaflet Icons — User location & pickup styling

### Cloud Platforms
- MongoDB Atlas — Cloud DB hosting
- Firebase Console — Auth config + SDKs

### Dev Tools & Utilities
- Postman — For API testing
- VS Code — IDE
- ESLint + TypeScript — Code quality
- Console Logs — Server-side debug

---

## 📁 .gitignore Recommendations

```txt
# Sensitive files
backend/.env
serviceAccountKey.json
```

---

## 🛠️ Installation Guide

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/team-trash-tracker.git
cd team-trash-tracker
```

---

### ✅ 2. Setup Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com)
2. Create a Firebase project
3. Enable **Google Sign-In** under `Authentication > Sign-in Method`
4. Go to `Project Settings > Service Accounts`
5. Create a new Admin SDK key (`serviceAccountKey.json`)
6. Convert it to base64 in PowerShell:

```bash
[Convert]::ToBase64String([IO.File]::ReadAllBytes("serviceAccountKey.json"))
```

7. Add this in `backend/.env`:

```env
FIREBASE_ADMIN_KEY=base64-encoded-key
```

---

### ✅ 3. Setup MongoDB Atlas

1. Go to [mongodb.com](https://www.mongodb.com/)
2. Create a free cluster and DB named `TeamTrashTracker`
3. Whitelist your IP and create a DB user
4. Paste this in `backend/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/TeamTrashTracker
```

---

### ✅ 4. Install & Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend will be live at:  
`http://localhost:5000`

---

### ✅ 5. Install & Run Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run at:  
`http://localhost:5173`

---

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000

# Firebase Web App Config (from Firebase Console)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your-app-id
```

---

### ✅ 6. Test Locally in Browser

1. Open browser: [http://localhost:5173](http://localhost:5173)
2. Click **Login with Google**
3. Submit a pickup with or without image
4. Watch updates in:
   - 🗺️ Map
   - 🧤 Dashboard
   - 🥇 Leaderboard
   - 🔥 Streak counter
   - 🏅 Badges

---

### ✅ 7. Get a Firebase Auth Token (for Postman)

1. Create a file called `getToken.html` in your root directory

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Get Firebase Token</title>
    <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js"></script>
  </head>
  <body>
    <button onclick="login()">Login with Google</button>
    <pre id="token"></pre>

    <script>
      const firebaseConfig = {
        apiKey: "your-api-key",
        authDomain: "your-app.firebaseapp.com",
        projectId: "your-project-id"
      };

      firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();

      async function login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        const token = await result.user.getIdToken(true);
        document.getElementById("token").innerText = token;
      }
    </script>
  </body>
</html>
```

2. Open the HTML file in your browser
3. Click **Login with Google**
4. Copy the token that appears

5. In **Postman**, go to Headers tab and add:

```
Authorization: Bearer <paste-token-here>
```

6. Example secure request:

```
GET http://localhost:5000/api/users/me
```

You’ll now see user details, points, badges, and streaks 👍
