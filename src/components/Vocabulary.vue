<template>
	<div class="vocabulary">
		<h1>{{ msg }}</h1>
	</div>
</template>

<script>
	export default {
		name: 'Vocabulary',
		data() {
			return {
				msg: 'Vocabulary page',
				words: []
			}
		},
		created () {
			this.words = this.$words
		}
	}
</script>