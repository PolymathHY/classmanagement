export const INITIAL_SETTING = {
  currencyName: '미소',
  currencySymbol: '🪙',
  className: '4학년 1반',
  teacherName: '김담임 선생님',
  expPerLevel: 100, // 레벨업당 필요한 EXP
};

export const INITIAL_ROLES = [
  { id: 'r1', name: '칠판 도우미', icon: '🧹', reward: 30, description: '매 쉬는 시간마다 칠판을 깨끗이 지우고 분필 가루를 털어냅니다.' },
  { id: 'r2', name: '우유 급식 담당', icon: '🥛', reward: 40, description: '아침 우유 상자를 가져오고 다 마신 우유 팩을 정리합니다.' },
  { id: 'r3', name: '창문 & 환기 도우미', icon: '🪟', reward: 30, description: '쉬는 시간마다 창문을 열어 교실 공기를 상쾌하게 환기합니다.' },
  { id: 'r4', name: '제출물 확인원', icon: '📑', reward: 35, description: '아침 독서록 및 숙제 제출물을 모아서 선생님께 전달합니다.' },
  { id: 'r5', name: '정보 & 시청각 도우미', icon: '💻', reward: 40, description: '수업 전 TV와 컴퓨터를 켜고 화면을 준비합니다.' },
  { id: 'r6', name: '분리수거 대장', icon: '♻️', reward: 50, description: '학급 분리수거함을 점검하고 청소 시간에 배출합니다.' },
  { id: 'r7', name: '도서실 정기도우미', icon: '📚', reward: 35, description: '학급 문고 책꽂이의 책들을 가지런하게 정리합니다.' },
  { id: 'r8', name: '줄반장 (행렬 정리)', icon: '🚶‍♂️', reward: 30, description: '이동 수업 시 학생들의 대열을 바르고 안전하게 맞춥니다.' }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: '🎟️ 짝 바꾸기 무적권',
    price: 500,
    stock: 5,
    category: 'coupon',
    description: '다음 자리 배치 때 원하는 친구 옆자리를 우선 선택할 수 있습니다.',
    icon: '👫'
  },
  {
    id: 'p2',
    name: '🎟️ 5분 자유시간 쿠폰',
    price: 300,
    stock: 10,
    category: 'coupon',
    description: '수업 중 개별 자유시간 5분을 사용할 수 있습니다. (선생님 허락 필요)',
    icon: '⏳'
  },
  {
    id: 'p3',
    name: '🎟️ 급식 1등 줄서기 권',
    price: 400,
    stock: 8,
    category: 'coupon',
    description: '점심시간에 반에서 가장 먼저 급식 줄을 서서 밥을 먹습니다.',
    icon: '🍱'
  },
  {
    id: 'p4',
    name: '🎟️ 숙제 1회 면제권',
    price: 800,
    stock: 3,
    category: 'coupon',
    description: '일일 일기장 또는 단원 평가 일기 숙제를 1회 면제받습니다.',
    icon: '✨'
  },
  {
    id: 'p5',
    name: '✏️ 캐릭터 고급 지우개',
    price: 250,
    stock: 12,
    category: 'item',
    description: '인기 캐릭터 말랑말랑 잘 지워지는 고급 지우개입니다.',
    icon: '✏️'
  },
  {
    id: 'p6',
    name: '🎨 12색 형광 볼펜 세트',
    price: 600,
    stock: 4,
    category: 'item',
    description: '공부할 때 핵심 내용을 예쁘게 칠할 수 있는 볼펜 세트입니다.',
    icon: '🖊️'
  }
];

