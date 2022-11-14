<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	let username = data.data?.username ?? '';
	let website = data.data?.website ?? '';

	function updateProfile() {}
</script>

{#if data.error}
	<p>Something went wrong</p>
{:else}
	<form class="form-widget" on:submit|preventDefault={updateProfile}>
		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={$page.data.session?.user.email} disabled />
		</div>
		<div>
			<label for="username">Name</label>
			<input id="username" type="text" bind:value={username} />
		</div>
		<div>
			<label for="website">Website</label>
			<input id="website" type="website" bind:value={website} />
		</div>

		<div>
			<input type="submit" class="button block primary" value={'Update'} />
		</div>
	</form>
{/if}
