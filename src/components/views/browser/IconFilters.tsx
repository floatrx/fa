import type { ChangeEvent } from 'react';
import type { FontAwesomeTheme } from '@/types/components/fa';

import { Input, Select } from 'antd';
import { useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { FA } from '@/components/ui/icon/FA';
import { FA_INCOMPLETE_PACKS, FA_THEME_TITLE_MAP, FA_THEMES } from '@/components/ui/icon/fa.config';

interface Props {
  theme: FontAwesomeTheme;
  onThemeChange?: (theme: FontAwesomeTheme) => void;
  onReset?: () => void;
  onSearch?: (search: string) => void;
  search?: string;
}

/**
 * Icon filters component
 * @param search - initial search value
 * @param onSearch - search change handler
 * @param theme - selected theme
 * @param onThemeChange - theme change handler
 * @param onReset - reset filters handler
 * @constructor
 */
export const IconFilters: FC<Props> = ({ search, onSearch, theme, onThemeChange, onReset }) => {
  const [activeTheme, setActiveTheme] = useState<FontAwesomeTheme>(theme);

  const handleThemeChange = (value: FontAwesomeTheme) => {
    setActiveTheme(value);
    onThemeChange?.(value);
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => onSearch?.(e.target.value);

  // Performant search with debounce
  const debouncedSearch = useDebounceCallback(handleFilter, 500);

  const themeSelectOptions = FA_THEMES.map((theme) => ({
    label: `${FA_THEME_TITLE_MAP[theme]} / ${theme}`,
    value: theme,
  }));

  return (
    <div className="flex gap-2">
      <Select
        className="w-[300px] flex-auto"
        showSearch
        prefix={<span className="text-primary font-semibold">Theme:</span>}
        options={themeSelectOptions}
        value={activeTheme}
        onChange={handleThemeChange}
        optionFilterProp="label"
        suffixIcon={
          // Incomplete pack warning icon
          FA_INCOMPLETE_PACKS.includes(theme) && (
            <FA tooltip="Incomplete icon pack" icon="fa-exclamation-triangle" theme="fad" color="danger" text="Incomplete pack" />
          )
        }
        // Render options with icons
        optionRender={({ value, label }) => (
          <FA icon={value === 'fab' ? 'fa-font-awesome' : 'fa-home'} theme={value as FontAwesomeTheme} color="primary" text={label} />
        )}
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
