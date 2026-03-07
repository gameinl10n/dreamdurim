import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import GalleryItem from './GalleryItem';
import './Gallery.css';

// 활동 데이터를 컴포넌트 외부로 이동하여 매 렌더링마다 재생성 방지
const ORIGINAL_ACTIVITIES = [
    {
      id: 1,
      title: '활동1',
      description: '여기다가 영어 설명 혹은 날짜?? 날짜를 하나 더 만들까',
      image: '/images/work7.jpg',
      width: 280,
      height: 420
    },
    {
      id: 2,
      title: '활동2',
      description: '여기다가 영어 설명 혹은 날짜?? 날짜를 하나 더 만들까',
      image: '/images/work2.jpg',
      width: 320,
      height: 480
    },
    {
      id: 3,
      title: '활동3',
      description: '여기다가 영어 설명 혹은 날짜?? 날짜를 하나 더 만들까',
      image: '/images/work1.jpg',
      width: 300,
      height: 450
    },
    {
      id: 4,
      title: '활동4',
      description: '여기다가 영어 설명 혹은 날짜?? 날짜를 하나 더 만들까',
      image: '/images/work2.jpg',
      width: 350,
      height: 525
    },
    {
      id: 5,
      title: '활동5',
      description: '여기다가 영어 설명 혹은 날짜?? 날짜를 하나 더 만들까',
      image: '/images/work3.jpg',
      width: 290,
      height: 435
    },
    {
      id: 6,
      title: '활동6',
      description: '여기다가 영어 설명 혹은 날짜?? 날짜를 하나 더 만들까',
      image: '/images/work4.jpg',
      width: 310,
      height: 465
  }
];

const Gallery = () => {
  const galleryRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 무한 스크롤을 위해 활동 배열을 3번 복제 (메모이제이션)
  const activities = useMemo(() => [...ORIGINAL_ACTIVITIES, ...ORIGINAL_ACTIVITIES, ...ORIGINAL_ACTIVITIES], []);

  // 페이드 인 효과
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 무한 스크롤 구현을 위한 스크롤 감지
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    // 초기 위치를 중간 세트로 설정 (이미지 로드 후)
    const initScroll = () => {
      const oneSetWidth = gallery.scrollWidth / 3;
      if (oneSetWidth > 0) {
        gallery.scrollLeft = oneSetWidth;
      }
    };

    // 이미지 로드 완료 후 초기화
    const initTimer = setTimeout(initScroll, 100);
    
    // 윈도우 리사이즈 시에도 재계산 (throttle 적용)
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initScroll, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let isScrolling = false;

    const handleScroll = () => {
      if (isScrolling) return;
      
      const scrollWidth = gallery.scrollWidth;
      const scrollLeft = gallery.scrollLeft;
      const oneSetWidth = scrollWidth / 3;

      if (oneSetWidth === 0) return;

      // 오른쪽 끝에 도달하면 중간 세트로 이동
      if (scrollLeft >= oneSetWidth * 2 - 100) {
        isScrolling = true;
        const offset = scrollLeft - oneSetWidth * 2;
        gallery.scrollLeft = oneSetWidth + offset;
        setTimeout(() => { isScrolling = false; }, 50);
      }
      // 왼쪽 끝에 도달하면 중간 세트로 이동
      else if (scrollLeft <= 100) {
        isScrolling = true;
        const offset = scrollLeft;
        gallery.scrollLeft = oneSetWidth * 2 + offset;
        setTimeout(() => { isScrolling = false; }, 50);
      }
    };

    gallery.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      gallery.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (!galleryRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
    galleryRef.current.style.cursor = 'grabbing';
    e.preventDefault();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    if (galleryRef.current) {
      galleryRef.current.style.cursor = 'grab';
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (galleryRef.current) {
      galleryRef.current.style.cursor = 'grab';
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !galleryRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  // 휠 이벤트로 가로 스크롤 (Shift 키가 눌렸을 때만)
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleWheel = (e) => {
      // Shift 키가 눌려있을 때만 가로 스크롤
      if (e.shiftKey && e.deltaY !== 0) {
        e.preventDefault();
        gallery.scrollBy({
          left: e.deltaY * 0.8,
          behavior: 'auto'
        });
      }
      // Shift 키가 없으면 기본 세로 스크롤 허용
    };

    gallery.addEventListener('wheel', handleWheel, { passive: false });
    return () => gallery.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className={`gallery-container ${isVisible ? 'fade-in' : ''}`}>
      <div
        ref={galleryRef}
        className={`gallery ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {activities.map((activity, index) => (
          <GalleryItem key={`${activity.id}-${index}`} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

