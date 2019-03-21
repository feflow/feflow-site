<template>
    <div>
        <!-- All pages have a navbar -->
        <Navbar
            :transparent="$page.frontmatter.home ? true : false"
        />

        <div
            v-if="$page.frontmatter.layout"
            class="layout__content"
        >
            <component

                :is="$page.frontmatter.layout"
            />
        </div>

        <Home v-else-if="$page.frontmatter.home" />
            <!-- The default layout. For document. -->
        <div
            v-else
            class="layout__content"
        >
            <Guide />
        </div>

        <!-- All pages have a Footer -->
        <Footer />
    </div>
</template>

<script>
// Libraries.
import axios from 'axios'

// Components.
import Navbar from './Navbar'
import Home from './Home'
import Guide from './Guide'
import BlogList from './BlogList'
import Blog from './Blog'
import EncologyList from './EncologyList'
import Encology from './Encology'
import Footer from './Footer'

export default {
    components: {
        Navbar,
        Home,
        Guide,
        BlogList,
        Blog,
        EncologyList,
        Encology,
        Footer
    },

    mounted () {
        console.log('Vue', this)
    }
}
</script>

<style lang="less">
@import "./styles/content.less";
@import "./styles/icon.less";

// Common styles -- App level.
* {
    margin: 0;
    padding: 0;
    // Unite box model.
    box-sizing: border-box;
}

body {
    background-color: #f9f9f9;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}

.standard-container {
    width: 1200px;
    margin: 0 auto;
}

// Home page every module title.
.index-title {
    font-size: 36px;
    letter-spacing: 0px;
    color: #4e4e4e;
    text-align: center;
}
</style>

<style lang="less" scoped>
.layout__content {
    padding-top: 136px;
    padding-bottom: 178px;
    min-height: calc(100vh - 268px);

    & > * {
        width: 1200px;
        margin: 0 auto;
    }
}
</style>

