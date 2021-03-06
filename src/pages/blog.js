import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout/layout"
import SEO from "../components/seo"

const Blog = () => (
  <Layout>
    <SEO title="Blog " />
    <h1>Blog</h1>
    <p>Welcome to Blog</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Blog
