import data from './src/data.js'
import Mustache from 'mustache'
import { readFileSync, writeFileSync, realpathSync, mkdirSync } from 'node:fs'
import puppeteer from 'puppeteer-core';

const template = readFileSync('src/template.mustache', 'utf8');
const rendered = Mustache.render(template, data);

const distDirName = 'dist';
mkdirSync(distDirName, {recursive: true});

const htmlFilePath = `${distDirName}/resume.html`;
writeFileSync(htmlFilePath, rendered);

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
});

const page = await browser.newPage();
await page.goto(`file://${realpathSync(htmlFilePath)}`);

await page.pdf({
  path: `${distDirName}/resume.pdf`,
  printBackground: true
});

await browser.close();
