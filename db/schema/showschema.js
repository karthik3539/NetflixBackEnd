const mongoose = require("mongoose");

const { Schema } = mongoose;

const Showschema = new Schema({
  showId: String,
  name: String,
  releaseDate: String,
  rating: Number,
  noofRatings: Number,
  series: [
    {
      seriesId: String,
      name: String,
      releaseDate: String,
      rating: Number,
      noofRatings: Number,
      episodes: [
        {
          videoId: String,
          title: String,
          videoPath: String,
          thumbnailPath: String,
          rating: Number,
          noofRatings: Number,
        },
      ],
    },
  ],
});

module.exports = {
  Showschema,
};
