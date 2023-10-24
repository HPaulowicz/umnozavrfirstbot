<script>
  export let displayMessage = 'Loading...';
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const init = async () => {
    try {
      const returnValue = await fetch(`/api/v1/welcome?token=${token}`);
      const { message } = await returnValue.json();
      console.log(message);
      displayMessage = message;
    } catch (error) {
      const { message } = error;
      displayMessage = message;
    }
  };
  init();
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>{displayMessage}</h1>
</main>
