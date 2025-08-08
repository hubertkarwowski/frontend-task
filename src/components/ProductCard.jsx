import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addCart} from "../redux/action";
import {StarRating} from "./StarRating";
import {Badge, UncontrolledTooltip} from "reactstrap";

const sizes = ["S", "M", "L", "XL"]

export const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState(null); // Add this

    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className="shop-card">
            <div className="image-container position-relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image img-fluid w-100"
                />

                {!product.outOfStock && (
                    <div className="position-absolute" style={{top: '0.625rem', left: '0.625rem', zIndex: 10}}>
                    <span className="badge bg-dark text-white px-3 py-2">
                        OUT OF STOCK
                    </span>
                    </div>
                )}

                <div>
                    <UncontrolledTooltip
                        placement="bottom"
                        target={`productInfo-${product.id}`}
                    >
                        {product.description}
                    </UncontrolledTooltip>
                    <Badge className="position-absolute bg-dark"
                           id={`productInfo-${product.id}`}
                           style={{top: '3rem', left: '0.625rem', zIndex: 10, cursor: 'pointer'}}
                           onClick={handleSizeClick}>
                        <i className="fa fa-circle-info icon-lg"/>
                    </Badge>
                </div>
                <div className="size-labels position-absolute d-flex gap-1 flex-wrap"
                     style={{top: '0.625rem', right: '0.625rem', zIndex: 10}}>
                    {sizes.map((size) => (
                        <span
                            key={size}
                            className={`size-badge ${selectedSize === size ? "selected" : ""}`}
                            onClick={() => handleSizeClick(size)}
                        >
                            {size}
                        </span>
                    ))}
                </div>

                <div
                    className="overlay position-absolute w-100 h-100 d-flex justify-content-around align-items-end pb-3 gap-2 px-3"
                >
                    <button
                        className="buy-button"
                        onClick={() => addProduct(product)}
                        disabled={product.outOfStock}
                    >
                        <i className="fa fa-shopping-cart icon"/>Add to cart
                    </button>
                    <a
                        href={"/product/" + product.id}
                        className="buy-button"
                    >
                        Buy now <i className="fa fa-arrow-right icon"/>
                    </a>
                </div>
            </div>

            <div className="p-3">
                <StarRating rating={product.rating}/>

                <h4 className="h4 mb-2 text-center font-weight-bold">
                    ${product.price}
                </h4>
                <h5 className="mb-0 fw-semibold text-dark text-center">
                    {product.title}
                </h5>
            </div>

            <style jsx>{`
                .size-labels {
                    display: flex;
                    gap: 0.25rem;
                    flex-wrap: wrap;
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
                }

                .shop-card:hover .size-labels {
                    opacity: 1;
                    transform: translateY(0);
                }

                .size-badge {
                    cursor: pointer;
                    display: inline-block;
                    min-width: 1.75rem;
                    height: 1.75rem;
                    line-height: 1.75rem;
                    text-align: center;
                    background-color: #ffffff;
                    color: #343a40;
                    border: 1px solid #dee2e6;
                    font-size: 0.75rem;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: opacity 0.4s ease, transform 0.4s ease;
                }

                .size-badge.selected {
                    border: 2px solid #343a40;
                    color: #343a40;
                    font-weight: 700;
                }

                .shop-card:hover .size-labels .size-badge:nth-child(1) {
                    opacity: 1;
                    transform: translateY(0);
                }

                .shop-card:hover .size-labels .size-badge:nth-child(2) {
                    transition-delay: 0.2s;
                    opacity: 1;
                    transform: translateY(0);
                }

                .shop-card:hover .size-labels .size-badge:nth-child(3) {
                    transition-delay: 0.3s;
                    opacity: 1;
                    transform: translateY(0);
                }

                .shop-card:hover .size-labels .size-badge:nth-child(4) {
                    transition-delay: 0.4s;
                    opacity: 1;
                    transform: translateY(0);
                }

                .shop-card {
                    width: 100%;
                    max-width: 25rem;
                    overflow: hidden;
                    border-radius: 0.5rem;
                    margin: 0 1rem 3rem;
                }

                .image-container {
                    overflow: hidden;
                    height: 32rem;
                    background-color: #f8f9fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    border-radius: 0.3rem;

                }

                .product-image {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    transition: transform 0.5s ease-in-out;
                }

                .shop-card:hover .product-image {
                    transform: scale(1.08);
                }

                .badge {
                    font-size: 0.6875rem;
                    font-weight: 600;
                    letter-spacing: 0.03rem;
                    border-radius: 0.25rem;
                }

                .overlay {
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.2);
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                }

                .shop-card:hover .overlay {
                    opacity: 1;
                }

                .buy-button {
                    opacity: 0;
                    transform: translateY(1.25rem);
                    transition: all 0.3s ease-in-out, background-color 0.3s ease, color 0.3s ease;
                    font-weight: 600;
                    font-size: 0.875rem;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    cursor: pointer;
                    z-index: 50;
                    background-color: #fff;
                    color: #2c3e50;
                    border-radius: 0.3rem;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    width: 100%;
                    justify-content: center;
                }

                .icon {
                    font-size: 0.75rem;
                    line-height: 1;
                }

                .icon-lg {
                    font-size: 1.2rem;
                    line-height: 1;
                }

                .shop-card:hover .buy-button {
                    opacity: 1;
                    transform: translateY(0);
                }

                .buy-button:hover {
                    background-color: #f8f9fa !important;
                    transform: scale(1.05);
                }

                h4 {
                    font-size: 1.25rem;
                    color: #2c3e50;
                }

                h5 {
                    font-size: 0.95rem;
                    color: #6c757d;
                    line-height: 1.4;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .p-3 {
                    background-color: #fff;
                }


            `}</style>
        </div>
    );
};
