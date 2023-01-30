const { Shows } = require("../db/model/showmodel");

function findByShowId(showId) {
  return Shows.find({ showId }).exec();
}

function findSeriesByKey(ShowId, seriesId) {
  return (
    ShowAccessor,
    findByShowId(showId)
      .then((shows) => shows[0])
      .then((show) => {
        if (!R.isNil(show)) {
          return show.series.find((series) => series.seriesId === seriesId);
        } else {
          return null;
        }
      })
  );
}

module.exports = {
  findByShowId,
  findSeriesByKey,
};
