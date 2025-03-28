import 'server-only';

type Dictionary = {
  [key: string]: any;
};

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('../../../locales/en/common.json').then(module => module.default),
  ar: () => import('../../../locales/ar/common.json').then(module => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  return (dictionaries[locale] || dictionaries.en)();
};