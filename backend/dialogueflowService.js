const dialogflow = require("dialogflow");
const dotenv = require("dotenv");
const uuid = require("uuid");
// import jsonfile from "./config/service-account.json"

dotenv.config();

const projectId = process.env.GOOGLE_PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./config/service-account.json",
});

async function detectIntent(query, sessionId) {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: "en",
            },
        },
    };
    const responses = await sessionClient.detectIntent(request);
    return responses[0].queryResult.fulfillmentText;
}

module.exports = { detectIntent };
