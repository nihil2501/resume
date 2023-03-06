import Mustache from 'mustache';
import { readFileSync, writeFileSync, realpathSync, mkdirSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const artifacts = ['resume'];

artifacts.forEach(async (artifact) => {
  const data = (await import(`./src/${artifact}/data.js`)).default;
  const template = readFileSync(`src/${artifact}/template.mustache`, 'utf8');
  const rendered = Mustache.render(template, data);

  const distDirName = `dist/${artifact}`;
  mkdirSync(distDirName, {recursive: true});

  const htmlFilePath = `${distDirName}/${artifact}.html`;
  writeFileSync(htmlFilePath, rendered);

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
  });

  const page = await browser.newPage();
  await page.goto(`file://${realpathSync(htmlFilePath)}`);

  await page.pdf({
    path: `${distDirName}/${artifact}.pdf`,
    printBackground: true,
    format: 'letter'
  });

  await browser.close();
});
