<template>
    <div class="theme-container">
        <div class="layout__banner">
            <Banner class="standard-container" />
        </div>
        <div class="layout__description">
            <Flow class="flow standard-container" />
            <Slogan class="slogan standard-container" />
        </div>
        <div class="layout__product">
            <Product class="standard-container" />
        </div>
        <div class="layout__community">
            <Community class="standard-container" />
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
import Banner from './Banner'
import Flow from './Flow'
import Slogan from './Slogan'
import Product from './Product'
import Community from './community'
import Links from './Links'
import Copyright from './Copyright'

export default {
    components: {
        Navbar,
        Banner,
        Flow,
        Slogan,
        Product,
        Community,
        Links,
        Copyright
    }
}
</script>

<style lang="less" scoped>
.layout {
    &__banner {
        display: flex;
        align-items: center;
        height: 900px;
        background-image: linear-gradient(
            180deg,
            #327aff 0%,
            #32d6df 100%
        );
    }

    &__description {
        height: 624px;
        margin-top: -140px;
    }

    &__product {
        padding-top: 61px;
        padding-bottom: 54px;
        background-color: #f9f9f9;
    }

    &__community {
        padding-top: 70px;
        padding-bottom: 65px;
    }

    &__links {
        padding-top: 30px;
        padding-bottom: 33px;
        background-color: #1d272f;
    }

    &__footer {
        height: 180px;
        background-color: #171f26;
    }
}
</style>
