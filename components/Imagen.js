import React from "react";

class Imagen extends React.Component {
	render() {
		return (
			<div>
				<img src={this.props.fileUrl} alt={this.props.title} />
				<style jsx>{`
					img {
						max-width: 100%;
						height: auto;
					}
				`}</style>
			</div>
		);
	}
}

export default Imagen;
