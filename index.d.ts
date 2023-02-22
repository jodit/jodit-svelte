import type { SvelteComponent } from 'svelte';
import type { Jodit } from 'jodit/types/jodit'

type DeepPartial<T> = T extends object
	? {
		[P in keyof T]?: DeepPartial<T[P]>;
	}
	: T;


declare class JoditEditor extends SvelteComponent {
	constructor(props: {
		editorConstructor: typeof Jodity;
		value?: string;
		config?: DeepPartial<Jodit['options']>
	});
}
export default JoditEditor;
