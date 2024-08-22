export const addCustomIcon = ({
  viewer,
  path,
}: {
  viewer: Autodesk.Viewing.GuiViewer3D;
  path: string;
}) => {
  if (!viewer) {
    return;
  }
  const textureLoader = new window.THREE.TextureLoader();
  textureLoader.load(path, (texture: any) => {
    const material = new window.THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    const geometry = new window.THREE.PlaneBufferGeometry(10, 10);
    const planeMesh = new window.THREE.Mesh(geometry, material);

    planeMesh.position.set(
      Math.random() * 100 - 50,
      Math.random() * 100 - 50,
      0
    );

    const customSceneIdentifier = "custom-scene" + path;
    if (!viewer.overlays.hasScene(customSceneIdentifier)) {
      viewer.overlays.addScene(customSceneIdentifier);
    }

    viewer.overlays.addMesh(planeMesh, customSceneIdentifier);
  });
};
