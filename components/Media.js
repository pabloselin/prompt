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
		//this.buildResourceUrl(this.props.data.id, this.props.tipo);
		//console.log(this.props);
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.data.id !== prevProps.data.id &&
			this.props.tipo !== undefined
		) {
			console.log(this.props.data.id);
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
		} else {
			component = Imagen;
		}

		let fileUrl = "http://staticprompt.apie.cl/material/" + filename + ext;

		this.setState({ ext, fileUrl, component });
	}

	render() {
		const Component = this.state.component;
		return (
			<div>
				{Component !== null && (
					<Component
						fileUrl={this.state.fileUrl}
						ext={this.state.ext}
						title={this.props.data.desc}
						mountMedia={this.props.mountMedia}
						active={this.props.active}
						id={this.props.data._id}
					/>
				)}
				<style jsx>{`
					.materialdata {
						margin: 0;
						padding: 0;
						list-style: none;
						text-align: left;
					}
				`}</style>
			</div>
		);
	}
}

export default Media;
