

import { useState } from "react";
import { Review } from "../../interfaces";
import styles from "../../css/OneReview.module.css";

interface OneReviewProps {
    review: Review;
}

export function OneReview({ review }: OneReviewProps) {
    const [showFullReview, setShowFullReview] = useState(false);

    const toggleFullReview = () => {
        setShowFullReview(!showFullReview);
    };

    const getColor = () => {
        if (review.type === "Нейтральный") {
            return "#f2f2f2";
        } else if (review.type === "Позитивный") {
            return "#ebf7eb";
        } else {
            return "#ffebeb";
        }
    };

    return (
        <div
            className={styles.reviewContainer}
            style={{
                backgroundColor: getColor(),
            }}
        >
            <p className={styles.title}>{review.title}</p>
            {showFullReview ? (
                <div>
                    <p className={styles.reviewContent}>{review.review}</p>
                    <button className={styles.fullReviewButton} onClick={toggleFullReview}>Скрыть</button>
                </div>
            ) : (
                <div>
                    <p className={styles.reviewContent}>{review.review.slice(0, 100)}...</p>
                    <button className={styles.fullReviewButton} onClick={toggleFullReview}>Читать полностью</button>
                </div>
            )}
        </div>
    );
}
