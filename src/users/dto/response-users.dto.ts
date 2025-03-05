export class ResponseUsersDto<T> {
    data: T[];
    meta: {
        totalItems: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };

    constructor(
        data: T[],
        totalItems: number,
        currentPage: number,
        pageSize: number,
    ) {
        this.data = data;
        this.meta = {
            totalItems,
            currentPage,
            pageSize,
            totalPages: Math.ceil(totalItems / pageSize),
            hasNextPage: currentPage < Math.ceil(totalItems / pageSize),
            hasPreviousPage: currentPage > 1,
        };
    }
}
