import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import type { FontAwesomeIcon, FontAwesomeTheme } from '@/types/components/fa';

import { Tooltip } from 'antd';

import { cn } from '@/lib/utils/cn';

export interface FontAwesomeIconProps {
  className?: string;
  theme?: FontAwesomeTheme;
  // @see https://fontawesome.com/v5.15/icons?d=gallery
  icon: FontAwesomeIcon;
  color?: string;
  text?: React.ReactNode | string | number;
  prefix?: React.ReactNode | string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  tooltip?: ReactNode | string;
  style?: CSSProperties;
  spin?: boolean;
}

/**
 * FontAwesomeIcon
 * @see https://fontawesome.com/v7/icons?d=gallery
 */

export const FA: FC<FontAwesomeIconProps> = ({ className = '', theme = 'fal', icon, color, onClick, style, spin, ...props }) => {
  // Wrapper component for conditional tooltip
  const Wrapper: FC<{ children: ReactNode }> = ({ children }) =>
    props.tooltip ? <Tooltip title={props.tooltip}>{children}</Tooltip> : <>{children}</>;

  return (
    <Wrapper>
      <span data-icon={icon} className={cn(className, !!onClick && 'cursor-pointer')} style={style} onClick={onClick}>
        {props.prefix}{' '}
        <i
          style={{ color: !style?.color?.match(/^#/gm) && color ? `var(--color-${color})` : color || '' }}
          className={cn(theme, spin && 'fa-spin', icon, 'icon')}
        />
        {!!props.text && <span className="ml-2">{props.text}</span>}
      </span>
    </Wrapper>
  );
};
