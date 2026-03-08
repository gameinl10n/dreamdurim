import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      nav: {
        logo: 'DREAMDURIM',
        about: 'ABOUT',
        we: 'WE',
        history: 'HISTORY',
        toggleTheme: '테마 전환',
      },
      about: {
        title: 'DREAMDURIM',
        intro: '유학생을 위한 비영리조직',
        seniorsTitle: '꿈드림과 함께해 주시는 선배님들',
        seniorsAria: '함께하는 선배 기업 로고',
        openInNewWindow: '새 창에서 열기',
        seniorDesc1: '절강대학교 17학번 J선배님과 함께하고 있습니다',
        seniorDesc2: '절강대학교 16학번 H선배님과 함께하고 있습니다',
        seniorDesc3: '절강대학교 18학번 H선배님과 함께하고 있습니다',
        seniorDesc4: '절강대학교 19학번 N선배님과 함께하고 있습니다',
        seniorDesc5: '절강대학교 20학번 선배님과 함께하고 있습니다',
        seniorDesc6: '절강대학교 18학번 선배님과 함께하고 있습니다',
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
        event2: '1기 팀 리드 시작',
        event3: '활동 진행',
        event4: '2기 팀 리드 시작',
      },
      footer: {
        title: '꿈드림',
        subtitle: '유학생을 위한 비영리 조직',
        titleEn: 'DREAMDURIM',
        subtitleEn: 'NPO for international students',
        copyright: 'COPYRIGHT DREAMDURIM © {{year}}. ALL RIGHTS RESERVED.',
        followUs: 'Follow us',
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
        seniorsTitle: 'Seniors with DreamDurim',
        seniorsAria: 'Partner senior company logos',
        openInNewWindow: 'Open in new window',
        seniorDesc1: 'With ZJU 17 alumnus J.',
        seniorDesc2: 'With ZJU 16 alumnus H.',
        seniorDesc3: 'With ZJU 18 alumnus H.',
        seniorDesc4: 'With ZJU 19 alumnus N.',
        seniorDesc5: 'With ZJU 20 alumnus.',
        seniorDesc6: 'With ZJU 18 alumnus.',
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
        event1: 'DreamDurim founded',
        event2: 'Gen 1 team lead started',
        event3: 'Activities in progress',
        event4: 'Gen 2 team lead started',
      },
      footer: {
        title: 'DreamDurim',
        subtitle: 'NPO for international students',
        titleEn: 'DREAMDURIM',
        subtitleEn: 'NPO for international students',
        copyright: 'COPYRIGHT DREAMDURIM © {{year}}. ALL RIGHTS RESERVED.',
        followUs: 'Follow us',
      },
    },
  },
  zh: {
    translation: {
      nav: {
        logo: 'DREAMDURIM',
        about: '关于',
        we: '我们',
        history: '历史',
        toggleTheme: '切换主题',
      },
      about: {
        title: 'DREAMDURIM',
        intro: '面向留学生的非营利组织',
        seniorsTitle: '与梦梦同行的前辈们',
        seniorsAria: '合作前辈企业 logo',
        openInNewWindow: '在新窗口中打开',
        seniorDesc1: '与浙江大学17届J学长一起。',
        seniorDesc2: '与浙江大学16届H学长一起。',
        seniorDesc3: '与浙江大学18届H学长一起。',
        seniorDesc4: '与浙江大学19届N学长一起。',
        seniorDesc5: '与浙江大学20届学长一起。',
        seniorDesc6: '与浙江大学18届学长一起。',
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
        event1: '梦梦成立',
        event2: '一届队长上任',
        event3: '活动进行中',
        event4: '二届队长上任',
      },
      footer: {
        title: '梦梦',
        subtitle: '面向留学生的非营利组织',
        titleEn: 'DREAMDURIM',
        subtitleEn: 'NPO for international students',
        copyright: 'COPYRIGHT DREAMDURIM © {{year}}. ALL RIGHTS RESERVED.',
        followUs: '关注我们',
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

export default i18n;
