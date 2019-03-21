<template>
    <div class="slogan">
        <i class="slogan__image"></i>
        <p class="slogan__word">
            <span class="slogan__word-quotation">“</span>
            <span class="slogan__word-core">{{ slogan }}</span>
            <span class="slogan__word-quotation">“</span>
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        slogan () {
            return this.$lang === 'en-US'
                ? 'Scalable plugin to create a team tool chain system'
                : '可扩展的插件机制，打造团队工具链体系'
        }
    }
}
</script>

<style lang="less" scoped>
.slogan {
    margin-top: 60px;
    height: 158px;
    justify-content: center;
    align-items: center;
    display: flex;

    &__image {
        display: block;
        width: 154px;
        height: 100%;
        background-image: url(./images/slogan.png);
        background-size: 100% 100%;
    }

    &__word {
        margin-left: 20px;
        white-space: nowrap;

        &-quotation {
            font-family: monospace;
            font-size: 72px;
            letter-spacing: 0px;
            color: #54e1ff;
        }

        &-core {
            font-size: 36px;
            letter-spacing: 0px;
            color: #327aff;
        }
    }
}
</style>
