# DREAMDURIM

유학생을 위한 비영리 조직 DREAMDURIM 랜딩 페이지

## 기술 스택

- React 18.2.0
- React Router DOM 6.20.0
- Create React App

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── components/
│   ├── Navbar.js       # 상단 네비게이션
│   ├── About.js        # 소개 페이지
│   ├── We.js           # WE 섹션 (창립자/팀 리더 프로필)
│   ├── History.js      # 히스토리 페이지
│   ├── Footer.js       # 하단 푸터
│   └── ScrollToTop.js  # 스크롤 탑 버튼
├── context/
│   └── ThemeContext.js # 테마 컨텍스트
├── App.js
├── App.css
├── index.js
└── index.css
```

## 기능

- **About**: 조직 소개, 선배 기업 로고
- **WE**: 창립자·팀 리더 프로필 (경력, 학교, 학번)
- **History**: 히스토리 (업데이트 준비중)
- **테마 토글**: 다크/라이트 모드
- **반응형 디자인**: 모바일 및 데스크톱 지원

## 이미지 설정

- `public/images/about/` - 선배 기업 로고
- `public/images/we/` - 창립자·팀 리더 사진 (we-founder.JPG, we-team1.jpg 등)

