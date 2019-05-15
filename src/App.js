import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import { Header } from './components';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';

import './App.css';

//material-ui
import Grid from '@material-ui/core/Grid';

class App extends Component {

  render() {
    return (
        <div className="App">
            <Header history={this.props.history}/>
            <div className="main-container">
                <Grid container spacing={0} justify="center" alignItems="center" className="main-container-grid">
                    <Grid item xs={12} sm={12} md={8} lg={8} className="main-container-grid">
                        <Grid container alignItems="center" justify="center" className="main-container-grid">
                            <Navigation/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
      },
      dispatch
    )
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
