<template>
    <div class="product">
        <p class="index-title">{{ title }}</p>
        <ul class="product__list">
            <li
                v-for="(product, index) in products"
                :key="index"
                class="product__item"
                :class="(index + 1) % 4 === 0 ? 'product__row-last' : ''"
            >
                <img
                    class="product__icon"
                    :src="product.iconPath"
                    :alt="product.name"
                >
                <span class="product__name">{{ product.name }}</span>
            </li>
        </ul>
        <div class="product__add">
            <p><a target="_blank" href="https://github.com/feflow/feflow/issues/new">{{ publishYourProduct }}</a></p>
            <i class="product__add-icon"></i>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 假数据
            products: [
                {
                    name: 'NOW直播',
                    iconPath: 'https://qpic.url.cn/feeds_pic/Q3auHgzwzM7V1vPRHVGgUpn0ybcv1yibsq3l6E5T8MyluoRGVTibfGPg/'
                },
                {
                    name: '手Q附近',
                    iconPath: 'https://qpic.url.cn/feeds_pic/ajNVdqHZLLDJ6PV59GoGcJZ7Il5kZFOBQhKzJ3xdTY6aqIV0Bciaobw/'
                },
                {
                    name: '花样直播',
                    iconPath: 'https://qpic.url.cn/feeds_pic/Q3auHgzwzM6SeMDTxicI1P5D73CFYeOiaicFSlBvicN006MhJiczGz1TvfQ/'
                },
                {
                    name: '美团外卖',
                    iconPath: 'https://qpic.url.cn/feeds_pic/PiajxSqBRaEKm3Cv2j5PZsmpib20icSaDCs5xp97Dywhlag6LE5oWicWnA/'
                },
                {
                    name: 'QQ群送礼',
                    iconPath: 'https://qpic.url.cn/feeds_pic/PiajxSqBRaEL7324uObibqSq55MnM8kOs6AiaHmIVqciauYMDaXm87yUcg/'
                },
                {
                    name: '回音',
                    iconPath: 'https://qpic.url.cn/feeds_pic/ajNVdqHZLLBKIItpuH3C0QfOM62LKnaHQEFaQpINZbmXiaa2Rj0FpHA/'
                },
                {
                    name: 'QQ群视频',
                    iconPath: 'https://qpic.url.cn/feeds_pic/ajNVdqHZLLAIBg2sCt53neth55DJB7ibDwYertLQjTtL9XzH1QOMklw/'
                },
                {
                    name: '应用宝',
                    iconPath: 'https://qpic.url.cn/feeds_pic/PiajxSqBRaEKYPUFKr3iafZDic0C2H9WTicPKicRR1AN5rJiaNicpfAStam4w/'
                },
                {
                    name: '企鹅号',
                    iconPath: 'https://qpic.url.cn/feeds_pic/ajNVdqHZLLC4gDGBHUD8O6nFbJ18VoqqdEESLqK98T3GWA2vh2FxVw/'
                },
                {
                    name: '创数据',
                    iconPath: 'https://qpic.url.cn/feeds_pic/ajNVdqHZLLAJibJEc5E7tfibu7xdpyxe1SmLWkZicSLs49pgRbJ7ODicOg/'
                }
            ]
        }
    },

    computed: {
        title () {
            return this.$lang === 'en-US'
                ? 'Which products are in use'
                : '哪些产品在使用'
        },
        publishYourProduct () {
            return this.$lang === 'en-US'
                ? 'Publish your product'
                : '提交案例'
        }
    }
}
</script>

<style lang="less" scoped>
@import "./styles/icon.less";

.product {

    &__list {
        margin-top: 47px;
        display: flex;
        flex-wrap: wrap;
    }

    &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 298.5px;
        height: 120px;
        margin-right: 2px;
        margin-bottom: 4px;
        background-color: #ffffff;

        &:hover {
            box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.05);
        }
    }

    &__row-last {
        margin-right: 0;
    }

    &__icon {
        display: block;
        width: 67px;
        height: 67px;
        margin-right: 10px;
        border-radius: 10px;
    }

    &__name {
        font-size: 30px;
        letter-spacing: 0px;
        color: #4e4e4e;
    }

    &__add {
        margin-top: 55px;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
            font-size: 24px;
            letter-spacing: 0px;
            color: #327aff;
        }

        &-icon {
            display: block;
            margin-left: 8px;
            width: 20px;
            height: 20px;
            background-image: url(@product-arrow);
        }
    }
}
</style>
