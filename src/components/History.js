import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Helmet } from 'react-helmet-async';
import { HISTORY_EVENTS } from '../data/historyData';
import './History.css';

const SORTED_EVENTS = [...HISTORY_EVENTS].reverse();

const getYear = (dateStr) => dateStr.split('.')[0];

const TimelineItem = ({ event, index, isVisible, t, onImageClick, itemRef }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;
  const imageSrc = event.image ? `${process.env.PUBLIC_URL || ''}${event.image}` : null;
  const showImage = imageSrc && !imageError;
  const hasLongDesc = Boolean(event.longDescKey);

  const content = (
    <div
      className="history-item-content"
      role="article"
      aria-labelledby={`history-date-${event.id}`}
    >
      {showImage && (
        <div className="history-item-image-wrap">
          {!imageLoaded && <div className="history-item-image-skeleton" aria-hidden />}
          <button
            type="button"
            className="history-item-image-btn"
            onClick={() => onImageClick(imageSrc)}
            aria-label={t('history.viewLarger')}
          >
            <img
              src={imageSrc}
              alt=""
              className={`history-item-image ${imageLoaded ? 'history-item-image--loaded' : ''}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </button>
        </div>
      )}
      <div className="history-item-body">
        <time id={`history-date-${event.id}`} className="history-item-date" dateTime={event.date.replace('.', '-')}>
          {event.date}
        </time>
        <p className="history-item-desc">{t(event.descKey)}</p>
        {event.url && (
          <a href={event.url} target="_blank" rel="noopener noreferrer" className="history-item-link">
            {t('about.openInNewWindow')}
          </a>
        )}
        {hasLongDesc && (
          <div className="history-item-expand">
            <button
              type="button"
              className="history-item-expand-btn"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? t('history.readLess') : t('history.readMore')}
            </button>
            {expanded && <p className="history-item-long-desc">{t(event.longDescKey)}</p>}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={itemRef}
      className={`history-item history-item--${isLeft ? 'left' : 'right'} ${isVisible ? 'history-item--visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 0.12}s` : '0s' }}
      role="listitem"
    >
      <div className={`history-item-slot history-item-slot--content ${isLeft ? '' : 'history-item-slot--empty'}`}>
        {isLeft && content}
      </div>
      <div className="history-item-marker" aria-hidden>
        <div className="history-item-dot" />
      </div>
      <div className={`history-item-slot history-item-slot--content ${isLeft ? 'history-item-slot--empty' : ''}`}>
        {!isLeft && content}
      </div>
    </div>
  );
};

const YearLabel = ({ year, isVisible }) => (
  <div className={`history-year-label ${isVisible ? 'history-year-label--visible' : ''}`} role="presentation">
    <span className="history-year-text">{year}</span>
  </div>
);

const Lightbox = ({ src, onClose, closeLabel }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="history-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={closeLabel}
      onClick={handleOverlayClick}
    >
      <button
        type="button"
        className="history-lightbox-close"
        onClick={onClose}
        aria-label={closeLabel}
      >
        ×
      </button>
      <div className="history-lightbox-content">
        <img src={src} alt="" className="history-lightbox-image" />
      </div>
    </div>
  );
};

const History = () => {
  const { t } = useTranslation();
  const [containerRef, isVisible] = useIntersectionObserver(0.15);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.bottom < viewportHeight * 0.2) {
        setScrollProgress(100);
      } else if (rect.top > viewportHeight) {
        setScrollProgress(0);
      } else {
        const visible = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const total = rect.height;
        setScrollProgress(Math.round((visible / total) * 100));
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToItem = (index) => {
    itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const eventsWithYears = useMemo(() => {
    const result = [];
    SORTED_EVENTS.forEach((event, i) => {
      const year = getYear(event.date);
      const prevYear = i > 0 ? getYear(SORTED_EVENTS[i - 1].date) : null;
      if (year !== prevYear) result.push({ type: 'year', year });
      result.push({ type: 'event', event, index: i });
    });
    return result;
  }, []);

  const schemaEvents = useMemo(
    () =>
      HISTORY_EVENTS.map((e) => ({
        '@type': 'Event',
        name: t(e.descKey),
        startDate: e.date.replace('.', '-') + '-01',
      })),
    [t]
  );

  return (
    <div className="history" ref={containerRef}>
      <Helmet>
        <title>{t('meta.historyTitle')}</title>
        <meta name="description" content={t('meta.historyDesc')} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: t('footer.title'),
            event: schemaEvents,
          })}
        </script>
      </Helmet>

      <div className="history-scroll-indicator" role="progressbar" aria-valuenow={scrollProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Timeline progress">
        <div className="history-scroll-indicator-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="history-header">
        <h1 className="history-title">{t('history.title')}</h1>
        <nav className="history-nav" aria-label="Timeline dates">
          {SORTED_EVENTS.map((event, i) => (
            <button
              key={event.id}
              type="button"
              className="history-nav-btn"
              onClick={() => scrollToItem(i)}
            >
              {event.date}
            </button>
          ))}
        </nav>
      </div>

      <div className="history-timeline" ref={timelineRef} role="list" aria-label={t('history.title')}>
        <div className="history-line" aria-hidden />
        {eventsWithYears.map((item, i) =>
          item.type === 'year' ? (
            <YearLabel key={`year-${item.year}`} year={item.year} isVisible={isVisible} />
          ) : (
            <TimelineItem
              key={item.event.id}
              event={item.event}
              index={item.index}
              isVisible={isVisible}
              t={t}
              onImageClick={setLightboxSrc}
              itemRef={(el) => (itemRefs.current[item.index] = el)}
            />
          )
        )}
      </div>

      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} closeLabel={t('history.closeLightbox')} />
      )}
    </div>
  );
};

export default History;
