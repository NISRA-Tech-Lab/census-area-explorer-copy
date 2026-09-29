<script>
	import { assets } from "$app/paths";
</script>

<nav class="nisra-header">
	<div class="header-inner">
		<a
			class="nisra-brand brand-link"
			href="https://www.nisra.gov.uk/"
			aria-label="Northern Ireland Statistics and Research Agency"
		>
			<img
				class="nisra-logo"
				src="{assets}/img/logo/nisra-only-white.svg"
				alt="Northern Ireland Statistics and Research Agency"
			/>
		</a>

		<h1 class="header-title">
			Census Area Explorer
		</h1>

		<a
			class="census-brand brand-link"
			href="https://www.nisra.gov.uk/statistics/census/2021-census"
			aria-label="Census 2021"
		>
			<img
				class="census-logo"
				src="{assets}/img/census-2021-logo-white.svg"
				alt="Census 2021"
			/>
		</a>
	</div>

	<div class="header-green-bar"></div>
</nav>

<style>
	.nisra-header {
		display: block;
		width: 100%;
		background-color: #00205b;
		color: #fff;
		box-sizing: border-box;
	}

	.header-inner {
		width: calc(100% - 32px);
		max-width: 980px;
		margin: 0 auto;
		padding: 12px 0;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		box-sizing: border-box;
	}

	.nisra-brand {
		justify-self: start;
		padding-left: 26px;
	}

	.census-brand {
		justify-self: end;
		padding-right: 26px;
	}

	.nisra-logo {
		display: block;
		width: 200px;
		height: auto;
	}

	.census-logo {
		display: block;
		width: 130px;
		height: auto;
	}

	.header-title {
		justify-self: center;
		margin: 0;
		padding: 0 24px;
		color: #fff;
		font-size: clamp(20px, 2.2vw, 28px);
		font-weight: 700;
		line-height: 1.2;
		text-align: center;
		white-space: nowrap;
	}

	.header-green-bar {
		display: block;
		width: 100%;
		height: 10px;
		background-color: #68a41e;
	}

	@media (max-width: 700px) {
		.header-inner {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.nisra-brand,
		.census-brand,
		.header-title {
			justify-self: start;
		}

		.header-title {
			padding: 0;
			text-align: left;
			white-space: normal;
		}

		.nisra-logo {
			width: 160px;
		}

		.census-logo {
			width: 100px;
		}
	}
</style>