import React from 'react'

export default function notAuthorized() {
    return (
        <div style = {{
            backgroundColor: '#FFFF99',
            position: 'fixed',
            height: '100%',
            width: '100%',
            fontSize: '30px',
            paddingLeft: 'auto',
            paddingRight: 'auto',
            paddingTop: 'auto',
            paddingBottom: 'auto'
        }}>
           <center>Loading.....</center>
            <br/>
            <center>If it is taking too long, then please login again.</center>
        </div>
    )
}