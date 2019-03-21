<template>
    <section class="guide">
        <!-- two level sidebar. -->
        <aside class="guide__aside">
            <section
                class="guide__aside-section"
                v-for="(aside, index) in asides"
                :key="index"
            >
                <p class="guide__aside-title">{{ aside.title }}</p>
                <ul class="guide__aside-content">
                    <li
                        class="guide__aside-item"
                        v-for="page in aside.children"
                        :key="page.key"
                    >
                        <router-link
                            class="guide__aside-link"
                            :to="page.path"
                        >{{ page.title }}</router-link>
                    </li>
                </ul>
            </section>
        </aside>
        <main class="guide__main">
            <Content :custom="false" />
        </main>
    </section>
</template>

<script>
/**
 * Active generate aside by directory tree.
 * 根据目录树生成左边的侧边栏导航.
 * @param {Vuepress} ctx Vue Instance
 * @return {Array} aside array.
 */
const generateAsides = (ctx) => {
    // Get useful value from ctx.
    const route = ctx.$route || {}
    const site = ctx.$site || {}
    const config = ctx.$themeLocaleConfig || {}

    const currentPath = route.path || ''
    const pages = site.pages || []
    const sidebarConfig = config.sidebar || {}

    // Get sidebar key as a route.
    const rootPath = Object.keys(sidebarConfig).filter(key => new RegExp(key).test(currentPath)).pop() || ''
    const currentSidebarConfig = sidebarConfig[rootPath] || {}

    // Generate asides.
    const asides = currentSidebarConfig.map(tree => {
        const children = tree.children || []

        return {
            ...tree,
            children: children.map(filename => {
                const isThePage = page => {
                    const thePath = page.path
                    return new RegExp(filename).test(thePath) && new RegExp('^' + rootPath).test(thePath)
                }
                const page = pages.filter(page => isThePage(page)).pop()

                return { ...page }
            })
        }
    })

    return asides
}

export default {
    data () {
        return {
            asides: []
        }
    },

    watch: {
        '$route' (route) {
            this.asides = generateAsides(this)
        }
    },

    mounted () {
        this.asides = generateAsides(this)
    }
}
</script>

<style lang="less" scoped>
.guide {
    padding: 52px 48px 188px;
    justify-content: space-between;
    display: flex;

    background-color: #fff;

    // Aside width confirm by content.
    &__aside {
        padding-top: 15px;
        border-right: 1px solid #d5d5d5;

        &-section:not(:first-child) {
            margin-top: 39px;
        }

        &-title {
            font-size: 24px;
	        color: #666666;
        }

        &-content {
            margin-top: 15px;
        }

        &-item {
            height: 30px;
        }

        &-link {
            display: block;
            width: 100%;
            height: 100%;
            font-size: 16px;
            line-height: 30px;
            padding-left: 30px;
            padding-right: 30px;
            color: #666666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border-right: 2px solid transparent;

            &:hover {
                color: #327aff;
                background-color: #f9f9f9;
                border-right-color: #327aff;
            }
        }
    }

    &__main {
        flex-grow: 1;
        margin-top: 7px;
        margin-left: 25px;
        padding-right: 13.5px;
        overflow: hidden;
    }
}
</style>


