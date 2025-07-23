import http from 'k6/http';
import { check, sleep } from 'k6';

// Danh sách các User-Agent của trình duyệt phổ biến
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36'
];

export const options = {
  stages: [
    { duration: '30s', target: 500 },  // Bắt đầu với con số nhỏ
    { duration: '3m', target: 500 },   // Giữ tải ổn định
    { duration: '30s', target: 0 },    // Giảm tải
  ],
  thresholds: {
    'http_req_duration': ['p(95)<1500'], // Tăng ngưỡng vì có Cloudflare ở giữa
    'http_req_failed': ['rate<0.05'],    // Tăng ngưỡng lỗi vì có thể bị Cloudflare chặn
  },
};

export default function () {
  const targetUrl = 'https://applep12.com';

  // Chọn ngẫu nhiên một User-Agent cho mỗi request
  const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

  const params = {
    headers: {
      // Đặt User-Agent giả
      'User-Agent': randomUserAgent,
      // Thêm các header phổ biến của trình duyệt
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Cache-Control': 'max-age=0',
    },
  };

  const res = http.get(targetUrl, params);

  check(res, {
    'status is 200 (passed Cloudflare)': (r) => r.status === 200,
    'status is 403 (blocked by Cloudflare)': (r) => r.status === 403,
  });

  // Thêm khoảng nghỉ giữa các request để giảm tính "robot"
  // Thời gian nghỉ ngẫu nhiên từ 1 đến 3 giây
  sleep(Math.random() * 2 + 1);
}