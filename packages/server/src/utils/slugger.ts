import s from 'slugify';
import speakingurl from 'speakingurl';

export const parse = text => encodeURI(text);
export const unparse = text => decodeURI(text);
export const slugify = (raw: string) => speakingurl(raw);
