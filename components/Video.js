import React from "react";
import ReactPlayer from "react-player";

class Video extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mounted: false
		};
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}

	render() {
		return (
			<div>
				{this.state.mounted && (
					<ReactPlayer
						style={{ margin: "0 auto" }}
						url={this.props.fileUrl}
						playing={true}
						showControls={true}
					/>
				)}
			</div>
		);
	}
}

export default Video;
