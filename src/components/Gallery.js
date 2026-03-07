import React, { useRef, useState, useEffect } from 'react';
import './Gallery.css';

// career: current(현) = 맨 위(최신), former(전) = 그 아래, 배열은 최신→과거 순
// group: 'founder' = 위쪽, 'team' = 아래쪽
// school, studentId: 학교명, 학번 (이름 아래 표시)
const WE_MEMBERS = [
  {
    id: 1,
    role: 'Co-Founder',
    group: 'founder',
    name: '권병욱',
    school: '절강대학교',
    studentId: '18학번',
    career: { former: ['miHoYo Localization Specialist', 'NetEaseGames Senior Global Localization Manager'], current: 'Hypergryph Localization Team Lead(Korean)' },
    image: '/images/we/we-founder.JPG',
  },
  {
    id: 2,
    role: 'Co-Founder',
    group: 'founder',
    name: '유승호',
    school: '절강대학교',
    studentId: '20학번',
    career: { former: ['hackseoul 1st Prize', 'NetEaseGames Intern'], current: 'Yorigo CEO' },
    image: '/images/we/we-team1.jpg',
  },
  {
    id: 3,
    role: 'Team Leader',
    group: 'team',
    name: '박지원',
    school: '절강대학교',
    studentId: '20학번',
    career: { former: [], current: 'Dreamdurim Team Leader' },
    image: '/images/we/we-team2.jpg',
  },
];

const FOUNDERS = WE_MEMBERS.filter((m) => m.group === 'founder');
const TEAM_LEADERS = WE_MEMBERS.filter((m) => m.group === 'team');

const WeProfileCard = ({ member, isVisible, index }) => {
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
            alt={`${member.name} - ${member.role}`}
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
          {member.role}
        </span>
        <h2 className="we-profile-name">{member.name}</h2>
        {(member.school || member.studentId) && (
          <p className="we-profile-school">
            {[member.school, member.studentId].filter(Boolean).join(' · ')}
          </p>
        )}
        <div className="we-profile-career">
          {member.career?.current && (
            <p className="we-profile-career-line">
              <span className="we-profile-career-label we-profile-career-label--current">(현)</span> {member.career.current}
            </p>
          )}
          {member.career?.former?.map((item, i) => (
            <p key={`former-${i}`} className="we-profile-career-line">
              <span className="we-profile-career-label">(전)</span> {item}
            </p>
          ))}
          {!member.career && member.bio && (
            <p className="we-profile-bio">{member.bio}</p>
          )}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="we-container" ref={containerRef}>
      <div className="we-profiles we-profiles--founders">
        {FOUNDERS.map((member, index) => (
          <WeProfileCard
            key={member.id}
            member={member}
            isVisible={isVisible}
            index={index}
          />
        ))}
      </div>
      <div className="we-profiles we-profiles--team">
        {TEAM_LEADERS.map((member, index) => (
          <WeProfileCard
            key={member.id}
            member={member}
            isVisible={isVisible}
            index={FOUNDERS.length + index}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
