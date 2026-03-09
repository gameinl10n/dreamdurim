import React from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import PageHead from './PageHead';
import { WE_MEMBERS, ROLE_KEYS } from '../data/weMembers';
import './We.css';

const FOUNDERS = WE_MEMBERS.filter((m) => m.group === 'founder');
const TEAM_LEADERS = WE_MEMBERS.filter((m) => m.group === 'team');

const hasCareerContent = (member) =>
  (member.career?.current && (member.career.current.company || member.career.current.role)) ||
  (member.career?.former?.length > 0) ||
  member.bio;

const MemberProfileCard = ({ member, isVisible, index, t }) => {
  const roleLabel = ROLE_KEYS[member.role] ? t(ROLE_KEYS[member.role]) : member.role;
  const schoolLabel = member.school ? t('we.schoolName') : '';
  const teamLeadPeriodDisplay = member.teamLeadPeriod
    ? member.teamLeadPeriod.replace('현재', t('we.current'))
    : '';

  return (
    <section
      className={`we-profile ${isVisible ? 'we-profile--visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 0.1}s` : '0s' }}
      aria-labelledby={`we-role-${member.id}`}
    >
      <div className="we-profile-image-wrap">
        <div className="we-profile-image-placeholder">
          <img
            src={member.image}
            alt={`${member.name} - ${roleLabel}`}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling?.classList.add('we-profile-image-fallback--show');
            }}
          />
          <div className="we-profile-image-fallback">
            <span>{member.name.charAt(0)}</span>
          </div>
        </div>
      </div>
      <div className="we-profile-content">
        <span id={`we-role-${member.id}`} className="we-profile-role">
          {roleLabel}
        </span>
        {teamLeadPeriodDisplay && (
          <span className="we-profile-team-lead-period">{teamLeadPeriodDisplay}</span>
        )}
        <h2 className="we-profile-name">{member.name}</h2>
        {(schoolLabel || member.studentId) && (
          <p className="we-profile-school">
            {[schoolLabel, member.studentId ? t('we.studentIdFormat', { year: member.studentId }) : ''].filter(Boolean).join(' · ')}
          </p>
        )}
        {hasCareerContent(member) && (
          <div className="we-profile-career">
            {member.career?.current && (
              <div className="we-profile-career-item we-profile-career-item--current">
                <div className="we-profile-career-content">
                  <span className="we-profile-career-company">{member.career.current.company}</span>
                  <span className="we-profile-career-role">{member.career.current.role}</span>
                </div>
              </div>
            )}
            {member.career?.former?.map((item, i) => (
              <div key={`former-${i}`} className="we-profile-career-item">
                <div className="we-profile-career-content">
                  <span className="we-profile-career-company">{item.company}</span>
                  <span className="we-profile-career-role">{item.role}</span>
                </div>
              </div>
            ))}
            {!member.career && member.bio && <p className="we-profile-bio">{member.bio}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

const We = () => {
  const { t } = useTranslation();
  const [containerRef, isVisible] = useIntersectionObserver(0.15);

  return (
    <div className="we-container" ref={containerRef}>
      <PageHead descKey="meta.weDesc" />
      <div className="we-profiles we-profiles--founders">
        {FOUNDERS.map((member, index) => (
          <MemberProfileCard
            key={member.id}
            member={member}
            isVisible={isVisible}
            index={index}
            t={t}
          />
        ))}
      </div>
      <div className="we-profiles we-profiles--team">
        {TEAM_LEADERS.map((member, index) => (
          <MemberProfileCard
            key={member.id}
            member={member}
            isVisible={isVisible}
            index={FOUNDERS.length + index}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default We;
