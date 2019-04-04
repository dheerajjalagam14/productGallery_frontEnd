import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { GET_PRODUCTS_URL, ROOT_URL } from "../conf/index";
import axios from "axios";

const styles = theme => ({
	appBar: {
		position: "relative"
	},
	icon: {
		color: "red"
	},
	iconBlue: {
		color: "blue"
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper
	},
	heroContent: {
		maxWidth: 600,
		margin: "0 auto",
		padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 4}px`
	},
	heroButtons: {
		marginTop: theme.spacing.unit * 4
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	cardGrid: {
		padding: `${theme.spacing.unit * 2}px 0`
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		"&:hover": {
			cursor: "pointer",
			background: "rgba(0, 0, 0, 0.1)"
		}
	},
	cardMedia: {
		paddingTop: "56.25%" // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing.unit * 6
	}
});

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allProducts: []
		};
	}

	handleShowDetails = product => {
		this.props.getDetailsData(product);
		this.props.isShowingDetails(true);
	};

	addProduct = () => {
		this.props.isAddProduct(true);
	};

	async componentDidMount() {
		await axios.get(`${GET_PRODUCTS_URL}`).then(res => {
			this.setState({ allProducts: [...res.data.data] });
		});
	}

	render() {
		const { classes } = this.props;
		const { allProducts } = this.state;
		return (
			<React.Fragment>
				<main>
					<div className={classes.heroUnit}>
						<div className={classes.heroContent}>
							<Typography component='h1' variant='h3' align='center' color='textPrimary' gutterBottom>
								All Products
							</Typography>
							<div className={classes.heroButtons}>
								<Grid container spacing={16} justify='center'>
									<Grid item>
										<Button variant='outlined' color='secondary' onClick={this.addProduct}>
											Add Product
										</Button>
									</Grid>
								</Grid>
							</div>
						</div>
					</div>
					<div className={classNames(classes.layout, classes.cardGrid)}>
						{/* End hero unit */}
						<Grid container spacing={16}>
							{allProducts.map((product, index) => (
								<Grid item key={index} xs={12} sm={6} md={4} lg={3}>
									<Card className={classes.card} onClick={() => this.handleShowDetails(product)}>
										<CardMedia
											className={classes.cardMedia}
											image={`${ROOT_URL}/${product.photo}`}
											title={product.name}
										/>
										<CardContent className={classes.cardContent}>
											<Typography gutterBottom variant='h5' component='h2'>
												{product.name} (${product.price})
											</Typography>
											<Typography>{product.description.substring(0, 30)}...</Typography>
										</CardContent>
										<CardActions>
											<IconButton className={classes.icon}>
												<Favorite />
											</IconButton>
											<span style={{ fontSize: 16 }}>{product.like_count}</span>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</div>
				</main>
			</React.Fragment>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
