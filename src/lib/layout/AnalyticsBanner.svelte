<script>
  import { onMount } from "svelte";

  const CONSENT_STORAGE_KEY = "nisra_consent_v2";
  const CONSENT_VERSION = 1;
  const CONSENT_MAX_AGE_DAYS = 365;

  let showBanner = false;

  function acceptedConsent() {
    return {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      security_storage: "granted"
    };
  }

  function deniedConsent() {
    return {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      security_storage: "granted"
    };
  }

  function updateConsent(consentState) {
    window.gtag(
      "consent",
      "update",
      consentState
    );
  }

  function saveChoice(choice) {
    const record = {
      choice,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString()
    };

    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify(record)
      );
    } catch (error) {
      // Consent still applies to the current page if storage is unavailable.
    }
  }

  function getSavedChoice() {
    try {
      const stored = localStorage.getItem(
        CONSENT_STORAGE_KEY
      );

      if (!stored) {
        return null;
      }

      const record = JSON.parse(stored);
      const timestamp = Date.parse(
        record.timestamp
      );

      const maximumAge =
        CONSENT_MAX_AGE_DAYS *
        24 *
        60 *
        60 *
        1000;

      const age =
        Date.now() - timestamp;

      const validChoice =
        record.choice === "accepted" ||
        record.choice === "rejected";

      const validVersion =
        record.version === CONSENT_VERSION;

      const validTimestamp =
        Number.isFinite(timestamp) &&
        age >= 0 &&
        age <= maximumAge;

      if (
        !validChoice ||
        !validVersion ||
        !validTimestamp
      ) {
        localStorage.removeItem(
          CONSENT_STORAGE_KEY
        );

        return null;
      }

      return record.choice;
    } catch (error) {
      return null;
    }
  }

  function applyConsentDecision(choice) {
    if (choice === "accepted") {
      updateConsent(
        acceptedConsent()
      );
    } else {
      updateConsent(
        deniedConsent()
      );
    }

    saveChoice(choice);

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "nisra_consent_updated",
      consent_choice: choice
    });

    showBanner = false;
  }

  onMount(() => {
    showBanner = !getSavedChoice();
  });
</script>

{#if showBanner}
<section style="background-color:#00205b;color:#FFF">
  <form
    id="global-cookie-message"
    class="cookies-banner clearfix"
    aria-label="cookie banner">
    <div class="cookies-banner__wrapper wrapper">
      <div>
        <div class="cookies-banner__message font-size--18">
          <h1 class="cookies-banner__heading font-size--h3">
            Cookies on the NISRA Area Explorer website
          </h1>
          <p class="cookies-banner__body">
            This prototype web application places small amounts of information known as cookies on your device.
            <a href="https://www.nisra.gov.uk/cookies" class="link" style="color: #ffffff"><u>Find out more about cookies</u></a>.

          </p>
        </div>
        <div class="cookies-banner__buttons">
          <div class="cookies-banner__button cookies-banner__button--accept">
            <button
              class="btn btn--full-width btn--primary btn--focus margin-right--2 font-weight-700 font-size--17 text-wrap"
              data-gtm-accept-cookies="true" type="submit"
              on:click|preventDefault={() => {
                applyConsentDecision("accepted");
              }}>
              Accept cookies
            </button>
          </div>
          <div class="cookies-banner__button">
            <button
              class="btn btn--full-width btn--secondary btn--focus font-weight-700 font-size--17 text-wrap"
              data-gtm-accept-cookies="true"
              on:click|preventDefault={() => {
                applyConsentDecision("rejected");
              }}>
              Reject cookies
              </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</section>
{/if}

<style>
  .wrapper{
    width:90%;
    margin:0 auto;
    padding:0 16px;
  }
  @media(min-width:768px){
    .wrapper{
        width:90%;
        padding:0;
    }
  }
  @media(min-width:992px){
    .wrapper{
        width:90%;
        padding:0;
    }
  }
  .cookies-banner{
    padding:0px 0;
    box-sizing:border-box;
  }
  @media(max-width:768px){
    .cookies-banner{
        padding:10px 0;
    }
  }
  .cookies-banner__wrapper{
    margin-left:auto;
    margin-right:auto;
  }
  .cookies-banner__heading{
    font-weight:800;
  }
  .cookies-banner__body{
    padding:0;
  }
  .cookies-banner__buttons{
    display:flex;
    display:-ms-flexbox;
    justify-content:left;
    align-items:center;
    margin-top:1rem;
  }
  @media(max-width:768px){
    .cookies-banner__buttons{
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
  }
  .cookies-banner__button{
    display:inline-block;
    margin-right:8px;
  }
  @media(max-width:768px){
    .cookies-banner__button{
        margin-top:8px;
        margin-right:0;
        width:90%;
        display:block;
    }
  }
 /*  .cookies-banner__button--hide{
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    font-weight:400;
    font-size:18px;
    line-height:1.25;
    outline:0;
    border:0;
    background:0 0;
    text-decoration:underline;
    color:#206095;
    padding:0;
    float:right;
  } */
  @media(max-width:768px){
   /*  .cookies-banner__button--hide{
        padding:1rem 0;
        display:block;
        float:none;
    } */
  }
  .cookies-banner a{
    text-decoration:none;
  }
  .cookies-banner p {
	  padding: 0;
  }
  .wrapper:before,.clearfix:before,.wrapper:after,.clearfix:after{
    content:"";
    display:table;
  }
  .wrapper:after,.clearfix:after{
    clear:both;
  }
  .font-size--18 {
    font-size:18px;
  }
  .font-size--17{
    font-size:17px!important;
  }
  .font-size--h3{
    font-size: 21px;
    line-height: 24px;
    margin: 16px 0 0;
    padding: 3px 0 5px;
    orphans:3;
    widows:3;
  }
  button{
    cursor:pointer;
  }
  .btn{
    font-family:open sans,Helvetica,Arial,sans-serif;
    font-weight:400;
    font-size:14px;
    display:inline-block;
    width:auto;
    cursor:pointer;
    padding:6px 16px;
    border:0;
    text-align:center;
    -webkit-appearance:none;
    appearance: none;
    transition:background-color .25s ease-out;
    text-decoration:none;
    line-height:24px;
  }
  .btn--primary{
    background-color:#0f8243;
    color:#fff;
  }
  .btn--primary:hover,.btn--primary:focus{
    background-color:#0b5d30;
  }
  .btn--secondary{
    background-color:#6d6e72;
    color:#fff;
  }
  .btn--secondary:hover,.btn--secondary:focus{
    background-color:#323132;
  }
  .btn--full-width{
    display:block;
    width:100%;
  }
  .btn--focus:focus{
    -webkit-box-shadow:0 0 0 3px #f93;
    -moz-box-shadow:0 0 0 3px #f93;
    box-shadow:0 0 0 3px #f93;
    outline:0;
  }
	.margin-right--2{
		margin-right:32px!important;
	}
  .font-weight-700{
    font-weight:700!important;
  }
  .text-wrap{
    white-space:normal;
  }
</style>