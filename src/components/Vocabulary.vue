<template>

	<div class="vocabulary">

		<div class="item-list hide" id="item-list">
			<div class="header">
				<div class="timer">
					<strong>Tme:</strong>
					<span class="hour">00</span>:
					<span id="minutes">{{  minutes < 10  ? '0'+minutes : minutes }}</span>:
					<span id="seconds">{{ defaultSecVal }}</span>
				</div>

				<div class="points">
					<strong>Name:</strong> <span>{{ name }}</span><br>
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

		<div class="intro" id="intro">
			<h2>Welcome to vocabulary game!</h2>
			<p>
				<strong>Instruction:</strong><br>
				Type in the correct word/letters given the hint and the random letters.
			</p>
			<p>
				Each correct answer will be equal to 1 point,<br>get as many correct answer before time is out. 
			</p>
			<p>
				To start, type your name below and click OK<br>
				<input v-model="name" type="text" id="input-name" class="input-name" placeholder="Name here" @keyup.enter="start"/><br>
				<button id="start" @click="start">OK</button>
			</p>
		</div>

		<div id="timesup" class="timesup hide">
			<h2>Time's Up! :)</h2>

			<table>
				<tr>
					<td><strong>Name</strong></td>
					<td>{{ name }}</td>
				</tr>
				<tr>
					<td><strong>Score</strong></td>
					<td>{{ points }}</td>
				</tr>
			</table>

			<button id="restart">Play again!</button>
		</div>

		<div class="transparent-bg" id="transparent-bg"></div>

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
				defaultMax: 5,
				minutes: 10,
				seconds: 59,
				defaultSecVal: '00',
				keyInputs: [],
				underscore: [],
				points: 0,
				name: '',
				gameStatus: 'ongoing'
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
				let self = this

				let timeInterval = setInterval(function(){

					self.seconds = countDownSec
					self.minutes = countDownMin

					document.getElementById('minutes').innerHTML = ( self.minutes < 10 ) ? '0'+self.minutes : self.minutes
					document.getElementById('seconds').innerHTML = ( self.seconds < 10 ) ? '0'+self.seconds : self.seconds

					countDownSec--

					if( self.minutes <= 0 && self.seconds <= 0) {
						clearInterval(timeInterval)
						self.finish()
					} 

					if( self.seconds == 0 ) {
							countDownMin--
							countDownSec = 59

							document.getElementById('minutes').innerHTML = ( self.minutes < 10 ) ? '0'+self.minutes : self.minutes
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
				if(e.keyCode == 8) { this.backSpace(); return }

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
				// Include bakcspace to the filter
				if ((e.keyCode > 64 && e.keyCode < 91) || 
					(e.keyCode > 96 && e.keyCode < 123) || e.keyCode == 8) return true

				return false
			},

			nextWord() {

				let activeItem = document.getElementsByClassName('word active')[0]

				activeItem.setAttribute('class','word')
				activeItem.nextElementSibling.setAttribute('class','word active')

				this.keyInputs = []

			},

			start() {

				if( this.name.length < 4 ) {
					alert('Name must be at least 4 characters')
					return false
				}

				this.viewContainer('intro', 'intro', false)
				this.viewContainer('transparent-bg', 'transparent-bg', false)
				this.viewContainer('item-list', 'item-list', true)

				document.onkeydown = this.onKeyHit
				this.countDown()

			},

			finish() {

				this.gameStatus = 'finish'

				this.viewContainer('item-list', 'item-list', false)
				this.viewContainer('timesup', 'timesup', true)

			},

			viewContainer( id = '', className = '', visible = true ) {
				let itemList = document.getElementById(id)

				if( visible ) {
					itemList.setAttribute('class', className)
				} else {
					itemList.setAttribute('class',className+' hide')
				}
			},

		},
		created() {

			this.words = this.$words
			this.randomWords = this.getRandomWords(this.words)
			
		},
	}
</script>

<style scoped>
.hide {
	display: none;
}

.show {
	display: block;
}

div#timesup table {
	margin: 0 auto 22px;
}

div.transparent-bg {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	background-color: #000;
	opacity: 0.5;
	z-index: 1040;
	width: 100%;
	height: 100%;
}

div.intro {
	text-align: left;
	background: #fff;
	position: absolute;
	left: 50%;
	top: 30%;
	margin-top: -115px;
	margin-left: -270px;
	width: 540px;
	height: 268px;
	padding: 14px;
	border: 1px dotted;
	z-index: 1050;
}

div.intro .input-name {
	margin: 10px 0;
}

div.vocabulary {
	width: 600px;
	margin: 0 auto;
}

div.header {
	overflow: hidden;
}

div.timer {
	float: right;
}

div.points {
	float: left;
	text-align: left;
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