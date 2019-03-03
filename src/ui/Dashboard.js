import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
// import InfoIcon from '@material-ui/icons/Info';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
// import { mainListItems, openListItems, closedListItems } from './ListItems';
// import SimpleLineChart from './SimpleLineChart';
// import SimpleTable from './SimpleTable';
// import moment from 'moment';
import ListItems from './ListItems';
import NewSmartFund from './NewSmartFund/NewSmartFund';
import SmartFund from './SmartFund';
// import FundCard from './FundCard';
import FundList from './FundList';
// import Stringify from 'react-stringify'
import * as actionCreators from '../config/actions';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <IconButton color="inherit">
                {/* <InfoIcon /> */}
                &nbsp;
                <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>SmartFund</Typography>
            </IconButton>


          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <ListItems />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          {/* { this.props.selected_portfolio === 0 ? ( console.log("this.props.selected_portfolio === ", this.props.selected_portfolio) ) : <h1>31231231231231321</h1> } */}
          {/* { this.props.active_ui === 'new' // this.props.selected_portfolio === -1 && */}
            {/* ?  */}
            {/* <NewSmartFund /> */}
            {/* : null */}
          {/* } */}
          {/* { this.props.active_ui === 'smartfunds' // this.props.selected_portfolio === -1 && */}
            {/* ?  */}
            {/* <FundList />  */}
            {/* : null */}
          {/* } */}
  
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/new'} component={NewSmartFund} />
            <Route 
              exact
              path={process.env.PUBLIC_URL + '/:id'}
              render={({match}) => <SmartFund 
                match={match}  
                />} 
            />
            <Route exact path={process.env.PUBLIC_URL + '/'} component={FundList} />
          </Switch>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps=(state) => {
  const { mm_account, selected_portfolio, mm_account_balance, portfolios, loaded_data, local_currency } = state
  return { mm_account, selected_portfolio, mm_account_balance, portfolios, loaded_data, local_currency }
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(Dashboard));


// {/* 
//             <Typography component="h1" variant="h6" color="inherit" align="right" noWrap className={classes.title}  >
//               <AccountBalanceWalletIcon />
//               {/* &nbsp;Account: { this.props.mm_account_balance } ({ this.props.mm_account.substring(1, 8)  }...) */}
//               &nbsp;Account Balance: { this.props.mm_account_balance } <small>({ this.props.mm_account.substring(1, 6)  })</small>
//             </Typography> 
//             */}