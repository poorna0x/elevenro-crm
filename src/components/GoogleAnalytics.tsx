import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  initGoogleAnalytics,
  isGoogleAnalyticsEnabled,
  trackGaPageView,
} from '@/lib/googleAnalytics';

/** GA4 for Eleven RO public pages. */
const GoogleAnalytics = () => {
  const location = useLocation();
  const enabled = isGoogleAnalyticsEnabled();

  useEffect(() => {
    if (!enabled) return;

    void initGoogleAnalytics().then((ready) => {
      if (ready) {
        trackGaPageView(location.pathname, location.search);
      }
    });
  }, [enabled, location.pathname, location.search]);

  return null;
};

export default GoogleAnalytics;
