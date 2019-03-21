<template>
    <div class="banner-inner">
        <div class="left">
            <h1>{{ title }}</h1>
            <h2>{{ description }}</h2>
            <ul class="entry">
                <li>
                    <router-link :to="getStartNav">
                        {{ introduction }}
                    </router-link>
                </li>
                <li>
                    <router-link :to="getStartNav">
                        {{ getStarted }}
                    </router-link>
                </li>
            </ul>
            <ul class="github">
                <li class="star">
                    <div class="button star--button">
                        <i class="icon star--icon"></i>
                        <a href="https://github.com/feflow/feflow/" target="_blank">Star</a>
                    </div>
                    <!-- Todo -->
                    <!-- <div class="count star--count">503</div> -->
                </li>
                <li class="fork">
                    <div class="button fork--button">
                        <i class="icon fork--icon"></i>
                        <a href="https://github.com/feflow/feflow/" target="_blank">Fork</a>
                    </div>
                    <!-- Todo -->
                    <!-- <div class="count fork--count">69</div> -->
                </li>
            </ul>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    computed: {
        title () {
            return this.$lang === 'en-US'
                ? 'Front End Workflow And Rule'
                : '前端工作流和规范'
        },
        description () {
            return this.$lang === 'en-US'
                ? 'Engineered solutions dedicated to improving efficiency and specifications'
                : '致力于提升研发效率和规范的工程化解决方案'
        },
        introduction () {
            return this.$lang === 'en-US'
                ? 'Introduction'
                : '介绍文章'
        },
        getStarted () {
            return this.$lang === 'en-US'
                ? 'Get Started'
                : '开始使用'
        },
        getStartNav () {
            return this.$themeLocaleConfig.getStartNav
        }
    }
}
</script>

<style lang="less" scoped>
@import "./styles/icon.less";

h1,
h2 {
    line-height: 1;
    color: #ffffff;
}

h1 {
    font-size: 60px;
}

h2 {
    margin-top: 29px;
    font-size: 30px;
    font-weight: normal;
}

.banner-inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.entry {
    margin-top: 53px;
    display: flex;

    li {
        margin-left: 24px;
        width: 220px;
        height: 72px;
        font-size: 24px;
        line-height: 72px;
        border-radius: 36px;
        border: solid 2px #ffffff;
        list-style: none;

        &:first-child {
            margin-left: 0;
            background-color: #fff;

            a {
                color: #327aff;
            }
        }

        &:last-child {
            a {
                color: #fff;
            }
        }

        a {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            text-decoration: none;
        }
    }
}

.github {
    margin-top: 55px;
    display: flex;
	font-size: 14px;
	letter-spacing: 0px;
	color: #000000;

    & > li {
        display: flex;
        height: 30px;

        &:not(:first-child) {
            margin-left: 18px;
        }
    }

    .button,
    .count {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        border-radius: 4px;
	    border: solid 1px #e2e2e2;
        background-color: #ffffff;

        a {
            color: #000000;
        }
    }

    .button {
        width: 75px;
    }

    .icon {
        display: block;
        height: 16px;
        margin-right: 6px;
        background-size: 100% 100%;
    }

    .star--icon {
        width: 16px;
        background-image: url(@star);
    }

    .fork--icon {
        width: 12px;
        background-image: url(@fork);
    }

    .count {
        position: relative;
        width: 63px;
        margin-left: 7px;

        &::before {
            content: '';
            position: absolute;
            width: 7.0710px;
            height: 7.0710px;
            border-left: solid 1px #e2e2e2;
            border-bottom: solid 1px #e2e2e2;
            top: 50%;
            left: 0;
            transform: translate(-50%, -50%) rotate(45deg);
            background-color: #ffffff;
        }
    }
}

// The right animation.
.right {
    margin-top: -79px;
    margin-right: 70px;
    width: 400px;
    height: 400px;
    background-image: url(./images/animation.gif);
    background-size: 100% 100%;
}
</style>
