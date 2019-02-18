import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './ui/Dashboard'
import { connect } from 'react-redux';



class Router extends React.Component {
    state = {
      open: true,
    
    };

    render() {
        const { classes } = this.props;

        return (
        <Switch>
            {/* <Route exact path='/dashboard/' component={Dashboard} /> */}
            {/* <Route 
                exact 
                path={`/dashboard/${this.props.selected_portfolio}`} 
                component={Dashboard} 
                match={match} 
            />
 */}

            {/* <Route 
                // exact  
                // path={process.env.PUBLIC_URL + '/dashboard/:id'}
                path={process.env.PUBLIC_URL + '/'}
                render={
                    ({match}) => 
                        <Dashboard 
                            // match={match} 
                            account={this.state.account} 
                        />
                } 
            /> */}

            <Route exact path={process.env.PUBLIC_URL + '/'} component={Dashboard} />
            {/* <Route exact path={process.env.PUBLIC_URL + '/'} component={Dashboard} /> */}
        </Switch>
        )
    }
}

const mapStateToProps=(state) => {
    const { selected_portfolio } = state
    return { selected_portfolio }
  }

export default connect (mapStateToProps)(Router)

