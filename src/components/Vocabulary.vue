<template>

	<div class="vocabulary">
		<div class="header">
			<div class="timer">
				<strong>Tme:</strong>
				<span class="hour">00</span>:
				<span id="minutes">{{  minutes < 10  ? '0'+minutes : minutes }}</span>:
				<span id="seconds">{{ defaultSecVal }}</span>
			</div>

			<div class="points">
				<strong>Points:</strong> {{ points }}
			</div>
		</div>
		
		<ul class="words-list">
			<li v-for="(obj, index) in randomWords" :class="{ active: ( index == 0), word: 1 }" v-bind="{ 'data-i': index }">
					<h1 class="shuffled-word">{{ obj.shuffle }}</h1>
					<div class="underscore">
						<span v-for="letter in obj.word.split('')">&nbsp;</span>
					</div>
					<div class="hint">{{ obj.hint }}</div>
			</li>
		</ul>

		<div class="buttons">
			<button id="delete-letter" @click="backSpace">Backspace</button>
			<button id="reshaffle" @click="reshaffleWord">Re-shaffle</button>
			<button id="next-word" @click="nextWord">Next</button>
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
				minutes: 10,
				seconds: 59,
				defaultSecVal: '00',
				keyInputs: [],
				underscore: [],
				points: 0
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
		    		shuffle: this.shuffleWord(word)
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

			countDown() {

				let countDownSec = this.seconds
				let countDownMin = this.minutes - 1

				let timeInterval = setInterval(function(){

					this.seconds = countDownSec
					this.minutes = countDownMin

					document.getElementById('minutes').innerHTML = ( this.minutes < 10 ) ? '0'+this.minutes : this.minutes
					document.getElementById('seconds').innerHTML = ( this.seconds < 10 ) ? '0'+this.seconds : this.seconds

					countDownSec--

					if( this.minutes <= 0 && this.seconds <= 0) clearInterval(timeInterval)

					if( this.seconds == 0 ) {
							countDownMin--
							countDownSec = 59

							document.getElementById('minutes').innerHTML = ( this.minutes < 10 ) ? '0'+this.minutes : this.minutes
					}

				}, 1000)

			},

			backSpace() {
				let len = this.keyInputs.length

				if( len ) {

					this.keyInputs.splice( (len -1), 1 )

					this.setUnderscoreVal()

				}
			},

			onKeyHit(e) {

				if(!this.isAlpha(e)) return

				let key = e.key
				let activeItem  = document.getElementsByClassName('word active')[0]
				let wordIndex = activeItem.getAttribute('data-i')
				let currentItemChilds = activeItem.childNodes

				currentItemChilds.forEach( element => {
					if( element.tagName == 'DIV' && element.hasAttribute('class') && element.getAttribute('class') == 'underscore') {
						this.underscore = element.childNodes
					}
				})

				if( this.keyInputs.length < this.underscore.length ) {
					this.keyInputs.push(key)
				}

				if( this.keyInputs.length == this.underscore.length ) {
					 if(this.checkAnswer()) {
					 	this.points++
					 	this.nextWord()
					 	this.randomWords.splice(wordIndex, 1)
					 	this.keyInputs = []
					 	activeItem.remove()
					 }
				}

				this.setUnderscoreVal()
			},

			setUnderscoreVal() {

				for (let i = 0; i < this.underscore.length; i++) {
					if( this.keyInputs[i] ) {
						this.underscore[i].innerHTML = this.keyInputs[i]
					} else {
						this.underscore[i].innerHTML = '&nbsp;'
					}

				}

			},

			checkAnswer() {
				
				let activeItem = document.getElementsByClassName('word active')[0]
				let wordIndex = activeItem.getAttribute('data-i')
				let wordAnswer = this.randomWords[wordIndex].word
				let userInputs = this.keyInputs.join('').toLocaleLowerCase()

				if( userInputs == wordAnswer )
					return true

				return false
			
			},

			reshaffleWord() {

				let activeItem = document.getElementsByClassName('word active')[0]
				let wordIndex = activeItem.getAttribute('data-i')
				let shuffle = this.randomWords[wordIndex].shuffle
				let currentItemChilds = activeItem.childNodes

				currentItemChilds.forEach( element => {

					if( element.tagName == 'H1' && element.hasAttribute('class') && element.getAttribute('class') == 'shuffled-word') {
						element.innerHTML = this.shuffleWord( shuffle )
					}
				})


			},

			isAlpha(e) {
				if ((e.keyCode > 64 && e.keyCode < 91) || 
					(e.keyCode > 96 && e.keyCode < 123) || e.keyCode == 8) return true

				return false
			},

			nextWord() {
				let activeItem = document.getElementsByClassName('word active')[0]

				activeItem.setAttribute('class','word')
				activeItem.nextElementSibling.setAttribute('class','word active')

			}

		},
		created() {

			this.words = this.$words
			this.randomWords = this.getRandomWords(this.words)

			document.onkeypress = this.onKeyHit
			this.countDown()

		}
	}
</script>

<style scoped>
div.vocabulary {
	width: 600px;
	margin: 0 auto;
}

div.header {
	overflow: hidden;
}

div.timer {
	float: left;
}

div.points {
	float: right;
}

ul.words-list {
	list-style: none;
}

ul.words-list li {
	display: none;
}

ul.words-list li.active {
	display: block;
}

ul.words-list li h1 {
	letter-spacing: 0.2em;
}

div.underscore {
	font-size: 1.5em;
	margin-bottom: 1em;
}

div.underscore span {
	width: 32px;
	display: inline-block;
	border-bottom: 2px solid #000;
	padding-bottom: 10px;
	text-align: center;
	margin-right: 8px;
	font-size: 1.5em;
	font-weight: bold;
}

div.hint {
	max-width: 412px;
	margin: 0 auto;
}

</style>