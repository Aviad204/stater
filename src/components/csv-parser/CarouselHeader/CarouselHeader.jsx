import React from 'react'
import { Carousel } from 'react-bootstrap';
import cover1 from "../images/cover1.jpg";
import cover2 from "../images/cover2.jpg";
import "../parser.css";

function CarouselHeader() {
    return (
        <Carousel>
            <Carousel.Item className="card-overlay" interval={5000}>
                <img className="d-block w-100" src={cover1} alt="First slide" />
                <Carousel.Caption className="d-flex flex-column align-items-center">
                    <h3 className="display-3 text-white">
                        <strong>We Are Stater</strong>
                    </h3>
                    <p className="subtext-caro">
                        <strong>The #1 Stats Website.</strong>
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img className="d-block w-100" src={cover2} alt="Second slide" />
                <Carousel.Caption>
                    <h3 className="display-3 text-white">
                        <strong>Easy Load - 100% Success</strong>
                    </h3>
                    <p className="subtext-caro">
                        <strong>Join over 300 football clubs around the world</strong>
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselHeader