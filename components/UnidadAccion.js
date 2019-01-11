import React from "react";
import * as superagent from "superagent";
import Media from "./Media";

class UnidadAccion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.fetchMaterial();
	}

	fetchMaterial() {
		let baseurl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : process.env.BASE_URL;
		if (this.props.ids_assoc) {
			superagent
				.get(
					baseurl + "api/materiales_condicional/" + this.props.ids_assoc
				)
				.then(res => this.setState({ material: res.body }));
		} else {
			this.setState({material: null});
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
			<div className="unidadAccion">
				{materiales &&
					materiales.map(material => (
						<div key={material._id}>
							<Media tipo={material.tipo} data={material} />
						</div>
					))}
					<p className="texto">{this.props.data.texto}</p>
				<style jsx>{`
					.unidadAccion {
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

export default UnidadAccion;
