import React, { useEffect } from "react";
import { initializeViewer } from "../../utils/initializeViewer";
import { useAppContext } from "../../contexts/AppProvider";
import "./viewer.css";
import { addGeometry } from "../../utils/addGeometry";

interface ViewerProps {
  urn: string;
}

const Viewer: React.FC<ViewerProps> = ({ urn }) => {
  const { tokenData, setViewer, viewer } = useAppContext();

  useEffect(() => {
    if (!tokenData.access_token || !urn) {
      return;
    }

    const options: Autodesk.Viewing.InitializerOptions = {
      env: "AutodeskProduction",
      getAccessToken: (onTokenReady) => {
        if (onTokenReady) {
          onTokenReady(tokenData.access_token, tokenData.expires_in);
        }
      },
      enableArcs: true,
    };

    initializeViewer(options, urn, setViewer);

    return () => {
      Autodesk.Viewing.shutdown();
    };
  }, [urn, tokenData]);

  return (
    <>
      <div id="forgeViewer" style={{ height: "100vh", width: "100%" }}></div>
      {!!viewer && (
        <button className="addGeometryBtn" onClick={() => addGeometry(viewer)}>
          Add Geometry
        </button>
      )}
    </>
  );
};

export default Viewer;
