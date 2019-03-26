<template>
    <div class="copyright">
        <div class="copyright__text">
            <p>© 2019 Feflow.js</p>
            <p>Documentation licensed under MIT.</p>
        </div>
        <div class="copyright__group">
            <i class="copyright__wechat"></i>
            <a class="copyright__github" href="https://github.com/feflow/feflow/" target="_blank"></a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import "./styles/icon.less";

.copyright {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__text {
        color: #bbbbbb;
    }

    &__group {
        display: flex;
    }

    &__wechat,
    &__github {
        display: block;
        width: 51px;
        height: 50px;
        margin-right: 37px;
        background-size: 100% 100%;

        &:hover {
            cursor: pointer;
        }
    }

    &__wechat {
        position: relative;
        background-image: url(@wechat);

        &:hover {
            &::before {
                content: '';
                position: absolute;
                top: -10px;
                left: 50%;
                transform: translate(-50%, -100%);
                width: 200px;
                height: 266px;
                background-image: url(./images/wechat-qrcode.jpg);
                background-size: 100%;
            }
        }

    }

    &__github {
        background-image: url(@github);
    }
}
</style>
