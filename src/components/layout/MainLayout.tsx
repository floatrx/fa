import { Navigation } from '@/components/layout/Navigation';

interface Props {}

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col px-8 py-4">
      <header>
        <h1 className="pt-3 text-2xl font-bold">FontAwesome Icons</h1>
        <Navigation />
      </header>
      <main className="flex-auto">{children}</main>
    </div>
  );
};
