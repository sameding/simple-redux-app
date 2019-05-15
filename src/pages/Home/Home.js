import React, { Component } from 'react';
import { getUserName } from '../../helpers/helper';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchLoyalty, fetchProduct, redeemProduct } from '../../actions/LoyaltyActions';

import { Loyalty } from '../../components';

import './Home.scss';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class Home extends Component {
    
    componentDidMount() {
      let username = getUserName();
      this.props.actions.fetchLoyalty(username);
      this.props.actions.fetchProduct();
    }

    redeemProduct = (productValue) => {
       this.props.actions.redeemProduct(this.props.LoyaltyStore.activeLoyalty.points, productValue);
    }

    displayUserLoyaltyData = () => {
        let {activeLoyalty} =  this.props.LoyaltyStore;
        return activeLoyalty ? 
        <Paper className="loyalty-info"  elevation={1}>
            <div className="loyalty-info-name">
                <Typography gutterBottom variant="h4" component="h3" >
                    Hello {activeLoyalty.username} your points are  :
                </Typography>
            </div>
            <div className="loyalty-info-points">
                <Typography gutterBottom variant="h4">
                    {activeLoyalty.points}
                </Typography>
            </div>
        </Paper> : null;
    }

    displayProduct = () => {
        let {activeLoyalty, activeProduct} =  this.props.LoyaltyStore;
        return activeLoyalty && activeProduct ?
        <div className="product">
            <div className="product-name">
                <Typography gutterBottom variant="h6" className="product-name">
                     {activeProduct.name}
                </Typography>
            </div>
            <div className="product-options">
                {activeProduct.options.map(option => {
                    let clasName = `options-${option.name}`;
                    return <Loyalty key={clasName} 
                                    option={option}
                                    userCurrentPoints={activeLoyalty.points}
                                    redeemProduct={this.redeemProduct}
                    />
                })}
            </div>
        </div> : null;
    }

    render() {
        return (
            <div className={"home-container"}>
                <div className="home-container-main">
                    <div className="home-container-main-title">
                        <Typography gutterBottom variant="h6">
                            Welcome to SuperMiles loyalty program
                        </Typography>
                    </div>
                    {this.displayUserLoyaltyData()}
                    {this.displayProduct()}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        LoyaltyStore: state.LoyaltyStore,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchLoyalty,
                fetchProduct,
                redeemProduct
            },
            dispatch
        ),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
