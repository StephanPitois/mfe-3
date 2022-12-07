import App from './App.svelte';

var target = document.body;
if (typeof GLOBAL_MFE_PARENT_ID_MFE_3 !== 'undefined') {
	target = document.getElementById(GLOBAL_MFE_PARENT_ID_MFE_3);
}

const app = new App({
	target: target,
	props: {
		name: 'world'
	}
});

export default app;
