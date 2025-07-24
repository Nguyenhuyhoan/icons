// javascript/test.js

import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = { stages: [
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
{ duration: '2000m', target: 1500 }, ], thresholds: {
'http_req_failed': ['rate<0.1'],
'http_req_duration': ['p(95)<10000'], }, };
export default function () {
const targetUrl = 'https://applep12.com';
const res = http.get(targetUrl, { timeout: '90s', });
const checkResult = check(res, {
'status is 200': (r) => r.status === 200,
}); if (!checkResult) {
console.log(`Request to ${targetUrl} failed. See details below:`);
console.log(`  Response status: ${res.status}`); if (res.body) {
console.log(`  Response body (first 500 chars): ${res.body.substring(0, 500)}`); } else {
console.log(`  Response body is empty.`); } if (res.error) {
console.log(`  k6 error: ${res.error}`); } }
sleep(Math.random() * 4 + 1); }




