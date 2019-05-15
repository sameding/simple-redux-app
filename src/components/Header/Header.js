import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Header.scss';

import { FormattedMessage } from 'react-intl';

//material-ui'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { AccountCircle, ArrowDropDown } from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser, clearStore } from '../../actions/AuthActions';
import { clearAllCacheData, isLoggedIn, } from '../../helpers/helper';
import _ from 'lodash';

class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false
        };

        this.accountDebounced = _.debounce(this.handleRequestClose, 5000);
    }

    componentWillUnmount () {
        this.accountDebounced.cancel();
    }

    handleOpenMenu = event => {
        this.accountDebounced.cancel();
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.accountDebounced.cancel();
        this.setState({open: false});
    };

    handleResetDecay = () => {
        this.accountDebounced.cancel();
    }


    handleMenuDecay = () => {
        this.accountDebounced();
    };

    handleLogout = () => {
        this.setState({open: false});
        //clear storage
        clearAllCacheData();
        //clear store
        this.props.actions.logoutUser();
        this.props.actions.clearStore();
        //Redirect
        this.props.history.push('/login');
    };

    renderDropdownMenu () {
        const anchorEl = document.getElementById('account-button');
        return (
            <Popover
                id="user-menu-list"
                open={this.state.open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={this.handleRequestClose}
                onMouseEnter={this.handleResetDecay}
                onMouseOver={this.handleMenuDecay}
                disableRestoreFocus
            >
                <MenuList className="menu-list">
                    <MenuItem onClick={this.handleLogout}>
                        <FormattedMessage id="header.dropdown.menu.logout" description="btn-text"/>
                    </MenuItem>
                </MenuList>
            </Popover>
        );
    }

    render () {

        return isLoggedIn() ?
            <AppBar className="app-bar" position="static">
                <Toolbar className="tool-bar">             
                    <Button
                        className={'app-bar-button' + (isLoggedIn() ? ' app-bar-dropdown-button' : '')}
                        onClick={this.handleOpenMenu}
                        id="account-button"
                        aria-owns={this.state.open ? 'user-menu-list' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={this.handleOpenMenu}
                        onMouseOut={this.handleMenuDecay}
                    >
                        <AccountCircle className="avatar-icon"/>
                        <FormattedMessage id="header.button.account" description="btn-text"/>
                        <ArrowDropDown/>
                    </Button>
                    {
                        isLoggedIn() &&
                        this.renderDropdownMenu()
                    }
                </Toolbar>
                <div id="segment-title"></div>
            </AppBar>
           : null ;
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(
            {
                logoutUser,
                clearStore
            },
            dispatch
        ),
    };
}

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(Header));
