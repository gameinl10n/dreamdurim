import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      nav: {
        logo: '꿈드림',
        about: 'ABOUT',
        we: 'WE',
        history: 'HISTORY',
        toggleTheme: '테마 전환',
      },
      about: {
        title: '꿈드림',
        intro: '유학생을 위한 비영리조직',
        seniorsTitle: '꿈드림과 함께해 주시는 선배님들',
        seniorsAria: '함께하는 선배 기업 로고',
        openInNewWindow: '새 창에서 열기',
        seniorDesc1: '절강대학교 17학번 J선배님과 함께하고 있습니다',
        seniorDesc2: '절강대학교 16학번 H선배님과 함께하고 있습니다',
        seniorDesc3: '절강대학교 18학번 H선배님과 함께하고 있습니다',
        seniorDesc4: '절강대학교 19학번 N선배님과 함께하고 있습니다',
        seniorDesc5: '절강대학교 21학번 K선배님과 함께하고 있습니다',
        seniorDesc6: '절강대학교 18학번 G선배님과 함께하고 있습니다',
        seniorDesc7: '절강대학교 17학번 K선배님과 함께하고 있습니다',
        seniorDesc8: '상해교통대학교 21학번 I선배님과 함께하고 있습니다',
        seniorDesc9: '절강대학교 19학번 K선배님과 함께하고 있습니다',
      },
      we: {
        current: '현재',
        schoolName: '절강대학교',
        roleCoFounder: 'Co-Founder',
        roleGen1TeamLead: 'Gen 1 Team Lead',
        roleGen2TeamLead: 'Gen 2 Team Lead',
      },
      history: {
        title: 'HISTORY',
        event1: '꿈드림 설립',
        event2: '꿈드림 1기 활동 시작',
        event3: '꿈드림 제1회 멘토링 데이',
        event4: '꿈드림 2기 활동 시작',
        readMore: '자세히 보기',
        readLess: '접기',
        viewLarger: '크게 보기',
        closeLightbox: '닫기',
      },
      footer: {
        title: '꿈드림',
        subtitle: '유학생을 위한 비영리 조직',
        titleEn: 'DREAMDURIM',
        subtitleEn: 'NPO for international students',
        copyright: 'COPYRIGHT 꿈드림 © {{year}}. ALL RIGHTS RESERVED.',
      },
      meta: {
        aboutTitle: 'ABOUT | 꿈드림',
        aboutDesc: '유학생을 위한 비영리조직 꿈드림',
        weTitle: 'WE | 꿈드림',
        weDesc: '꿈드림 창립자 및 팀 리더 소개',
        historyTitle: 'HISTORY | 꿈드림',
        historyDesc: '꿈드림 연혁',
      },
    },
  },
  en: {
    translation: {
      nav: {
        logo: 'DREAMDURIM',
        about: 'ABOUT',
        we: 'WE',
        history: 'HISTORY',
        toggleTheme: 'Toggle theme',
      },
      about: {
        title: 'DREAMDURIM',
        intro: 'NPO for international students',
        seniorsTitle: 'Seniors with DREAMDURIM',
        seniorsAria: 'Partner senior company logos',
        openInNewWindow: 'Open in new window',
        seniorDesc1: 'With ZJU 17 alumnus J.',
        seniorDesc2: 'With ZJU 16 alumnus H.',
        seniorDesc3: 'With ZJU 18 alumnus H.',
        seniorDesc4: 'With ZJU 19 alumnus N.',
        seniorDesc5: 'With ZJU 21 alumnus K.',
        seniorDesc6: 'With ZJU 18 alumnus G.',
        seniorDesc7: 'With ZJU 17 alumnus K.',
        seniorDesc8: 'With Shanghai Jiao Tong University 21 alumnus I.',
        seniorDesc9: 'With ZJU 19 alumnus K.',
      },
      we: {
        current: 'Present',
        schoolName: 'Zhejiang University',
        roleCoFounder: 'Co-Founder',
        roleGen1TeamLead: 'Gen 1 Team Lead',
        roleGen2TeamLead: 'Gen 2 Team Lead',
      },
      history: {
        title: 'HISTORY',
        event1: 'DREAMDURIM founded',
        event2: 'DREAMDURIM Gen 1 activities started',
        event3: 'DREAMDURIM 1st Mentoring Day',
        event4: 'DREAMDURIM Gen 2 activities started',
        readMore: 'Read more',
        readLess: 'Show less',
        viewLarger: 'View larger',
        closeLightbox: 'Close',
      },
      footer: {
        title: 'DREAMDURIM',
        subtitle: 'NPO for international students',
        titleEn: 'DREAMDURIM',
        subtitleEn: 'NPO for international students',
        copyright: 'COPYRIGHT DREAMDURIM © {{year}}. ALL RIGHTS RESERVED.',
      },
      meta: {
        aboutTitle: 'ABOUT | DREAMDURIM',
        aboutDesc: 'NPO for international students DREAMDURIM',
        weTitle: 'WE | DREAMDURIM',
        weDesc: 'DREAMDURIM founders and team leaders',
        historyTitle: 'HISTORY | DREAMDURIM',
        historyDesc: 'DREAMDURIM history',
      },
    },
  },
  zh: {
    translation: {
      nav: {
        logo: '朵林多领',
        about: '关于',
        we: '我们',
        history: '历史',
        toggleTheme: '切换主题',
      },
      about: {
        title: '朵林多领',
        intro: '面向留学生的非营利组织',
        seniorsTitle: '与朵林多领同行的前辈们',
        seniorsAria: '合作前辈企业 logo',
        openInNewWindow: '在新窗口中打开',
        seniorDesc1: '与浙江大学17届J学长一起。',
        seniorDesc2: '与浙江大学16届H学长一起。',
        seniorDesc3: '与浙江大学18届H学长一起。',
        seniorDesc4: '与浙江大学19届N学长一起。',
        seniorDesc5: '与浙江大学21届K学长一起。',
        seniorDesc6: '与浙江大学18届G学长一起。',
        seniorDesc7: '与浙江大学17届K学长一起。',
        seniorDesc8: '与上海交通大学21届I学长一起。',
        seniorDesc9: '与浙江大学19届K学长一起。',
      },
      we: {
        current: '至今',
        schoolName: '浙江大学',
        roleCoFounder: '联合创始人',
        roleGen1TeamLead: '一届队长',
        roleGen2TeamLead: '二届队长',
      },
      history: {
        title: '历史',
        event1: '朵林多领成立',
        event2: '朵林多领一届活动开始',
        event3: '朵林多领第一届导师日',
        event4: '朵林多领二届活动开始',
        readMore: '了解更多',
        readLess: '收起',
        viewLarger: '放大查看',
        closeLightbox: '关闭',
      },
      footer: {
        title: '朵林多领',
        subtitle: '面向留学生的非营利组织',
        titleEn: 'DREAMDURIM',
        subtitleEn: 'NPO for international students',
        copyright: 'COPYRIGHT 朵林多领 © {{year}}. ALL RIGHTS RESERVED.',
      },
      meta: {
        aboutTitle: 'ABOUT | 朵林多领',
        aboutDesc: '面向留学生的非营利组织 朵林多领',
        weTitle: 'WE | 朵林多领',
        weDesc: '朵林多领创始人及队长介绍',
        historyTitle: 'HISTORY | 朵林多领',
        historyDesc: '朵林多领历史',
      },
    },
  },
};

const savedLng = typeof window !== 'undefined' && window.localStorage.getItem('dreamdurim-lang');

i18n.use(initReactI18next).init({
  resources,
  lng: savedLng || 'ko',
  fallbackLng: 'ko',
  interpolation: { escapeValue: false },
});

const setHtmlLang = (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
};

i18n.on('languageChanged', setHtmlLang);
setHtmlLang(i18n.language);

export default i18n;
