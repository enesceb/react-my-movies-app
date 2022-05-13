import React from "react";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import axios from "axios";

class App extends React.Component {
  state = {
    movies: [],
    searchQuery: "",
  };
  async componentDidMount() {
    const response = await axios.get("http://localhost:3002/Movies");
    this.setState({movies: response.data});
  } 


  
  // FETCH API 
  // deleteMovie = async (movie) => {
  //   const baseURL = `http://localhost:3002/Movies/${movie.id}`
  //   await fetch(baseURL, {
  //     method:"DELETE"
  //   });
  // };




  // AXIOS 
  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3002/Movies/${movie.id}`)
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id);
      this.setState(state => ({
        movies: newMovieList
      }))
      };




  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value });
  };






  render() {
    let filteredMovie = this.state.movies.filter((movie) => {
      return (
        movie.name
          .toLowerCase()
          .indexOf(this.state.searchQuery.toLowerCase()) !== -1
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SearchBar searchMovieProp={this.searchMovie} />
          </div>
        </div>
        <MovieList movies={filteredMovie} deleteMovieProp={this.deleteMovie} />
      </div>
    );
  }
}

export default App;
