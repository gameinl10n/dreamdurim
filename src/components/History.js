import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Helmet } from 'react-helmet-async';
import PageHead from './PageHead';
import { getImagePath } from '../utils/assets';
import { HISTORY_EVENTS } from '../data/historyData';
import './History.css';

const SORTED_EVENTS = [...HISTORY_EVENTS].reverse();

const extractYear = (dateStr) => dateStr.split('.')[0];

const getDesc = (event, lang, key = 'desc') => {
  const obj = event[key];
  return (obj && (obj[lang] || obj.ko)) || '';
};

const TimelineItem = ({ event, index, isVisible, isActive, descText, longDescText, t, itemRef }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [imgRetry, setImgRetry] = useState(0);
  const isLeft = index % 2 === 0;
  const baseSrc = event.image ? getImagePath(event.image) : null;
  const imageSrc =
    baseSrc && imgRetry > 0 ? `${baseSrc}${baseSrc.includes('?') ? '&' : '?'}_=${imgRetry}` : baseSrc;
  const showImage = baseSrc && !imageError;
  const hasLongDesc = Boolean(longDescText);

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
    setImgRetry(0);
  }, [event.id]);

  const handleImgError = () => {
    if (imgRetry === 0) {
      setImgRetry(1);
      setImageLoaded(false);
    } else {
      setImageError(true);
    }
  };

  const content = (
    <div
      className="history-item-content"
      role="article"
      aria-labelledby={`history-date-${event.id}`}
    >
      {showImage && (
        <div className="history-item-image-wrap">
          {!imageLoaded && <div className="history-item-image-skeleton" aria-hidden />}
          <img
            src={imageSrc}
            alt=""
            className={`history-item-image ${imageLoaded ? 'history-item-image--loaded' : ''}`}
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={handleImgError}
          />
        </div>
      )}
      <div className="history-item-body">
        <time id={`history-date-${event.id}`} className="history-item-date" dateTime={event.date.replace('.', '-')}>
          {event.date}
        </time>
        <p className="history-item-desc">{descText}</p>
        {event.url && (
          <a href={event.url} target="_blank" rel="noopener noreferrer" className="history-item-link">
            {t('common.openInNewWindow')}
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
            {expanded && <p className="history-item-long-desc">{longDescText}</p>}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={itemRef}
      className={`history-item history-item--${isLeft ? 'left' : 'right'} ${isVisible ? 'history-item--visible' : ''} ${isActive ? 'history-item--active' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 0.12}s` : '0s' }}
      role="listitem"
    >
      <div className={`history-item-slot history-item-slot--content ${isLeft ? '' : 'history-item-slot--empty'}`}>
        {isLeft && content}
      </div>
      <div className="history-item-marker" aria-hidden>
        <div className={`history-item-dot ${isActive ? 'history-item-dot--active' : ''}`} />
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

const History = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'ko').split('-')[0];
  const [containerRef, isVisible] = useIntersectionObserver(0.15);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedYear, setSelectedYear] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  const timelineItems = useMemo(() => {
    const result = [];
    SORTED_EVENTS.forEach((event, i) => {
      const year = extractYear(event.date);
      const prevYear = i > 0 ? extractYear(SORTED_EVENTS[i - 1].date) : null;
      if (year !== prevYear) result.push({ type: 'year', year });
      result.push({ type: 'event', event, index: i, displayIndex: i });
    });
    return result;
  }, []);

  const filteredTimelineItems = useMemo(() => {
    if (!selectedYear) return null;
    const result = [];
    let eventIndex = -1;
    SORTED_EVENTS.forEach((event, i) => {
      const year = extractYear(event.date);
      if (year !== selectedYear) return;
      const prevYear = i > 0 ? extractYear(SORTED_EVENTS[i - 1].date) : null;
      if (year !== prevYear) result.push({ type: 'year', year });
      eventIndex++;
      result.push({ type: 'event', event, index: i, displayIndex: eventIndex });
    });
    return result;
  }, [selectedYear]);

  const displayItems = filteredTimelineItems ?? timelineItems;

  const yearNavItems = useMemo(() => {
    const seen = new Set();
    const items = [{ year: null, firstIndex: 0, label: t('history.filterAll') }];
    SORTED_EVENTS.forEach((event, i) => {
      const year = extractYear(event.date);
      if (!seen.has(year)) {
        seen.add(year);
        items.push({ year, firstIndex: i, label: year });
      }
    });
    return items;
  }, [t]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const el = timelineRef.current;
        const refs = itemRefs.current;
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight * 0.5;
        let closestIndex = -1;
        let closestDist = Infinity;
        refs.forEach((ref, idx) => {
          if (!ref) return;
          const rect = ref.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const dist = Math.abs(centerY - viewportCenter);
          if (dist < closestDist && rect.top < viewportHeight && rect.bottom > 0) {
            closestDist = dist;
            closestIndex = idx;
          }
        });
        setActiveIndex(closestIndex);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < viewportHeight * 0.2) {
            setScrollProgress(100);
          } else if (rect.top > viewportHeight) {
            setScrollProgress(0);
          } else {
            const visible = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const total = rect.height;
            setScrollProgress(Math.round((visible / total) * 100));
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToItem = (index) => {
    itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleFilterClick = (year, firstIndex) => {
    setSelectedYear(year);
    if (year) {
      setTimeout(() => scrollToItem(firstIndex), 0);
    }
  };

  const schemaEvents = useMemo(
    () =>
      HISTORY_EVENTS.map((e) => ({
        '@type': 'Event',
        name: getDesc(e, lang),
        startDate: e.date.replace('.', '-') + '-01',
      })),
    [lang]
  );

  return (
    <div className="history" ref={containerRef}>
      <PageHead descKey="meta.historyDesc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: t('footer.title'),
            event: schemaEvents,
          })}
        </script>
      </Helmet>

      <div className="history-scroll-indicator" role="progressbar" aria-valuenow={scrollProgress} aria-valuemin={0} aria-valuemax={100} aria-label={t('history.timelineProgress')}>
        <div className="history-scroll-indicator-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="history-header">
        <nav className="history-nav" aria-label={t('history.timelineByYear')}>
          {yearNavItems.map(({ year, firstIndex, label }) => (
            <button
              key={year ?? 'all'}
              type="button"
              className={`history-nav-btn ${selectedYear === year ? 'history-nav-btn--active' : ''}`}
              onClick={() => handleFilterClick(year, firstIndex)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="history-timeline" ref={timelineRef} role="list" aria-label={t('history.title')}>
        <div className="history-line" aria-hidden />
        {displayItems.map((item, i) =>
          item.type === 'year' ? (
            <YearLabel key={`year-${item.year}`} year={item.year} isVisible={isVisible} />
          ) : (
            <TimelineItem
              key={item.event.id}
              event={item.event}
              index={item.displayIndex}
              isVisible={isVisible}
              isActive={activeIndex === item.index}
              descText={getDesc(item.event, lang)}
              longDescText={getDesc(item.event, lang, 'longDesc')}
              t={t}
              itemRef={(el) => (itemRefs.current[item.index] = el)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default History;
