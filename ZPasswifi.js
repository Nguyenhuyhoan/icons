import http from 'k6/http';
import { check } from 'k6';

export const options = {
stages: [

{ duration: '2s', target: 20000 },
{ duration: '500m', target: 20000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

{ duration: '2s', target: 1000 },
{ duration: '5m', target: 1000 },
{ duration: '5m', target: 0 },

],
thresholds: {
'http_req_duration': ['p(95)<800'],
'http_req_failed': ['rate<0.01'],},};

export default function () {
const targetUrl = __ENV.TARGET_URL || 'https://google.com';

const headers = {
'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 20_8 like Mac OS X) AppleWebKit/709.1.20 (KHTML, like Gecko) Version/20.8 Mobile/20A123 Safari/909.1',
'Accept-Language': 'en-EN', 'Referer': targetUrl,};

const res = http.get(targetUrl, { headers });
check(res, {
'status is 200': (r) => r.status === 200,});}