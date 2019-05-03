import React from "react";
import * as superagent from "superagent";
import Media from "./Media";

class Material extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.fetchMaterial();
	}

	fetchMaterial() {
		let baseurl =
			process.env.NODE_ENV === "development"
				? "http://localhost:3000/"
				: "https://promptbook.herokuapp.com/";
		if (this.props.ids_assoc) {
			let ids = ids_assoc.split(", ");
			let materiales = [];
			ids.map(item_assoc =>
				superagent
					.get(
						baseurl +
							"api/materiales_condicional/" +
							this.props.ids_assoc
					)
					.then(res => materiales.push(res.body))
			);
			this.setState({ material: materiales });
		} else {
			this.setState({ material: null });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.ids_assoc !== this.props.ids_assoc) {
			this.fetchMaterial();
		}
	}

	render() {
		const materiales = this.state.material;
		return (
			<div className="Material">
				{materiales &&
					materiales.map(material => (
						<div key={material._id}>
							<Media data={material} />
						</div>
					))}
				<style jsx>{`
					.Material {
						text-align: center;
					}
					.texto {
						max-width: 600px;
						margin: 12px auto;
						font-family: serif;
					}
				`}</style>
			</div>
		);
	}
}

export default Material;
