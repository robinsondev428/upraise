import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

// Import Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Trend from 'react-trend';

// Import Components
import Loading from 'components/App/Loading/Loading';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AuthService from '../../services/AuthService';

// Import Styles
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 95,
    boxShadow: 'none',
    border: '1.3px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 0,
    backgroundColor: '#f3f3f3',
    position: 'relative',
  },
  typographyMain: {
    display: 'inline-block',
  },
  loadingCircular: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
  },
  trendContainer: {
    position: 'absolute',
    right: 20,
    top: 23.5,
  },
  typographyText: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.33,
  },
});

class AvailableFunds extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      availableFunds: [],
      accountBalanceHistory: [],
      endpoint: 'http://localhost:3000',
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.availableFunds(this.props.id)
      .then(res => {
        if (res) {
          const amount = res[0].available_funds
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            .replace('.', ',');

          this.setState({
            isLoading: true,
            accountBalanceHistory:
              res[0].additionals[0].account_balance_history,
            availableFunds: amount,
          });
        }
      })
      .catch(() => {
        /* just ignore */
      });
  }

  render() {
    const { classes } = this.props;
    const { isLoading, availableFunds, accountBalanceHistory } = this.state;
    const accountBalanceHistoryArray = JSON.parse(`[${accountBalanceHistory}]`);

    const socket = socketIOClient(`${this.state.endpoint}`);

    socket.on('new notification', id => {
      if (id === this.props.id) {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.Auth.availableFunds(this.props.id)
              .then(res => {
                if (res) {
                  const amount = res[0].available_funds
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    .replace('.', ',');

                  this.setState({
                    isLoading: true,
                    accountBalanceHistory:
                      res[0].additionals[0].account_balance_history,
                    availableFunds: amount,
                  });
                }
              })
              .catch(() => {
                /* just ignore */
              });
          },
        );
      }
    });

    return (
      <Paper className={classes.root} elevation={1}>
        {isLoading ? (
          <Fragment>
            <div>
              <Typography variant="subtitle1">
                <FormattedMessage {...messages.availableFunds} />
              </Typography>
              <span className={classes.typographyText}>
                {availableFunds}
                &nbsp;
                <Typography
                  variant="subtitle1"
                  className={classes.typographyMain}
                >
                  PLN
                </Typography>
              </span>
              <Trend
                className={classes.trendContainer}
                width={115}
                height={40}
                smooth
                autoDraw
                autoDrawDuration={1500}
                autoDrawEasing="ease-out"
                data={accountBalanceHistoryArray}
                gradient={['#15a0dd']}
                radius={0}
                strokeWidth={2.5}
                strokeLinecap="square"
              />
            </div>
          </Fragment>
        ) : (
          <div className={classes.loadingCircular}>
            <Loading />
          </div>
        )}
      </Paper>
    );
  }
}

AvailableFunds.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AvailableFunds);
