<template>
    <section class="encologies">
        <ul
            v-if="pageConfig.isShowTab"
            class="encologies__tags"
        >
            <li
                v-for="(tag, index) in tags"
                :key="index"
                class="encologies__tags-item"
            >
                <router-link
                    :class="currentTag === tag ? 'encologies__tags-item-link--active' : 'encologies__tags-item-link'"
                    :to="tag === defaultTag ?  $route.path : $route.path + '#' + tag"
                >{{ getTagText(tag) }}</router-link>
            </li>
        </ul>
        <ul class="encologies__list">
            <li
                class="encologies__item"
                v-for="encology in encologies"
                v-if="encology.tag === currentTag || currentTag === defaultTag"
                :key="encology.id"
            >
                <router-link
                    v-if="!pageConfig.isNavToGit"
                    class="encologies__item-link"
                    :to="getLink(encology.id)"
                >
                    <div
                        class="encologies__item-image"
                        :style="{ backgroundColor: getColor() }"
                    >
                        <img
                            :src="encology.image || defaultImage"
                            alt=""
                        >
                    </div>
                    <p class="encologies__item-name line-one">{{ encology.name }}</p>
                    <p class="encologies__item-time line-one">{{ encology.updateTime }}</p>
                    <p class="encologies__item-description line-two">{{ encology.description }}</p>
                </router-link>
                <a
                    v-else
                    class="encologies__item-link"
                    :href="getLink(encology.id)"
                    target="_blank"
                >
                    <div
                        class="encologies__item-image"
                        :style="{ backgroundColor: getColor() }"
                    >
                        <img
                            :src="encology.image || defaultImage"
                            alt=""
                        >
                    </div>
                    <p class="encologies__item-name line-one">{{ encology.name }}</p>
                    <p class="encologies__item-time line-one">{{ encology.updateTime }}</p>
                    <p class="encologies__item-description line-two">{{ encology.description }}</p>
                </a>
            </li>
        </ul>
    </section>
</template>

<script>
import { camelizeKeys } from 'humps';
import axios from 'axios';
import store from './store';
import {
    getRepo,
    getAuthorName,
    getTag,
    getRepoInfo,
    getPackageInfo,
    getTagTextById
} from './util'
import defaultImage from './images/plugin-icon.png';

export default {
    data () {
        return {
            currentTag: '',
            defaultTag: 'all',
            encologies: [],
            tags: ['all', 'generator', 'builder', 'plugin'],
            defaultImage
        }
    },

    computed: {
        pageConfig() {
            const config = this.$page.frontmatter || {};
            const {
                isShowTab = true,
                isNavToGit = false,
                themeColor = '#9fb5dd',
                // 默认是生态系统数据
                dataField = 'encologies'
            } = config;

            return { isShowTab, isNavToGit, themeColor, dataField };
        }
    },

    mounted () {
        this.getRepoInfo();
        this.updateTag();
    },

    watch: {
        '$route'() {
            this.updateTag()
        },
        'pageConfig.dataField': function () {
            this.getRepoInfo();
            this.updateTag();
        }
    },

    methods: {
        getTagText(tag) {
            const lang = this.$lang;
            return getTagTextById(lang, tag);
        },
        // 获取随机颜色
        getColor() {
            const colors = [this.pageConfig.themeColor];
            const index = Math.floor(colors.length * Math.random());
            return colors[index];
        },
        getLink(encologyId) {
            const { isNavToGit } = this.pageConfig;
            return isNavToGit
                ? `https://github.com/${decodeURIComponent(encologyId)}`
                : 'detail.html?id=' + encologyId;
        },
        encodeUrl (encology) {
            return encodeURIComponent(encology)
        },
        updateTag() {
            // 标记当前的标签
            this.currentTag = decodeURIComponent(location.hash.replace('#', '')) || this.defaultTag;
        },
        getRepoInfo () {
            // 如果没有就需要请求
            const dataField = this.pageConfig.dataField

            if (!dataField) {
                return;
            }

            const storeChildren = store.pages[dataField]

            // 先检查存储中是否有
            if (storeChildren && storeChildren.encologyIdList.length) {
                const encologyMap = storeChildren.encologyMap
                const encologies = storeChildren.encologyIdList.map(id => {
                    const encology = encologyMap[id] || {}
                    const mainInfo = encology.main || {}
                    const packageInfo = encology.package || {}
                    return Object.assign({}, mainInfo, packageInfo)
                })

                this.encologies = encologies

                return
            }

            const encologies = this.$themeLocaleConfig[dataField] || []
            const uniqueEncologies = Array.from(new Set(encologies))

            // 开辟一个子存储器存储
            store.$set(store.pages, dataField, {
                encologyIdList: [],
                encologyMap: {}
            });

            // 清空之前的缓存
            this.encologies = []

            uniqueEncologies.forEach(encology => {
                const id = encodeURIComponent(encology)
                const repo = getRepo(encology)
                const tag = getTag(repo)

                // Request info and addition info.
                const mainRequest = getRepoInfo(encology)
                const addtionRequest = getPackageInfo(encology)

                mainRequest.then(mainInfo => {
                        mainInfo.id = id
                        mainInfo.tag = tag

                        // 实时添加进数据中
                        const index = this.encologies.length
                        this.encologies.push(mainInfo)
                        // 同步一份到 store 中
                        console.log(store, dataField);
                        store.pages[dataField].encologyIdList.push(id);
                        store.$set(store.pages[dataField].encologyMap, id, { main: mainInfo })

                        addtionRequest.then(packageInfo => {
                            const origin = this.encologies[index];
                            // 对新增数据进行修改
                            this.$set(this.encologies, index, {
                                ...origin,
                                ...packageInfo
                            })
                            // 同步一份到 store 中
                            store.$set(store.pages[dataField].encologyMap[id], 'package', packageInfo)
                        })
                        .catch(error => {
                            console.log('error', error)
                        });

                        return mainInfo;
                    })
                    .catch(error => {
                        console.log('error', error)
                    });
            })
        }
    }
}
</script>

<style lang="less" scoped>
.encologies {

    &__tags {
        display: flex;
        justify-content: center;

        &-item {
            width: 100px;
            height: 40px;
            margin: 0 17.5px;
            font-size: 16px;
	        line-height: 40px;
            text-align: center;

            &-link--active,
            &-link {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 20px;
                color: #666666;
            }

            &-link--active,
            &-link:hover {
                color: #ffffff;
                background-color: #327aff;
            }
        }
    }

    &__list {
        margin-top: 28px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    &__item {
        margin-top: 11px;
        margin-right: 14px;
        width: 390px;
        height: 400px;
        background-color: #fff;

        &:first-child,
        &:nth-child(2),
        &:nth-child(3) {
            margin-top: 0;
        }

        &:nth-child(3n+3) {
            margin-right: 0;
        }

        &:hover {
            box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.2);
        }

        &-link {
            width: 100%;
            height: 100%;
        }

        &-name,
        &-time,
        &-description {
            padding: 0 27px;
        }

        &-image {
            width: 100%;
            height: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &-name {
            margin-top: 20px;
            font-size: 28px;
            font-weight: bold;
	        color: #327aff;
        }

        &-time {
            margin-top: 6px;
            font-size: 14px;
	        color: #aaaaaa;
        }

        &-description {
            margin-top: 6px;
            font-size: 18px;
	        color: #999999;
        }
    }
}
</style>

