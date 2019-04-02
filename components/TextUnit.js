import React from "react";
import Line from "./Line";

class TextUnit extends React.Component {
	constructor(props) {
		super(props);
		//Línea descripción: 56
		//Línea diálogo: 40
		this.state = {
			lineChars: {
				descripcion: 56,
				dialogo: 40,
				letra: 40,
				cancion: 40,
				acotacion: 40,
				monologo: 40,
				default: 40
			},
			descLineChars: 56,
			dialLineChars: 40
		};
	}

	componentDidMount() {
		let lines = this.props.textLength / this.state.lineChars[this.props.type];
		let rest = lines >= 1 ? lines % parseInt(lines) : lines;

		this.setState({
		
			length: length,
			lines: lines,
			rest: rest
		});
	}

	linespans(lines) {
		let longLines = this.state.rest >= 0 ? lines + 1 : lines;
		let intLines = parseInt(longLines);
		let paragraph = [];
		for (let i = 0; i < intLines; i++) {
			if(i === intLines -1) {
				paragraph.push(<Line key={i} width={this.state.rest} tipo={this.props.type} />);
			} else {
				paragraph.push(<Line key={i} width={1} tipo={this.props.type} />);
			}	
		}
		return paragraph;
	}

	render() {
		return (
			<div className={`textUnit ${this.props.active && 'active'}`} onClick={this.props.click}>
				<div className={this.props.type}>
				{this.state.lines && this.linespans(this.state.lines)}
				</div>
				<style jsx>
					{`
						.dialogo, .monologo, .cancion, .letra, .acotacion {
							max-width: 55%;
							margin: 0 auto;
						}
						.textUnit {
							margin-bottom: 12px;
							opacity: 0.6;
						}
						.textUnit:hover, .textUnit.active {
							opacity: 1;
						}
					`}
				</style>
			</div>
		);
	}
}

export default TextUnit;
