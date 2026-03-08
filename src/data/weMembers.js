export const ROLE_KEYS = {
  'Co-Founder': 'we.roleCoFounder',
  'Gen 1 Team Lead': 'we.roleGen1TeamLead',
  'Gen 2 Team Lead': 'we.roleGen2TeamLead',
};

// career: current(현) = 맨 위(최신), former(전) = 그 아래
// item: string 또는 { company, role }
// group: 'founder' = 위쪽, 'team' = 아래쪽
// school, studentId: 학교명, 학번
// teamLeadPeriod: 팀 리드 기간 (group: 'team'일 때만, 역할 아래에 작게 표시)
export const WE_MEMBERS = [
  {
    id: 1,
    role: 'Co-Founder',
    group: 'founder',
    name: '권병욱',
    school: '절강대학교',
    studentId: '18학번',
    career: {
      former: [
        { company: 'miHoYo', role: 'Localization Specialist' },
        { company: 'NetEaseGames', role: 'Senior Global Localization Manager' },
      ],
      current: { company: 'Hypergryph', role: 'Localization Korean Team Lead' },
    },
    image: `${process.env.PUBLIC_URL || ''}/images/we/we-founder.JPG`,
  },
  {
    id: 2,
    role: 'Co-Founder',
    group: 'founder',
    name: '유승호',
    school: '절강대학교',
    studentId: '19학번',
    career: {
      former: [
        { company: 'hackseoul', role: '1st Prize' },
        { company: 'NetEaseGames', role: 'Intern' },
      ],
      current: { company: 'Yorigo', role: 'Chief Executive Officer' },
    },
    image: `${process.env.PUBLIC_URL || ''}/images/we/we-team1.jpg`,
  },
  {
    id: 4,
    role: 'Gen 1 Team Lead',
    group: 'team',
    teamLeadPeriod: '2025.12 - 2026.02',
    name: '천은서',
    school: '절강대학교',
    studentId: '24학번',
    career: { former: [], current: { company: '', role: '' } },
    image: `${process.env.PUBLIC_URL || ''}/images/we/we-team3.jpg`,
  },
  {
    id: 3,
    role: 'Gen 2 Team Lead',
    group: 'team',
    teamLeadPeriod: '2026.03 - 현재',
    name: '박지원',
    school: '절강대학교',
    studentId: '22학번',
    career: { former: [], current: { company: '', role: '' } },
    image: `${process.env.PUBLIC_URL || ''}/images/we/we-team2.jpg`,
  },
];
