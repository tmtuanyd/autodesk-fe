export function initializeViewer(
  options: Autodesk.Viewing.InitializerOptions,
  urn: string,
  setViewer: React.Dispatch<
    React.SetStateAction<Autodesk.Viewing.GuiViewer3D | undefined>
  >
): void {
  const viewerDiv = document.getElementById("forgeViewer") as HTMLElement;

  Autodesk.Viewing.Initializer(options, () => {
    const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv);
    viewer.start();

    const documentId = `urn:${urn}`;
    Autodesk.Viewing.Document.load(
      documentId,
      (doc: Autodesk.Viewing.Document) => {
        const defaultModel = doc.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(doc, defaultModel);
      },
      (error: any) => {
        console.error("Failed to load Forge document:", error);
      }
    );
    setViewer(viewer);
  });
}
