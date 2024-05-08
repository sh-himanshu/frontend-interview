import ThemeToggle from './ThemeToggle';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Container = ({ children, title }: Props) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-neutral-800">
      <div className="w-full h-16 flex items-center justify-between dark:bg-neutral-950 bg-gray-50 px-8">
        <span className="uppercase text-lg font-medium dark:text-neutral-300">{title}</span>
        <ThemeToggle />
      </div>
      <div className="p-10 flex justify-center">{children}</div>
    </div>
  );
};

export default Container;
