<template>
    <section class="blog-list">
        <ul class="blog-list__tags">
            <li
                v-for="(tag, index) in tags"
                :key="index"
                class="blog-list__tags-item"
            >
                <router-link
                    :class="currentTag === tag ? 'blog-list__tags-item-link--active' : 'blog-list__tags-item-link'"
                    :to="tag === defaultTag ?  $route.path : $route.path + '#' + tag"
                >{{ tag }}</router-link>
            </li>
        </ul>
        <ul class="blog-list__content">
            <li
                v-for="page in pages"
                :key="page.key"
                class="blog-list__content-item"
            >
                <router-link
                    class="blog-list__content-item-link"
                    :to="page.path"
                >
                    <div
                        v-if="page.frontmatter && page.frontmatter.date"
                        class="blog-list__content-item-date"
                    >
                        <p>{{ page.frontmatter.day }}</p>
                        <p>{{ page.frontmatter.year }}年{{ page.frontmatter.month }}月</p>
                    </div>
                    <div class="blog-list__content-item-right">
                        <p class="blog-list__content-item-title">{{ page.title }}</p>
                        <p class="blog-list__content-item-description">{{ page.frontmatter && page.frontmatter.description }}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
const getDefaultTag = lang => {
    return lang === 'en-US'
        ? 'All'
        : lang === 'zh-CN'
            ? '全部文章'
            : ''
}

export default {
    data () {
        return {
            currentTag: '',
            defaultTag: '',
            tags: [],
            pages: []
        }
    },

    mounted () {
        this.updateList()
    },

    watch: {
        '$route'() {
            this.updateList()
        }
    },

    methods: {
        updateList () {
            const route = this.$route || {}
            const currentPath = route.path || ''
            const regExp = new RegExp(currentPath)
            const site = this.$site || {}
            const pages = site.pages || []
            const lang = this.$lang
            const defaultTag = getDefaultTag(lang)

            // Data bind.
            const currentPages = pages.filter(page => {
                return regExp.test(page.path) && /\.html/.test(page.path)
            })
            this.pages = currentPages.map(page => {
                const { frontmatter = {} } = page
                const { date = '' } = frontmatter
                const dateObject = new Date(date.replace(/-/g, '/'))

                return {
                    ...page,
                    frontmatter: {
                        ...frontmatter,
                        year: dateObject.getFullYear(),
                        month: dateObject.getMonth() + 1,
                        day: dateObject.getDate()
                    }
                }
            })
            this.tags = this.pages.length
                ? this.pages.reduce((result, page) => {
                    const { frontmatter = {} } = page
                    const { tag = defaultTag } = frontmatter
                    const array = Array.isArray(tag)
                        ? [...result, ...tag]
                        : [...result, tag]
                    return Array.from(new Set(array))
                }, [defaultTag])
                : []


            // 当前 URL
            this.currentTag = decodeURIComponent(location.hash.replace('#', '')) || defaultTag;
        }
    }
}
</script>

<style lang="less" scoped>
.blog-list {

    &__tags {
        display: flex;
        justify-content: center;

        &-item {
            width: 100px;
            height: 40px;
            margin: 0 17.5px;
            font-size: 16px;
	        line-height: 40px;
            text-align: center;

            &-link--active,
            &-link {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 20px;
                color: #666666;
            }

            &-link--active,
            &-link:hover {
                color: #ffffff;
                background-color: #327aff;
            }
        }
    }

    &__content {
        margin-top: 29px;

        &-item {
            height: 280px;
            background-color: #fff;

            &:not(:first-child) {
                margin-top: 22px;
            }

            &-link {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 100%;
                padding: 64px 54px 0px 79px;
            }

            &-right {
                width: 905px;
            }

            &-date {
                color: #327aff;
                text-align: right;

                & > p {
                    &:first-child {
                        font-size: 48px;
                        font-weight: bold;
                    }

                    &:last-child {
                        font-size: 16px;
                    }
                }
            }

            &-title {
                font-size: 30px;
	            font-weight: bold;
	            color: #333333;
            }

            &-description {
                margin-top: 41px;
                font-size: 16px;
                color: #666666;
            }
        }
    }
}
</style>
