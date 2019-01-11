import React from "react";
import * as superagent from "superagent";
import PromptMedia from "../components/PromptMedia";
import PromptText from "../components/PromptText";

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
			.get(process.env.BASE_URL + "api/acciones_condicional")
			.then(res => res.body);
		return { actions };
	}

	constructor() {
		super();
		this.state = {
			currentAction: 0,
			hoveredAction: null,
			layout: "media"
		};

		this.nextAction = this.nextAction.bind(this);
		this.prevAction = this.prevAction.bind(this);
		this.gotoAction = this.gotoAction.bind(this);
		this.hoverAction = this.hoverAction.bind(this);
		this.switchLayout = this.switchLayout.bind(this);
	}

	componentDidMount() {}

	nextAction = () => {
		if (this.state.currentAction < this.props.actions.length) {
			this.setState({ currentAction: this.state.currentAction + 1 });
		}
	};

	prevAction = () => {
		if (this.state.currentAction > 0) {
			this.setState({ currentAction: this.state.currentAction - 1 });
		}
	};

	gotoAction = actionPosition => {
		this.setState({ currentAction: actionPosition });
	};

	hoverAction = actionPosition => {
		this.setState({
			hoveredAction: actionPosition
		});
	};

	switchLayout = layout => {
		this.setState({
			layout: layout
		});
	};

	render() {
		const actions = this.state.actions || this.props.actions;
		const actionsLength = actions.length;
		const hoveredAction = this.state.hoveredAction
			? actions[this.state.hoveredAction]
			: actions[this.state.currentAction];

		return (
			<div>
				{hoveredAction && (
					<div className="stateBar">{hoveredAction.texto}</div>
				)}
				<div className="switcher">
					<span
						className={`switch ${this.state.layout === "texto" &&
							"active"}`}
						onClick={this.switchLayout.bind(this, "texto")}
					>
						Texto
					</span>
					<span
						className={`switch ${this.state.layout === "media" &&
							"active"}`}
						onClick={this.switchLayout.bind(this, "media")}
					>
						Media
					</span>
				</div>
				<div id="container">
					{this.state.layout === "media" ? (
						<PromptMedia
							action={actions[this.state.currentAction]}
							actions={actions}
							currentAction={this.state.currentAction}
							clickAction={this.gotoAction}
							hoverAction={this.hoverAction}
							prevAction={this.prevAction}
							nextAction={this.nextAction}
						/>
					) : (
						<PromptText actions={actions} />
					)}
				</div>
				<style jsx>
					{`
						#container {
							text-align: center;
							position: absolute;
							width: 100%;
							z-index: 10;
							padding: 0;
							margin: 0;
							font-family: sans-serif;
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
						.switcher {
							position: absolute;
							top: 12px;
							left: 12px;
							z-index: 20;
						}
						.switch {
							display: inline-block;
							padding: 3px 12px;
							border: 1px dashed #ccc;
							margin: 6px;
							cursor: pointer;
							font-family: sans-serif;
							font-size: 13px;
						}
						.switch:hover,
						.switch.active {
							border-style: solid;
							border-color: #333;
						}
					`}
				</style>
			</div>
		);
	}
}

export default Main;
