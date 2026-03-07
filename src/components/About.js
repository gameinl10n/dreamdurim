import React from 'react';
import './About.css';

const ABOUT_SENIORS = [
  { id: 1, name: '현대그린푸드', logo: '/images/HYUNDAIGREENFOOD.png', description: '절강대학교 17학번 J선배님과 함께하고 있습니다' },
  { id: 2, name: 'HDKSOE', logo: '/images/HDKSOE.png', description: '절강대학교 16학번 H선배님과 함께하고 있습니다' },
  { id: 3, name: 'TEMU', logo: '/images/TEMU.jpg', description: '절강대학교 18학번 H선배님과 함께하고 있습니다' },
  { id: 4, name: 'CJ', logo: '/images/CJ.jpg', description: '절강대학교 19학번 N선배님과 함께하고 있습니다' },
  { id: 5, name: 'HUAQIN', logo: '/images/HUAQIN.png', description: '절강대학교 20학번 선배님과 함께하고 있습니다' },
  { id: 6, name: 'HYPERGRYPH', logo: '/images/HYPERGRYPH.jpg', description: '절강대학교 18학번 선배님과 함께하고 있습니다' },
];

const SCROLL_COPIES = 3;
const SCROLL_ITEMS = Array(SCROLL_COPIES)
  .fill(null)
  .flatMap((_, batch) =>
    ABOUT_SENIORS.map((item) => ({ ...item, key: `${batch}-${item.id}` }))
  );

const About = () => (
  <div className="about">
    <div className="about-hero">
      <h1 className="about-title">DREAMDURIM</h1>
      <p className="about-intro">유학생을 위한 비영리조직</p>
    </div>

    <section className="about-seniors">
      <div className="about-seniors-head">
        <h2 className="about-seniors-title">꿈드림과 함께해 주시는 선배님들</h2>
      </div>
      <div className="about-seniors-track">
        <div className="about-seniors-logos about-seniors-logos--scroll">
          {SCROLL_ITEMS.map((item) => (
            <div
              key={item.key}
              className={`about-logo-slot ${item.logo ? 'about-logo-slot--image' : ''}`}
              title={item.description}
            >
              {item.logo ? (
                <img src={item.logo} alt={item.name} />
              ) : (
                <span className="about-logo-placeholder">{item.name}</span>
              )}
              {item.description && (
                <span className="about-logo-tooltip">{item.description}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
