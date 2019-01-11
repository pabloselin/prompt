import React from "react";
import slug from "slug";

class PromptText extends React.Component {
	render() {
		return (
			<div>
				{this.props.actions.map(action => (
					<div
						className={`accion ${slug(action.tipo, {
							lower: true
						})}`}
					>
						{action.texto}
					</div>
				))}
				<style jsx>
					{`
						div {
							text-align: left;
							margin-bottom: 12px;
							line-height: 1.4em;
							font-family: sans-serif;
						}
						div.titulo {
							font-size: 22px;
							text-align: center;
						}

						div.dialogo {
							max-width: 300px;
							margin: 12px auto;
						}
						div.descripcion {
							max-width: 600px;
							margin: 12px auto;
							font-style: italic;
						}
					`}
				</style>
			</div>
		);
	}
}

export default PromptText;
