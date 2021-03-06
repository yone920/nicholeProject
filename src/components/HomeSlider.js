import React from 'react'
import Slider from "react-slick";
// import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

 const HomeSlider = ({desktop, mobile}) => {


const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })

    let settings = {}
    if (isTabletOrMobile === true) {

         settings = {
            dots: false,
            swipeToSlide: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 6000,
            fade: true,
            beforeChange: function(currentSlide, nextSlide) {
            },
            afterChange: function(currentSlide) {
            }
          };
    } else {
         settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 6000,
            // speed: 2000,
            // cssEase: "linear",
            fade: true,
            beforeChange: function(currentSlide, nextSlide) {
            },
            afterChange: function(currentSlide) {
            }
          };
    }

    const mapOverPhotos = () => (
			isTabletOrMobile ?
			mobile.edges.map(node => (
				<div key={node.node.id}>
					<Img fluid={node.node.acf.photo.localFile.childImageSharp.fluid} />
				</div>
			))
			:
			desktop.edges.map(node => (
				<div key={node.node.id}>
					<Img fluid={node.node.acf.photo.localFile.childImageSharp.fluid} />
				</div>
			))
    )

    return (
			<SliderWrapper>
				<Slider {...settings}>
					{mapOverPhotos()}
				</Slider>
      </SliderWrapper>
    )
}

const SliderWrapper = styled.div`

    .slid-div {
        background-color: black;
    }
`

export default HomeSlider;
