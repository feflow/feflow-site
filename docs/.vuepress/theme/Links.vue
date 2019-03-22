<template>
    <ul class="links">
        <li class="links__item links__title">{{ title }}</li>
        <li
            v-for="(link, index) in links"
            class="links__item"
            :key="index"
        >
            <a
                :href="link.href"
                target="_blank"
            >{{ link.name }}</a>
        </li>
    </ul>
</template>

<script>
export default {
    computed: {
        title () {
            return this.$lang === 'en-US'
                ? 'Links'
                : '友情链接'
        },
        links () {
            return [
                {
                    href: this.$lang === 'en-US' ? 'https://opensource.tencent.com/en' : 'https://opensource.tencent.com/',
                    name: this.$lang === 'en-US' ? 'Tencent OpenSource' : '腾讯开源'
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.links {
    display: flex;

    &__item {
        margin-left: 88px;
        font-size: 18px;
        letter-spacing: 0px;

        a {
            color: #ffffff;
            opacity: 0.5;

            &:hover {
                opacity: 1;
            }
        }
    }

    &__title {
        margin-left: 0;
        color: #ffffff;
    }
}
</style>
