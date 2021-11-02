module.exports = {
    // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
    // don't need to define it here (just if you need to change the options)
    siteMetadata: {
        title: `Portfolio D.S.`,
        description: `Dominik Stepien. Front End Developer with 1.5 years experience`,
        author: `Dominik Stepien`,
    },
    plugins: [{
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true, // defaults to false
                jsxPragma: `jsx`, // defaults to "React"
                allExtensions: true, // defaults to false
            },
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                implementation: require("node-sass"),
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `assets`,
                path: `${__dirname}/src/icon/`
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Portfolio`,
                short_name: `D.S.P`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `./src/icon/react-icon.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    formats: [`auto`, `webp`],
                    placeholder: `dominantColor`,
                    quality: 50,
                    breakpoints: [750, 1080, 1366, 1920],
                    backgroundColor: `transparent`,
                    tracedSVGOptions: {},
                    blurredOptions: {},
                    jpgOptions: {},
                    pngOptions: {},
                    webpOptions: {},
                    avifOptions: {},
                }
            }
        },
        `gatsby-plugin-fontawesome-css`,
        `gatsby-plugin-netlify`
    ],
};