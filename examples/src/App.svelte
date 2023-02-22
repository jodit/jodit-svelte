<script>
	// Jodit wrapper component
	import JoditEditor from "../../src/index.js";
	// Use Jodit Community Version
	import "jodit/build/jodit.es2018.en.min.css"
	import {Jodit} from "jodit";

	// For Jodit PRO Version
	// import "jodit-pro/build/jodit.fat.css"
	// import {Jodit} from "jodit-pro";


	// Editor constructor
	let editorConstructor = Jodit;
	// Reference to initialised editor instance
	let editorInstance = null;
	// Setting up any initial data for the editor
	let editorValue = "Hello World";

	// If needed, custom editor config can be passed through to the component
	// Uncomment the custom editor config if you need to customise the editor.
	let editorConfig = {
		buttons: [
		 	'bold', 'italic'
		]
	};

	function onReady({ detail: editor }) {
		editorInstance = editor;
		console.log(editor.isReady);
	}

	function onChange({detail: {data}}) {
		editorValue = data;
		console.log(data);
	}
</script>

<div>
	<JoditEditor
		bind:editorConstructor={editorConstructor}
		on:ready={onReady}
		on:input={onChange}
		bind:config={editorConfig}
		bind:value={editorValue} />
</div>
