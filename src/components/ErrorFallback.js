import { useTranslation } from 'react-i18next';

export default function ErrorFallback({ onRetry }) {
  const { t } = useTranslation();
  return (
    <main className="main-content" role="main">
      <div
        className="error-fallback"
        role="alert"
        style={{
          padding: '2rem',
          textAlign: 'center',
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>{t('error.title')}</h1>
        <p>{t('error.description')}</p>
        <button type="button" onClick={onRetry} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          {t('error.retry')}
        </button>
      </div>
    </main>
  );
}
