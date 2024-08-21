export const addGeometry = (viewer: Autodesk.Viewing.GuiViewer3D) => {
  if (!viewer) {
    return;
  }
  const customSceneIdentifier = "custom-scene";
  const geom = new window.THREE.SphereGeometry(10, 10, 10);
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
