import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Load } from '@sveltejs/kit';

export const load: Load = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (session == null) {
		throw redirect(303, '/');
	}

	const { data, error } = await supabaseClient
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.single();

	return {
		data,
		error
	};
};
