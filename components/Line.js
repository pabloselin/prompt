import React from "react";
import colors from "../lib/colors";

class Line extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: this.props.width * 100
		}
	}

	componentDidMount() {
		
	}
	render() {
		return (
			<div>
				<span className={`${this.props.tipo} line`}/>
				<style jsx>{`
					.line {
						display: block;
						background-color: #ccc;
						width: ${this.state.width}%;
						height: 6px;		
						margin-bottom: 2px;
						border-radius: 3px;
					}
					.descripcion {
						background-color: ${colors.descripcion};
					}
					.cancion {
						background-color: ${colors.cancion};
					}
					.dialogo {
						background-color: ${colors.dialogo};
					}
					.letra {
						background-color: ${colors.letra};
					}
					.monologo {
						background-color: ${colors.monologo};
					}
				`}</style>
			</div>
		);
	}
}

export default Line;