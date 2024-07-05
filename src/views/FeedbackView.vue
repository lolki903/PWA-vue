<template>
    <div>
        <form @submit.prevent="submitReview">
            <textarea v-model="reviewText" placeholder="Write your review here"></textarea>
            <button type="submit">Submit</button>
        </form>
        <div v-if="sentiment">
            <h3>Sentiment Analysis</h3>
            <p>Score: {{ sentiment.documentSentiment.score }}</p>
            <p>Magnitude: {{ sentiment.documentSentiment.magnitude }}</p>
            <p>Sentiment: {{ sentimentLabel }}</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { analyzeSentiment } from '../services/naturalApi.js';
import { db } from '../services/firebaseConfig';

export default {
    name: 'ReviewForm',
    setup() {
        const reviewText = ref('');
        const sentiment = ref(null);
        const sentimentLabel = ref('');

        const interpretSentiment = (score) => {
            if (score >= 0.25 && score <= 1.0) {
                return 'Positive';
            } else if (score >= -0.25 && score <= 0.25) {
                return 'Neutral';
            } else if (score >= -1.0 && score < -0.25) {
                return 'Negative';
            } else {
                return 'Unknown';
            }
        };

        const submitReview = async () => {
            if (reviewText.value.trim()) {
                try {
                    sentiment.value = await analyzeSentiment(reviewText.value);
                    sentimentLabel.value = interpretSentiment(sentiment.value.documentSentiment.score);
                    const data = {
                        text: reviewText.value,
                        sentiment: sentiment.value,
                        sentimentLabel: sentimentLabel.value,
                        timestamp: new Date()
                    }
                    await addDoc(collection(db, "reviews"), data);
                } catch (error) {
                    console.error('Failed to analyze sentiment or save review:', error);
                }
            }
        };

        return {
            reviewText,
            sentiment,
            sentimentLabel,
            submitReview
        };
    }
};
</script>

<style scoped>
textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}

button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #369b73;
}
</style>