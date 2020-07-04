import React from 'react';
import { connect } from 'react-redux';

function Favorites(props) {
  console.log(props)
  const {userProfile} = props;

  if (!userProfile) return <div className="login-body"></div>

  return(
    <React.Fragment>
      <div className="user-favorites">
        {!userProfile.FavoritesMovies && <div>no movies</div>}
        {userProfile.FavoritesMovies &&
          <ul>
            {favoritesList.map(movie =>
              <li key={movie._id} className="relative">
                <Link className="img-block" to={`/movie/${movie._id}`}>
                  <img className="movie-image" src={movie.ImagePath} />
                </Link>
                <a className="delete-btn" onClick={e => this.deleteFavorites(movie._id)}>X</a>
              </li>
            )}
          </ul>}
      </div>
    </React.Fragment>
  )
}

export default connect(mapStateToProps)(Favorites)
