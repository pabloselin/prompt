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
			activeMedia: null
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
		})
	}

	activateType(type) {
		this.setState({
			activeType: type
		});
	}

	render() {
		return (
			<div>
				<div className="infoBar">
					{Object.keys(colors).map((color, key) => (
						<div key={key} className={`colorLegend ${color} ${this.state.activeType === color && 'active'}`} onClick={this.activateType.bind(this, color)}>
							{color}
						</div>
					))}
				</div>
				<div className="textBar">
					{this.props.actions.map(action => (
						<TextUnit
							key={action._id}
							active={
								this.state.actionId === action._id
									? true
									: false
							}
							type={this.unitType(action.tipo)}
							textLength={this.unitLength(action.texto)}
							click={this.activateAction.bind(this, action)}
						/>
					))}
				</div>
				<div className="actionZone">
					{this.props.actions.map(action => (
						<div onClick={this.activateMedia.bind(this, action.ids_assoc)} className={`unit ${action.ids_assoc && 'wc'}`} title={action._id} data-type={action.tipo} data-ids-assoc={action.ids_assoc} >
							<p>{action.texto}</p>
						</div>
					))}
				</div>
				<div className="materialZone">
					{this.state.activeMedia && (
						<Material ids_assoc={this.state.activeMedia} />
						)}
				</div>
				<style jsx>
					{`
						div {
							text-align: left;
							margin-bottom: 12px;
							line-height: 1.4em;
							font-family: sans-serif;
						}
						.textBar {
							float: left;
							width: 200px;
							margin-top: 60px;
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

						.unit:hover, .unit.active {
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
						.actionZone {
							position: fixed;
							left: 220px;
							top: 60px;
							width: 400px;
							height: 600px;
							overflow-y: scroll;
							padding: 12px;
							background-color: #f0f0f0;
						}
						.actionZone p {
							text-align: justify;
						}
						.infoBar {
							position: fixed;
							left: 6px;
							top: 12px;
							z-index: 10;
							background-color: white;
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
						.materialZone {
							width: 300px;
							position: fixed;
							left: 700px;
						}

						.materialZone img,
						.materialZone video,
						.materialZone audio {
							max-width: 100%;
							height: auto;
						}
					`}
				</style>
			</div>
		);
	}
}

export default PromptText;
