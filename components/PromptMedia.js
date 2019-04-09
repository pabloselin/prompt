import React from "react";
import * as superagent from "superagent";
import Material from "./Material";
import Media from "./Media";

class PromptMedia extends React.Component {
	constructor(props) {
		super();

		this.state = {};
	}

	render() {
		return (
			<div>
				{this.props.materiales &&
					this.props.materiales.map((material, key) => (
						<div>
							{material.tipo === "Fotografía" && (
								<Media tipo={material.tipo} data={material} />
							)}

							<p>{material.id}</p>
						</div>
					))}
			</div>
		);
	}
}

export default PromptMedia;
