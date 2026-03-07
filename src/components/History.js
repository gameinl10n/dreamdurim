import React, { useState, useEffect, useCallback } from 'react';
import './History.css';

const timelineData = [
  {
    year: 2022,
    events: [
      { month: 11, text: "무인카페머신 App. 연구개발 착수" },
      { month: 11, text: "'CAFEILBOON' 직영 7호점 오픈" },
      { month: 8, text: "제주도 지점 오픈(78호점)" },
      { month: 6, text: "Second Brand '카페인사계' 상표등록출원 및 가맹사업 착수" },
      { month: 2, text: "강원도 지점 오픈(27호점)" },
      { month: 1, text: "물류센터(위탁) 신설" }
    ]
  },
  {
    year: 2021,
    events: [
      { month: 7, text: "카페일분 커스텀 스페셜 원두 공급 개시" },
      { month: 7, text: "무인카페 창업반 강의(1기) 가맹사업으로 전개" },
      { month: 6, text: "'CAFEILBOON' 2호점 개업" },
      { month: 4, text: "개인 무인카페 'CAFEILBOON' 개업" }
    ]
  }
];

const History = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleImageError = useCallback((e) => {
    e.target.style.display = 'none';
  }, []);

  return (
    <div className={`history-container ${isVisible ? 'fade-in' : ''}`}>
      <div className="history-content">
        <div className="history-layout">
          {/* 왼쪽: 카페 이미지 */}
          <div className="history-image-section">
            <div className="history-image-placeholder">
              <img 
                src="/images/history-cafe.jpg" 
                alt="Cafe" 
                className="history-image"
                onError={handleImageError}
                loading="lazy"
              />
            </div>
          </div>

          {/* 오른쪽: 타임라인 */}
          <div className="history-timeline-section">
            <div className="timeline">
              {timelineData.map((yearData, yearIndex) => (
                <React.Fragment key={yearData.year}>
                  {/* 년도 */}
                  <div className="timeline-year-item">
                    <div className="timeline-year-marker"></div>
                    <div className="timeline-year-content">
                      <div className="timeline-year">{yearData.year}</div>
                    </div>
                  </div>

                  {/* 해당 년도의 이벤트들 */}
                  {yearData.events.map((event, eventIndex) => (
                    <div key={`${yearData.year}-${eventIndex}`} className={`timeline-event-item ${eventIndex % 2 === 0 ? 'event-left' : 'event-right'}`}>
                      <div className="timeline-event-marker"></div>
                      <div className="timeline-month-box">
                        <div className="timeline-event-month">{String(event.month).padStart(2, '0')}</div>
                        <div className="timeline-event-text">{event.text}</div>
                      </div>
                    </div>
                  ))}

                  {/* 년도 사이 연결선 (마지막 년도가 아닐 때) */}
                  {yearIndex < timelineData.length - 1 && (
                    <div className="timeline-connector"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

