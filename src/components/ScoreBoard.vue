<template>
	<div id="scoreboard">
		<h2>Scoreboard</h2>

		<table>
			<thead>
				<tr>
					<th>Rank</th>
					<th>Name</th>
					<th>Score</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(user, index) in getUsers">
					<td>{{ index + 1 }}</td>
					<td>{{ user.name }}</td>
					<td>{{ user.score }}</td>
					<td :class="{ 
						'in-progress': ( user.status=='ongoing' ), 
						'finish': ( user.status=='finish' ) 
					}">{{ user.status }}</td>
				</tr>
			</tbody>
		</table>

	</div>
</template>


<script>

export default {

	name: 'ScoreBoard',
	data() {
		return {
			users: []
		}
	},
	computed: {
		getUsers() {
			let userRef = this.$db.ref('users')
			this.$bindAsArray('users', userRef.orderByChild('score'))

			return this.users.reverse()
		},
	}

}

</script>

<style scoped>
.in-progress {
	color: #ffc107;
}

.finish {
	color: #28a745;
}

div#scoreboard {
	position: absolute;
	width: 278px;
	text-align: left;
	padding: 10px;
}

div#scoreboard table {
	width: 100%;
	border-spacing: 0;
	border-collapse: collapse;
}

div#scoreboard table td,
div#scoreboard table th {
	padding: 8px;
	line-height: 1.42857143;
	vertical-align: top;
	border-top: 1px solid #ddd;
}


div#scoreboard th {
	font-weight: normal;
	text-transform: uppercase;
}
</style>