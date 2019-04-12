import React from "react";
import { findDOMNode } from "react-dom";
import slug from "slug";
import scrollIntoView from "scroll-into-view";
import TextUnit from "./TextUnit";
import Material from "./Material";
import ScrollView, { ScrollElement } from "./ScrollView";
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

	componentDidMount() {
		// console.log(this.texts);
	}

	scrollTo(name) {
		this._scroller.scrollTo(name);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.activeID !== this.props.activeID) {
			this.scrollTo(this.props.activeID);
		}
	}

	render() {
		return (
			<div>
				<div className="actionZone">
					<ScrollView ref={scroller => (this._scroller = scroller)}>
						<div className="scroller">
							{this.props.actions.map((action, key) => (
								<ScrollElement key={key} name={action._id}>
									<div
										onClick={this.activateMedia.bind(
											this,
											action.ids_assoc
										)}
										className={`unit ${action.ids_assoc &&
											"wc"} ${action._id ===
											this.props.activeID &&
											"active"} ${slug(action.tipo, {
											lower: true
										})}`}
										title={action._id}
										data-type={action.tipo}
										data-ids-assoc={action.ids_assoc}
									>
										<p>{action.texto}</p>
									</div>
								</ScrollElement>
							))}
						</div>
					</ScrollView>
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

						.active.acotacion {
							background-color: ${colors.acotacion};
						}
						.active.descripcion {
							background-color: ${colors.descripcion};
						}
						.active.cancion {
							background-color: ${colors.cancion};
						}
						.active.dialogo {
							background-color: ${colors.dialogo};
						}
						.active.letra {
							background-color: ${colors.letra};
						}
						.active.monologo {
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
