const puppeteer = require("puppeteer");

const { OK } = require("../../constants/statusCode");

const getMain = (req, res, next) => {
  res.status(OK).json({ result: "ok" });
};

const parseDomTree = async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/Users/songyi/Desktop/dom-tree/Dom-X-Ray-Be/node_modules/puppeteer/.local-chromium/mac-1036745/chrome-mac/Chromium.app/Contents/MacOS/Chromium",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--use-gl=egl"],
    });
    const [page] = await browser.pages();

    await page.goto(req.query.searchUrl, {
      waitUntil: "networkidle0",
    });

    const rootHandle = await page.$("html");

    const getDomTree = async (elementHandle) => {
      const tagName = await (
        await elementHandle.getProperty("tagName")
      ).jsonValue();

      const textContent = await (
        await elementHandle.getProperty("textContent")
      ).jsonValue();

      const id = await (await elementHandle.getProperty("id")).jsonValue();

      const className = await (
        await elementHandle.getProperty("className")
      ).jsonValue();

      const elementChildren = await elementHandle.$$(":scope > *");

      const childrenCount = elementChildren.length;

      const childrenArray = await Promise.all(
        elementChildren.map(async (element) => {
          return await getDomTree(element);
        })
      );

      return {
        tagName,
        id,
        className,
        childrenCount,
        textContent,
        ...(childrenArray.length && { children: childrenArray }),
      };
    };

    const tree = await getDomTree(rootHandle);

    await browser.close();

    res.status(OK).send({ parsedData: tree });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMain, parseDomTree };
