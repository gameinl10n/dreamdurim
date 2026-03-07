import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import './History.css';

const History = () => {
  const { t } = useTranslation();
  return (
    <div className="history-container">
      <Helmet>
        <title>HISTORY | DREAMDURIM</title>
        <meta name="description" content="DREAMDURIM 연혁" />
      </Helmet>
      <p className="history-placeholder">{t('history.updating')}</p>
    </div>
  );
};

export default History;
