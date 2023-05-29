// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'DevExps',
    tagline: 'Life is always coding & debugging.',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://devexps.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'devexps', // Usually your GitHub org/user name.
    projectName: '', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    trailingSlash: true,

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: 'pes',
                    path: 'docs-pes',
                    sidebarPath: require.resolve('./sidebars.js'),
                },
                blog: {
                    routeBasePath: '/',
                    blogSidebarCount: 10,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            metadata: [{name: 'keywords', content: 'go, golang, micro-services, flutter'}],
            // Replace with your project's social card
            image: 'img/social-card.jpg',
            navbar: {
                title: 'DevExps',
                logo: {
                    alt: 'Life is always coding & debugging.',
                    src: 'img/logo.svg',
                },
                items: [
                    // {
                    //     label: 'Sharing',
                    //     to: '/pes/overview',
                    // },
                    {
                        label: 'Go-Micro',
                        to: '/go-micro/introduction/overview',
                    },
                    {
                        href: 'https://github.com/devexps',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [],
                copyright: `Copyright © ${new Date().getFullYear()} • Designed and built by Devexps`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['dart', 'cpp', 'go'],
            },
        }),

    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'go-micro',
                routeBasePath: 'go-micro',
                path: 'docs-go-micro',
                sidebarPath: require.resolve('./sidebars.js'),
            },
        ],
    ],
};

module.exports = config;
