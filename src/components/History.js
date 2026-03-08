import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { HISTORY_EVENTS } from '../data/historyData';
import './History.css';

const TimelineItem = ({ event, index, isVisible, t }) => {
  const [imageError, setImageError] = useState(false);
  const isLeft = index % 2 === 0;
  const imageSrc = event.image ? `${process.env.PUBLIC_URL || ''}${event.image}` : null;
  const showImage = imageSrc && !imageError;
  const content = (
    <div className="history-item-content">
      {showImage && (
        <div className="history-item-image-wrap">
          <img
            src={imageSrc}
            alt=""
            className="history-item-image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      <div className="history-item-body">
        <time className="history-item-date">{event.date}</time>
        <p className="history-item-desc">{t(event.descKey)}</p>
      </div>
    </div>
  );
  return (
    <div
      className={`history-item history-item--${isLeft ? 'left' : 'right'} ${isVisible ? 'history-item--visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 0.12}s` : '0s' }}
    >
      <div className={`history-item-slot history-item-slot--content ${isLeft ? '' : 'history-item-slot--empty'}`}>
        {isLeft && content}
      </div>
      <div className="history-item-marker">
        <div className="history-item-dot" aria-hidden />
      </div>
      <div className={`history-item-slot history-item-slot--content ${isLeft ? 'history-item-slot--empty' : ''}`}>
        {!isLeft && content}
      </div>
    </div>
  );
};

const History = () => {
  const { t } = useTranslation();
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
    <div className="history" ref={containerRef}>
      <Helmet>
        <title>HISTORY | DREAMDURIM</title>
        <meta name="description" content="DREAMDURIM 연혁" />
      </Helmet>
      <div className="history-header">
        <h1 className="history-title">{t('history.title')}</h1>
      </div>
      <div className="history-timeline">
        <div className="history-line" aria-hidden />
        {[...HISTORY_EVENTS].reverse().map((event, index) => (
          <TimelineItem
            key={event.id}
            event={event}
            index={index}
            isVisible={isVisible}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
