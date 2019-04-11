import React from "react";
import AudioSpectrum from "react-audio-spectrum";

class Audio extends React.Component {
	constructor(props) {
		super(props);
	}

	click = () => {
		//console.log(this.props.id);
		this.props.mountMedia(this.props.id);
	};

	render() {
		return (
			<div>
				<div className="audioWrapper">
					{this.props.active ? (
						<div>
							<AudioSpectrum
								id={`audio-canvas-${this.props.id}`}
								height={200}
								width="100%"
								audioId={`audio-${this.props.id}`}
								capColor={"#000"}
								capHeight={2}
								meterWidth={2}
								meterCount={512}
								meterColor={[
									{ stop: 0, color: "#333" },
									{ stop: 0.5, color: "#555" },
									{ stop: 1, color: "#f0f0f0" }
								]}
								gap={4}
							/>
							<p>
								<audio
									id={`audio-${this.props.id}`}
									src={this.props.fileUrl}
									autoPlay
									crossOrigin="anonymous"
									controls
								/>
							</p>
						</div>
					) : (
						<div className="audioPlaceholder" onClick={this.click}>
							Audio: {this.props.title}
						</div>
					)}
				</div>
				<style jsx>
					{`
						.audioWrapper {
							padding: 12px;
							border: 1px dotted #ccc;
							margin-bottom: 12px;
						}
						audio {
							max-width: 100%;
						}
					`}
				</style>
			</div>
		);
	}
}

export default Audio;
