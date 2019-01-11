import React from "react";
import UnidadAccion from "./UnidadAccion";

class PromptMedia extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.action.id}</h1>
				<UnidadAccion
					key={this.props.action.id}
					orden={this.props.action.orden}
					ids_assoc={this.props.action.ids_assoc}
					data={this.props.action}
				/>
				<div className="accionNav">
					{this.props.actions.map((action, key) => (
						<span
							className={`accionItem ${
								this.props.currentAction === key ? "active" : ""
							}`}
							key={action._id}
							onClick={() => this.props.clickAction(key)}
							onMouseOver={() => this.props.hoverAction(key)}
							onMouseOut={() =>
								this.props.hoverAction(this.props.action.id)
							}
						>
							<i />
						</span>
					))}
				</div>
				<style jsx>
					{`
						.accionNav {
							width: 100%;
							height: 120px;
							cursor: pointer;
							position: fixed;
							bottom: 0;
						}

						.accionNav span {
							display: inline-block;
							width: 3px;
							height: 100px;
							overflow: hidden;
							padding: 2px;
						}
						.accionNav span i {
							background-color: #ccc;
							display: block;
							height: 80px;
							margin-bottom: 20px;
							content: "";
							transition: height 0.1s ease-in;
						}

						.accionNav span:hover i,
						.accionNav span.active i {
							background-color: #555;
							height: 100px;
							margin-bottom: 0;
							width: 100%;
						}
					`}
				</style>
			</div>
		);
	}
}

export default PromptMedia;
