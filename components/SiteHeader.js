const SiteHeader = () => (
	<div>
		<header id="site-info">
			<div className="appTitle">Bitácora Interactiva Teatro UC</div>
			<h1 className="play-title">Condicional</h1>
			<div className="play-info">
				<p>
					<span className="play-author-label">De:</span>{" "}
					<span className="play-author-name">Álvaro Díaz</span>
				</p>
				<p>
					<span className="play-director-label">Dirección:</span>{" "}
					<span className="play-director-name">
						{" "}
						Elvira López Alfonso
					</span>
				</p>
			</div>
		</header>
		<style jsx>{`
			#site-info {
				background-color: #333;
				color: white;
				text-align: left;
				padding: 12px;
				position: fixed;
				margin: 0;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 15;
				box-shadow: 0 0 3px #333;
			}

			.appTitle {
				background-color: #000;
				color: white;
				padding: 6px;
				text-transform: uppercase;
				font-size: 14px;
				text-align: center;
				margin: -12px -12px 6px -12px;
			}

			h1 {
				font-size: 32px;
				margin: 0;
			}
			p {
				margin: 6px;
			}
		`}</style>
	</div>
);

export default SiteHeader;
