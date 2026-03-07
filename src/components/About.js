import React, { useState } from 'react';
import './About.css';

const ABOUT_SENIORS = [
  { id: 1, name: '현대그린푸드', logo: '/images/about/HYUNDAIGREENFOOD.png', description: '절강대학교 17학번 J선배님과 함께하고 있습니다', url: '' },
  { id: 2, name: 'HDKSOE', logo: '/images/about/HDKSOE.png', description: '절강대학교 16학번 H선배님과 함께하고 있습니다', url: '' },
  { id: 3, name: 'TEMU', logo: '/images/about/TEMU.jpg', description: '절강대학교 18학번 H선배님과 함께하고 있습니다', url: '' },
  { id: 4, name: 'CJ', logo: '/images/about/CJ.jpg', description: '절강대학교 19학번 N선배님과 함께하고 있습니다', url: '' },
  { id: 5, name: 'HUAQIN', logo: '/images/about/HUAQIN.png', description: '절강대학교 20학번 선배님과 함께하고 있습니다', url: '' },
  { id: 6, name: 'HYPERGRYPH', logo: '/images/about/HYPERGRYPH.jpg', description: '절강대학교 18학번 선배님과 함께하고 있습니다', url: '' },
];

const SCROLL_COPIES = 3;
const SCROLL_ITEMS = Array(SCROLL_COPIES)
  .fill(null)
  .flatMap((_, batch) =>
    ABOUT_SENIORS.map((item) => ({ ...item, key: `${batch}-${item.id}` }))
  );

const LogoSlot = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isClickable = Boolean(item.url);
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
      {item.description && (
        <span
          className="about-logo-tooltip"
          id={`tooltip-${item.key}`}
          role="tooltip"
        >
          {item.description}
        </span>
      )}
    </>
  );

  const slotProps = {
    className: `about-logo-slot ${item.logo ? 'about-logo-slot--image' : ''}`,
    title: item.description,
    tabIndex: isClickable ? 0 : undefined,
    role: isClickable ? 'link' : undefined,
    'aria-label': isClickable ? `${item.name} - 새 창에서 열기` : item.name,
    'aria-describedby': item.description ? `tooltip-${item.key}` : undefined,
  };

  if (isClickable) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        {...slotProps}
      >
        {content}
      </a>
    );
  }

  return <div {...slotProps}>{content}</div>;
};

const About = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="about">
      <div className="about-hero">
        <h1 className="about-title">DREAMDURIM</h1>
        <p className="about-intro">유학생을 위한 비영리조직</p>
      </div>

      <section
        className="about-seniors"
        aria-labelledby="about-seniors-heading"
      >
        <div className="about-seniors-head">
          <h2 id="about-seniors-heading" className="about-seniors-title">
            꿈드림과 함께해 주시는 선배님들
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
            aria-label="함께하는 선배 기업 로고"
          >
            {SCROLL_ITEMS.map((item) => (
              <div key={item.key} role="listitem" className="about-logo-slot-wrap">
                <LogoSlot item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
