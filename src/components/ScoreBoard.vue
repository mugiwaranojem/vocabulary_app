<template>
	<div id="scoreboard">
		<h2>Scoreboard</h2>

		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Score</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in getUsers">
					<td>{{ user.name }}</td>
					<td>{{ user.score }}</td>
					<td>{{ user.status }}</td>
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
		}
	}

}

</script>