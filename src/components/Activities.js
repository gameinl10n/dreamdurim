import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PageHead from './PageHead';
import ActivityIcon from './ActivityIcon';
import ActivitiesProgressStats from './ActivitiesProgressStats';
import { PUBLIC_ACTIVITY_ITEMS, INTERNAL_ACTIVITY_ITEMS } from '../data/activitiesData';
import { ABOUT_SENIORS } from '../data/aboutSeniors';
import { HISTORY_EVENTS } from '../data/historyData';
import { WE_MEMBERS } from '../data/weMembers';
import { FOUNDATION_DATE, getDaysSinceDate } from '../utils/dateMetrics';
import './Activities.css';

const ActivitiesList = ({ items }) => {
  const { t } = useTranslation();
  return (
    <ul className="activities-list">
      {items.map(({ titleKey, descKey, icon }) => (
        <li key={titleKey} className="activities-item activities-item--glass">
          <div className="activities-item-header">
            <ActivityIcon name={icon} />
            <h3 className="activities-item-title">{t(titleKey)}</h3>
          </div>
          <p className="activities-item-desc">{t(descKey)}</p>
        </li>
      ))}
    </ul>
  );
};

const sumMentorMetric = (members, key) =>
  members.reduce((sum, member) => sum + (member.mentorMetrics?.[key] || 0), 0);

const Activities = () => {
  const { t } = useTranslation();
  const daysSinceFoundation = useMemo(() => getDaysSinceDate(FOUNDATION_DATE), []);
  const jobsSharedCount = daysSinceFoundation + 1;
  const seniorsCount = ABOUT_SENIORS.length;
  const leadMentorSessions = sumMentorMetric(WE_MEMBERS, 'sessions');
  const leadMentorMentees = sumMentorMetric(WE_MEMBERS, 'mentees');
  const mentoringHostedCount = HISTORY_EVENTS.filter((event) => {
    const koDesc = event.desc?.ko || '';
    return koDesc.includes('꿈드림') && koDesc.includes('멘토링');
  }).length;

  return (
    <div className="activities">
      <PageHead descKey="meta.activitiesDesc" />

      <header className="activities-header">
        <section className="activities-progress-card" aria-live="polite">
          <h2 className="activities-progress-title">{t('activities.progressTitle')}</h2>
          <p className="activities-progress-desc">{t('activities.progressDesc')}</p>
          <ActivitiesProgressStats
            jobsSharedCount={jobsSharedCount}
            seniorsCount={seniorsCount}
            mentoringHostedCount={mentoringHostedCount}
            leadMentorSessions={leadMentorSessions}
            leadMentorMentees={leadMentorMentees}
          />
        </section>
        <h1 className="activities-title">{t('activities.title')}</h1>
        <p className="activities-intro">{t('activities.intro')}</p>
      </header>

      <section className="activities-section" aria-labelledby="activities-public-heading">
        <h2 id="activities-public-heading" className="activities-section-title">
          {t('activities.publicSectionTitle')}
        </h2>
        <ActivitiesList items={PUBLIC_ACTIVITY_ITEMS} />
      </section>

      <section className="activities-section" aria-labelledby="activities-internal-heading">
        <h2 id="activities-internal-heading" className="activities-section-title">
          {t('activities.internalSectionTitle')}
        </h2>
        <p className="activities-section-intro">{t('activities.internalIntro')}</p>
        <ActivitiesList items={INTERNAL_ACTIVITY_ITEMS} />
      </section>
    </div>
  );
};

export default Activities;
