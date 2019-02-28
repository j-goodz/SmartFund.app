import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as actionCreators from '../config/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import classnames from 'classnames';
import CardLineChart from './CardLineChart';
import PieChart from './PieChart';
import ReactSwipe from 'react-swipe';
import Divider from '@material-ui/core/Divider';
import TradingViewWidget from 'react-tradingview-widget';


const styles = {
  card: {
    // maxWidth: '100%' //645,
    padding: '0px',
  },
  media: {
    height: 140,
  },
//    cardPadding: {    
//      padding: '30px',   
//   },
};


export class FundCard extends Component {
    constructor(props) {
        super(props)
    //  this.state = {
      //   portfolios: null,
      //   // portfolio_id: this.props.portfolios
      // }
    }  
    componentDidMount() {
    }
    percIncrease(a, b) {
        let percent;
        if(b !== 0) {
            if(a !== 0) {
                percent = (b - a) / a * 100;
            } else {
                percent = b * 100;
            }
        } else {
            percent = - a * 100;            
        }       
        return Math.floor(percent);
      }
               
    render() {

        const { classes } = this.props;
        const portfolio = this.props.portfolio 
        let verboseAssetList = []
        let inceptionValue = 0 
        let marketValue = 0 

        for ( let asset of portfolio.inception_allocations ) {
            inceptionValue = (inceptionValue + ( asset.price * asset.amount ))
            marketValue = (marketValue + ( asset.amount * this.props.spot_price.RAW[asset.ticker][this.props.local_currency].PRICE ))
            verboseAssetList.push(asset.name)
        }
        const percentChange = this.percIncrease( inceptionValue, marketValue )
        let subheader = '' 
        if (portfolio.status === 'Open') {
            subheader = 'Created: ' + moment.unix(portfolio.inception_date).format('lll')
        } else {
            subheader = 'Liquidated: ' + moment.unix(portfolio.close_date).format('lll')
        }
 
 
        // const percentColour
        //  = (() => {
        //     if (percentChange > 0) {
        //         return 'primary'
        //     } else {
        //         return 'error'
        //     }
        // })

        // if (percentChange >== 0) {
        //     percentColour === 'primary'
        // } else {
        //     percentColour === 'error'
        // }
        let reactSwipeEl;
        // console.log("classes", classes)

        return (
            // <div >
                <Card className={classes.card}  >
                 <CardActionArea >
                {/*    <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title={ portfolio.portfolio_name }
                    /> */}


                <CardHeader 
                onClick={() => { this.props.setSelectedFund(portfolio.id)}}
                avatar={
                    <Avatar aria-label="Portfolio" className={classes.avatar} >
                        {/* { portfolio.portfolio_name.charAt(0).toUpperCase() } */}
                        {/* { portfolio.inception_allocations.length } */}
                        {/* <Typography component="p" > */}
                            {
                                percentChange >= 0
                                ? 
                                    <Typography component="p" color={'primary'}>
                                        +{ percentChange }%
                                    </Typography>
                                : 
                                    <Typography component="p" color={'error'}>
                                        { percentChange }%
                                    </Typography>   
                            }
                        {/* </Typography> */}
                        
                    </Avatar>
                }
                action={
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                }
                title={ portfolio.portfolio_name }
                subheader={ subheader }
                />
                    

                    <div>
                        <ReactSwipe
                            className="carousel"
                            swipeOptions={{ continuous: true }}
                            ref={el => (reactSwipeEl = el)}
                        >
                            <div onClick={() => reactSwipeEl.next()}><PieChart portfolioId={portfolio.id}  /></div>
                            {/* <div onClick={() => reactSwipeEl.next()}><CardLineChart portfolioId={portfolio.id}  /></div>
                            <div onClick={() => reactSwipeEl.next()}><TradingViewWidget symbol="BTCUSD"
                                    // theme={Themes.DARK}
                                    // locale="fr"
                                    autosize
                                />
                             </div> */}
                        </ReactSwipe>
                        {/* <button onClick={() => reactSwipeEl.next()}>Next</button> */}
                        {/* <button onClick={() => reactSwipeEl.prev()}>Previous</button> */}
                    </div>


                    <Divider />
                    {/* <PieChart portfolioId={portfolio.id}  /> */}
                    {/* <CardLineChart portfolioId={portfolio.id} /> */}
                    
                    <CardContent 
                    onClick={() => { this.props.setSelectedFund(portfolio.id)}}
                    >
                        {/* <Typography gutterBottom variant="h5" component="h2">
                            { portfolio.portfolio_name }
                        </Typography> */}
                        {/* <Typography component="p">
                            Created: { moment.unix(portfolio.inception_date).format('lll') }
                        </Typography> */}
                        {/* <hr />
                        <Typography component="p">
                            <b>{ verboseAssetList.join(', ') }</b>
                        </Typography> */}
                        {/* <hr /> */}
                        <Typography component="p">
                            Inception Value: { inceptionValue.toFixed(2) } {this.props.local_currency}
                        </Typography>
                        <Typography component="p">
                            Market Value { marketValue.toFixed(2) } {this.props.local_currency}
                        </Typography>
                        {/* <Typography component="p">
                            Percent Change: { percentChange }
                        </Typography> */}
                        {/* <hr />
                        <Typography component="p">
                            Status: { portfolio.status }
                        </Typography> */}
                    </CardContent>
                </CardActionArea>
                <Divider />
                <CardActions>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    {/* <IconButton
                        className={classes(classes.expand, {
                        [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton> */}




{/* 
                    <Button size="small" color="primary">
                    Share
                    </Button> */}
                    <Button size="small" color="primary"  onClick={() => { this.props.setSelectedFund(portfolio.id)}} align='right'>
                        Manage
                    </Button>
                </CardActions>
                </Card> 
            // </div>
        )
    }
}

FundCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps=(state) => {
    const { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency } = state
    return { portfolios, mm_account, selected_portfolio, historical_price_data, spot_price, local_currency }
    // return state
}

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(FundCard))
// export default connect(mapStateToProps, actionCreators)(FundCard);
// export default FundCard
// export default connect(mapStateToProps)(withStyles(styles)(FundCard))
// export default withStyles(styles)(FundCard)
