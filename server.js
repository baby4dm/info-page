const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Enable CORS for frontend requests
app.use(cors());

// Third-party API details
const BASE_API_URL = "https://api.ukrainealarm.com/api/v3/alerts/31";
const API_KEY = "c46b1fe0:b9b6403056f23d21ebe53a78b659881b";

// API endpoint to get Kyiv alert status
app.get("/api/kyiv-alert", async (req, res) => {
    try {
        console.log("Fetching Kyiv alert data..."); // Debugging step

        const response = await axios.get(BASE_API_URL, {
            headers: {
                "Authorization": API_KEY,
                "Accept": "application/json"
            }
        });

        console.log("API Response:", response.data); // Debugging step

        const data = response.data;

        // Find Kyiv region (assuming regionId "31" is Kyiv, adjust if needed)
        const kyivRegion = data.find(region => region.regionId === "31");

        if (!kyivRegion) {
            return res.json({ 
                region: "м. Київ",
                alert: "Немає даних про м. Київ" 
            });
        }

        // Check if there is an "AIR" alert
        const hasAirAlert = kyivRegion.activeAlerts && kyivRegion.activeAlerts.some(alert => alert.type === "AIR");

        res.json({ 
            region: kyivRegion.regionName, 
            alert: hasAirAlert ? "🔴 Тривога у м. Київ!" : "🟢 м. Київ повітряної тривоги немає"
        });

    } catch (error) {
        console.error("API fetch error:", error.response ? error.response.data : error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to fetch data", details: error.message });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
