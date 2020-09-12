export type Posts = {
	title: string;
	date: string;
	content: string;
};

export interface CmsPosts {
	title: string;
	date: string;
	content: string;
	filePath: string;
	filename: string;
	prev: Posts;
	next: Posts;
}
