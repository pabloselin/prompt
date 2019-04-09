import React from "react";
import * as superagent from "superagent";
import HTMLHeader from "../components/HTMLHeader";
import SiteHeader from "../components/SiteHeader";
import PromptMiniText from "../components/PromptMiniText";
import PromptFullText from "../components/PromptFullText";
import PromptMedia from "../components/PromptMedia";

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
			layout: "texto"
		};

		this.nextAction = this.nextAction.bind(this);
		this.prevAction = this.prevAction.bind(this);
		this.gotoAction = this.gotoAction.bind(this);
		this.hoverAction = this.hoverAction.bind(this);
		this.switchLayout = this.switchLayout.bind(this);
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currentAction !== this.state.currentAction) {
			this.scrollToAction();
		}
	}

	scrollToAction = () => {
		console.log("scrollto");
	};

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

	activateAction = actionID => {
		console.log(actionID);
		this.setState({
			currentAction: actionID
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
				<HTMLHeader />
				<div id="container">
					<SiteHeader />
					<div className="main-section">
						<div className="column column-text-minimized">
							<PromptMiniText
								actions={actions}
								activeID={this.state.currentAction}
								clickProp={this.activateAction}
							/>
						</div>
						<div className="column column-text-full">
							<PromptFullText
								actions={actions}
								activeID={this.state.currentAction}
							/>
						</div>
						<div
							className="column column-media"
							activeID={this.state.currentAction}
						>
							{" "}
							Media
						</div>
						<PromptMedia activeId={this.state.currentAction} />
					</div>
				</div>
				<style jsx>
					{`
						#container {
							text-align: center;
							font-family: sans-serif;
							height: 100vh;
							overflow: hidden;
							display: flex;
							position: relative;
							width: 100%;
							backface-visibility: hidden;
							will-change: overflow;
						}
						.main-section {
							display: flex;
							margin-top: 140px;
						}
						.column {
							flex-grow: 1;
							max-width: 33%;
							overflow: auto;
							scrollbar-width: 0;
							-ms-overflow-style: none; // IE 10+
							scrollbar-width: none; // Firefox
						}
						.column::-webkit-scrollbar {
							display: none;
						}
					`}
				</style>
			</div>
		);
	}
}

export default Main;
