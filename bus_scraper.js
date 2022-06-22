const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const data = Object.create(null);
  const host = "https://changsha.8684.cn"

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./data",
  });
  const page = await browser.newPage();

  await page.goto(`${host}/line1`);
  // 等待候选元素加载完成
  await page.waitForSelector("#view_0 > div > div.list.clearfix > a");

  // 获取市区线路名称与 Code
  const busArr = await page.$$eval("#view_0 > div > div.list.clearfix > a",
    (links) => links.map((x) => [x.text, x.pathname]))

  const getBusDetail = async (path) => {
    // 或者请求对应的接口；kind：1|2 往返切换
    // https://api.8684.cn/bus_station_map_station.php?code=4177a33a&ecity=changsha&kind=1

    // 这里直接解析页面元素
    const detailPage = await browser.newPage();
    await detailPage.goto(host + path);

    await detailPage.waitForSelector(".bus-lzlist a[aria-label]");
    const platformArr = await detailPage.$$eval(".bus-lzlist a[aria-label]",
      (links) => links.map((x) => x.innerText))

    const set = new Set();
    for (let platform of platformArr) {
      // 单程站做标记
      let flag = platform + "(单)";
      if (set.has(flag)) {
        set.delete(flag)
        set.add(platform)
      }
      else {
        set.add(flag)
      }
    }

    detailPage.close()
    return set;
  }

  for (let bus of busArr) {
    let detial = await getBusDetail(bus[1])
    data[bus[0]] = [...detial]
  }

  await browser.close();

  fs.writeFile("data.json", JSON.stringify(data, null, "\t"), function (err) {
    if (err) {
      console.log(err);
    }
  });

})();
