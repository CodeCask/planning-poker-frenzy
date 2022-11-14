import { writable } from 'svelte/store';

export const vote = writable<number | null>(null);
