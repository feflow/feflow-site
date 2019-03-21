import axios from 'axios';
import MarkdownIt from 'markdown-it';
import { camelizeKeys } from 'humps';

const markdown = new MarkdownIt();

// 外链
export const outboundRE = /^(https?:|mailto:|tel:)/

// 判断某个地址是否是外链
export function isExternal(path) {
    return outboundRE.test(path);
}

// 根据 <username>/<repo> 的 Git 仓库名获取 repo
export function getRepo(path = '') {
    return path.split('/').pop();
}

// 从 cnpm 上面获取仓库信息
export function getRepoInfo(repo) {
    const url = `https://registry.npm.taobao.org/${repo}/latest`;

    return axios.get(url)
        .then(({ data = {} }) => {
            const {
                name = '',
                description = '',
                author = {},
                maintainers = [],
                publishTime = ''
            } = camelizeKeys(data);
            const updateTime = new Date(publishTime).toLocaleDateString();
            const master = getAuthorName({ author, maintainers });
            const version = ''

            return { name, description, master, updateTime, version }
        });
}

// 从 github package.json 上面获取仓库更多信息
export function getPackageInfo(path) {
    const additionUrl = `https://raw.githubusercontent.com/${path}/master/package.json`

    return axios.get(additionUrl)
        .then(({ data = {} }) => {
            const { version = '' } = camelizeKeys(data);

            return { version }
        })
}

// 从 github README 上面获取信息
export function getDocInfo(path) {
    const docUrl = `https://raw.githubusercontent.com/${path}/master/README.md`
    const subDocUrl = `https://raw.githubusercontent.com/${path}/master/readme.md`
    return axios.get(docUrl)
        .then(response => response, () => axios.get(subDocUrl))
        .then(({ data = {} }) => {
            return markdown.render(data);
        })
}

// 根据名称获取标签
export function getTag(repo) {
    if (/generator/.test(repo)) {
        return 'generator';
    } else if (/builder/.test(repo)) {
        return 'builder';
    } else {
        return 'plugin';
    }
};

// 根据 cnpm 返回的信息找到仓库作者
export function getAuthorName({
    author = {},
    maintainers = []
}) {
    const { name = '' } = author;
    const [ maintainer = {} ] = maintainers;

    return name || maintainer.name || ''
}
