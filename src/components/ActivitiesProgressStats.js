import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCountUp } from '../hooks/useCountUp';

const StatCard = ({ icon, labelKey, value, unitKey, isExternal = false }) => {
  const { t } = useTranslation();
  const displayValue = useCountUp(value);
  const unit = t(unitKey);

  return (
    <li className={`activities-progress-stat-card ${isExternal ? 'activities-progress-stat-card--external' : ''}`}>
      <span className="activities-progress-stat-icon" aria-hidden>
        {icon}
      </span>
      <span className="activities-progress-stat-label">{t(labelKey)}</span>
      <span className="activities-progress-stat-value">
        <strong className="ui-highlight-number">{displayValue.toLocaleString()}</strong>
        {unit && <em>{unit}</em>}
      </span>
    </li>
  );
};

const ActivitiesProgressStats = ({
  jobsSharedCount,
  seniorsCount,
  mentoringHostedCount,
  leadMentorSessions,
  leadMentorMentees,
}) => {
  const { t } = useTranslation();

  return (
    <ul className="activities-progress-stats" aria-label={t('activities.progressStatsAria')}>
      <StatCard
        icon="📢"
        labelKey="activities.progressJobsLabel"
        value={jobsSharedCount}
        unitKey="activities.progressJobsUnit"
      />
      <StatCard
        icon="👥"
        labelKey="activities.progressSeniorsLabel"
        value={seniorsCount}
        unitKey="activities.progressSeniorsUnit"
      />
      <StatCard
        icon="🤝"
        labelKey="activities.progressMentoringLabel"
        value={mentoringHostedCount}
        unitKey="activities.progressMentoringUnit"
      />
      <StatCard
        icon="➕"
        labelKey="activities.progressLeadMentorSessionsLabel"
        value={leadMentorSessions}
        unitKey="activities.progressLeadMentorSessionsUnit"
        isExternal
      />
      <StatCard
        icon="➕"
        labelKey="activities.progressLeadMentorMenteesLabel"
        value={leadMentorMentees}
        unitKey="activities.progressLeadMentorMenteesUnit"
        isExternal
      />
    </ul>
  );
};

export default ActivitiesProgressStats;
