import React, { useEffect } from "react";
import { initializeViewer } from "../../utils/initializeViewer";
import { useAppContext } from "../../contexts/AppProvider";
import "./viewer.css";
import { addGeometry } from "../../utils/addGeometry";
import { EGeometry } from "../../models/Geometry";
import FireExtinguisherIcon from "../../assets/svg/fire-extinguisher.svg";
import { addCustomIcon } from "../../utils/addCustomIcon";

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
        <div className="BtnWrapper">
          <button onClick={() => addGeometry({ viewer })}>Add Sphere</button>
          <button onClick={() => addGeometry({ viewer, type: EGeometry.Cube })}>
            Add Cube
          </button>
          <button
            onClick={() =>
              addCustomIcon({ viewer, path: FireExtinguisherIcon })
            }
          >
            Add svg
          </button>
        </div>
      )}
    </>
  );
};

export default Viewer;
