import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  initGoogleAnalytics,
  trackGoogleAnalyticsPageView,
} from '@/lib/googleAnalytics';

/** GA4 page views for public marketing routes only (SPA). */
export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    trackGoogleAnalyticsPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
}
