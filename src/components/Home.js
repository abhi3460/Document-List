import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const container = {
    display: 'flex',
    justifyContent: 'center',
    margin: '15vh 0',
};

const linkStyle = {
    backgroundColor: 'rgb(16, 110, 190)',
    padding: '10px 24px',
    fontSize: '18px',
    textDecoration: 'none',
    color: 'white'
}

class Home extends Component {
    render() {
        return (
            <div style={container}>
                <Link to={"/document-list"} style={linkStyle}>
                    Let's go to Document List
                </Link>
            </div>
        );
    }
}

export default connect(null, {})(Home);