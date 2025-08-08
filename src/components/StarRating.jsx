import React from "react";

export const StarRating = ({rating}) => {
    if (!rating || !rating.rate) return null;

    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="text-center mb-2">
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, index) => (
                <i
                    key={`full-${index}`}
                    className="fa fa-star text-warning"
                    style={{fontSize: '14px', marginRight: '2px'}}
                ></i>
            ))}

            {/* Half Star */}
            {hasHalfStar && (
                <i
                    className="fa fa-star-half-o text-warning"
                    style={{fontSize: '14px', marginRight: '2px'}}
                ></i>
            )}

            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <i
                    key={`empty-${index}`}
                    className="fa fa-star-o text-muted"
                    style={{fontSize: '14px', marginRight: '2px'}}
                ></i>
            ))}

            <span className="ms-2 text-muted" style={{fontSize: '12px'}}>
                ({rating.rate}) • {rating.count} reviews
            </span>
        </div>
    );
};

