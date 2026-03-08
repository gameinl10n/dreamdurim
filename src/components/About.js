import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ABOUT_SENIORS } from '../data/aboutSeniors';
import './About.css';

const SCROLL_COPIES = 3;
const SCROLL_ITEMS = Array(SCROLL_COPIES)
  .fill(null)
  .flatMap((_, batch) => ABOUT_SENIORS.map((item) => ({ ...item, key: `${batch}-${item.id}` })));

const LogoSlot = ({ item, t }) => {
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
    'aria-label': isClickable ? `${item.name} - ${t('about.openInNewWindow')}` : item.name,
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

  return (
    <div className="about">
      <Helmet>
        <title>{t('meta.aboutTitle')}</title>
        <meta name="description" content={t('meta.aboutDesc')} />
      </Helmet>
      <div className="about-hero">
        <h1 className="about-title">{t('about.title')}</h1>
        <p className="about-intro">{t('about.intro')}</p>
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
                <LogoSlot item={item} t={t} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
