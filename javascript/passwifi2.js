
import http from 'k6/http';
import { check } from 'k6';

export const options = {

stages: [

{ duration: '2m', target: 500 },


{ duration: '4m', target: 500 },


{ duration: '5m', target: 2500 },


{ duration: '5m', target: 2500 },


{ duration: '10m', target: 10000 },


{ duration: '15m', target: 10000 },


{ duration: '2m', target: 0 },
],

thresholds: {

'http_req_failed': ['rate<0.01'],

'http_req_duration': ['p(95)<800'],
},
};

export default function () {
const targetUrl = 'https://applep12.com';
const res = http.get(targetUrl);
check(res, {
'status is 200': (r) => r.status === 200,
});
}
