import React from "react";
import getConfig from "next/config";
import Imagen from "./Imagen";
import Documento from "./Documento";
import Video from "./Video";
import Audio from "./Audio";

class Media extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ext: null,
			fileUrl: null,
			component: null
		};
	}

	componentDidMount() {
		this.buildResourceUrl(this.props.data.id, this.props.tipo);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.data.id !== prevProps.data.id) {
			this.buildResourceUrl(this.props.data.id, this.props.tipo);
		}
	}

	buildResourceUrl(filename, tipo) {
		let ext, component;
		if (tipo === "Fotografía") {
			ext = ".jpg";
			component = Imagen;
		} else if (tipo === "Papelería" || tipo === "Documentos") {
			ext = ".pdf";
			component = Documento;
		} else if (tipo === "Video") {
			ext = ".m4v";
			component = Video;
		} else if (tipo === "Audio") {
			ext = ".mp3";
			component = Audio;
		}

		let fileUrl = 'http://staticprompt.apie.cl/material/' + filename + ext;

		this.setState({ ext, fileUrl, component });
	}

	render() {
		const Component = this.state.component;
		return (
			<div>
				{Component !== null && (
					<Component fileUrl={this.state.fileUrl} title={this.state.ext} />
				)}
			</div>
		);
	}
}

export default Media;
