import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { FormattedMessage } from 'react-intl';
import './Loyalty.scss';



class Loyalty extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleUpdateEvent = () => {
   this.props.redeemProduct(this.props.option.value);
   this.handleClose();
  };

  Transition = (props) => {
    return <Slide direction="up" {...props} />;
  }
  
  render() {
    
    const { option, userCurrentPoints } = this.props;

    let clasName = `options-${option.name}`;
    let canRedeemMessage = `You are about to redeem ${option.value} points`;
    let canNotRedeemMessage = `You can not Redeem this option`;
    let canRedeem = userCurrentPoints >= option.value;

    return (
      <div key={clasName}>
        <Button   variant="outlined"  id={clasName} onClick={this.handleClick} >
            {option.name} {option.value}
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography gutterBottom component="p" className="product-name">
                {canRedeem ? canRedeemMessage : canNotRedeemMessage}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
                onClick={this.handleClose}
                variant="outlined"
                color="secondary"
                size="medium"
            >
                <FormattedMessage
                    id='redeem.action.cancel'
                    description='btn-text'
                />
            </Button>
            <Button
                onClick={this.handleUpdateEvent}
                color="secondary"
                variant="contained"
                disabled={!canRedeem}
            >
                <FormattedMessage
                    id="redeem.action.apply"
                    description="btn-text"
                />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Loyalty.propTypes = {
  option: PropTypes.object.isRequired,
  userCurrentPoints: PropTypes.number.isRequired,
  redeemProduct: PropTypes.func
};

export default Loyalty;
   