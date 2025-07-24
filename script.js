
import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {

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


thresholds: {

'http_req_failed': ['rate<0.02'],

'http_req_duration': ['p(95)<3000'],
},
};


export default function () {



const targetUrl = 'https://YOUR-OWN-WEBSITE.COM';


const res = http.get(targetUrl);


check(res, {
'status is 200': (r) => r.status === 200,
});



sleep(Math.random() * 2 + 1);
}
