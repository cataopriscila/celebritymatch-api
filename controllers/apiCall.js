const Clarifai = require("clarifai");
const API_KEY = `${process.env.SERVER_APP_API_KEY}`;

const app = new Clarifai.App({
  apiKey: API_KEY
});

const handleFaceApiCall = (req, res) => {
    const { input} = req.body;    
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Unable to work with API"));
};

const handleCelebrityApiCall = (req, res) => {
    app.models
    .predict(Clarifai.CELEBRITY_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Unable to work with API"));
};

module.exports = {        
    handleFaceApiCall,
    handleCelebrityApiCall    
    };     
