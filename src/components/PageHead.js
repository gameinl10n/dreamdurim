import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/** 페이지 제목·메타 설명 공통 컴포넌트 */
export default function PageHead({ titleKey = 'meta.siteTitle', descKey }) {
  const { t } = useTranslation();
  return (
    <Helmet>
      <title>{t(titleKey)}</title>
      {descKey && <meta name="description" content={t(descKey)} />}
    </Helmet>
  );
}
