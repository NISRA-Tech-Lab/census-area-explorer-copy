import { getData } from "$lib/utils";
import { app_inputs, geog_types } from "$lib/config";

export const prerender = true;

export async function load({ fetch }) {
	const results = await getData(app_inputs.search_data, fetch);

	const lookup = {};

	results.forEach((item) => {
		lookup[item.code] = item.name;
	});

	results.forEach((item) => {
		item.typepl = geog_types[item.type].pl;
		item.typenm = geog_types[item.type].name;
		item.typestr = lookup[item.parent]
			? `${geog_types[item.type].name} within ${lookup[item.parent]}`
			: "";
	});

	const search_data = results.sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	return {
		search_data
	};
}