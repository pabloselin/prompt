import React from "react";
import * as superagent from "superagent";
import Material from "./Material";
import Media from "./Media";

class PromptMedia extends React.Component {
	constructor(props) {
		super();
		this.state = {
			activeID: null
		};
	}

	mountMedia = ID => {
		console.log(ID);
		this.setState({
			activeID: ID
		});
	};

	render() {
		return (
			<div>
				<div className="mediaWrapper">
					{this.props.materiales &&
						this.props.materiales.map((material, key) => (
							<Media
								key={key}
								tipo={material.tipo}
								data={material}
								id={material._id}
								mountMedia={this.mountMedia}
								active={this.state.activeID === material._id}
							/>
						))}
				</div>
				<style jsx>{`
					.mediaWrapper {
						padding: 24px;
					}
				`}</style>
			</div>
		);
	}
}

export default PromptMedia;
