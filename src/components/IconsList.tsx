import type { FontAwesomeIcon, FontAwesomeTheme } from '@/types/components/fa';

import { useDeferredValue, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';

import { IconsBrowser } from '@/components/IconsBrowser';
import { BadgeCounter } from '@/components/ui/badge/BadgeCounter';
import { FA } from '@/components/ui/icon/FA';
import { FA_BROWSE_URL, FA_ICONS, FA_THEME_IP_MAP, FA_THEMES } from '@/components/ui/icon/fa.config';
import { copyAsPlainText } from '@/lib/clipboard';

type Props = {
  theme?: FontAwesomeTheme;
};

type GridItemProps = {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: { filteredIcons: FontAwesomeIcon[]; activeTheme: FontAwesomeTheme };
};

export const IconsList: RC<Props> = ({ theme }) => {
  const [activeTheme, setActiveTheme] = useState<FontAwesomeTheme>(theme || FA_THEMES[0]);
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const filteredIcons = FA_ICONS.filter((icon) => icon.toLowerCase().includes(deferredSearch.toLowerCase()));

  const resetFilters = () => {
    setSearch('');
  };

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const ICON_SIZE = 80; // px
  const GAP = 8; // px

  useLayoutEffect(() => {
    function updateWidth() {
      if (gridRef.current) {
        setGridWidth(gridRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (theme && FA_THEMES.includes(theme)) {
      setActiveTheme(theme);
    }
  }, [theme]);

  const columnCount = Math.max(1, Math.floor(gridWidth / (ICON_SIZE + GAP)));
  const rowCount = Math.ceil(filteredIcons.length / columnCount);

  const getIconFromTarget = (e: React.MouseEvent): string | null => {
    // Use event delegation to find the closest element with data-icon
    const target = e.target as HTMLDivElement;
    const card = target.closest('[data-icon]');
    if (!(card instanceof HTMLElement)) return null;
    return card.getAttribute('data-icon');
  };

  return (
    <>
      <IconsBrowser onThemeChange={setActiveTheme} theme={activeTheme} onSearch={setSearch} search={search} onReset={resetFilters} />

      <div key={activeTheme} className="text-2xl">
        <h2 className="mb-4 text-lg font-semibold">
          {search || 'All'} <BadgeCounter count={filteredIcons} overflowCount={5000} />
        </h2>
        <p className="my-2 text-xs text-slate-500">
          Click on an icon to copy its name to clipboard. Double click to open it on FontAwesome.com.
        </p>
        <div
          ref={gridRef}
          style={{ width: '100%', height: '70vh' }}
          onClick={(e) => {
            copyAsPlainText(getIconFromTarget(e));
          }}
          onDoubleClick={(e) => {
            const icon = getIconFromTarget(e);
            if (!icon) return;
            // Open FontAwesome search page with the icon name
            window.open(`${FA_BROWSE_URL}q=${icon.replace(/^fa-/gim, '')}&ip=${FA_THEME_IP_MAP[activeTheme]}`, '_blank', 'noopener');
          }}
        >
          {gridWidth > 0 && (
            <Grid
              columnCount={columnCount}
              rowCount={rowCount}
              columnWidth={ICON_SIZE + GAP}
              rowHeight={ICON_SIZE + GAP}
              width={gridWidth}
              height={window.innerHeight * 0.8}
              itemData={{ filteredIcons, activeTheme }}
              style={{ overflowX: 'hidden' }}
            >
              {({ columnIndex, rowIndex, style, data }: GridItemProps) => {
                const { filteredIcons, activeTheme } = data;
                const index = rowIndex * columnCount + columnIndex;
                if (index >= filteredIcons.length) return null;
                const icon = filteredIcons[index];
                return (
                  <div style={{ ...style, padding: GAP / 2, boxSizing: 'border-box' }} key={`${activeTheme}-${icon}`}>
                    <div
                      className="flex cursor-pointer flex-col items-center gap-2 overflow-clip rounded-md border border-slate-200 p-2 leading-1"
                      style={{ width: ICON_SIZE, height: ICON_SIZE }}
                      data-icon={icon}
                    >
                      <FA icon={icon} theme={activeTheme} color="primary" />
                      <span className="text-xs leading-3 break-all">{icon.replace(/^fa-/, '').replace('-', ' ')}</span>
                    </div>
                  </div>
                );
              }}
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};
