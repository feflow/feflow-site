<template>
    <footer class="footer">
        <div class="footer__links">
            <Links class="standard-container" />
        </div>
        <div class="footer__copyright">
            <Copyright class="standard-container" />
        </div>
    </footer>
</template>

<script>
import Links from './Links'
import Copyright from './Copyright'

export default {
    components: {
        Links,
        Copyright
    }
}
</script>


<style lang="less" scoped>
.footer {
    &__links {
        padding-top: 30px;
        padding-bottom: 33px;
        background-color: #1d272f;
    }

    &__copyright {
        height: 180px;
        background-color: #171f26;
    }
}
</style>

