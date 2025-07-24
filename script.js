// script.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// Cấu hình các giai đoạn của bài test
export const options = {
  stages: [
    { duration: '20s', target: 15 }, // Tăng dần lên 15 người dùng ảo trong 20 giây
    { duration: '40s', target: 15 }, // Giữ 15 người dùng ảo trong 40 giây
    { duration: '10s', target: 0 },  // Giảm về 0 trong 10 giây
  ],
  thresholds: {
    // Yêu cầu 95% request phải có status 200
    'http_req_failed': ['rate<0.05'], 
    'http_req_duration': ['p(95)<2000'], // 95% request phải hoàn thành dưới 2 giây
  },
};

// Hàm chính, mỗi người dùng ảo sẽ lặp lại hàm này
export default function () {
  // Thay bằng URL website của bạn
  const res = http.get('https://your-website.com'); 

  // Kiểm tra xem request có thành công không (status code là 200)
  check(res, { 'status was 200': (r) => r.status == 200 });

  // Dừng 1 giây trước khi gửi request tiếp theo
  sleep(1);
}
