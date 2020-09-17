import React, { Component } from 'react'
import checkAccessToken from './checkAccessToken';
import notAuthorized from './notAuthorized';
export default class AddMovie extends Component {
    state = {
        movie_name: '',
        movie_desc: '',
        authorized: false
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
            }
        )
        .catch(
            function(error) {
                console.log(error);
            }
        )
        
    }
    onChangeInput = (e) => this.setState({
            [e.target.name]: e.target.value
        });

    onSubmitMovie = (e) => {
        e.preventDefault();
        this.props.addMovie(this.state);
        this.setState({
            movie_name: '',
            movie_desc: ''
        });
    }
        
    render() {
        return (
            <div style={{
                backgroundColor: '#FFFF99',
                width: '100%',
                height: '100%',
                position: 'fixed'
            }}>
                {
                localStorage.getItem("username") ? (
                <div style={{   textAlign: "center", 
                                width: '45%', 
                                height: 'auto',
                                //marginTop: '30px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                outline: 'gray auto 1px',
                                backgroundColor: '#333',
                                color: '#DCC943'
                                //position: 'static'
                                
                            }}>
                    
                    
                    <form onSubmit={this.onSubmitMovie} style={{
                        padding: '15px',
                        borderRadius: '8px',
                        marginTop: '30px'
                    }}>
                        <div className="rows">
                        <div className="column">
                        <label style={{labelStyle}} htmlFor="movie_name">MOVIE NAME</label>
                        <input  type='text' 
                                id="movie_name" 
                                name="movie_name"
                                style={inputStyle}
                                onChange={this.onChangeInput}
                                value={this.state.movie_name}
                                placeholder= "Enter a name"
                        />
                        
                        </div>
                        
                        <div className="column" style={{
                            marginTop: '15px'
                        }}>
                        
                        <label style={{labelStyle}} htmlFor="movie_desc">THE SYNOPSIS</label>                 
                        <input  type='text' 
                                id="movie_desc" 
                                name="movie_desc"
                                style={inputStyle}
                                onChange={this.onChangeInput}
                                value={this.state.movie_desc}
                                placeholder= "About the movie.."
                        />
                        </div>                      
                        </div>
                        
                        <input  type="submit"
                                style={submitStyle} 
                                value="Submit"
                                
                        />
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
    margin: '8px',
    padding: '15px',
    width: '80%',
    fontSize: '18px'
    
}

const submitStyle = {
    width: '25%', 
    backgroundColor: '#4CAF50', 
    color: '#fff', 
    margin: '15px 0px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    border: 'none',
    padding: '10px'
}

//absolutely useless
const labelStyle = {
    textDecorationColor: 'purple',
    fontWeight: 'bold'
}

