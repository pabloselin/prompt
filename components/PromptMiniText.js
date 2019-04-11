import React from "react";
import slug from "slug";
import TextUnit from "./TextUnit";
import Material from "./Material";
import colors from "../lib/colors";

class PromptText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			action: null,
			actionId: 0,
			activeType: null,
			activeMedia: null,
			actions: this.props.actions,
			types: [
				"Acotación",
				"Descripción",
				"Canción",
				"Diálogo",
				"Monólogo",
				"Letra"
			]
		};
		this.activateAction = this.activateAction.bind(this);
		this.activateType = this.activateType.bind(this);
		this.activateMedia = this.activateMedia.bind(this);
	}
	unitLength(text) {
		return text.length;
	}

	unitType(type) {
		let newType = type.length > 0 ? slug(type, { lower: true }) : "default";
		return newType;
	}

	activateAction(action) {
		console.log("click");
		this.setState({
			action: action,
			actionId: action._id
		});
	}

	activateMedia(resourceID) {
		this.setState({
			activeMedia: resourceID
		});
	}

	activateType = type => {
		this.setState({
			activeType: type
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.activeType !== this.state.activeType) {
			this.setState({
				actions: this.props.actions.filter(
					action => action.tipo === this.state.activeType
				)
			});
		}
	}

	render() {
		return (
			<div>
				<div className="textFilter">
					{this.state.types.map(type => (
						<div
							className={`squareFilter ${slug(type, {
								lower: true
							})} ${this.state.activeType === type && "active"}`}
							onClick={() => this.activateType(type)}
							title={type}
						>
							{type}
						</div>
					))}
				</div>
				<div className="textBar">
					{this.state.actions.map(action => (
						<TextUnit
							key={action._id}
							id={action._id}
							active={
								this.props.activeID === action._id
									? true
									: false
							}
							type={this.unitType(action.tipo)}
							textLength={this.unitLength(action.texto)}
							clickProp={this.props.clickProp}
							assoc={action.ids_assoc}
						/>
					))}
				</div>

				<style jsx>
					{`
						div {
							text-align: left;
							margin-bottom: 12px;
							line-height: 1.4em;
							font-family: sans-serif;
						}
						.textFilter {
							display: flex;
						}
						.squareFilter {
							width: 100px;
							height: 40px;
							font-size: 9px;
							text-transform: lowercase;
							padding: 3px;
							color: white;
							cursor: pointer;
							transition: all ease-in 0.3s;
						}

						.squareFilter.active,
						.squareFilter:hover {
							padding-top: 20px;
						}

						.textBar {
							margin-top: 12px;
							padding: 12px 32px;
						}
						.colorLegend {
							padding: 3px;
							color: white;
							display: inline-block;
							margin: 4px;
							font-size: 12px;
							cursor: pointer;
						}

						.unit {
							color: #ccc;
							cursor: pointer;
						}

						.unit.wc {
							font-weight: bold;
						}

						.unit:hover,
						.unit.active {
							color: #333;
						}

						.colorLegend.active {
							font-weight: bold;
						}

						.acotacion {
							background-color: ${colors.acotacion};
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

						.tipo {
							font-weight: normal;
							font-size: 10px;
							position: absolute;
							right: 10px;
							bottom: 0;
							color: #ccc;
							text-transform: uppercase;
						}
					`}
				</style>
			</div>
		);
	}
}

export default PromptText;
