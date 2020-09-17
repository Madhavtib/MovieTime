import React, { Component } from 'react'
import RatingItem from './RatingItem';
import checkAccessToken from './checkAccessToken'
import notAuthorized from './notAuthorized'
import axios from 'axios'
import axiosconfig from './axiosconfig'
export default class RatedMovies extends Component {

    state ={
        authorized: false,
        value: 0
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
                this.getratedmovies();
            }
        )
        .catch(
            function(error) {
                console.log(error);
            }
        )
        
    }
    getratedmovies()
    {
       
        axios
        .get(`http://localhost:8763/api/resource-server-api/userratings/${localStorage.getItem("username")}`,axiosconfig())
        .then(
            res => {
                
                this.props.setRatedMovies(res.data);
                // //working on fetching rated movies based on ratings array
                // for (let i = 0; i < res.data.length; i++) {
                //     axios.get(`http://localhost:8763/api/resource-server-apishowmoviesbyid/${parseInt(res.data[i].movieId)}`, axiosconfig())
                //     .then(
                //         ratedMovie => {
                //             this.props.setRatedMovies(ratedMovie.data);
                //         }
                //     )
                //     .catch(
                //         function(error) {
                //             console.log(error);
                //         }
                //     );
                // }

            },//could have used a catch method chaining with error function
            error => {
                console.log(error);
            }
        );
    }
    render() {
        console.log(this.props.ratedMovies);
        return this.state.authorized && this.props.ratedMovies.length !== 0? 
        (
            <div
                style = {{
                    backgroundColor: '#FFFF99',
                    // position: 'fixed',
                    height: '100%',
                    width: '100%'
                }}
            >
                <div style={{
                        backgroundColor: '#FFFF99',
                        //position: 'fixed',
                        width: '100%',
                        height: '100%',
                        marginTop: '0px'
                        }} 
                >
                    {
                    this.props.ratedMovies.map(
                    movieItem => (
                        <RatingItem key={movieItem.ratingId} movieItem= {movieItem} />
                    ))}
                </div>
            </div>
        )
        :
        notAuthorized() 
    }
}