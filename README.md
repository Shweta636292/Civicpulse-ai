# 🚀 CivicPulse AI

### From Citizen Complaints to Intelligent Civic Action

CivicPulse AI is an AI-powered civic complaint intelligence platform designed to help citizens report public infrastructure problems and help administrators understand, prioritize and track civic issues.

## 🌍 Problem Statement

Citizens regularly face civic issues such as damaged roads, water leakage, overflowing garbage, drainage problems and electricity failures.

Traditional complaint systems can make it difficult to identify recurring problems, prioritize urgent complaints and provide transparent progress updates.

## 💡 Our Solution

CivicPulse AI uses AI-powered complaint analysis to understand reported problems, assess their urgency, identify possible duplicate complaints and recommend appropriate actions.

## ✨ Key Features

- Citizen complaint submission.
- AI-powered complaint analysis using Gemini.
- Automatic complaint summarization.
- Civic issue categorization.
- Priority scoring based on severity, safety risk and public impact.
- Duplicate complaint detection.
- Citizen complaint tracking using tracking IDs.
- Admin dashboard and complaint management.
- Complaint status updates.
- Civic hotspot visualization.
- Dashboard statistics and analytics.

## 🏙️ Supported Civic Categories

1. Road
2. Water
3. Waste
4. Electricity
5. Drainage
6. Public Safety
7. Other

## 🧠 AI Intelligence

Gemini AI analyzes complaint descriptions and generates:

- Complaint category.
- Summary.
- Severity assessment.
- Safety risk assessment.
- Estimated affected population.
- Explanation of the assessment.
- Recommended action.

The platform also includes a priority scoring mechanism and duplicate detection.

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Axios
- React Leaflet
- OpenStreetMap

### Backend
- Node.js
- Express.js
- REST API

### AI
- Google Gemini API

## 📁 Project Structure

```text
civicpulse-ai/
├── client/
│   ├── src/
│   └── package.json
├── server/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Setup backend

```bash
cd civicpulse-ai/server
npm install
```

Create a `.env` file inside the server folder:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### 3. Setup frontend

Open another terminal:

```bash
cd civicpulse-ai/client
npm install
npm run dev
```

Open the local URL displayed by Vite.

## 🔄 How It Works

1. A citizen submits a civic complaint.
2. The backend validates the complaint.
3. Gemini AI analyzes the complaint.
4. The system calculates a priority score.
5. Duplicate detection checks for similar complaints.
6. The complaint is stored and assigned a tracking ID.
7. Citizens can track complaint progress.
8. Administrators can update complaint status.

## ⚠️ Current Limitations

- Complaint data is currently stored in temporary in-memory storage.
- Data is lost when the backend restarts.
- Duplicate detection uses text similarity rather than advanced semantic matching.
- Map location accuracy depends on available complaint coordinates.
- AI assessments require human verification.
- This prototype is not connected to official municipal systems.

##