<script>
  import { setContext } from "svelte";
  import "../app.css";
  import { themes } from "$lib/config";
  import Warning from "$lib/ui/Warning.svelte";
  import NISRAHeader from "$lib/layout/NISRAHeader.svelte";
  import NISRAFooter from "$lib/layout/NISRAFooter.svelte";
  import AnalyticsBanner from "$lib/layout/AnalyticsBanner.svelte";

  // STYLE CONFIG
  // Set theme globally (options are 'light' or 'dark')
  let theme = "light";
  setContext("theme", themes[theme]);
</script>

<svelte:head>
<link rel="icon" href="https://www.nisra.gov.uk/sites/nisra.gov.uk/themes/nisra_theme/favicon.ico" /> 

</svelte:head>

 <AnalyticsBanner />

<Warning/>
<NISRAHeader/>

<slot/>

<NISRAFooter/>