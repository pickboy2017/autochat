const axios = require("axios");
const fs = require('fs').promises;

const API_URL = "https://nodateka.gaia.domains/v1/chat/completions"; // Updated URL
const API_KEY = "gaia-NTBhYTQ2YmEtMDAxMy00NDJkLWE0NTktNjA3Njg5OWUyOTVm-lNOY_K5G5jzFUzOg";
const DELAY_MS = 60000;
const FILE_NAME = "chat.txt";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    console.log('AUTOCHAT GAIANET BY AIRDROP ASC\n\n');
    const addressList = await fs.readFile(FILE_NAME, 'utf-8');
    const addressListArray = addressList.split('\n').filter(line => line.trim() !== '');

    for (const Wallet of addressListArray) {
      console.log("Content Chat:", Wallet);

      try {
        const response = await axios.post(API_URL, {
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: Wallet }
          ]
        }, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          }
        });

        console.log("Response:", response.data.choices[0].message.content);
        console.log("WAIT 1 minute\n");
        await delay(DELAY_MS);
      } catch (postError) {
        if (postError.response) {
          console.error(`Error (${postError.response.status}):`, postError.response.data);
        } else {
          console.error("Network Error:", postError.message);
        }
      }
    }
  } catch (error) {
    console.error("Fatal error:", error);
  }
})();

