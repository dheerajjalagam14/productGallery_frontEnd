import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Favorite from "@material-ui/icons/Favorite";
import ArrowBack from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { UPDATE_PRODUCT_URL, ROOT_URL } from "../conf/index";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const styles = theme => ({
	appBar: {
		position: "relative"
	},
	icon: {
		color: "red",
		"&:hover": {
			color:"white",
			backgroundColor: "RGBA(255, 0, 0, 0.5)" }
	},
	favicon:{
		color:"red"
	},
	iconLiked: {
		color: "white",
		backgroundColor: "RGBA(255, 0, 0, 0.7)",
		"&:hover": {
			backgroundColor: "RGBA(0, 0, 255, 0.8)"
		}
	},
	iconBlue: {
		color: "blue"
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper
	},
	heroContent: {
		maxWidth: "90%",
		margin: "0 auto",
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
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
		flexDirection: "column"
	},
	cardMedia: {
		height:190,
		paddingTop: "56.25%" // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing.unit * 6
	},
	backBtn: {
		position: "absolute"
	},
	control: {
		padding: 10,
		height: 500
	}
});

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			state: "",
			isLiked: false,
			localCount: 0
		};
	}

	handleBackHome = () => {
		this.props.isShowingDetails(false);
	};

	handleLike = () => {
		this.setState({ isLiked: true, localCount: this.state.localCount + 1 });
		let { detailsData } = this.props;
		let new_like_count = detailsData.like_count + 1;
		let product = { ...detailsData, like_count: new_like_count };
		axios.put(`${UPDATE_PRODUCT_URL}`, { product: product }).then(res => {
			NotificationManager.success("You liked this product.", "Like!", 5000);
		});
	};

	componentDidMount() {
		let { detailsData } = this.props;
		this.setState({ localCount: detailsData.like_count });
	}

	render() {
		const { classes, detailsData } = this.props;
		const { isLiked, localCount } = this.state;

		return (
			<React.Fragment>
				<main>
					<div className={classes.heroUnit}>
						<div className={classes.heroContent}>
							<Fab
								size='small'
								aria-label='Back'
								onClick={this.handleBackHome}
							>
								<ArrowBack />
							</Fab>
							<Typography component='h2' variant='h3' align='center' color='textPrimary' gutterBottom>
								Product Details
							</Typography>
						</div>
					</div>
					<div className={classNames(classes.layout, classes.cardGrid)}>
						{/* End hero unit */}
						<Grid container spacing={16}>
							<Grid item xs={12} sm={5} md={5} lg={5}>
								<Card>
									<CardMedia
										className={classes.cardMedia}
										image={`${ROOT_URL}/${detailsData.photo}`}
										title='Product Image'
									/>
									<CardActions>
										<IconButton className={classes.favicon}>
											<Favorite />
										</IconButton>
										<span style={{ fontSize: 16 }}>{localCount}</span>
										{!isLiked && (
											<IconButton
												className={classes.icon}
												style={{ marginLeft: "auto" }}
												onClick={this.handleLike}
											>
												<ThumbUp />
											</IconButton>
										)}
										{isLiked && (
											<IconButton className={classes.iconLiked} style={{ marginLeft: "auto" }}>
												<ThumbUp />
											</IconButton>
										)}
									</CardActions>
								</Card>
							</Grid>
							<Grid item xs={12} sm={7} md={7} lg={7}>
								<Typography variant='h5' align='left' color='textPrimary' gutterBottom>
									{detailsData.name} ($ {detailsData.price})
								</Typography>
								<Typography component='p' align='left' color='textPrimary' gutterBottom>
									{detailsData.description}
								</Typography>
							</Grid>
						</Grid>
					</div>
				</main>
			</React.Fragment>
		);
	}
}

Product.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);
