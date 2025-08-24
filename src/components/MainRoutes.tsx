import type { FontAwesomeTheme } from '@/types/components/fa';

import { Route, Routes } from 'react-router';

import { FA_THEMES } from '@/components/ui/icon/fa.config';
import { IconsBrowserPage } from '@/components/views/browser/IconsBrowserPage';
import { IntegrationGuidePage } from '@/components/views/guide/IntegrationGuidePage';

/**
 * Main application routes
 * Also render dynamic theme routes for different icon themes
 * @see IntegrationGuidePage
 * @see IconsBrowserPage
 * @constructor
 */
export const MainRoutes: RC = () => (
  <Routes>
    <Route path="/" element={<IconsBrowserPage />} />
    <Route path="/guide" element={<IntegrationGuidePage />} />
    {FA_THEMES.map((theme: FontAwesomeTheme) => (
      <Route key={theme} path={`/theme/${theme}`} element={<IconsBrowserPage key={theme} theme={theme} />} />
    ))}
  </Routes>
);
