import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHead from './PageHead';
import ActivityIcon from './ActivityIcon';
import { PUBLIC_ACTIVITY_ITEMS, INTERNAL_ACTIVITY_ITEMS } from '../data/activitiesData';
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

const Activities = () => {
  const { t } = useTranslation();

  return (
    <div className="activities">
      <PageHead descKey="meta.activitiesDesc" />

      <header className="activities-header">
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
