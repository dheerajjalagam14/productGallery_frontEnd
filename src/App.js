import React, { Component, Fragment } from "react";
import Home from "./components/Home";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDetails: false,
			isAddProduct: false,
			detailsData: {}
		};
	}

	componentDidMount() {
		// console.log("didmount");
	}

	isShowingDetails = flag => {
		this.setState({ isDetails: flag });
	};

	isAddProduct = flag => {
		this.setState({ isAddProduct: flag });
	};

	getDetailsData = product => {
		this.setState({ detailsData: product });
	};

	render() {
		const { isDetails, detailsData, isAddProduct } = this.state;
		return (
			<Fragment>
				<NotificationContainer />
				{isAddProduct && <AddProduct isAddProduct={this.isAddProduct} />}
				{!isAddProduct && !isDetails && (
					<Home
						isShowingDetails={this.isShowingDetails}
						getDetailsData={this.getDetailsData}
						isAddProduct={this.isAddProduct}
					/>
				)}
				{!isAddProduct && isDetails && (
					<Product isShowingDetails={this.isShowingDetails} detailsData={detailsData} />
				)}
			</Fragment>
		);
	}
}

export default App;
