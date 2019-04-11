import React from "react";

class Documento extends React.Component {
	render() {
		return (
			<a href={this.props.fileUrl} title={this.props.title}>
				{this.props.title}
			</a>
		);
	}
}

export default Documento;
