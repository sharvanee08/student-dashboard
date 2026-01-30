// server/scripts/uploadQuizzes.js
const axios = require("axios");
const quizData = require("./quizData");

async function uploadQuizzes() {
  try {
    console.log("🚀 Uploading quizzes...");
    const url = "http://localhost:5000/api/quizzes/add"; // ✅ existing route
    const res = await axios.post(url, quizData);
    console.log("✅ Upload successful:", res.data.length, "quizzes added");
  } catch (error) {
    console.error("❌ Upload error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received. Possible network error or server not running.");
    } else {
      console.error("Error message:", error.message);
    }
  }
}

uploadQuizzes();




