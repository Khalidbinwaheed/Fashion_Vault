export const getAssetPath = (path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const basePath = process.env.NODE_ENV === 'production' ? '/Fashion_Vault' : '';
  return `${basePath}${cleanPath}`;
};
