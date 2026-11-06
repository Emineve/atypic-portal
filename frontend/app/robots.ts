import { SITE_URL } from '../lib/site';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/go/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
