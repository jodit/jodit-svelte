<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  // Properties
  export let editorConstructor = null;
  export let value = "";
  export let config = () => ({});
  export let disabled = false;

  // Instance variables
  let instance = null;
  let lastEditorValue = "";
  let editorElement;

  const dispatch = createEventDispatcher();

  $: watchValue(value);

  function watchValue(x) {
    if (instance && x !== lastEditorValue) {
      instance.value = x;
    }
  }

  onMount(() => {
    // Get dom element to mount initialised editor instance
    instance = editorConstructor
      .make(editorElement, config)
    instance.waitForReady()
      .then(() => {
        // Set initial disabled state.
				instance.setDisabled(disabled)
        // Let the world know the editor is ready.
        dispatch("ready", instance);
        setUpEditorEvents();
      })
      .catch(error => {
        console.error(error);
      });
  });

  onDestroy(() => {
    if (instance) {
      instance.destruct();
      instance = null;
    }

    dispatch("destroy", instance);
  });

  function setUpEditorEvents() {
    const emitInputEvent = () => {
      const data = (value = lastEditorValue = instance.value);
      dispatch("input", { data, instance });
    };

    instance.e
        .on("change", instance.async.debounce(emitInputEvent, instance.defaultTimeout))
        .on("focus", evt => dispatch("focus", { evt, instance }))
        .on("blur", evt => dispatch("blur", { evt, instance }));
  }
</script>

<div bind:this={editorElement} />
