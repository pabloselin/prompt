import React from "react";
import slug from "slug";
import TextUnit from "./TextUnit";
import Material from "./Material";
import colors from "../lib/colors";

class PromptFullText extends React.Component {
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
		});
	}

	activateType(type) {
		this.setState({
			activeType: type
		});
	}

	render() {
		return (
			<div>	
				<div className="actionZone">
					{this.props.actions.map((action, key) => (
						<div
							id={action._id}
							key={key}
							onClick={this.activateMedia.bind(
								this,
								action.ids_assoc
							)}
							className={`unit ${action.ids_assoc && "wc"} ${action._id === this.props.activeID && "active"}`}
							title={action._id}
							data-type={action.tipo}
							data-ids-assoc={action.ids_assoc}
						>
							<p>{action.texto}</p>
						</div>
					))}
				</div>
				
				<style jsx>
					{`
						div {
							text-align: left;
							margin-bottom: 12px;
							line-height: 1.4em;
							font-family: sans-serif;
							font-size: 13px;
						}

						div.unit {
							padding: 6px 24px;
							background-color: #f0f0f0;
							margin: 0;
						}

						div.active {
							background-color: #333;
							color: white;
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
						.actionZone p {
							text-align: justify;
						}
					`}
				</style>
			</div>
		);
	}
}

export default PromptFullText;
