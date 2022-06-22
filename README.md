抓取长沙公交站台数据，词云展示繁忙站台，租房时可以参考

# 文件介绍

- bus_scraper.js - 使用 Puppeteer 爬取 8684 上长沙市区所有线路
- wordcloud.html - 使用 G2Plot 用于分析出现最繁忙站台，并生成词云图

# 环境配置

- 若没有安装 Node.js 运行时，请下载安装：https://nodejs.org/
- 安装关联：`npm i`

# 运行爬虫脚本

- 使用 `node bus_scraper.js` 运行爬虫脚本
- 生成的数据将保存在 `data.json` 文件下

# 生成词云图

- 读取抓取的 `data.json` 生成的词云页面

![词云](https://s2.loli.net/2022/06/22/xr8bOlAMzSD94gf.png)
