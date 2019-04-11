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

			const materiales = await db
				.db()
				.collection("materiales_condicional")
				.find({})
				.sort({ orden: 1 })
				.collation({ locale: "en_US", numericOrdering: true })
				.toArray();

			return { actions, materiales };
		}
	}

	constructor() {
		super();
		this.state = {
			currentAction: 0,
			currentAssoc: null,
			hoveredAction: null,
			layout: "texto",
			columnText: false,
			columnMini: false,
			columnMedia: false,
			playing: false,
			materiales: null,
			mediaType: null
		};
	}

	componentDidMount() {
		let materiales = superagent
			.get(process.env.BASE_URL + "api/materiales_condicional")
			.then(res => this.setState({ materiales: res.body }));
		this.setState({
			materiales: this.props.materiales
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currentAssoc !== this.state.currentAssoc) {
			this.setState({
				materiales: this.props.materiales.filter(
					material => material.id === this.state.currentAssoc
				)
			});
		}
		if (prevState.mediaType !== this.state.mediaType) {
			this.setState({
				materiales: this.props.materiales.filter(
					material => material.tipo === this.state.mediaType
				)
			});
		}
	}

	activateAction = (actionID, assocID) => {
		this.setState({
			currentAction: actionID,
			currentAssoc: assocID
		});
	};

	setMediaType = type => {
		this.setState({
			mediaType: type
		});
	};

	render() {
		const actions = this.state.actions || this.props.actions;
		const materiales = this.state.materiales || this.props.materiales;
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
							<PromptMedia
								activeId={this.state.currentAction}
								materiales={this.state.materiales}
								assoc={this.state.currentAssoc}
								playing={this.state.playing}
								activeType={this.state.mediaType}
								setMediaType={this.setMediaType}
							/>
						</div>
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
