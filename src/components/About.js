import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCloseOnEscape } from '../hooks/useCloseOnEscape';
import PageHead from './PageHead';
import { MOBILE_BREAKPOINT } from '../constants/breakpoints';
import { MOBILE_NOTICE_DURATION } from '../constants/timing';
import { ABOUT_SENIORS } from '../data/aboutSeniors';
import { MEMBER_REVIEWS } from '../data/memberReviews';
import './About.css';

const INFINITE_SCROLL_DUPLICATES = 3;
const SCROLL_ITEMS = Array(INFINITE_SCROLL_DUPLICATES)
  .fill(null)
  .flatMap((_, batch) => ABOUT_SENIORS.map((item) => ({ ...item, key: `${batch}-${item.id}` })));

const SeniorLogoSlot = ({ item, t }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isClickable = Boolean(item.url);
  const description = item.descKey ? t(item.descKey) : '';
  const content = (
    <>
      {item.logo ? (
        <>
          {!isLoaded && <div className="about-logo-skeleton" aria-hidden />}
          <img
            src={item.logo}
            alt={item.name}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={isLoaded ? '' : 'about-logo-img--loading'}
          />
        </>
      ) : (
        <span className="about-logo-placeholder">{item.name}</span>
      )}
      {description && (
        <span className="about-logo-tooltip" id={`tooltip-${item.key}`} role="tooltip">
          {description}
        </span>
      )}
    </>
  );

  const slotProps = {
    className: `about-logo-slot ${item.logo ? 'about-logo-slot--image' : ''}`,
    title: description,
    tabIndex: isClickable ? 0 : undefined,
    role: isClickable ? 'link' : undefined,
    'aria-label': isClickable ? `${item.name} - ${t('common.openInNewWindow')}` : item.name,
    'aria-describedby': description ? `tooltip-${item.key}` : undefined,
  };

  if (isClickable) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" {...slotProps}>
        {content}
      </a>
    );
  }

  return <div {...slotProps}>{content}</div>;
};

const About = () => {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);
  const [pinnedStarId, setPinnedStarId] = useState(null);
  const [hoveredStarId, setHoveredStarId] = useState(null);
  const [mobileNoticeVisible, setMobileNoticeVisible] = useState(false);
  const centerBoxRef = useRef(null);

  const handleStarClick = (itemId) => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      setMobileNoticeVisible(true);
      setTimeout(() => setMobileNoticeVisible(false), MOBILE_NOTICE_DURATION);
      return;
    }
    setPinnedStarId((prev) => (prev === itemId ? null : itemId));
  };

  useCloseOnEscape(() => setPinnedStarId(null), !!pinnedStarId);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!pinnedStarId) return;
      if (centerBoxRef.current?.contains(e.target)) return;
      if (e.target.closest('.about-review-star')) return;
      setPinnedStarId(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [pinnedStarId]);

  return (
    <div className="about">
      <PageHead descKey="meta.aboutDesc" />
      <div className="about-hero">
        {MEMBER_REVIEWS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`about-review-star ${pinnedStarId === item.id ? 'about-review-star--pinned' : ''} ${hoveredStarId === item.id ? 'about-review-star--hovered' : ''}`}
            style={{ left: item.position.left, top: item.position.top }}
            aria-label={t('about.reviewAria')}
            aria-expanded={pinnedStarId === item.id}
            onClick={() => handleStarClick(item.id)}
            onMouseEnter={() => setHoveredStarId(item.id)}
            onMouseLeave={() => setHoveredStarId(null)}
          >
            <span className="about-review-star-icon" aria-hidden>✦</span>
            {item.authorKey && (
              <span
                className={`about-review-star-hover-author ${hoveredStarId === item.id ? 'about-review-star-hover-author--visible' : ''}`}
                role="tooltip"
              >
                {t(item.authorKey)}
              </span>
            )}
          </button>
        ))}
        <h1 className="about-title">{t('about.title')}</h1>
        <p className="about-intro">{t('about.intro')}</p>
        {mobileNoticeVisible && (
          <div className="about-review-mobile-notice" role="status">
            {t('about.reviewMobileNotice')}
          </div>
        )}
        {pinnedStarId && (() => {
          const item = MEMBER_REVIEWS.find((i) => i.id === pinnedStarId);
          if (!item) return null;
          return (
            <div ref={centerBoxRef} className="about-review-center-box" role="dialog" aria-label={t('about.reviewAria')}>
              <span
                className="about-review-center-box-text"
                dangerouslySetInnerHTML={{ __html: t(item.textKey) }}
              />
              {item.authorKey && (
                <span className="about-review-center-box-author">{t(item.authorKey)}</span>
              )}
            </div>
          );
        })()}
      </div>

      <section className="about-seniors" aria-labelledby="about-seniors-heading">
        <div className="about-seniors-head">
          <h2 id="about-seniors-heading" className="about-seniors-title">
            {t('about.seniorsTitle')}
          </h2>
        </div>
        <div
          className="about-seniors-track"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className={`about-seniors-logos about-seniors-logos--scroll ${isPaused ? 'about-seniors-logos--paused' : ''}`}
            role="list"
            aria-label={t('about.seniorsAria')}
          >
            {SCROLL_ITEMS.map((item) => (
              <div key={item.key} role="listitem" className="about-logo-slot-wrap">
                <SeniorLogoSlot item={item} t={t} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
