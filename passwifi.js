import http from 'k6/http';
import { check } from 'k6';
export const options = { stages: [
{ duration: '2000m', target: 2000000 },
], thresholds: {
'http_req_duration': ['p(95)<800'],
'http_req_failed': ['rate<0.01'], }, };
export default function () {
const targetUrl = 'https://www.xsign.co';
const res = http.get(targetUrl); check(res, {
'status is 200': (r) => r.status === 200, }); }