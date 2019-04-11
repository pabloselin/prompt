import React from "react";
import ReactPlayer from "react-player";

class Video extends React.Component {
	constructor(props) {
		super(props);
	}

	click = () => {
		//console.log(this.props.id);
		this.props.mountMedia(this.props.id);
	};

	render() {
		return (
			<div className="videoWrapper">
				{this.props.active ? (
					<ReactPlayer
						width="100%"
						url={this.props.fileUrl}
						playing={false}
						controls={true}
					/>
				) : (
					<div className="videoPlaceholder" onClick={this.click}>
						Video: {this.props.title}
					</div>
				)}
				<style jsx>{`
					.videoWrapper {
						padding: 12px;
						margin-bottom: 12px;
						border: 1px dashed #ccc;
					}
				`}</style>
			</div>
		);
	}
}

export default Video;
