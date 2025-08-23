import { Link } from 'react-router';

import { FA } from '@/components/ui/icon/FA';
import { FA_BROWSE_URL } from '@/components/ui/icon/fa.config';

interface Props {}

export const Navigation: FC<Props> = () => {
  return (
    <nav className="my-2">
      <ul className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
        <li>
          <Link to="/" className="hover:text-primary hover:underline">
            <FA icon="fa-home" theme="fajr" color="primary" text="Browse icons" />
          </Link>
        </li>
        <li>
          <Link to="/guide" className="hover:text-primary hover:underline">
            <FA icon="fa-info-circle" theme="fajr" color="primary" text="Integration guide" />
          </Link>
        </li>
        <li>
          <a href={FA_BROWSE_URL} target="_blank" rel="nofollow noopener">
            <FA icon="fa-external-link" theme="fajr" color="primary" text="Search icons on FontAwesome.com" />
          </a>
        </li>
      </ul>
    </nav>
  );
};
