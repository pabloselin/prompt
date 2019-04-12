import React from "react";
import * as superagent from "superagent";
import Material from "./Material";
import Media from "./Media";

class PromptMedia extends React.Component {
	constructor(props) {
		super();
		this.state = {
			activeID: null,
			types: ["Fotografía", "Papelería", "Video", "Audio"],
			activeType: "todos"
		};
	}

	mountMedia = ID => {
		this.setState({
			activeID: ID
		});
	};

	filterMediaType = type => {
		this.props.setMediaType(type);
	};

	render() {
		return (
			<div>
				<div className="materialType">
					{this.state.types.map((type, key) => (
						<div
							key={key}
							className="typeSquare"
							onClick={() => this.filterMediaType(type)}
						>
							{type}
						</div>
					))}
				</div>
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

					.materialType {
						display: flex;
						margin: 0 24px;
					}

					.typeSquare {
						display: block;
						font-size: 11px;
						padding: 6px;
						border: 1px solid #ccc;
						cursor: pointer;
					}

					.typeSquare:hover {
						background-color: #f0f0f0;
					}
				`}</style>
			</div>
		);
	}
}

export default PromptMedia;
