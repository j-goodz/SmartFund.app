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
import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};



export class FundCard extends Component {
    constructor(props) {
        super(props);
    }  
    
    
    render() {
        const { classes } = this.props;
        return (
            <div>
        
                <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
                </Card>
            </div>
        )
    }
}

// export default FundCard



// function FundCard(props) {
//   return (
//   );
// }

FundCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps=(state) => {
    const { portfolios, mm_account, selected_portfolio, historical_price_data } = state
    return { portfolios, mm_account, selected_portfolio, historical_price_data }
}
  
export default connect(mapStateToProps, actionCreators)(FundCard);
  
