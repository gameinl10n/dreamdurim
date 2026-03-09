/** public 기준 이미지 경로 반환 */
export const getImagePath = (path) => `${process.env.PUBLIC_URL || ''}${path}`;
