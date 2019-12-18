import React from 'react'
import ProductDetail from '../components/productDetail'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/layout'


const ProductTemplate = ( { data } ) => {
    
    
    return (
        <Layout>   
            <ProductDetail product={ data.shopifyProduct }/>
        </Layout>
    )
}

export const query = graphql`
        query ProductQuery($handle: String!) {
            shopifyProduct(handle: {eq: $handle}) {
                id
                title
                images {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 1500) {
                        ...GatsbyImageSharpFluid
                      } 
                    }
                  }
                }
                publishedAt(formatString: "YYYY")
                description
                descriptionHtml
                variants {
                  sku
                  id
                  shopifyId
                  title
                  price
                }
            }
        }
        `

export default ProductTemplate
