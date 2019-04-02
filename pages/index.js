import React from "react";
import * as superagent from "superagent";
import HTMLHeader from "../components/HTMLHeader";
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
			layout: "texto"
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
				<HTMLHeader />
				<div id="container">
					<PromptText actions={actions} />
				</div>
				<style jsx>
					{`
						#container {
							text-align: center;
							font-family: sans-serif;
						}
					`}
				</style>
			</div>
		);
	}
}

export default Main;
