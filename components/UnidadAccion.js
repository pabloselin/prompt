import React from "react";
import getConfig from "next/config";
import * as superagent from "superagent";
import Media from "./Media";

const { publicRuntimeConfig } = getConfig();
const { API_URL, ASSETS_URL } = publicRuntimeConfig;

class UnidadAccion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.fetchMaterial();
	}

	fetchMaterial() {
		superagent
			.get(API_URL + "/materiales_condicional/" + this.props.ids_assoc)
			.then(res => this.setState({ material: res.body }));
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.ids_assoc !== this.props.ids_assoc) {
			this.fetchMaterial();
		}
	}

	render() {
		const materiales = this.state.material;
		return (
			<div>
				{materiales &&
					materiales.map(material => (
						<div key={material._id}>
							<Media tipo={material.tipo} data={material} />
							<p>{this.props.data.texto}</p>
							<p>{material.tipo}</p>
						</div>
					))}
			</div>
		);
	}
}

export default UnidadAccion;
