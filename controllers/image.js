const Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your api key.
const clarifaiApp = new Clarifai.App({
  apiKey: '6a67eeca32e54ea79be6202e8a4957e5'
});

const handleImage = (db) => (req, res) => {
  const { id } = req.body;

  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Unable to get entries!'));
}

const handleImageurl = (req, res) => {
  const { input } = req.body;

  // predict the contents of an image by passing in a url
  // the first string is the model id for face recognition
  clarifaiApp.models
  // .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
  .predict(
    Clarifai.FACE_DETECT_MODEL, input)
    .then(response => {
      res.json(response);
    });
}

module.exports = {
  handleImage: handleImage,
  handleImageurl: handleImageurl
};