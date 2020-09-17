import React, { Component } from 'react'

export default class RatingItem extends Component {
    printStars = (count) => {
        let starString = ""
        for (let i = 0; i < count; i++) {
            starString = starString + "☆";
        }
        return starString;
    }

    render() {
        return (
            <div    style={{
                        backgroundColor: '#FFFF99',
                        width: '65%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingTop: '12px'
                    }} 
                    key={this.props.movieItem.ratingId} >
                <br />
                <h3 style={{
                    backgroundColor: "#2B1D12",
                    color:'#fff',
                    padding: '10px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontFamily: 'Copperplate',
                    marginTop: '-20px',
                    position: 'relative'
                    }}>
                    {this.props.movieItem.name}
                    <br />
                    <br />
                    {"Rated: "}
                    <span style={{
                        color: 'yellow',
                        textShadow: '0px 0px 2px #fff'
                    }}>
                        {
                            this.printStars(parseInt(this.props.movieItem.rating)
                                // this.props.ratings.filter(
                                //     ratingsItr => 
                                //         parseInt(ratingsItr.movieId)
                                //         ===
                                //         parseInt(this.props.movieItem.movieId)
                                // )[0].rating
                            )
                        }
                    </span>

                </h3>
                <p style={{
                    paddingBottom:'15px',
                    textAlign: 'center',
                    fontFamily: 'Verdana',
                    backgroundColor: '#DCC943',
                    marginTop: '-19px',
                    padding: '15px 5px'
                    }}>
                    {this.props.movieItem.desc}
                </p>
            </div>
        )
    }
}
