import React, { Component } from 'react'
import checkAccessToken from './checkAccessToken';
import axios from 'axios';
import axiosconfig from './axiosconfig'
import notAuthorized from './notAuthorized';
export default class AddRating extends Component {
    state ={
        unratedMovies: [],
        newRatedMovieId: 0,
        newRating: 0,
        movies: [],
        ratedMovies:[]
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
              axios
            //.get('http://localhost:9091/catalog/showmovies', {
            .get('http://localhost:8763/api/resource-server-api/movies/showmovies', axiosconfig())
            .then(res2 => {
                this.setState({
                movies: res2.data
                });
                axios
                .get(`http://localhost:8763/api/resource-server-api/userratings/${localStorage.getItem("username")}`,axiosconfig())
                .then(
                    res3 => {this.setState({
                        ratedMovies: res3.data,
                        movies: res2.data
                    });
                    this.getunratedmovies();}
                )
                .catch(
                    (error) => console.log(error)
                )
             }
            )
            .catch(function(error) {
            console.log(error);
            });
              
        }
      )
      .catch(
          function(error) {
              console.log(error);
          }
      )
        
       
        
    }

    getunratedmovies = () =>
    {
        let ratedMovieNames = [];
        for (let i = 0; i< this.state.ratedMovies.length; i++) {
          ratedMovieNames.push(this.state.ratedMovies[i].name);
        }
        this.setState({
            unratedMovies: [...this.state.movies.filter(
                movieItr => !ratedMovieNames.includes(movieItr.movie_name)
            )]
        })
            console.log(this.state.movies.length);
            console.log(this.state.ratedMovies.length)
    }

    handleDropDownChange = (e) => {
        if(e.target.value!=="") {
            this.state.unratedMovies.map(
                unratedMovieItr => {
                    if(unratedMovieItr.movie_name === e.target.value){
                      this.setState({
                        newRatedMovieId: unratedMovieItr.movieId
                      })
                    }
                      return this.state.newRatedMovieId;//useless
                  }
              );
            
        }//close of if statement
        else {
            this.setState({
                newRatedMovieId: 0,
                newRating: 0,
                value: e.target.value
            });
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.addRating({
            movieId: this.state.newRatedMovieId,
            userId: localStorage.getItem("username"),
            rating: this.state.newRating
        });
    }

    handleRatingNumber = (e) => {
        this.setState({
            newRating: e.target.value
        });
    }

    render() {
        console.log(this.state.unratedMovies);
        if(this.state.unratedMovies.length===0)
        {
            return (
                <div style={{
                    backgroundColor: '#FFFF99',
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                    paddingTop: '30px'
                    }}>
                       { notAuthorized()}
                </div>
            )
        }
        else 
        {
            return (
                <div style={{
                    backgroundColor: '#FFFF99',
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                    }}>
                    <form   onSubmit={this.handleFormSubmit} 
                            style={{
                                padding: '20px',
                                marginTop: '20px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                textAlign: 'center',
                                borderRadius: '8px',
                                border: '2px solid #ccc',
                                boxSizing: 'border-box',
                                width: '65%',
                                backgroundColor: '#DCC943'
                    }}>
                        <select value={this.state.value} onChange={this.handleDropDownChange} style={{fontSize: '20px'}}>
                            <option value="" >
                            Select Movie--
                            </option>
                            {
                                this.state.unratedMovies.map(
                                    unratedMovieItr => (
                                        <option key={unratedMovieItr.movie_name} value={""+unratedMovieItr.movie_name} >
                                            {unratedMovieItr.movie_name}
                                        </option>
                                    )
                                )
                            }
                        </select>
                        <br />
                        <br />
                        {"Rate it: "}
                        <input type='number' value={this.state.newRating} onChange={this.handleRatingNumber} />
                        <br/>
                        <br />
                        <input type="submit" value="Add Rating" style={{
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
        }
    }
}