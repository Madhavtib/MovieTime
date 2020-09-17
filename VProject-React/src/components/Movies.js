import React, { Component } from 'react'
import checkAccessToken from './checkAccessToken'
import MovieItem from './MovieItem'
import notAuthorized from './notAuthorized'
import axios from 'axios'
import axiosconfig from './axiosconfig'
export default class Movies extends Component {
    
    state = {
        authorized: false,
        value:0,
        movies: []
    }

    loadfirst() {
        checkAccessToken()
        .then(
            res => {
                console.log("Authorized!");
                this.setState({
                    authorized: true
                })
                console.log(res.data);
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
        //.get('http://localhost:9091/catalog/showmovies', {
        .get('http://localhost:8763/api/resource-server-api/movies/showmovies', axiosconfig())
        .then(res => 
         {this.setState({
            movies: res.data
          });
          this.props.setmovies(res.data);
        }
        )
        .catch(function(error) {
          console.log(error);
        });
        
    }

    render() {
        if(this.state.value===0)
        {
            this.setState({
                value:1
            })
        this.loadfirst();
        }
        return this.state.authorized ?
                (<div style={{
                        backgroundColor: '#FFFF99',
                        //position: 'fixed',
                        width: '100%',
                        height: '100%',
                        marginTop: '0px'
                        }}
                >
                    {this.state.movies.map(
                    movieItem => (
                        <MovieItem key={movieItem.movieId} movieItem= {movieItem} />
                    ))}
                </div>)
                :
                notAuthorized()
    }
}