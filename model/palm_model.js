const ort = require("onnxruntime-node");
const path = require("path");

let session = null;

async function loadPalmModel() {
    if (!session) {
        const modelPath = path.join(__dirname, "palm_model.onnx");
        session = await ort.InferenceSession.create(modelPath);
        console.log("Palm Model Loaded (ONNX)");
    }
    return session;
}

loadPalmModel();
module.exports = loadPalmModel;