<template>
    <div class="community">
        <p class="index-title">{{ title }}</p>
        <ul class="community__list">
            <li
                class="community__item"
                v-for="(community, index) in communities"
                :key="index"
            >
                <img
                    :src="community.logoPath"
                    alt="community logo"
                >
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            communities: []
        }
    },

    computed: {
        title () {
            return this.$lang === 'en-US'
                ? 'Community'
                : '合作社区'
        }
    }
}
</script>

<style lang="less" scoped>
.community {
    &__list {
        margin-top: 63px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    &__item {
        width: 200px;
        height: 76px;
        display: flex;
        justify-content: center;
        align-items: center;

        & > img {
            display: block;
            height: 50%;

        }
    }
}
</style>
