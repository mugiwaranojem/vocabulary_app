<template>
	<div class="vocabulary">
		<h1>{{ msg }}</h1>

		<ul class="words-list">
			<li v-for="word in randomWords">{{ word }}</li>
		</ul>

	</div>
</template>

<script>
	export default {
		name: 'Vocabulary',
		data() {
			return {
				msg: 'Vocabulary page',
				words: [],
				randomWords: [],
				defaultMax: 20
			}
		},
		methods: {
			shuffleWords( input ) {

				// https://www.kirupa.com/html5/shuffling_array_js.htm
				for (let i = input.length-1; i >=0; i--) {

	        let randomIndex = Math.floor(Math.random()*(i+1)); 
	        let itemAtIndex = input[randomIndex]; 
	         
	        input[randomIndex] = input[i]; 
	        input[i] = itemAtIndex;

		    }

		    let newInput = [];

		    for (let i = 0; i < this.defaultMax; i++) {

		    	newInput[i] = input[i];

		    }

		    return newInput;
			}
		},
		created() {

			this.words = this.$words
			this.randomWords = this.shuffleWords(this.words)

		}
	}
</script>

<style scoped></style>