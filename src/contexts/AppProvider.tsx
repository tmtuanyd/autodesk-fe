import React, { createContext, useContext, useMemo, useState } from "react";

interface AccessToken {
  access_token: string;
  expires_in: number;
}

interface AppContextProps {
  tokenData: AccessToken;
  setTokenData: React.Dispatch<React.SetStateAction<AccessToken>>;
  viewer?: Autodesk.Viewing.GuiViewer3D;
  setViewer: React.Dispatch<
    React.SetStateAction<Autodesk.Viewing.GuiViewer3D | undefined>
  >;
}

const initialState: AppContextProps = {
  tokenData: { access_token: "", expires_in: 0 },
  setTokenData: () => {},
  setViewer: () => {},
};

export const AppContext = createContext<AppContextProps>(initialState);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [tokenData, setTokenData] = useState<AccessToken>({
    access_token: "",
    expires_in: 0,
  });
  const [viewer, setViewer] = useState<Autodesk.Viewing.GuiViewer3D>();
  const value = useMemo(
    () => ({
      tokenData,
      setTokenData,
      viewer,
      setViewer,
    }),
    [tokenData, setTokenData, viewer, setViewer]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
