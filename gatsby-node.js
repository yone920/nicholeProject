const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    return new Promise ((resolve, reject) => {
        graphql(`
            {
                allWordpressPost {
                    edges {
                      node {
                        slug
                      }
                    }
                  }
                allWordpressWpMenu {
                edges {
                    node {
                    slug
                    }
                    }
                }
                allShopifyProduct {
                    edges {
                      node {
                          handle
                          id
                      }
                      }
                    }
            }
        `).then(results => {
            if (results.errors)  {
                console.log(result.errors);
                reject(result.errors)
            }
            results.data.allWordpressPost.edges.forEach(({node}) => {
                createPage ({
                    path: `/posts/${node.slug}`,
                    component: path.resolve('./src/components/postLayout.js'),
                    context: {
                        slug: node.slug,
                    }
                })
            })

            results.data.allWordpressWpMenu.edges.forEach(({node}) => {
                createPage ({
                    path: `/catering/${node.slug}`,
                    component: path.resolve('./src/components/menuLayout.js'),
                    context: {
                        slug: node.slug,
                    }
                })
            })

            results.data.allShopifyProduct.edges.forEach(({node}) => {
                createPage ({
                    path: `/flower/${node.handle}`,
                    component: path.resolve('./src/template/productTemplate.js'),
                    context: {
                        id: node.id,
                        handle: node.handle
                    }
                })
            })
            resolve();
        })
    } )
}