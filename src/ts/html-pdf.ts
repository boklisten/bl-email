const puppeteer = require("puppeteer");
let Promise = require("bluebird");
const hb = require("handlebars");
const inlineCss = require("inline-css");

export async function generatePdf(file, options, callback) {
  // we are using headless mode
  let args = ["--no-sandbox", "--disable-setuid-sandbox"];
  if (options.args) {
    args = options.args;
    delete options.args;
  }

  const browser = await puppeteer.launch({
    args: args,
  });
  const page = await browser.newPage();

  if (file.content) {
    const data = await inlineCss(file.content, { url: "/" });
    console.log("Compiling the template with handlebars");
    // we have compile our code with handlebars
    const template = hb.compile(data, { strict: true });
    const html = template(data);

    // We set the page content as the generated html by handlebars
    await page.setContent(html, {
      waitUntil: "networkidle0", // wait for page to load completely
    });
  } else {
    await page.goto(file.url, {
      waitUntil: ["load", "networkidle0"], // wait for page to load completely
    });
  }

  return Promise.props(page.pdf(options))
    .then(async function (data) {
      await browser.close();
      const values = Object.keys(data).map(function (e) {
        return data[e];
      });
      return Buffer.from(values);
    })
    .asCallback(callback);
}
