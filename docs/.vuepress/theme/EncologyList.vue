<template>
    <section class="encologies">

        <ul class="encologies__list">
            <li
                class="encologies__item"
                v-for="encology in encologies"
                :key="encology.id"
            >
                <router-link
                    class="encologies__item-link"
                    :to="'detail.html?id=' + encology.id"
                >
                    <div class="encologies__item--left">
                        <p class="encologies__item-title">{{ encology.name }}</p>
                        <p class="encologies__item-description">{{ encology.description }}</p>
                    </div>
                    <div class="encologies__item--right">
                        <div class="encologies__item-note">
                            <i class="encologies__item-note-icon icon-avatar"></i>
                            <p class="encologies__item-note-text">{{ encology.master }}</p>
                        </div>
                        <div class="encologies__item-note">
                            <i class="encologies__item-note-icon icon-version"></i>
                            <p class="encologies__item-note-text">{{ encology.version }}</p>
                        </div>
                        <div class="encologies__item-note">
                            <i class="encologies__item-note-icon icon-time"></i>
                            <p class="encologies__item-note-text">{{ encology.updateTime }}</p>
                        </div>
                    </div>
                </router-link>
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
    getPackageInfo
} from './util'

export default {
    data () {
        return {
            encologies: []
        }
    },

    mounted () {
        this.getRepoInfo();
    },

    methods: {
        encodeUrl (encology) {
            return encodeURIComponent(encology)
        },
        getRepoInfo () {
            // 先检查存储中是否有
            if (store.encologyIdList.length) {
                const encologyMap = store.encologyMap
                const encologies = store.encologyIdList.map(id => {
                    const encology = encologyMap[id] || {}
                    const mainInfo = encology.main || {}
                    const packageInfo = encology.package || {}
                    return Object.assign({}, mainInfo, packageInfo)
                })

                this.encologies = encologies

                return
            }

            // 如果没有就需要请求
            const { encologies = [] } = this.$themeLocaleConfig
            const uniqueEncologies = Array.from(new Set(encologies))

            uniqueEncologies.forEach(encology => {
                const id = encodeURIComponent(encology)
                const repo = getRepo(encology)
                const tag = getTag(repo)

                // Request info and addition info.
                const mainRequest = getRepoInfo(repo)
                const addtionRequest = getPackageInfo(encology)

                mainRequest.then(mainInfo => {
                        mainInfo.id = id
                        mainInfo.tag = tag

                        // 实时添加进数据中
                        const index = this.encologies.length
                        this.encologies.push(mainInfo)
                        // 同步一份到 store 中
                        store.encologyIdList.push(id);
                        store.$set(store.encologyMap, id, { main: mainInfo })

                        addtionRequest.then(packageInfo => {
                            const origin = this.encologies[index];
                            // 对新增数据进行修改
                            this.$set(this.encologies, index, {
                                ...origin,
                                ...packageInfo
                            })
                            // 同步一份到 store 中
                            store.$set(store.encologyMap[id], 'package', packageInfo)
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

    &__list {
        margin-top: 28px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    &__item {
        margin-top: 11px;
        width: 594px;
        height: 280px;

        &:first-child,
        &:nth-child(2) {
            margin-top: 0;
        }

        &:hover {
            box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.2);
        }

        &-link {
            display: flex;
            width: 100%;
            height: 100%;
        }

        &--left {
            width: 400px;
	        height: 100%;
            background-image: linear-gradient(
                180deg,
                #327aff 0%,
                #32d6df 100%
            );
            color: #ffffff;
        }

        &-title,
        &-description {
            padding: 0 32px;
        }

        &-title {
            margin-top: 67px;
	        font-size: 30px;
	        font-weight: bold;
        }

        &-description {
            margin-top: 22px;
            font-size: 18px;
        }

        &--right {
            flex-grow: 1;
            padding: 50px 32px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            background-color: #ffffff;
            font-size: 18px;
            color: #aaaaaa;
        }

        &-note {
            display: flex;
            align-items: center;

            &-icon {
                margin-right: 14px;
                width: 22px;
                height: 22px;
            }
        }
    }
}
</style>

