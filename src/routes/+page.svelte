<script context="module">
	
</script>
<script>
	import { base, assets } from "$app/paths";
	import { goto } from "$app/navigation";
	import { app_inputs } from "$lib/config";
	import Section from "$lib/layout/Section.svelte";
	import Select from "$lib/ui/Select.svelte";

	export let data;

	function menuSelect(ev) {
		goto(`${base}/${ev.detail.value}/`, { noscroll: true });
	}
</script>

<svelte:head>
  <title>Census Area Explorer</title>
  <meta name="description" content="">
  <meta property="og:title" content="Census Area Explorer" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{app_inputs.base}/" />
	<meta property="og:description" content="Explore census data for places in Northern Ireland." />
	<meta name="description" content="Explore census data for places in Northern Ireland." />
</svelte:head>

<Section column="wide">
	<div class="block">
		<div class="grid">
			<div class="div-grey-box search-panel">
				<h2>Explore Census 2021 statistics for any area in Northern Ireland</h2>

				<Select
					search_data={data.search_data}
					group="typestr"
					search={true}
					on:select={menuSelect}
				/>

				<h2 class="council-heading">Or select your council area</h2>

				<div class="council-links">
					<a href="{base}/N09000001">Antrim and Newtownabbey</a>,
					<a href="{base}/N09000011">Ards and North Down</a>,
					<a href="{base}/N09000002">Armagh City, Banbridge and Craigavon</a>,
					<a href="{base}/N09000003">Belfast</a>,
					<a href="{base}/N09000004">Causeway Coast and Glens</a>,
					<a href="{base}/N09000005">Derry City and Strabane</a>,
					<a href="{base}/N09000006">Fermanagh and Omagh</a>,
					<a href="{base}/N09000007">Lisburn and Castlereagh</a>,
					<a href="{base}/N09000008">Mid and East Antrim</a>,
					<a href="{base}/N09000009">Mid Ulster</a>,
					<a href="{base}/N09000010">Newry, Mourne and Down</a>
				</div>
			</div>

			<div class="div-grey-box map-panel">
				<h2>Click on the map to view Northern Ireland as a whole</h2>

				<a href="{base}/N92000002/" class="map-link">
					<picture id="ni-map">
						<img
							src="{assets}/img/Northern_Ireland_Map.svg"
							alt="Outline of Northern Ireland"
						/>
					</picture>
				</a>
			</div>
		</div>
	</div>

	<div class="app-info">
		This application contains data for Northern Ireland, the 11 Local Government Districts and the areas within.
		This was most recently updated on 13 September 2023 to revise data relating to the Household Structure topic.
		Refer to the
		<a href="https://www.nisra.gov.uk/statistics/2021-census/results/quality-notes-issues-and-corrections">
			Census 2021 Quality notes, issues and corrections page
		</a>
		for more information.
	</div>
</Section>

<style>
	.block {
		margin-top: 55px;
		display: block;
	}

	.grid {
		display: grid;
		width: 100%;
		gap: 30px;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		justify-content: stretch;
		page-break-inside: avoid;
	}

	.div-grey-box {
		background-color: #f5f5f6;
		padding: 24px;
		box-sizing: border-box;
	}

	.search-panel,
	.map-panel {
		overflow: visible;
	}

	h2 {
		margin: 0 0 20px;
		color: #732777;
		font-size: 1.5em;
		line-height: 1.2;
	}

	.council-heading {
		margin-top: 24px;
	}

	.council-links {
		line-height: 1.8;
	}

	.map-panel {
		text-align: center;
	}

	.map-link {
		display: inline-block;
		text-decoration: none;
	}

	#ni-map {
		display: inline-block;
		filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
	}

	#ni-map img {
		display: block;
		width: 400px;
		max-width: 100%;
		height: auto;
	}

	#ni-map:hover {
		filter: brightness(0.75) drop-shadow(5px 7px 4px rgb(0 0 0 / 0.5));
	}

	.app-info {
		margin-top: 30px;
	}

	@media (max-width: 700px) {
		.block {
			margin-top: 30px;
		}

		.div-grey-box {
			padding: 18px;
		}
	}
</style>