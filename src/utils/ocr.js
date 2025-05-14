
// OCR utility using Tesseract.js for Arabic text recognition
import { createWorker } from 'tesseract.js';

export async function performOCR(imageFile) {
  try {
    // Create a worker and load the Arabic language data
    const worker = await createWorker('ara');
    
    // Recognize text in the image
    const response = await worker.recognize(imageFile, {
      lang: "ara",
    });
    console.log(response);
    // Terminate the worker
    await worker.terminate();
    
    return response.data.text;
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("فشل في استخراج النص من الصورة");
  }
}
