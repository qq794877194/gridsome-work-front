module.exports = {
    siteName: 'gridsome-blog',
    plugins: [
        {
            use: "@gridsome/source-strapi",
            options: {
                apiURL: process.env.GRIDSOME_API_URL,
                queryLimit: 300,
                contentTypes: ['menu','fans','follow', 'blog', 'project'],
                singleTypes: ['general'],
                typeName: 'Strapi'
            }
        }
    ],
    templates: {
        StrapiFans: [
            {
                path: '/social/fans/detail/:id',
                component: './src/templates/fansDetail.vue'
            }
        ],
        StrapiFollow: [
            {
                path: '/social/follow/detail/:id',
                component: './src/templates/followDetail.vue'
            }
        ],
        StrapiBlog: [
            {
                path: '/blog/detail/:id',
                component: './src/templates/blogDetail.vue'
            }
        ],
        StrapiProject: [
            {
                path: '/project/detail/:id',
                component: './src/templates/projectDetail.vue'
            }
        ],
    }
};
