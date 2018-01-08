<template>
	<div class="vocabulary">
		<ul class="words-list">
			<li v-for="(obj, index) in randomWords" :class="{ active: ( index == 0) }">
					<h1>{{ obj.shuffle }}</h1>
					<div class="underscore">{{ obj.underscore }}</div>
					<div class="hint">{{ obj.hint }}</div>
			</li>
		</ul>

		<div class="buttons">
			<button id="next-word">Next</button>
		</div>

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
				isActive: false
			}
		},
		methods: {
			getRandomWords( input ) {

				input = this.swapArrs(input)

		    let newInput = []

		    for (let i = 0; i < this.defaultMax; i++) {

		    	let word = this.splitWord(input[i])
		    	newInput[i] = {
		    		word: word,
		    		hint: this.splitHint(input[i]),
		    		shuffle: this.shuffleWord(word),
		    		underscore: this.getUnderScore(word)
		    	}

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

			},
			getUnderScore(word) {

				let underscore = ''

				for (var i = word.length - 1; i >= 0; i--) {
					underscore += ( i == 0 ) ? '_' : '_ '
				}

				return underscore
			}
		},
		created() {

			this.words = this.$words
			this.randomWords = this.getRandomWords(this.words)

		}
	}
</script>

<style scoped>
ul.words-list {
	list-style: none;
}

ul.words-list li {
	display: none;
}

ul.words-list li.active {
	display: block;
}

ul.words-list li h2 {
	letter-spacing: 0.2em
}

div.underscore {
	font-size: 1.5em
}

</style>