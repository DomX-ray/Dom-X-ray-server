const puppeteer = require("puppeteer");

const { OK } = require("../../constants/statusCode");

const getMain = (req, res, next) => {
  res.status(OK).json({ result: "ok" });
};

const parseDomTree = async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--shm-size=1gb",
        "--use-gl=egl",
      ],
    });
    const [page] = await browser.pages();

    const headers = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    };

    await page.goto(req.query.searchUrl, {
      waitUntil: "networkidle2",
    });

    const rootHandle = await page.$("html");

    const getDomTree = async (elementHandle) => {
      const childrenArray = [];

      const tagName = await (
        await elementHandle.getProperty("tagName")
      ).jsonValue();

      const elementChildren = await elementHandle.$$(":scope > *");

      // todo: map으로 바꾸기(promise.all 이용)
      for (let i = 0; i < elementChildren.length; i++) {
        childrenArray.push(await getDomTree(elementChildren[i]));
      }

      return {
        tagName,
        ...(childrenArray.length && { children: childrenArray }),
      };
    };

    const tree = await getDomTree(rootHandle);

    await browser.close();

    res.status(OK).send({
      parsedData: tree,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMain, parseDomTree };
