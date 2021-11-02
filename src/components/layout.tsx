/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import '../styles/theme/theme.scss'
import 'font-awesome/css/font-awesome.min.css';
const Layout:React.FC = ({ children }):JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="main-wrapper">
      <main>{children}</main>
    </div>
  )
}

export default Layout
