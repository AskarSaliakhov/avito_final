import {OneSeason} from "../../interfaces";
import {OneSeries} from "./OneSeries"
import styles from "../../css/AllSeries.module.css"
import {useRef, useState} from "react";
import {Pagination} from "../Pagination";

interface AllSeasonsProps {
    seasons: OneSeason[];
    total: number;
    onPageChange: (page: number) => void,
}

export function AllSeries({seasons, total, onPageChange}: AllSeasonsProps) {
    const seasonsRef = useRef<HTMLDivElement>(null);
    const [pageSeasons, setPageSeasons] = useState<number>(1);
    const [showFullSeasonIndex, setShowFullSeasonIndex] = useState<number | null>(null);

    const scrollToTop = () => {
        if (seasonsRef.current) {
            seasonsRef.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };

    const handleIncrement = () => {
        setPageSeasons(pageSeasons + 1);
        onPageChange(pageSeasons + 1);
        scrollToTop();
    };

    const handleDecrement = () => {
        setPageSeasons(pageSeasons - 1);
        onPageChange(pageSeasons - 1);
        scrollToTop();
    };

    const toggleFullSeason = (index: number) => {
        setShowFullSeasonIndex(showFullSeasonIndex === index ? null : index);
    };

    return (
        <div className={styles.container}>
            {seasons.map((season, index) => (
                <div key={`${index}+season`} className={styles.oneSeason} ref={seasonsRef}>
                    {season.poster && (
                        <img src={season.poster.url} alt={season.description} className={styles.poster} />
                    )}

                    <h2>{season.description}</h2>
                    <button className={styles.showFullButton} onClick={() => toggleFullSeason(index)}>
                        {showFullSeasonIndex === index ? "Скрыть" : "Показать полностью"}
                    </button>
                    <div className={styles.episodes} style={{ display: showFullSeasonIndex === index ? "block" : "none" }}>
                        {season.episodes.map((seria) => (
                            <OneSeries key={seria.name} seria={seria} />
                        ))}
                    </div>
                    <Pagination
                        page={pageSeasons}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        next={pageSeasons+1}
                        prev={pageSeasons-1}
                        howIsNeed={1}
                        total={total}
                    />
                </div>
            ))}
        </div>
    )

}
