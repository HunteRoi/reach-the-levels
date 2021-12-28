export interface PaginatedResponse<T> {
	count: number;
	page: number;
	pageSize: number;
	items: T[];
}
