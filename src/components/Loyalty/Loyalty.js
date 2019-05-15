import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import './Loyalty.scss';

class Loyalty extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleUpdateEvent = () => {
   this.props.redeemProduct(this.props.option.value);
   this.handleClose();
  };


  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
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
        <Popover
          id="options-item"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}

          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}

          PaperProps={{
              className: 'warning-popover-paper'
          }}
        >
          
          <Typography gutterBottom component="p" className="product-name">
            {canRedeem ? canRedeemMessage : canNotRedeemMessage}
          </Typography>
          <div className='popover-bottom'>
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
                </div>
        </Popover>
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
