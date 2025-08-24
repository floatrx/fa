import type { ChangeEvent } from 'react';
import type { FontAwesomeTheme } from '@/types/components/fa';

import { Input, Select } from 'antd';
import { useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { FA_THEME_TITLE_MAP, FA_THEMES } from '@/components/ui/icon/fa.config';

interface Props {
  theme: FontAwesomeTheme;
  onThemeChange?: (theme: FontAwesomeTheme) => void;
  onReset?: () => void;
  onSearch?: (search: string) => void;
  search?: string;
}

export const IconFilters: FC<Props> = ({ search, onSearch, theme, onThemeChange, onReset }) => {
  const [activeTheme, setActiveTheme] = useState<FontAwesomeTheme>(theme);

  const handleThemeChange = (value: FontAwesomeTheme) => {
    setActiveTheme(value);
    onThemeChange?.(value);
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => onSearch?.(e.target.value);

  // Performant search with debounce
  const debouncedSearch = useDebounceCallback(handleFilter, 500);

  return (
    <div className="flex gap-2">
      <Select
        prefix={<span className="text-primary font-semibold">Theme:</span>}
        options={FA_THEMES.map((theme) => ({
          label: `${FA_THEME_TITLE_MAP[theme]} / ${theme}`,
          value: theme,
        }))}
        value={activeTheme}
        onChange={handleThemeChange}
      />
      <Input.Search
        autoFocus
        defaultValue={search}
        onClear={onReset}
        onChange={debouncedSearch}
        placeholder="Search icons..."
        allowClear
        className="mb-4"
      />
    </div>
  );
};
