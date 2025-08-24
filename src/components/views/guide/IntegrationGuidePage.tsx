import { Link } from 'react-router';

import { BadgeCounter } from '@/components/ui/badge/BadgeCounter';
import { FA } from '@/components/ui/icon/FA';
import { FA_THEME_TITLE_MAP, FA_THEMES } from '@/components/ui/icon/fa.config';
import { FB } from '@/components/ui/icon/FB';

/**
 * Integration guide page
 * Step by step instructions to integrate FontAwesome icons pack in your project
 * @see MainRoutes
 * @constructor
 */
export const IntegrationGuidePage: RC = () => {
  return (
    <>
      <h1 className="my-2 text-lg font-semibold">Integration guide</h1>
      <div className="guide space-y-2">
        <FB
          className="mb-2 block font-semibold"
          icon="fa-square-font-awesome"
          color="primary"
          text="Fontawesome icons pack is React typesafe solution."
        />

        <ol>
          <li>
            Clone repo from{' '}
            <a
              className="text-primary font-semibold underline"
              href="https://github.com/floatrx/fa"
              target="_blank"
              rel="nofollow noopener"
            >
              <FA icon="fa-external-link" theme="fad" text="https://github.com/floatrx/fa" />
            </a>
          </li>
          <li>
            Copy icon fonts <pre>./public/webfonts/fa/*</pre> to your public folder
          </li>
          <li>
            Copy <pre>./src/styles/fa/*</pre> to your styles
          </li>
          <li>
            add <pre>import './src/styles/fa/fontawesome.css';</pre> to your main.tsx
          </li>
          <li>
            configure imports in <pre>./src/styles/fa/fontawesome.css</pre> and leave only needed themes
          </li>
          <li>
            copy config and types from <pre>./src/components/ui/icon/*</pre> to your project
          </li>
          <li>
            copy types from <pre>./src/types/components/fa.ts</pre> to your project
          </li>
          <li>
            use icons in your code according to the example below:
            <br />
            <pre className="my-2 rounded bg-slate-100 p-2 text-sm">{`<FA icon="fa-home" theme="fas" />`}</pre>
            Refactor component if needed.
          </li>
          <li>If you don't need brand icons - remove all related code and themes from config, styles and types.</li>
        </ol>

        <p className="text-danger inline-block rounded-md border border-pink-100 bg-pink-50 p-2 font-semibold">
          <FA icon="fa-exclamation-circle" theme="fad" text="NOTE:" color="danger" />
          Some themes do not support the full icon pack (incomplete pack) and may render default glyphs for unavailable icons (e.g.{' '}
          <FA icon="fa-home" theme="fab" /> <FA icon="fa-analytics" theme="fajr" />
          <FA icon="fa-album-collection-circle-plus" theme="faes" />
          ).
        </p>

        <h2 className="font-semibold">
          Available Themes <BadgeCounter count={FA_THEMES.length} />
        </h2>
        <div className="grid-auto-fill grid-xxs flex-wrap gap-4">
          {FA_THEMES.map((theme) => (
            <Link to={`/theme/${theme}`} key={theme} className="inline-block">
              <div className="flex flex-col items-center gap-2 overflow-clip rounded-md border border-slate-200 p-2 text-center leading-1">
                <FA icon={theme === 'fab' ? 'fa-font-awesome-logo-full' : 'fa-home'} theme={theme} color="primary" />
                <span className="text-xs leading-3 break-all">
                  <span className="font-semibold">{FA_THEME_TITLE_MAP[theme]}</span>
                  <br />({theme})
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <hr className="mt-4 border-slate-200" />
      <div className="mt-4 text-sm font-semibold text-slate-600">
        <p>
          For commercial use, please consider supporting FontAwesome by subscribing to their plan at{' '}
          <a href="https://fontawesome.com" target="_blank" rel="nofollow noopener" className="text-primary hover:underline">
            fontawesome.com
          </a>
        </p>
      </div>
    </>
  );
};
