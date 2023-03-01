import data from './data.js'
import Mustache from 'mustache'
import { readFileSync, writeFileSync, realpathSync } from 'node:fs'
import puppeteer from 'puppeteer-core';

const template = readFileSync('template.mustache', 'utf8');
const rendered = Mustache.render(template, data);

const htmlFileName = 'resume.html';
writeFileSync(htmlFileName, rendered);

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
});

const page = await browser.newPage();
await page.goto(`file://${realpathSync(htmlFileName)}`);
await page.pdf({path: 'resume.pdf'});
await browser.close();