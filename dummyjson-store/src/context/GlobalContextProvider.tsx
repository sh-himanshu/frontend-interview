import { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type Breadcrumb = {
  name: string;
  path: string;
};

interface GlobalContextValue {
  breadcrumb: Breadcrumb[];
  setBreadcrumb: (value: Breadcrumb[]) => void;
}

const GlobalContext = createContext<GlobalContextValue | null>(null);

const GlobalContextProvider = ({ children }: Props) => {
  const [breadcrumb, setBreadcrumb] = useState<GlobalContextValue['breadcrumb']>([]);
  return (
    <GlobalContext.Provider
      value={{
        breadcrumb,
        setBreadcrumb: value => setBreadcrumb(value),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => {
  const value = useContext(GlobalContext);
  if (value === null) throw new Error("useGlobalContext can't be used outside the context!");
  return value;
};
