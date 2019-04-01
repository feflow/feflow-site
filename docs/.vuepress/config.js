
const encologies = require('./encologies');
const examples = require('./examples');

const EN = 'EN'
const ZH = 'ZH'

/**
 * Generate a sidebar config by language.
 * @param {string} language One language.
 * @return {Array} config.
 */
const generateSidebarConfig = language => {
    const baseTitle = language === EN ? 'Base' : '基础'
    const advanceTitle = language === EN ? 'Advance' : '高级'
    const ruleTitle = language === EN ? 'Rule' : '规范'

    const config = [
        {
            title: baseTitle,
            children: [
                'base-overview',
                'base-install',
                'base-init',
                'base-develope',
                'base-build',
                'base-plugins-inner'
            ]
        },
        {
            title: advanceTitle,
            children: [
                'advance-overview',
                'advance-scaffold-custom',
                'advance-builder-custom',
                'advance-plugins-custom',
                'advance-plugins-context'
            ]
        },
        {
            title: ruleTitle,
            children: [
                'rule-overview',
                'rule-eslint',
                'rule-git-commit'
            ]
        }
    ]

    if (language === EN) {
        config.pop()
    }

    return config;
}

module.exports = {
    // multi language config.
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Feflow',
            description: ''
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Feflow',
            description: ''
        }
    },
    head: [
        ['link', { rel: 'icon', href: `/favicon-196x196.png`, sizes: '196x196' }],
        ['link', { rel: 'icon', href: `/favicon-160x160.png`, sizes: '160x160' }],
        ['link', { rel: 'icon', href: `/favicon-96x96.png`, sizes: '96x96' }],
        ['link', { rel: 'icon', href: `/favicon-32x32.png`, sizes: '32x32' }],
        ['link', { rel: 'icon', href: `/favicon-16x16.png`, sizes: '16x16' }]
    ],
    // theme config.
    themeConfig: {
        // theme multi language config.
        locales: {
            '/': {
                getStartNav: '/guide/',
                // encologies config.
                encologies,
                examples,
                // navbar config. The type is Array, array's item is an object.
                navs: [
                    {
                        text: 'Guide',
                        link: '/guide/'
                    },
                    {
                        text: 'Encology',
                        link: '/encology/'
                    },
                    {
                        text: 'Experience',
                        link: '/experience/'
                    },
                    {
                        text: 'Example',
                        link: '/example/'
                    },
                    {
                        text: 'News',
                        link: '/active/'
                    },
                    {
                        text: 'Changelog',
                        link: 'https://github.com/feflow/feflow/releases'
                    },
                ],
                // sidebar config. Key is a route, a page map a sidebar.
                sidebar: {
                    '/guide/': generateSidebarConfig(EN)
                }
            },
            '/zh/': {
                getStartNav: '/zh/guide/',
                // encologies config.
                encologies,
                examples,
                // navbar config. The type is Array, array's item is an object.
                navs: [
                    {
                        text: '文档指南',
                        link: '/zh/guide/'
                    },
                    {
                        text: '生态系统',
                        link: '/zh/encology/'
                    },
                    {
                        text: '实践案例',
                        link: '/zh/experience/'
                    },
                    {
                        text: '示例',
                        link: '/zh/example/'
                    },
                    {
                        text: '最新动态',
                        link: '/zh/active/'
                    },
                    {
                        text: '发布日志',
                        link: 'https://github.com/feflow/feflow/releases'
                    },
                ],
                // sidebar config. Key is a route, a page map a sidebar.
                sidebar: {
                    '/zh/guide/': generateSidebarConfig(ZH)
                }
            }
        }
    }
}
