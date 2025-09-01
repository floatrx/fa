import { Navigation } from '@/components/layout/Navigation';
import { FB } from '@/components/ui/icon/FB';

interface Props {}

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col px-8 py-4">
      <header>
        <h1 className="pt-3 text-xl font-bold sm:text-2xl">
          <FB className="mb-2 block font-semibold" icon="fa-square-font-awesome" color="primary" text="FontAwesome Icons" />{' '}
        </h1>
        <Navigation />
      </header>
      <main className="flex-auto">{children}</main>
    </div>
  );
};
