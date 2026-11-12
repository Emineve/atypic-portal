import { SITE_URL } from '../lib/site';

// Pages réservées, jamais proposées aux robots
const PRIVATE = ['/admin', '/go/', '/espace-agence/'];

// Robots des assistants IA (ChatGPT, Claude, Gemini, Perplexity…) : explicitement autorisés
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot-Extended',
  'CCBot',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: AI_BOTS, allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
