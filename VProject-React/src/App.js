import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Movies from './components/Movies';
import RatedMovies from './components/RatedMovies';
import AddMovie from './components/AddMovie';
import UpdateMovie from './components/UpdateMovie';
import Home from './components/Home';
import axios from 'axios';
import axiosconfig from './components/axiosconfig'
import getAccessToken from './components/getAccessToken'
import logout from './components/logout';
import AddRating from './components/AddRating';
class App extends Component {

  constructor(props)
  {
    super(props)
  this.state = {
    movies: [],
    password: '',
    ratedMovies: [],
    // ratings: [],
    solidYellow: '#DCC943',
    titleBlack: '#333',
    pastelYellowBackground: '#FFFF99',
    navbarBlue: '#2F3274',
    fadedBlueBackground: '#7FD1E8',
    clientId: 'public',
    clientSecret: 'private',
    grant_type: 'password',
    authorized: false
  }
  this.handleLogin=this.handleLogin.bind(this);
}

  componentDidMount() {
   
  }

  addMovie = (newMovie) => {

    axios
    .post('http://localhost:8763/api/resource-server-api/addmovies/addmovie', newMovie,axiosconfig()
    )
    .then(res => {
      this.setState({
      movies: [...this.state.movies, res.data]
      }
      );
      alert("Movie Name: " +
      newMovie.movie_name +
      "\n\nSuccessfully updated!")
    }
    )
    
    .catch(function(error) {
      console.log(error);
      console.log("You don't have admin access");
      alert("You don't have admin access to add movies.");
    });
   
  }

  updateMovie = (updatedMovie) => {

    axios
      .post(`http://localhost:8763/api/resource-server-api/addmovies/addmovie`, 
            updatedMovie,axiosconfig())
      .then(res =>  {
        this.setState({
          movies: [...this.state.movies.filter(movieItr => movieItr.movieId!==updatedMovie.movieId), 
                  res.data]
        });
        let tempRatedMovies = [...this.state.ratedMovies.filter(
          ratedMovieItr => ratedMovieItr.movieId !== res.data.movieId
        )];
        if(tempRatedMovies.length !== this.state.ratedMovies.length)
        {
          this.setState({
            ratedMovies: [...tempRatedMovies,res.data]
          });
        }
        alert("Movie Name: " +
            updatedMovie.movie_name +
            "\n\nSuccessfully updated!");
          
      })
      .catch(
        function (error) {console.log(error);
          alert("You don't have admin access to update movies.");
        }

      );
      
  }
  addRating = (newRatedMovie) => {
    console.log(newRatedMovie);
    axios
      .post('http://localhost:8763/api/resource-server-api/addratings/ratemovie',newRatedMovie,axiosconfig())
      .then(
       res=>{
         alert("Movie Rated!");
       }
      )
      .catch(
        function(error) {console.log(error);}
      )
    
  }
  //login
   handleLogin (receivedUsername, receivedPassword){
    this.setState(
      {
        userId: receivedUsername
      }
    )
    const token = Buffer
                        .from(`${this.state.clientId}:${this.state.clientSecret}`, 'utf8')
                        .toString('base64');
    var bodyFormData = new FormData();
    const data= {
            grant_type: this.state.grant_type,
            username: receivedUsername,
            password: receivedPassword
    };
    bodyFormData.append('grant_type',data.grant_type)
    bodyFormData.append('username',data.username)
    bodyFormData.append('password',data.password)
    const config = {
            headers: {
                'Authorization': `Basic ${token}`,
                'content-type': `application/x-www-form-urlencoded`
            }
    };
    console.log("Configurations:");
    console.log(data,config);
    axios   
    .post('http://localhost:8763/api/authserver/oauth/token', bodyFormData, config)
    .then(
        response => {
            localStorage.setItem("accesstoken", JSON.stringify(response.data.access_token));
            localStorage.setItem("username",data.username)
            console.log(response.data);
            console.log(getAccessToken());
            this.setState({
              //userId: receivedId,
              ratedMovies: [],
              ratings: [],
              userId: receivedUsername,
              password: '',
              authorized: true
        
            });
        }
    )

    .catch(
        (error) => console.log(error)
    );
   
    
  }
  setmovies= (receivedmovies) =>
  {
    this.setState(
      {
        movies: receivedmovies
      }
    )
  }
  setRatedMovies = (ratedMovie) => {
    this.setState({
      ratedMovies: ratedMovie
    });
  }

