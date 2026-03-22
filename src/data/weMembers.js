import { getImagePath } from '../utils/assets';

export const ROLE_KEYS = {
  'Co-Founder': 'we.roleCoFounder',
  'Co-Founder · CTO': 'we.roleCoFounderCto',
  'Co-Founder · CEO': 'we.roleCoFounderCeo',
  'Team Lead · Gen 1': 'we.roleGen1TeamLead',
  'Team Lead · Gen 2': 'we.roleGen2TeamLead',
};

// career: current(현) = 맨 위(최신), former(전) = 그 아래
// item: string 또는 { company, role }
// group: 'founder' = 위쪽, 'team' = 아래쪽
// school, studentId: 학교명, 학번
// teamLeadPeriod: 팀 리드 기간 (group: 'team'일 때만, 역할 아래에 작게 표시)
export const WE_MEMBERS = [
  {
    id: 1,
    role: 'Co-Founder · CTO',
    group: 'founder',
    name: 'GWON BYEONGUK',
    school: '절강대학교',
    studentId: '18',
    career: {
      former: [
        { company: 'miHoYo', role: 'Localization Specialist' },
        { company: 'NetEaseGames', role: 'Senior Global Localization Manager' },
      ],
      current: { company: 'Hypergryph', role: 'Localization Korean Team Lead' },
    },
    image: getImagePath('/images/we/co-founder1.JPG'),
  },
  {
    id: 2,
    role: 'Co-Founder · CEO',
    group: 'founder',
    name: 'YOO SEUNGHO',
    school: '절강대학교',
    studentId: '20',
    career: {
      former: [
        { company: 'hackseoul', role: '1st Prize Winner(Team Yorigo)' },
        { company: 'NetEaseGames', role: ' Korean Operations Intern' },
      ],
      current: { company: 'Yorigo', role: 'Chief Executive Officer' },
    },
    image: getImagePath('/images/we/co-founder2.jpg'),
  },
  {
    id: 5,
    role: 'Co-Founder',
    group: 'founder',
    name: 'NOH HYEONCHEOL',
    school: '절강대학교',
    studentId: '19',
    career: { former: [], current: { company: 'CJ LOGISTICS', role: 'Management Planning Team' } },
    image: getImagePath('/images/we/co-founder3.jpg'),
  },
  {
    id: 4,
    role: 'Team Lead · Gen 1',
    group: 'team',
    teamLeadPeriod: '2025.03 - 2026.02',
    name: 'CHUN EUNSEO',
    school: '절강대학교',
    studentId: '24',
    career: { former: [], current: { company: 'Alibaba', role: 'Strategic Analysis Intern' } },
    image: getImagePath('/images/we/team-lead1.jpg'),
  },
  {
    id: 3,
    role: 'Team Lead · Gen 2',
    group: 'team',
    teamLeadPeriod: '2026.03 - 현재',
    name: 'PARK JIWON',
    school: '절강대학교',
    studentId: '23',
    career: { former: [], current: { company: '', role: '' } },
    image: getImagePath('/images/we/team-lead2.jpg'),
  },
];
