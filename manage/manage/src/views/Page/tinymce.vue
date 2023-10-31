<template>
	<tinymce :id="editorId"></tinymce>
</template>
<script>
	import tinymce from '../../components/TinyMce.vue'
	import {ref} from 'vue'
	export default {
		components: {
			tinymce
		},
		setup() {
			const editorId = ref('editorId')
			return {
				editorId
			}
		}
	}
</script>
