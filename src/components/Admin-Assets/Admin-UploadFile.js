import React, { useState } from "react";
import { LoaderOnConfirm } from "../stylesheet/Loader";
import { uploadFile } from "react-s3";
import { Button } from "react-bootstrap";
import axios from "axios";

const config = {
  bucketName: "silc-file-storage",
  region: "ap-southeast-2",
  accessKeyId: "AKIATDANFPL5EDCTEIKS",
  secretAccessKey: "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",
};

const UploadFile = (props) => {
  const assetId = props.assetId;
  const [load, setLoad] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState();
  const [successId, setSuccessId] = useState();


  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
 
  const handleUpload = async (file) => {
    const userForm = {
      assetId: assetId,
      name: selectedFile.name,
    };
  
    console.log(userForm);

    setLoad(true);
    await axios
      .post(`http://ec2-52-64-193-116.ap-southeast-2.compute.amazonaws.com:8000/api/assetFile`, userForm)
      .then(() => {
        uploadFile(file, config);
        setTimeout(() => {
          setLoad(false);
          window.location.reload();
        }, 1000);
        console.log("File uploaded successfully");
      })

      .catch((err) => {
        setLoad(false);
        setSuccessId("authFailed");
        setErrorMsg(err.response.data.message);
        // console.log(err.response.data.message);
      });
  };

  if (load) {
    var loaderBlock = <LoaderOnConfirm />;
  } else if (!load) {
    if(selectedFile != null){
      loaderBlock = ( <Button onClick={() => handleUpload(selectedFile)}>Upload</Button>)
    }else{
      loaderBlock = (<Button onClick={() => handleUpload(selectedFile)} disabled>Upload</Button>)
    }
  }

  if (errorMsg) {
    var errorCodeBlock = (
      <small className="text-muted">
        <h6 id={successId}>{errorMsg}</h6>
      </small>
    );
  }

  return (
    <center>
      <div className="imageInputContainer">
        <input id="fileInput" type="file" accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, .xls" onChange={handleFileInput} />
        {loaderBlock}
      </div>
      <small className="text-muted">Accepted file types: JPG, JPEG, PNG, DOCX, DOC, XlS</small>
      {errorCodeBlock}
    </center>
  );
};

export default UploadFile;
