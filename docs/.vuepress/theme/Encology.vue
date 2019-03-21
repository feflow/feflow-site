<template>
    <section class="encology">
        <p class="encology__title">{{ encology.name }}</p>
        <p class="encology__description">{{ encology.description }}</p>
        <ul class="encology__info">
            <li class="encology__info-item">
                <p class="encology__info-value">{{ encology.version }}</p>
                <p class="encology__info-key">最新版本</p>
            </li>
            <li class="encology__info-item">
                <p class="encology__info-value">{{ encology.master }}</p>
                <p class="encology__info-key">维护者</p>
            </li>
            <li class="encology__info-item">
                <p class="encology__info-value">{{ encology.updateTime }}</p>
                <p class="encology__info-key">更新时间</p>
            </li>
            <li class="encology__info-item encology__info-github">
                <i class="icon-github"></i>
                <p>Github</p>
            </li>
        </ul>
        <div class="encology__line"></div>
        <!-- README -->
        <div class="encology__doc content">
            <div v-html="docHTML"></div>
        </div>
    </section>
</template>

<script>
import store from './store';
import queryString from 'query-string';
import {
    getRepo,
    getRepoInfo,
    getPackageInfo,
    getDocInfo
} from './util';

export default {
    data () {
        return {
            encology: {},
            docHTML: ''
        }
    },

    mounted () {
        this.getRepoInfo()
    },

    methods: {
        getRepoInfo () {
            const parsed = queryString.parse(location.search);
            const id = parsed.id;
            const { encologyMap = {} } = store
            const encology = encologyMap[id]

            // 没有存储则需要自己请求
            if (!encology) {
                const encologyPath = decodeURIComponent(id)
                const repo = getRepo(encologyPath)
                // Request info and addition info.
                const mainRequest = getRepoInfo(repo)
                const addtionRequest = getPackageInfo(encologyPath)
                const docRequest = getDocInfo(encologyPath)

                mainRequest.then(mainInfo => {
                    // 实时添加进数据中
                    this.encology = mainInfo
                    // 同步一份到 store 中
                    store.$set(store.encologyMap, id, { main: mainInfo })

                    addtionRequest.then(packageInfo => {
                        const origin = this.encology;
                        // 对新增数据进行修改
                        this.encology = {
                            ...origin,
                            ...packageInfo
                        }
                        // 同步一份到 store 中
                        store.$set(store.encologyMap[id], 'package', packageInfo)
                    })
                    .catch(error => {
                        console.log('error', error)
                    });

                    docRequest.then(docHTML => {
                        this.docHTML = docHTML
                        // 同步一份到 store 中
                        store.$set(store.encologyMap[id], 'doc', docHTML)
                    })

                    return mainInfo;
                })
                .catch(error => {
                    console.log('error', error)
                });
            } else {
                // 有存储的情况下，查看有无 doc，没有去请求
                if (!encology.doc) {
                    const docRequest = getDocInfo(encologyPath)
                    docRequest.then(docHTML => {
                        this.docHTML = docHTML
                        // 同步一份到 store 中
                        store.$set(store.encologyMap[id], 'doc', docHTML)
                    })
                } else {
                    const docHTML = encology.doc || {}
                    this.docHTML = docHTML
                }

                const mainInfo = encology.main || {}
                const packageInfo = encology.package || {}
                this.encology = Object.assign({}, mainInfo, packageInfo)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.encology {
    padding: 70px 48px;
    background-color: white;
    letter-spacing: 0px;

    &__title {
        font-size: 36px;
        font-weight: bold;
        color: #333333;
    }

    &__description {
        margin-top: 23px;
	    font-size: 24px;
	    color: #666666;
    }

    &__info {
        margin-top: 67px;
        width: 100%;
        height: 72px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-value {
            font-size: 30px;
	        font-weight: bold;
	        color: #327aff;
        }

        &-key {
            margin-top: 4px;
            font-size: 18px;
            color: #666666;
        }

        &-github {
            width: 220px;
            height: 100%;
            border-radius: 36px;
            border: solid 2px #327aff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
	        color: #327aff;

            .icon-github {
                margin-right: 11px;
                width: 28px;
                height: 28px;
                background-size: 100% 100%;
            }
        }
    }

    &__line {
        margin-top: 61px;
        height: 1px;
        background-color: #e7e7e7;
    }

    &__doc {
        padding-top: 24px;
    }
}
</style>


