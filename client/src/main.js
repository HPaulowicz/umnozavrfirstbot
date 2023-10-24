import App from "./App.svelte";

const app = new App({
	target: document.body,
	props: {
		displayMessage: undefined
	}
});

export default app;
