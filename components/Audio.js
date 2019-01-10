import React from "react";
import AudioSpectrum from "react-audio-spectrum";

class Audio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mounted: false
		};
	}

	componentDidMount() {
		this.setState({mounted: true});
	}

	render() {
		return (
			<div>
				{this.state.mounted && (
					<div>
						<audio
							id="prompt_audio"
							src={this.props.fileUrl}
							autoPlay
							crossorigin="anonymous"
						/>
						<AudioSpectrum
							id="audio-canvas"
							height={200}
							width={300}
							audioId={"prompt_audio"}
							capColor={"red"}
							capHeight={2}
							meterWidth={2}
							meterCount={512}
							meterColor={[
								{ stop: 0, color: "#f00" },
								{ stop: 0.5, color: "#0CD7FD" },
								{ stop: 1, color: "red" }
							]}
							gap={4}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default Audio;
