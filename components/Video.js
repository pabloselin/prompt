import React from "react";
import ReactPlayer from "react-player";

class Video extends React.Component {
	render() {
		return(
			<ReactPlayer url={this.props.fileUrl} playing={true} showControls={true}/>
			)
	}
}


export default Video;