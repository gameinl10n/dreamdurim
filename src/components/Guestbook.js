import React, { useState, useEffect, useCallback } from 'react';
import './Guestbook.css';

const INITIAL_COMMENTS = [
  {
    id: 1,
    name: '김홍길동',
    message: '비밀글입니다.',
    isPrivate: true,
    timestamp: new Date().toISOString(),
    timeAgo: '방금 전'
  },
  {
    id: 2,
    name: '김박길동',
    message: '수업 후기 좋았어염~~ 깔깔',
    isPrivate: false,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    timeAgo: '1일 전'
  }
];

const Guestbook = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 로컬 스토리지에서 댓글 불러오기
  useEffect(() => {
    const savedComments = localStorage.getItem('guestbookComments');
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (error) {
        console.error('Failed to parse comments from localStorage:', error);
        setComments(INITIAL_COMMENTS);
      }
    } else {
      setComments(INITIAL_COMMENTS);
    }
  }, []);

  const formatTimeAgo = useCallback((timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffMs = now - commentDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 30) return `${diffDays}일 전`;
    
    return commentDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace(/\.$/, '');
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      // 더 나은 UX를 위해 alert 대신 사용 가능하지만, 현재는 간단하게 유지
      return;
    }

    const newComment = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      isPrivate,
      password: isPrivate ? password : '',
      timestamp: new Date().toISOString(),
      timeAgo: '방금 전'
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('guestbookComments', JSON.stringify(updatedComments));

    // 폼 초기화
    setName('');
    setMessage('');
    setIsPrivate(false);
    setPassword('');
  }, [comments, isPrivate, name, message, password]);

  return (
    <div className={`guestbook-container ${isVisible ? 'fade-in' : ''}`}>
      <div className="guestbook-content">
        <h1 className="guestbook-title">GUEST BOOK</h1>
        <p className="guestbook-subtitle">
          여기다가 학생들 후기...? DB 연결 해야할까...
        </p>
        <div className="guestbook-divider"></div>

        <form className="guestbook-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-row">
            <textarea
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-textarea"
              rows="4"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <span>비밀글</span>
            </label>
            {isPrivate && (
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input form-input-small"
              />
            )}
          </div>
          <button type="submit" className="form-submit">
            등록
          </button>
        </form>

        <div className="guestbook-comments">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-name">{comment.name}</span>
                <span className="comment-time">
                  {comment.isPrivate && <span className="lock-icon">🔒</span>}
                  {comment.isPrivate ? '비밀글입니다.' : comment.message}
                </span>
              </div>
              <div className="comment-footer">
                <span className="comment-timestamp">
                  {formatTimeAgo(comment.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guestbook;

