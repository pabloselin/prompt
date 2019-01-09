import React from "react";

class Imagen extends React.Component {
	render() {
		return(
			<img src={this.props.fileUrl} alt={this.props.title} />
			)
	}
}


export default Imagen;