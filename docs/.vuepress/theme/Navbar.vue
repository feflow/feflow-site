<template>
    <header :style="styles.navbar">
        <nav>
            <router-link
                :to="localePath"
            >
                <img
                    :src="styles.logo"
                    alt="logo"
                >
            </router-link>
            <ul class="navs">
                <li
                    class="nav"
                    v-for="(nav, index) in navs"
                    :key="index"
                >
                    <router-link
                        :class="getNavClass(nav.link, styles.navClass)"
                        v-if="!isExternal(nav.link)"
                        :to="nav.link"
                        :style="styles.word"
                    >{{ nav.text }}</router-link>
                     <a
                        v-else
                        :href="nav.link"
                        :class="getNavClass(nav.link, styles.navClass)"
                        target="_blank"
                        rel="noopener noreferrer"
                        :style="styles.word"
                    >{{ nav.text }}</a>
                </li>
            </ul>
            <ul class="tools">
                <li>
                    <router-link
                        class="nav__link"
                        :to="langObject.link"
                        :style="styles.word"
                    >{{ langObject.text }}</router-link>
                </li>
                <!-- TODO: Search -->
                <!-- <li>
                    <a href="">Search</a>
                </li> -->
            </ul>
        </nav>
    </header>
</template>

<script>
import {
    LANG_EN,
    LANG_ZH
} from './constant'
import { isExternal } from './util'
import logo from './images/logo.png'
import logoBlue from './images/logo-blue.png'

export default {
    props: {
        transparent: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            alpha: 0
        }
    },

    computed: {
        localePath () {
            return this.$localePath;
        },
        navs () {
            const config = this.$themeLocaleConfig || {}
            const navs = config.navs || {}
            return navs
        },
        styles () {
            const alpha = this.transparent ? this.alpha : 1
            let styles = {
                navbar: {
                    backgroundColor: `rgba(255, 255, 255, ${alpha})`,
                },
                word: {
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                navClass: 'nav__link',
                logo
            }

            if (alpha >= 1) {
                styles.navbar.boxShadow = '0px 2px 30px 0px rgba(0, 0, 0, 0.1)'
            }
            if (alpha > 0.3) {
                styles.logo = logoBlue
                styles.word.color = `rgba(102, 102, 102, ${alpha})`
                styles.navClass = 'nav__link--white'
            }

            return styles
        },

        // 显示的语言切换版本，如果现在是 English，那么显示简体中文
        langObject () {
            const lang = this.$lang
            const route = this.$route
            if (lang === LANG_EN) {
                return {
                    text: '简体中文',
                    link: route.path.replace('/', '/zh/')
                }
            } else {
                return {
                    text: 'English',
                    link: route.path.replace('/zh/', '/')
                }
            }
        }
    },

    mounted () {
        window.addEventListener('scroll', this.onScroll);
    },

    methods: {
        getNavClass (link, className) {
            const currentPath = this.$route.path;
            return currentPath === link && className === 'nav__link--white'
                ? 'nav__link--active'
                : className
        },
        onScroll () {
            const scrollTop = window.scrollY;
            this.alpha = scrollTop / 100;
        },
        isExternal
    }
}
</script>

<style lang="less" scoped>
@import "./styles/variable.less";

header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    z-index: 1000;
}

nav {
    position: relative;
    display: flex;
    width: @viewAreaWidth;
    height: 100%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;

    li {
        list-style: none;
    }
}

.navs,
.tools {
    display: flex;
}

.nav {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    &:not(:first-child) {
        margin-left: 40px;
    }

    &__link,
    &__link--white,
    &__link--active {
        font-size: 18px;
        letter-spacing: 0px;
        text-decoration: none;
    }

    &__link:hover {
        color: #fff !important;
    }

    &__link--active,
    &__link--white:hover {
        color: #327aff !important;

        &::before {
            content: '';
            position: absolute;
            bottom: -38px;
            width: 100%;
            height: 4px;
	        background-color: #327aff;
        }
    }
}
</style>
