import type { BadgeProps } from 'antd/lib/badge';

import { Badge } from 'antd';

import { cn } from '@/lib/utils/cn';

export interface BadgeCounterProps extends BadgeProps {
  text?: string;
  count: number | undefined | Array<any>;
  type?: 'primary' | 'danger' | 'success' | 'info' | 'warning' | 'default';
}

export const BadgeCounter: FC<BadgeCounterProps> = ({ text, className, type = 'default', count, ...props }) => {
  const countValue = Array.isArray(count) ? count.length : count;
  return (
    <>
      {text && <span className="pr-1">{text}</span>}
      <Badge
        overflowCount={1000}
        style={{ backgroundColor: type === 'default' ? 'var(--color-slate-400)' : `var(--color-${type})` }}
        className={cn(type, className)}
        count={countValue}
        {...props}
      />
    </>
  );
};
