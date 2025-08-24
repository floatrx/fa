import type { FontAwesomeTheme } from '@/types/components/fa';

import { Route, Routes } from 'react-router';

import { IconsList } from '@/components/IconsList';
import { IntegrationGuide } from '@/components/IntegrationGuide';
import { MainLayout } from '@/components/layout/MainLayout';
import { FA_THEMES } from '@/components/ui/icon/fa.config';

export function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<IconsList />} />
        <Route path="/guide" element={<IntegrationGuide />} />
        {FA_THEMES.map((theme: FontAwesomeTheme) => {
          return <Route key={theme} path={`/theme/${theme}`} element={<IconsList key={theme} theme={theme} />} />;
        })}
      </Routes>
    </MainLayout>
  );
}
