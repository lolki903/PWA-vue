import axios from 'axios';

const API_KEY = "AIzaSyDv4Yn_5WoM-mSpW_xFifK7kukxnUaS16o";
const API_URL = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`;

export async function analyzeSentiment(text) {
  const document = {
    document: {
      type: "PLAIN_TEXT",
      content: text,
    },
  };

  try {
    const response = await axios.post(API_URL, document);
    return response.data;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw error;
  }
}
