import React, { Component } from 'react'
import axios from 'axios'
import axiosconfig from './axiosconfig';
import checkAccessToken from './checkAccessToken';
import notAuthorized from './notAuthorized';
export default class UpdateMovie extends Component {

    state ={
        movies: [],
        authorized: false,
        updatedMovie: {
            movieId: 0,
            movie_name: '',
            movie_desc: ''
        }
    }

    componentDidMount() {
      checkAccessToken()
      .then(
          res => {
              console.log("Authorized!");
              this.setState({
                  authorized: true
              })
              console.log(res.data);
              if(!res.data.authorities.includes("ROLE_admin"))
                {
                    alert("you do not have admin access!");
                }
              this.getmovies();
          }
      )
      .catch(
          function(error) {
              console.log(error);
          }
      )
        
    }

    getmovies()
    {
      axios
          .get('http://localhost:8763/api/resource-server-api/movies/showmovies', axiosconfig())
          .then(res => 
            this.setState({
              movies: res.data
            })
          )
          .catch(function(error) {
            console.log(error);
          });
          //console.log(this.state.movies);
    }

    handleDropDownChange = (e) => {
      if(parseInt(e.target.value)!==0) {
        this.state.movies.map(
          movieItr => {
              if(movieItr.movieId === parseInt(e.target.value)){
                this.setState({
                  updatedMovie: movieItr
                })
              }
                return this.state.updatedMovie;
            }
        );
      }//close of if statement
      else {
        this.setState({
          updatedMovie: {
            movieId: 0,
            movie_name: '',
            movie_desc: ''
          }
        })

      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      //console.log(this.state.updatedMovie);
      this.props.updateMovie(this.state.updatedMovie);
    }

    handleNameChange = (e) => {
      this.setState({
        updatedMovie: {
          movieId: this.state.updatedMovie.movieId,
          movie_name: e.target.value,
          movie_desc: this.state.updatedMovie.movie_desc
        }
      })
    }

    handleDescriptionChange = (e) => {
      this.setState({
        updatedMovie: {
          movieId: this.state.updatedMovie.movieId,
          movie_name: this.state.updatedMovie.movie_name,
          movie_desc: e.target.value
        }
      })
    }

    render() {
        //console.log(this.state.movies);
        return (
            <div style={{
              backgroundColor: '#FFFF99',
              width: '100%',
              height: '100%',
              position: 'fixed'
            }}>
              {
                localStorage.getItem("username") ? (
              <div style={{
                  backgroundColor: '#DCC943',
                  width: '60%',
                  height: 'auto',
                  marginTop: '30px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  outline: '#DCC943 auto 1px',
                  textAlign: 'center'
              }}>
                  <form onSubmit={this.handleSubmit} style={{
                        padding: '10px'
                  }} >
                    <select value={this.state.value} onChange={this.handleDropDownChange} style={{
                          fontSize: '20px'
                    }} >
                        <option value="" >
                          Select--
                        </option>
                        {
                          this.state.movies.map(
                            movieItr => (
                              <option key={movieItr.movieId} value={""+movieItr.movieId} >
                                {movieItr.movie_name}
                              </option>
                            )
                          )
                        }
                    </select>
                    <br />
                    <div style={{
                      padding: '10px',
                      //outline: '#000 auto 1px',
                      marginTop: '30px',
                      marginBottom: '30px',
                      paddingTop: '25px',
                      paddingBottom: '25px',
                      backgroundColor: '#333'
                    }} >
                      <label htmlFor="movie_name" style={labelStyle}>
                        Update Name:
                        <br />
                        
                      </label>
                      <input  style={inputStyle} 
                                type="text" 
                                id="movie_name"
                                name="movie_name"
                                onChange= {this.handleNameChange}
                                value= {this.state.updatedMovie.movie_name || ''}
                                placeholder= "Enter a name"
                        />
                      <br />
                      <br/>
                      <br />
                      <label htmlFor="movie_desc" style={labelStyle}>
                        Update Synopsis:
                        <br />
                        
                      </label>
                      <input  style={inputStyle} 
                                type="text" 
                                id="movie_desc"
                                name="movie_desc"
                                onChange= {this.handleDescriptionChange}
                                value= {this.state.updatedMovie.movie_desc || ''}
                                placeholder= "About the movie ..."
                        />
                    </div>
                    <input type="submit" value="Update Movie" style={{
                            cursor: 'pointer',
                            backgroundColor: 'green',
                            marginBottom: '5px',
                            padding: '8px',
                            color: '#fff',
                            border: '5px solid deepgreen',
                            borderRadius: '5px'
                    }} />
                  </form>
              </div>
                )
                : notAuthorized()
              }
            </div>
        );
    }
}

const inputStyle = {
  borderRadius: '8px',
  border: '2px solid #ccc',
  boxSizing: 'border-box',
  marginTop: '12px',
  padding: '15px',
  width: '80%',
  fontSize: '18px',
  fontWeight: 'bold',
  fontFamily: 'Verdana',
  backgroundColor: 'lightgray'
}

const labelStyle = {
  fontSize: '25px',
  fontFamily: 'Times New Roman',
  color: '#DCC943'
}