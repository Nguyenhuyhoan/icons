// javascript/test.js

import { browser } from 'k6/experimental/browser';
import { check, sleep } from 'k6';


export const options = {
scenarios: {

ui_test: {

executor: 'ramping-vus',

startVUs: 0,

stages: [
{ duration: '5m', target: 7 },
{ duration: '10m', target: 60 },
{ duration: '5m', target: 120 },
{ duration: '10m', target: 250 },
{ duration: '10m', target: 370 },
{ duration: '15m', target: 450 },
{ duration: '15m', target: 520 },
{ duration: '10m', target: 600 },
{ duration: '5m', target: 690 },
{ duration: '5m', target: 740 },
{ duration: '10m', target: 890 },
{ duration: '10m', target: 990 },
{ duration: '15m', target: 1100 },
{ duration: '15m', target: 1300 },
{ duration: '10m', target: 1500 },
{ duration: '2000m', target: 1500 },
],

options: {
browser: {
type: 'chromium',
},},},},
thresholds: {
'browser_http_req_failed': ['rate<0.1'],
'browser_web_vital_lcp': ['p(95)<10000'],},};
export default async function () {
const targetUrl = 'https://applep12.com';
const context = await browser.newContext();
const page = await context.newPage(); try {
const res = await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: '90s' });
const checkResult = check(res, {
'status is 200': (r) => r.status() === 200,});
if (!checkResult) {
console.log(`Request to ${targetUrl} failed.`);
console.log(`  Response status: ${res.status()}`);
console.log(`  Page title: ${await page.title()}`);
const body = await page.content();
console.log(`  Response body (first 500 chars): ${body.substring(0, 500)}`);
}} finally {
await page.close();
await context.close();}
sleep(Math.random() * 4 + 1);}
