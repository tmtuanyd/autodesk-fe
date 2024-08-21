/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import { getDocuments } from "../../api/model";
import { getAccessToken } from "../../api/auth";
import { useAppContext } from "../../contexts/AppProvider";
import { Document } from "../../models/document";
import Viewer from "../../components/Viewer";

const Home = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { setTokenData } = useAppContext();
  const [selectedUrn, setSelectedUrn] = useState("");

  const handleGetDocument = async () => {
    const tokenData = await getAccessToken();
    if (tokenData) {
      setTokenData(tokenData);
    }
    const res = await getDocuments();
    if (res) {
      setDocuments(res);
    }
  };

  const handleSelectDocument = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== selectedUrn && value) {
      setSelectedUrn(value);
    }
  };

  useEffect(() => {
    handleGetDocument();
  }, []);

  return (
    <div>
      <div className="custom-select">
        <select onChange={handleSelectDocument} value={selectedUrn}>
          <option value="" disabled>
            Select document:
          </option>
          {documents.length > 0 &&
            documents.map((doc) => (
              <option key={doc.urn} value={doc.urn}>
                {doc.name}
              </option>
            ))}
        </select>
      </div>
      <Viewer urn={selectedUrn} />
    </div>
  );
};

export default Home;
