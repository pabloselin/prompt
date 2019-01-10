import React from "react";
import * as superagent from "superagent";
import getConfig from "next/config";

import UnidadAccion from "../components/UnidadAccion";

const { publicRuntimeConfig } = getConfig();
const { API_URL, ASSETS_URL } = publicRuntimeConfig;

class Main extends React.Component {
	static async getInitialProps({ req }) {
		if (req) {
			const { db } = req;
			const actions = await db
				.db()
				.collection("acciones_condicional")
				.find({})
				.sort({ orden: 1 })
				.collation({ locale: "en_US", numericOrdering: true })
				.toArray();
			return { actions };
		}

		const { actions } = await superagent
			.get(API_URL + "/acciones_condicional")
			.then(res => res.body);
		return { actions };
	}

	constructor() {
		super();
		this.state = {
			currentAction: 0,
			hoveredAction: null,
			textFormat: 'media' 
		};

		this.nextAction = this.nextAction.bind(this);
		this.prevAction = this.prevAction.bind(this);
		this.gotoAction = this.gotoAction.bind(this);
		this.hoverAction = this.hoverAction.bind(this);
	}

	componentDidMount() {}

	nextAction() {
		if (this.state.currentAction < this.props.actions.length) {
			this.setState({ currentAction: this.state.currentAction + 1 });
		}
	}

	prevAction() {
		if (this.state.currentAction > 0) {
			this.setState({ currentAction: this.state.currentAction - 1 });
		}
	}

	gotoAction(actionPosition) {
		this.setState({ currentAction: actionPosition });
	}

	hoverAction(actionPosition) {
		this.setState({
			hoveredAction: actionPosition
		});
	}

	render() {
		const actions = this.state.actions || this.props.actions;
		const actionsLength = actions.length;

		return (
			<div>
				<div className="stateBar">
					{this.state.hoveredAction !== null && (
						<p>{actions[this.state.hoveredAction].texto}</p>
					)}
				</div>
				<div id="container">
					<div>
						<h1>{this.state.currentAction}</h1>
						<UnidadAccion
							key={actions[this.state.currentAction].id}
							orden={actions[this.state.currentAction].orden}
							ids_assoc={
								actions[this.state.currentAction].ids_assoc
							}
							data={actions[this.state.currentAction]}
						/>
						<div className="next" onClick={this.nextAction}>
							&gt;
						</div>
						<div className="prev" onClick={this.prevAction}>
							&lt;
						</div>

						<div className="accionNav">
							{actions.map((action, key) => (
								<span
									className={`accionItem ${
										this.state.currentAction === key
											? "active"
											: ""
									}`}
									key={action._id}
									onClick={this.gotoAction.bind(this, key)}
									onMouseOver={this.hoverAction.bind(
										this,
										key
									)}
									onMouseOut={this.hoverAction.bind(this, this.state.currentAction)}
								>
									<i />
								</span>
							))}
						</div>
					</div>
				</div>
				<style jsx>
					{`
						#container {
							text-align: center;
							position: absolute;
							width: 100%;
							height: 100%;
							z-index: 10;
						}

						.accionNav {
							width: 100%;
							height: 140px;
							cursor: pointer;
						}

						.accionNav span {
							display: inline-block;
							width: 3px;
							height: 100px;
							overflow: hidden;
							padding: 2px;
						}
						.accionNav span i {
							background-color: #ccc;
							display: block;
							height: 80px;
							margin-bottom: 20px;
							content: "";
							transition: height 0.1s ease-in;
						}

						.accionNav span:hover i,
						.accionNav span.active i {
							background-color: #555;
							height: 100px;
							margin-bottom: 0;
							width: 100%;
						}

						.stateBar {
							text-align: center;
							width: 100%;
							height: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							position: fixed;
							top: -60px;
							left: 0;
							font-size: 120px;
							color: #f0f0f0;
							z-index: 1;
						}
					`}
				</style>
			</div>
		);
	}
}

export default Main;
