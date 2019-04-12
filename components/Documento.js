import React from "react";

class Documento extends React.Component {
	render() {
		return (
			<div>
				<a
					className="documento"
					href={this.props.fileUrl}
					title={this.props.title}
				>
					{this.props.title}
				</a>
				<style jsx>
					{`
						.documento {
							display: block;
							padding: 12px;
							border: 1px dashed #ccc;
							margin-bottom: 12px;
							color: #333;
						}
					`}
				</style>
			</div>
		);
	}
}

export default Documento;
