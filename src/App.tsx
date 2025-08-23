import type { FontAwesomeIcon, FontAwesomeThemes } from '@/types/components/fa';

import { Button, Input, Select } from 'antd';
import React, { type ChangeEvent, useDeferredValue, useLayoutEffect, useRef, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { useDebounceCallback } from 'usehooks-ts';

import { BadgeCounter } from '@/components/ui/badge/BadgeCounter';
import { FA } from '@/components/ui/icon/FA';
import { FA_ICONS, FA_THEME_TITLE_MAP, FA_THEMES } from '@/components/ui/icon/fa.config';
import { copyAsPlainText } from '@/lib/clipboard';

export function App() {
  const [activeTheme, setActiveTheme] = useState<FontAwesomeThemes>(FA_THEMES[0]);
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const filteredIcons = FA_ICONS.filter((icon) => icon.toLowerCase().includes(deferredSearch.toLowerCase()));

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const debouncedSearch = useDebounceCallback(handleFilter, 500);

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

  const columnCount = Math.max(1, Math.floor(gridWidth / (ICON_SIZE + GAP)));
  const rowCount = Math.ceil(filteredIcons.length / columnCount);

  return (
    <div className="p-3 text-3xl">
      <h1 className="mb-2 flex justify-between text-3xl font-semibold">
        <span>Fontawesome 7 Pro</span>
        <Button shape="circle" onClick={resetFilters}>
          <FA icon={search ? 'fa-filter-slash' : 'fa-filter'} />
        </Button>
      </h1>
      <div className="flex gap-2">
        <Select
          prefix="Theme:"
          options={FA_THEMES.map((theme) => ({ label: `${FA_THEME_TITLE_MAP[theme]} / ${theme}`, value: theme }))}
          value={activeTheme}
          onChange={setActiveTheme}
        />
        <Input.Search
          autoFocus
          defaultValue={search}
          onChange={debouncedSearch}
          placeholder="Search icons..."
          allowClear
          className="mb-4"
        />
      </div>
      <div key={activeTheme}>
        <h2 className="mb-4 text-lg font-semibold">
          {search || 'All'} <BadgeCounter count={filteredIcons} overflowCount={5000} />
        </h2>
        <div ref={gridRef} style={{ width: '100%', height: '70vh' }}>
          {gridWidth > 0 && (
            <Grid
              columnCount={columnCount}
              rowCount={rowCount}
              columnWidth={ICON_SIZE + GAP}
              rowHeight={ICON_SIZE + GAP}
              width={gridWidth}
              height={window.innerHeight * 0.85}
              itemData={{ filteredIcons, activeTheme }}
              style={{ overflowX: 'hidden' }}
            >
              {({
                columnIndex,
                rowIndex,
                style,
                data,
              }: {
                columnIndex: number;
                rowIndex: number;
                style: React.CSSProperties;
                data: { filteredIcons: FontAwesomeIcon[]; activeTheme: FontAwesomeThemes };
              }) => {
                const { filteredIcons, activeTheme } = data;
                const index = rowIndex * columnCount + columnIndex;
                if (index >= filteredIcons.length) return null;
                const icon = filteredIcons[index];
                return (
                  <div style={{ ...style, padding: GAP / 2, boxSizing: 'border-box' }} key={`${activeTheme}-${icon}`}>
                    <div
                      className="flex cursor-pointer flex-col items-center rounded-md border border-slate-200"
                      style={{ width: ICON_SIZE, height: ICON_SIZE }}
                      data-icon={icon}
                      onClick={() => copyAsPlainText(icon)}
                    >
                      <FA icon={icon} theme={activeTheme} />
                      <span className="text-xs break-all">{icon.replace(/^fa-/, '').replace('-', ' ')}</span>
                    </div>
                  </div>
                );
              }}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}