export const INITIAL_STUDENTS = [
  { id: 1, number: 1, name: '강민준', balance: 350, level: 2, exp: 40, roleId: 'r1', taskCompletedToday: false, coupons: [] },
  { id: 2, number: 2, name: '김서윤', balance: 520, level: 3, exp: 10, roleId: 'r2', taskCompletedToday: true, coupons: [{ productId: 'p2', productName: '🎟️ 5분 자유시간 쿠폰', purchasedAt: '2026-10-04', used: false }] },
  { id: 3, number: 3, name: '김하온', balance: 200, level: 1, exp: 80, roleId: 'r3', taskCompletedToday: false, coupons: [] },
  { id: 4, number: 4, name: '도현우', balance: 640, level: 3, exp: 70, roleId: 'r4', taskCompletedToday: true, coupons: [] },
  { id: 5, number: 5, name: '박지유', balance: 410, level: 2, exp: 90, roleId: 'r5', taskCompletedToday: false, coupons: [] },
  { id: 6, number: 6, name: '박준서', balance: 180, level: 1, exp: 50, roleId: 'r6', taskCompletedToday: false, coupons: [] },
  { id: 7, number: 7, name: '백아린', balance: 750, level: 4, exp: 20, roleId: 'r7', taskCompletedToday: true, coupons: [{ productId: 'p1', productName: '🎟️ 짝 바꾸기 무적권', purchasedAt: '2026-10-05', used: false }] },
  { id: 8, number: 8, name: '서예준', balance: 300, level: 2, exp: 30, roleId: 'r8', taskCompletedToday: false, coupons: [] },
  { id: 9, number: 9, name: '성수아', balance: 490, level: 3, exp: 0, roleId: 'r1', taskCompletedToday: true, coupons: [] },
  { id: 10, number: 10, name: '손유찬', balance: 120, level: 1, exp: 30, roleId: 'r2', taskCompletedToday: false, coupons: [] },
  { id: 11, number: 11, name: '송하은', balance: 580, level: 3, exp: 40, roleId: 'r3', taskCompletedToday: true, coupons: [] },
  { id: 12, number: 12, name: '신시우', balance: 260, level: 2, exp: 10, roleId: 'r4', taskCompletedToday: false, coupons: [] },
  { id: 13, number: 13, name: '안지아', balance: 830, level: 4, exp: 60, roleId: 'r5', taskCompletedToday: true, coupons: [] },
  { id: 14, number: 14, name: '양주원', balance: 390, level: 2, exp: 80, roleId: 'r6', taskCompletedToday: false, coupons: [] },
  { id: 15, number: 15, name: '윤채원', balance: 450, level: 3, exp: 20, roleId: 'r7', taskCompletedToday: true, coupons: [] },
  { id: 16, number: 16, name: '이건우', balance: 210, level: 1, exp: 90, roleId: 'r8', taskCompletedToday: false, coupons: [] },
  { id: 17, number: 17, name: '이도연', balance: 670, level: 3, exp: 80, roleId: 'r1', taskCompletedToday: true, coupons: [] },
  { id: 18, number: 18, name: '임은우', balance: 330, level: 2, exp: 40, roleId: 'r2', taskCompletedToday: false, coupons: [] },
  { id: 19, number: 19, name: '장나윤', balance: 510, level: 3, exp: 10, roleId: 'r3', taskCompletedToday: true, coupons: [] },
  { id: 20, number: 20, name: '전유준', balance: 150, level: 1, exp: 40, roleId: 'r4', taskCompletedToday: false, coupons: [] },
  { id: 21, number: 21, name: '정다은', balance: 720, level: 4, exp: 10, roleId: 'r5', taskCompletedToday: true, coupons: [] },
  { id: 22, number: 22, name: '조윤우', balance: 280, level: 2, exp: 20, roleId: 'r6', taskCompletedToday: false, coupons: [] },
  { id: 23, number: 23, name: '한예린', balance: 600, level: 3, exp: 50, roleId: 'r7', taskCompletedToday: true, coupons: [] },
  { id: 24, number: 24, name: '황지우', balance: 440, level: 2, exp: 95, roleId: 'r8', taskCompletedToday: false, coupons: [] }
];

export const INITIAL_LOGS = [
  { id: 'l1', timestamp: '2026-10-05 08:50', studentName: '김서윤', type: 'currency', amount: 40, reason: '우유 급식 담당 1인1역 수행 완료' },
  { id: 'l2', timestamp: '2026-10-05 09:10', studentName: '백아린', type: 'purchase', amount: -500, reason: '상점 구매: 🎟️ 짝 바꾸기 무적권' },
  { id: 'l3', timestamp: '2026-10-05 10:30', studentName: '안지아', type: 'exp', amount: 50, reason: '수학 모둠활동 경청 태도 우수' },
  { id: 'l4', timestamp: '2026-10-05 11:20', studentName: '전체', type: 'currency', amount: 50, reason: '급식 잔반 Zero 학급 미션 성공' }
];
