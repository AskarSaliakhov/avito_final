import styles from "../css/Pagination.module.css"


interface PaginationProps {
    page: number;
    onIncrement: () => void;
    onDecrement: () => void;
    next: number;
    prev: number;
    howIsNeed:number;
    total:number
}

export function Pagination({page, onIncrement, onDecrement, next, prev,howIsNeed,total}: PaginationProps) {
    const totalPages = Math.ceil(total / howIsNeed);

    return (
        <div className={styles.pagination}>
            {page > 1 &&
                <button
                    onClick={onDecrement}
                    className={styles.pageButton}
                >
                    {prev}
                </button>
            }
            <button
                className={styles.currentPage}
            >
                {page}
            </button>
            {page < totalPages &&
                <button
                    onClick={onIncrement}
                    className={styles.pageButton}
                >
                    {next}
                </button>
            }
        </div>
    )
}
