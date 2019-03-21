<template>
    <div class="flow">
        <div class="flow-item">
            <i class="flow-item__icon flow-item__icon--create"></i>
            <p class="flow-item__word">{{ flow.create }}</p>
        </div>
        <div class="flow-arrow"></div>
        <div class="flow-item">
            <i class="flow-item__icon flow-item__icon--develop"></i>
            <p class="flow-item__word">{{ flow.develop }}</p>
        </div>
        <div class="flow-arrow"></div>
        <div class="flow-item">
            <i class="flow-item__icon flow-item__icon--build"></i>
            <p class="flow-item__word">{{ flow.build }}</p>
        </div>
        <div class="flow-arrow"></div>
        <div class="flow-item">
            <i class="flow-item__icon flow-item__icon--check"></i>
            <p class="flow-item__word">{{ flow.check }}</p>
        </div>
        <div class="flow-arrow"></div>
        <div class="flow-item">
            <i class="flow-item__icon flow-item__icon--publish"></i>
            <p class="flow-item__word">{{ flow.publish }}</p>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        flow () {
            return this.$lang === 'en-US'
                ? {
                    create: 'Create',
                    develop: 'Develop',
                    build: 'Build',
                    check: 'Check',
                    publish: 'Publish'
                }
                : {
                    create: '创建项目',
                    develop: '本地开发',
                    build: '打包构建',
                    check: '规范检查',
                    publish: '发布上线'
                }
        }
    }
}
</script>

<style lang="less" scoped>
@import "./styles/icon.less";

.flow {
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 98px;
    background-color: #fff;
    box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.05);

    &-item {

        &__icon {
            display: block;
            width: 118px;
            height: 106px;
            background-size: contain;
            background-position: center center;
            background-repeat: no-repeat;

            &--create {
                background-image: url(@flow-create);
            }
            &--develop {
                background-image: url(@flow-develop);
            }
            &--build {
                background-image: url(@flow-build);
            }
            &--check {
                background-image: url(@flow-check);
            }
            &--publish {
                background-image: url(@flow-publish);
            }
        }

        &__word {
            margin-top: 42px;
            font-size: 24px;
            letter-spacing: 0px;
            color: #666666;
            text-align: center;
        }
    }

    &-arrow {
        width: 17px;
        height: 106px;
        background-image: url(@flow-arrow);
        background-size: contain;
        background-repeat: no-repeat;
    }
}
</style>
