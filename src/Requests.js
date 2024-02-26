
const requests = {
	requestPopular:  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&languages=en-US&page=1`,
	requestTopRated:  `https://api.themoviedb.org/3/movie/top_ratedapi_key=${process.env.REACT_APP_TMDB_KEY}&languages=en-US&page=1`,
	requestTrending:  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&languages=en-US&page=2`,
	requestHorror:  `https://api.themoviedb.org/3/movie/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&languages=en-US&query=horror&page=1&include_adults`,
	requestsUpcoming:  `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&languages=en-US&page=1`
}

export default requests
