import type { FontAwesomeBrandIcon, FontAwesomeBrandTheme, FontAwesomeIcon, FontAwesomeTheme } from '@/types/components/fa';

import { FA, type FontAwesomeIconProps } from '@/components/ui/icon/FA';

interface Props extends Omit<FontAwesomeIconProps, 'theme' | 'icon'> {
  theme?: FontAwesomeBrandTheme;
  icon: FontAwesomeBrandIcon;
}

/**
 * FontAwesome Brand Icons (FAB)
 * This component is also compatible with FA, but suggested to use for brand icons only
 * That's why we use "as" casting for theme and icon props
 * If you don't need brand icons in your project, you can remove this component and all related code (styles, themes, types)
 * @see https://fontawesome.com/icons/packs/brands
 * @param theme - default 'fab'
 * @param icon - brand icon name
 * @param props - other props compatible with FA component
 * @constructor
 */
export const FB: RC<Props> = ({ theme = 'fab', icon, ...props }) => (
  <FA theme={theme as FontAwesomeTheme} icon={icon as FontAwesomeIcon} {...props} />
);
