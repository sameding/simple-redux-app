
import React, { Component } from 'react'

import './Login.scss';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl'
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import  { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser } from '../../actions/AuthActions'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { ...props, username: '', password: '' };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let payload={
      "username":this.state.username,
      "password":this.state.password,
    }
    this.props.actions.loginUser(payload);
  }

  renderRedirect() {
    return this.props.UserStore.notification === 1 ? <Redirect to="/"></Redirect> : null; 
  }

  displayError() {
    return this.props.UserStore.notification === 2 ?
          <Typography gutterBottom variant="h6" className="text-center" id="auth-failure">
            <FormattedMessage id="auth.failure" description="text"/>
          </Typography> : null
  }

  render() {
    return (
        <main className='main'>
          <CssBaseline />
          <Paper className='paper'>
            <form onSubmit={this.handleSubmit} className='form'>
              <Avatar className='avatar'>
                <LockOutlinedIcon />
              </Avatar>
              <Typography gutterBottom variant="h5" className="text-center">
                  <FormattedMessage id="auth.signin" description="btn-text"/>
              </Typography>
              { this.displayError() }
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">
                  <FormattedMessage id="auth.username" description="btn-text"/>
                </InputLabel>
                <Input id="username" name="username"   value={this.state.username} onChange={this.handleUsernameChange} autoComplete="username" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">
                  <FormattedMessage id="auth.password" description="btn-text"/>
                </InputLabel>
                <Input name="password"  value={this.state.password} onChange={this.handlePasswordChange} type="password" id="password" autoComplete="current-password" />
              </FormControl>

              <Button label="Submit" type="submit" fullWidth variant="contained" color="primary" className='submit'>
                <FormattedMessage id="auth.signin" description="btn-text"/>
              </Button>
            </form>
            { this.renderRedirect() }
          </Paper>
        </main>
    );
  }
}


function mapStateToProps(state) {
    return {
        UserStore: state.UserStore,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
              loginUser,
            },
            dispatch
        ),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
