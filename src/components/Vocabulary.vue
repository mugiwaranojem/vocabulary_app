<template>
	<div class="vocabulary">
		<h1>{{ msg }}</h1>

		<ul class="words-list">
			<li v-for="word in randomWords">
				{{ splitWord(word) }} - 
				{{ shuffleWord(splitWord(word)) }}<br>
				<span class="hint">{{ splitHint(word) }}</span>
			</li>
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
				defaultMax: 20,
				users: []
			}
		},
		methods: {
			getRandomWords( input ) {

				input = this.swapArrs(input)

		    let newInput = []

		    for (let i = 0; i < this.defaultMax; i++) {

		    	newInput[i] = input[i]

		    }

		    return newInput

			},
			shuffleWord( word ) {

				let strSplit = word.split('')
				let shuffle = this.swapArrs(strSplit)

				return shuffle.join('')

			},
			swapArrs( arr ) {

				// https://www.kirupa.com/html5/shuffling_array_js.htm
				for (let i = arr.length-1; i >=0; i--) {

	        let randomIndex = Math.floor(Math.random()*(i+1)); 
	        let itemAtIndex = arr[randomIndex]; 
	         
	        arr[randomIndex] = arr[i]; 
	        arr[i] = itemAtIndex;

		    }

		    return arr

			},
			splitWord(phrase) {

				return phrase.split('|')[0]

			},
			splitHint(phrase) {

				return phrase.split('|')[1]

			}
		},
		created() {

			this.words = this.$words
			this.randomWords = this.getRandomWords(this.words)

		}
	}
</script>

<style scoped></style>