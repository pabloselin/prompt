import React from "react";
import * as superagent from "superagent";
import HTMLHeader from "../components/HTMLHeader";
import PromptText from "../components/PromptText";
import Material from "../components/Material";
import Media from "../components/Media";

class Main extends React.Component {
	static async getInitialProps({ req }) {
		if (req) {
			const { db } = req;
			const materiales = await db
				.db()
				.collection("materiales_condicional")
				.find({})
				.sort({ orden: 1 })
				.collation({ locale: "en_US", numericOrdering: true })
				.toArray();
			return { materiales };
		}

		const { materiales } = await superagent
			.get(process.env.BASE_URL + "api/materiales_condicional")
			.then(res => res.body);
		return { materiales };
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
		if (this.state.currentAction < this.props.materiales.length) {
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
		const materiales = this.state.materiales || this.props.materiales;
		const materialesLength = materiales.length;
		const hoveredAction = this.state.hoveredAction
			? materiales[this.state.hoveredAction]
			: materiales[this.state.currentAction];

		return (
			<div>
				<HTMLHeader />
				<div id="container">
					{materiales.map((material, key) => (
						<div>
							{material.tipo === "Fotografía" && (
								<Media tipo={material.tipo} data={material} />
							)}

							<p>{material.id}</p>
						</div>
					))}
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
