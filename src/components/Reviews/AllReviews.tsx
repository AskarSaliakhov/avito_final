// AllReviews.tsx

import { OneReview } from "./OneReview";
import { Reviews } from "../../interfaces";
import styles from "../../css/AllReviews.module.css";
import { Pagination } from "../Pagination";
import { useRef, useState } from "react";

interface PropsAllReviews {
    reviews: Reviews;
    total: number;
    onPageChangeReview: (page: number) => void;
}

export function AllReviews({ reviews, total, onPageChangeReview }: PropsAllReviews) {
    const reviewsRef = useRef<HTMLDivElement>(null);
    const [pageReviews, setPageReviews] = useState<number>(1);

    const scrollToTop = () => {
        if (reviewsRef.current) {
            reviewsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleIncrement = () => {
        setPageReviews(pageReviews + 1);
        onPageChangeReview(pageReviews + 1);
        scrollToTop();
    };

    const handleDecrement = () => {
        setPageReviews(pageReviews - 1);
        onPageChangeReview(pageReviews - 1);
        scrollToTop();
    };

    return (
        <div className={styles.all__reviews} ref={reviewsRef}>
            <p className={styles.reviews__statika}>Рецензии фильма:</p>
            {reviews.docs.map((elem, index) => (
                <div key={elem.id}>
                    <OneReview review={elem} />
                </div>
            ))}
            <Pagination
                page={pageReviews}
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
                next={pageReviews+1}
                prev={pageReviews-1}
                howIsNeed={1}
                total={total}
            />
        </div>
    );
}
