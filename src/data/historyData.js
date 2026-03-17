/**
 * 연혁 데이터 - 한 파일에서 날짜, 내용, 사진을 모두 관리합니다.
 *
 * 항목 추가/수정 시 이 파일만 편집하면 됩니다.
 *
 * 필드 설명:
 *   - date: YYYY.MM 형식
 *   - desc: 한/영/중 제목
 *   - image: 사진 경로 (public 기준, event{id}.jpg 형식)
 *   - url: 외부 링크 (optional)
 *   - longDesc: 펼쳐보기 상세 내용 (optional)
 */
export const HISTORY_EVENTS = [
  {
    id: 1,
    date: '2024.09',
    desc: {
      ko: '꿈드림 설립',
      en: 'DREAMDURIM founded',
      zh: '朵林多领成立',
    },
    image: '/images/history/event1.jpg',
  },
  {
    id: 2,
    date: '2024.12',
    desc: {
      ko: '꿈드림 취업 정보 공유방 운영 시작',
      en: 'DREAMDURIM job info sharing channel launched',
      zh: '朵林多领就业信息共享群开始运营',
    },
    image: '/images/history/event2.jpg',
  },
  {
    id: 3,
    date: '2025.02',
    desc: {
      ko: '꿈드림 1기 활동 시작',
      en: 'DREAMDURIM Gen 1 activities started',
      zh: '朵林多领一届活动开始',
    },
    image: '/images/history/event3.jpg',
  },
  {
    id: 4,
    date: '2025.03',
    desc: {
      ko: '데이터 분석 스터디',
      en: 'Data analysis study',
      zh: '数据分析学习',
    },
    image: '/images/history/event4.jpg',
  },
  {
    id: 5,
    date: '2025.04',
    desc: {
      ko: '파이썬 스터디',
      en: 'Python study',
      zh: 'Python学习',
    },
    image: '/images/history/event5.jpg',
  },
  {
    id: 6,
    date: '2025.04',
    desc: {
      ko: '텐센트 채용 강연회',
      en: 'Tencent recruitment seminar',
      zh: '腾讯招聘宣讲会',
    },
    image: '/images/history/event6.jpg',
  },
  {
    id: 7,
    date: '2025.04',
    desc: {
      ko: '바이트댄스 채용 강연회',
      en: 'ByteDance recruitment seminar',
      zh: '字节跳动招聘宣讲会',
    },
    image: '/images/history/event7.jpg',
  },
  {
    id: 8,
    date: '2025.05',
    desc: {
      ko: '상해 코트라 멘토링 데이',
      en: 'Shanghai KOTRA Mentoring Day',
      zh: '上海韩国贸易馆导师日',
    },
    image: '/images/history/event8.jpg',
  },
  {
    id: 9,
    date: '2025.05',
    desc: {
      ko: '꿈드림 제1회 멘토링 데이',
      en: 'DREAMDURIM 1st Mentoring Day',
      zh: '朵林多领第一届导师日',
    },
    image: '/images/history/event9.jpg',
  },
  {
    id: 10,
    date: '2025.06',
    desc: {
      ko: '독서 스터디',
      en: 'Reading study',
      zh: '读书学习',
    },
    image: '/images/history/event10.jpg',
  },
  {
    id: 11,
    date: '2025.09',
    desc: {
      ko: '오프라인 스터디',
      en: 'Offline study',
      zh: '线下学习',
    },
    image: '/images/history/event11.jpg',
  },
  {
    id: 12,
    date: '2025.10',
    desc: {
      ko: '독서 피크닉',
      en: 'Reading picnic',
      zh: '读书野餐',
    },
    image: '/images/history/event12.jpg',
  },
  {
    id: 13,
    date: '2026.03',
    desc: {
      ko: '꿈드림 2기 활동 시작',
      en: 'DREAMDURIM Gen 2 activities started',
      zh: '朵林多领二届活动开始',
    },
    image: '/images/history/event13.jpg',
  },
];
