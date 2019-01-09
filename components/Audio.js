import React from "react";
import ReactPlayer from "react-player";

class Audio extends React.Component {
	render() {
		return(
			<ReactPlayer url={this.props.fileUrl} />
			)
	}
}


export default Audio;