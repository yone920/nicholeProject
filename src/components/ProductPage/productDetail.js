import React, { useState  } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { withTheme } from 'styled-components'
import AddToCart from '../Cart/addToCart'
import { Link } from "gatsby"


const ProductDetail = ( {product, parent} ) => {

    const [selectedVariant, setSelectedvariant] = useState(product.variants[0])

    const mapOverImages = () => (
        product.images.map(image => {
          if (!image) {
            return null;
          }
          return (
            <div className="image-wrapper" key={image.localFile.childImageSharp.fluid.base64}>
              <Img fluid={image.localFile.childImageSharp.fluid} alt={image.title}  />
            </div>
          )
        })
    )

    const vendor = product.vendor.replace(/-/g, ' ');
    const Vendor = (str) => {
      str = str.toLowerCase().split(' ');

      for(var i = 0; i < str.length; i++){
        str[i] = str[i].split('');
        str[i][0] = str[i][0].toUpperCase();
        str[i] = str[i].join('');
      }
      return str.join(' ');
    }

  return (
    <ProductContainer>
      { product.vendor === "flower-arrangement" ?
        <div className="breadcrumbs">
          <Link to={`/flowerarrangements`}>
            Flower Arrangments Page
          </Link>
        </div>
        :
       product.vendor === "plants" ?
        <div className="breadcrumbs">
          <Link to={`/plants`}>
            Plants Page
          </Link>
        </div>
        :
       product.vendor === "accessories" ?
        <div className="breadcrumbs">
          <Link to={`/accessories`}>
            Accessories Page
          </Link>
        </div>
        :
      <div className="breadcrumbs">
        <Link to={`/catering-shopping/jerk`}>
          Catering Shopping
        </Link>
        <span>/</span>
        <Link to={`/catering-shopping/${product.vendor.toLowerCase().replace(/\s+/g, '-')}`}>
          {Vendor(vendor)}
        </Link>
      </div>
    }
      <div className="images-content-container">
        <div>
        {mapOverImages()}
        </div>
        <div className="content-add-to-cart-wrapper">
          <div className="content-wrapper">
            <div className="product-name">
              <h1>{product.title}</h1>
            </div>
            <div className="product-price">
              <h3>${selectedVariant.price}</h3>
            </div>
            <div className="">
              {product.variants.length > 1 &&
                <select className="variant-select" onChange={e => {
                  const selected = product.variants.filter(variant => variant.sku ===  e.target.value)
                  setSelectedvariant(selected[0])
                  }}
                  value={selectedVariant.sku}>
                  {product.variants.map(variant => (
                  <option key={variant.id} value={variant.sku}>{variant.title}</option>
                  ))}
                </select>
                  }
            </div>
            <div className="desc-wrapper"
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml,
              }}
            />
          </div>
          <div className="add-to-cart-button">
            <AddToCart variantId={selectedVariant.shopifyId}/>
          </div>
        </div>
      </div>
    </ProductContainer>
  )
}

const ProductContainer = styled.main`
  grid-column: center-start / center-end;

  display: grid;
  /* grid-row:  */
  grid-template-columns: [ full-start ] minmax(4rem, 1fr) [center-start ] repeat(8, [col-start] minmax(min-content, 13rem) [ col-end ]) [center-end] minmax(4rem, 1fr) [ full-end ];
  margin-top: 2rem;
  margin-bottom: 20rem;


  @media ${props => props.theme.device.mobileL} {
    grid-template-columns: [ full-start ] minmax(2rem, 1fr) [center-start ] repeat(8, [col-start] minmax(min-content, 13rem) [ col-end ]) [center-end] minmax(2rem, 1fr) [ full-end ];
    margin: 4rem 0 6rem 0;
  }

  .breadcrumbs {
    grid-column: center-start / center-end;
    margin-bottom: 4rem;

    a,
    a:link,
    a:active {
      color: #676767;
      text-decoration: none;
    }
    a:hover {
      text-decoration: none;
      color: #000;
    }

    span {
      margin: 0 1rem;
    }
  }

  .images-content-container {
    grid-column: center-start / center-end;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media ${props => props.theme.device.laptop} {
    display: block;
    }

  .image-wrapper {
    display: grid;
    grid-gap: .5rem;
    align-self: start;
    margin-bottom: 2rem;
    @media ${props => props.theme.device.laptop} {
     grid-column: center-start / center-end;
    }
  }

  .content-add-to-cart-wrapper {
    margin-left: 5rem;
    display: grid;
    align-self: start;

    @media ${props => props.theme.device.laptop} {
        grid-column: center-start / center-end;
        margin: 5rem 0 0 0;
    }

    .content-wrapper {

      .product-name {
        margin-bottom: 1rem;

        h1 {
            color: #000;
            font-size: 2rem;
            text-transform: uppercase;
        }
      }

      .product-price {
        margin-bottom: 5rem;
          h3 {
            font-weight: 300;
          }
      }

        option {
            font-weight:normal;
        }
      }

      .variant-select {

      }

      .desc-wrapper {
        margin-top: 3rem;

        ul {
          padding: 2rem 0;
          li {
            font-size: 1.6rem;
          }
          padding-left: 2rem;

        }
      }
    }
  }
    .add-to-cart-button {
      /* margin-top: 4rem; */
      align-self: end;

      @media ${props => props.theme.device.mobile} {
        margin-top: 12rem;
    }
    }

  }

`



export default withTheme(ProductDetail)