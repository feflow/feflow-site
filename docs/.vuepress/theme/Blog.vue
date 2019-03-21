<template>
    <div class="blog">
        <div
            v-if="page.frontmatter && page.frontmatter.date"
            class="blog__date"
        >
            <p>{{ page.frontmatter.day }}</p>
            <p>{{ page.frontmatter.year }}年{{ page.frontmatter.month }}月</p>
        </div>
        <div class="blog__right">
            <Content />
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        page () {
            const { frontmatter = {} } = this.$page
            const { date = '' } = frontmatter
            const dateObject = new Date(date.replace(/-/g, '/'))

            return {
                ...this.$page,
                frontmatter: {
                    ...frontmatter,
                    year: dateObject.getFullYear(),
                    month: dateObject.getMonth() + 1,
                    day: dateObject.getDate()
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.blog {
    background-color: white;
    letter-spacing: 0px;
    display: flex;
    justify-content: space-between;
    padding: 64px 54px 64px 79px;

    &__date {
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

    &__right {
        margin-top: -1em;
        width: 905px;
    }
}
</style>
