import React, { Component } from 'react'

export default class MovieItem extends Component {
    render() {
        return (
            <div    style={{
                        backgroundColor: '#FFFF99',
                        width: '65%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingTop: '12px'
                    }} 
                    key={this.props.movieItem.movieId} >
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
                    {this.props.movieItem.movie_name}
                </h3>
                <p style={{
                    paddingBottom:'15px',
                    textAlign: 'center',
                    fontFamily: 'Verdana',
                    backgroundColor: '#DCC943',
                    marginTop: '-19px',
                    padding: '15px 5px'
                    }}>
                    {this.props.movieItem.movie_desc}
                </p>
            </div>
        )
    }
}
