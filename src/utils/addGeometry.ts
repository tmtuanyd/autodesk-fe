import { EGeometry } from "../models/Geometry";

export const addGeometry = ({
  viewer,
  type = EGeometry.Sphere,
}: {
  viewer: Autodesk.Viewing.GuiViewer3D;
  type?: EGeometry;
}) => {
  if (!viewer) {
    return;
  }
  const geometryObject = {
    [EGeometry.Sphere]: new window.THREE.SphereGeometry(10, 10, 10),
    [EGeometry.Cube]: new window.THREE.BoxGeometry(10, 10, 10),
  };
  const customSceneIdentifier = "custom-scene-" + type;
  const geom = geometryObject[type];
  const material = new window.THREE.MeshBasicMaterial({ color: 0xff0000 });
  const sphereMesh = new window.THREE.Mesh(geom, material);
  sphereMesh.position.set(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    0
  );

  if (!viewer.overlays.hasScene(customSceneIdentifier)) {
    viewer.overlays.addScene(customSceneIdentifier);
  }

  viewer.overlays.addMesh(sphereMesh, customSceneIdentifier);
};
