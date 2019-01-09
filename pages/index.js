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
			currentAction: 0
		};

		this.nextAction = this.nextAction.bind(this);
		this.prevAction = this.prevAction.bind(this);
		this.gotoAction = this.gotoAction.bind(this);
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
		this.setState({ currentAction: actionPosition})
	}

	render() {
		const actions = this.state.actions || this.props.actions;

		return (
			<div id="container">
				<h1>{this.state.currentAction}</h1>
				<UnidadAccion
					key={actions[this.state.currentAction].id}
					orden={actions[this.state.currentAction].orden}
					ids_assoc={actions[this.state.currentAction].ids_assoc}
					data={actions[this.state.currentAction]}
				/>
				<div className="next" onClick={this.nextAction}>
					Siguiente
				</div>
				<div className="prev" onClick={this.prevAction}>
					Anterior
				</div>

				<div className="accionNav">
					{actions.map((action, key) => (
						<span className="accionItem" key={action._id} onClick={this.gotoAction.bind(this, key)}>
							&bull;
						</span>
					))}
				</div>
			</div>
		);
	}
}

export default Main;
