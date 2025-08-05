export type SelectOption = { value: string; label: string };
export type ApiOption = { id: string; name: string };

export interface ApiOptionsResponse {
	categories: ApiOption[];
	languages: ApiOption[];
	providers: ApiOption[];
	roles: ApiOption[];
}

export type UIFormValues = {
	title: string;
	description: string;
	category: SelectOption | null;
	language: SelectOption | null;
	provider: SelectOption | null;
	roles: SelectOption[];
	file: File | null;
};
