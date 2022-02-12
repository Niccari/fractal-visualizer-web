export const radian2degree = (radian: number): number => {
  return (radian * 180) / Math.PI;
};

export const degree2radian = (radian: number): number => {
  return (radian * Math.PI) / 180;
};