  // setRatings = (newRatings) => {
  //   this.setState({
  //     ratings: newRatings
  //   });
  // }
logouthandler()
{
  logout()
 this.props.history.push("/home");
}
  render() {
    
    return (
      //this.state.movies.length!==0 ?
      <BrowserRouter>
        <header style={headerStyle}>
          <h1 
            style={{
              fontFamily: "Brush Script MT", 
              fontSize: "60px",
              paddingTop: '25px',
              paddingBottom: '-5px',
              marginTop: '-10px'
            }} 
          >
            Movie Time
          </h1>
          <h3 style = {{
            textAlign: 'right',
            marginLeft: '73%',
            fontWeight: 'normal',
            paddingBottom: '0px',
            display: 'flex',
            justifyContent: 'flex-end'
          }} > 
            Active User ID : {" "}
              <span style={{
                color: 'lightblue',
                textShadow: '0px 0px 3px blue',
                fontWeight: 'bolder'
              }}>
                {localStorage.getItem("username") !==null || this.state.authorized? this.state.userId? this.state.userId:localStorage.getItem("username") :''}
              </span>
              
                {
                 localStorage.getItem("username")!==null || this.state.authorized ? 
              <form onSubmit={this.logouthandler}>
                <input type="submit" value="Logout" style={{
                            cursor: 'pointer',
                            backgroundColor: 'green',
                            marginBottom: '5px',
                            padding: '8px',
                            color: '#fff',
                            border: '5px solid deepgreen',
                            borderRadius: '5px'}}/>
              </form>
                : <div></div>
                }
  
          </h3>
          
        </header>
        <div 
          className="navbar" 
          style={{ 
              backgroundColor: "#DCC943", 
              padding:"10px", 
              textAlign: "center",
              width: '100%',
              marginTop: '-19px',
              //textShadow: '1px 1px 2px #333',
              fontWeight: 'bolder'
          }}
        >
          <Link to="/home" style={linkStyle}>Home</Link>
          |
          <Link to="/showmovies" style={linkStyle}>All Movies</Link>
          |
          <Link to="/showratedmovies" style={linkStyle}>User Ratings</Link>
          |
          <Link to="/addmovie" style={linkStyle}>Add Movie</Link>
          |
          <Link to="/updatemovie" style={linkStyle}>Update Movies</Link>
          |
          <Link to="/addrating" style={linkStyle}>Add Ratings</Link>
        </div>
        <div>
          {/* <Route exact path="/" render = { props => (
            <React.Fragment>
                <Home />
            </React.Fragment>
          )} /> */}
          <Route exact path={["/","/home"]} render = { props => (
            <React.Fragment>
                <Home 
                  handleLogin= {this.handleLogin}
                  
                />
            </React.Fragment>
          )} />
          <Route exact path="/showmovies" render= { props => (
            <React.Fragment>
              <Movies setmovies= {this.setmovies} />
            </React.Fragment>
          )} />
          <Route exact path="/showratedmovies" render = { props => (
            <React.Fragment>
                <RatedMovies 
                  ratedMovies ={this.state.ratedMovies}
                  // ratings = {this.state.ratings}
                  // setRatings ={this.setRatings}
                  setRatedMovies = {this.setRatedMovies}
                />
            </React.Fragment>
          )} />
          <Route exact path="/addmovie" render = { props => (
            <React.Fragment>
                <AddMovie addMovie= {this.addMovie} />
            </React.Fragment>
          )} />
          <Route exact path="/updatemovie" render = { props => (
            <React.Fragment>
                <UpdateMovie updateMovie={this.updateMovie} />
            </React.Fragment>
          )

          } />
          <Route exact path="/addrating" render = { props => (
            <React.Fragment>
                <AddRating  movies = {this.state.movies} 
                            ratedMovies = {this.state.ratedMovies} 
                            addRating = {this.addRating}
                />
            </React.Fragment>
          )

          } />
        </div>
        
      </BrowserRouter>
      /*:
      (<div style={homePageStyle}>
            Loading...
      </div>)*/
      
    );
  }
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  textDecoration: 'none',
  marginBottom: '0px'
}

const linkStyle = {
  //color: '#FFF',
  textDecoration: 'none',
  marginTop: '-20px',
  padding: '10px 30px',
  fontFamily: 'Copperplate',
  fontSize: '18px'
  
}

export default App;