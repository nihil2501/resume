import data from './data.js'
import Mustache from 'mustache'
import { readFileSync, writeFileSync } from 'node:fs'

const template = readFileSync('template.mustache', 'utf8');
const rendered = Mustache.render(template, data);

writeFileSync('resume.html', rendered);