import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
class Home extends Component {

        state ={
            userId: '',
            password: '',
            authorized: false,
            value: 0
        }
    componentDidMount(){
       this.refreshhome();
    }
    refreshhome = () =>
    {
        if(localStorage.getItem("username"))
        {
            this.setState(
                {
                    authorized: true
                }
            )
        }
        console.log(this.state.authorized)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("User ID:"+this.state.userId);
        console.log("Password: "+this.state.password);
        this.props.handleLogin(this.state.userId,this.state.password)
        this.setState({
            userId: '',
            password: ''
        });
        //window.location.reload(false);
        console.log(this.state.authorized,localStorage.getItem("username"))
    }

    onClickSubmitButton = (e) => {
        //console.log("Submit button clicked");
       
    }

    handleUserId = (e) => {
        this.setState({
            userId: e.target.value
        });
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div style={homePageStyle}>
                {
                    localStorage.getItem("username")===null ? (
                        <form   style = {{
                            marginTop: '-65px',
                            marginBottom: '10px',
                            outline: '#000 auto 1px',
                            paddingBottom: '6px',
                            paddingTop: '5px',
                            backgroundColor: '#333',
                            color: '#DCC943',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '40%'
                        }}
                        onSubmit ={this.handleSubmit}
                >
                    <label htmlFor = 'usedId' >USERNAME: </label>
                    <input 
                        type = 'text'
                        placeholder = 'Enter your ID..'
                        id = 'usedId'
                        name = 'usedId'
                        onChange = {this.handleUserId}
                        value = {this.state.userId} 
                        style = {{
                            marginLeft: '20px',
                            marginRight: '20px',
                            height: '21px'
                        }}
                    />
                    <br />
                    <label htmlFor = 'password' >PASSWORD: </label>
                    <input 
                        type = 'password'
                        placeholder = 'Enter your Password..'
                        id = 'password'
                        name = 'password'
                        onChange = {this.handlePassword}
                        //value = {this.state.userId === 0 ? 
                                    //'': this.state.userId}
                        value = {this.state.password}
                        style = {{
                            marginLeft: '20px',
                            marginRight: '20px',
                            height: '21px'
                        }}
                    />
                    <br/>
                    <input  type = 'submit' 
                            value = 'Submit' 
                            onClick = {this.onClickSubmitButton}
                            style = {{
                                backgroundColor: '#DCC943',
                                color: 'black',
                                fontWeight: 'normal',
                                padding: '6px 10px',
                                outline: 'auto auto 4px',
                                marginLeft: '5px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                    />
                </form>
                    )
                    : <div> You have been logged in.</div>
                }
                <h2 style={{color:"black", 
                            //textShadow: '1px 1px 0px #000',
                            textShadow: '0px 0px 1px #000',
                            marginTop: '40px',
                            width: '60%',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                }}>
                    This is the homepage. This webpage allows you to add 
                    movies and rate them according to your liking. You 
                    may also update your previous ratings based on your 
                    new interests. Hope you have a great time browsing 
                    through our collection! <br />
                    <span style={{color: '#2F3274'}}>
                        Click on the links above to get started!
                    </span>
                </h2>
                
                
            </div>
        );
    }
}

const homePageStyle = {
    backgroundColor: '#FFFF99',
    textAlign: 'center',
    fontSize: '30',
    fontStyle: 'italic',
    lineHeight: '43px',
    fontWeight: 'bold',
    paddingTop: '10%',
    position: 'fixed',
    width: '100%',
    height: '100%'
}
export default withRouter(Home);