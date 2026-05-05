const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");
require("dotenv").config();

// Load Google Drive credentials from environment variables or JSON file
const KEYFILEPATH = path.join(__dirname, "google-service-account.json"); // Update with your service account JSON path
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

/**
 * Uploads a file to Google Drive and returns a publicly accessible URL.
 * @param {string} filePath - Local file path.
 * @param {string} fileName - File name.
 * @returns {Promise<string>} - Public URL of uploaded file.
 */
async function uploadToDrive(filePath, fileName) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // The folder ID where files will be uploaded
      },
      media: {
        mimeType: "image/jpeg", // Change based on your file type
        body: fs.createReadStream(filePath),
      },
    });

    const fileId = response.data.id;

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Get the public URL
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return fileUrl;
  } catch (error) {
    console.error("Google Drive Upload Error:", error);
    return null;
  }
}

module.exports = uploadToDrive;
