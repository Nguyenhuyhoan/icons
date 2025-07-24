// script.js (Giữ nguyên 'stages' theo yêu cầu)
import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * CẢNH BÁO QUAN TRỌNG:
 * 1. GIỚI HẠN 6 GIỜ: GitHub Actions sẽ tự động DỪNG job này sau 6 giờ (360 phút).
 *    Giai đoạn cuối cùng '2000m' (33 giờ) sẽ không bao giờ hoàn thành.
 * 2. MỤC TIÊU: Việc chạy test này trên website bạn không sở hữu là hành vi tấn công
 *    và có thể dẫn đến hậu quả pháp lý.
 * 3. PROXY YẾU: Proxy miễn phí rất không ổn định và có thể chết bất cứ lúc nào,
 *    làm cho bài test thất bại.
 */
export const options = {
  // === PHẦN NÀY ĐƯỢC GIỮ NGUYÊN THEO YÊU CẦU CỦA BẠN ===
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
    { duration: '2000m', target: 1500 }, // <-- Giai đoạn này sẽ bị ngắt sau 6 giờ tổng thời gian chạy
  ],
  // ========================================================

  thresholds: {
    // Tăng ngưỡng chấp nhận lỗi vì proxy miễn phí rất không ổn định
    'http_req_failed': ['rate<0.1'], // Chấp nhận tỷ lệ lỗi dưới 10%
    // Tăng ngưỡng thời gian phản hồi vì proxy miễn phí rất chậm
    'http_req_duration': ['p(95)<10000'], // 95% request phải xong dưới 10 giây
  },
};

export default function () {
  // ===================================================================
  // !!! THAY BẰNG URL WEBSITE CỦA BẠN !!!
  const targetUrl = 'https://applep12.com';
  // ===================================================================

  const res = http.get(targetUrl, {
    // Thêm timeout để tránh k6 bị treo vô hạn khi proxy quá chậm hoặc chết
    timeout: '90s', 
  });

  // Kiểm tra xem request có thành công không
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Chờ 1-5 giây để giảm áp lực lên proxy miễn phí
  sleep(Math.random() * 4 + 1);
}
