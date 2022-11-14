<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { onMount } from 'svelte';

	let username = '';
	let website = '';

	let hasError = false;
	let loading = true;

	$: session = $page.data.session;

	function getProfile() {
		return supabaseClient.from('profiles').select('*').eq('id', session?.user.id).single();
	}

	onMount(async () => {
		const { data, error } = await getProfile();

		loading = false;
		hasError = error != null;

		if (data) {
			username = data.username ?? '';
			website = data.website ?? '';
		}
	});

	function updateProfile() {}
</script>

{#if hasError}
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
			<input
				type="submit"
				class="button block primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>
{/if}
