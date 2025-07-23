import http from 'k6/http';
import { check } from 'k6';
export const options = { stages: [
{ duration: '2000m', target: 20000 },
], thresholds: {
'http_req_duration': ['p(95)<800'],
'http_req_failed': ['rate<0.01'], }, };
export default function () {
const targetUrl = 'https://sign.drnrt8.cn';
const res = http.get(targetUrl); check(res, {
'status is 200': (r) => r.status === 200, }); }