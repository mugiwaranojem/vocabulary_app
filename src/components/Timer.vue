<template>
	<div class="timer">
		<span class="hour">00</span>:<span id="minutes">{{  minutes < 10  ? '0'+minutes : minutes }}</span>:<span id="seconds">{{ defaultVal }}</span>
		{{ countDown() }}
	</div>
</template>

<script>
export default {
	name: 'Timer',
	data() {
		return {
			minutes: 2,
			seconds: 59,
			defaultVal: '00'
		}
	},
	methods: {

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
						countDownSec = this.seconds

						document.getElementById('minutes').innerHTML = ( this.minutes < 10 ) ? '0'+this.minutes : this.minutes
				}

			}, 1000)

		},

	},

}
</script>