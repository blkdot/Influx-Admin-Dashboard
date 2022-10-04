import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";

import Header from "components/Headers/Header.js";
import PageChange from "components/PageChange/PageChange.js"
import { fetcher } from "../../lib/fetch";
import { FileUploader } from "react-drag-drop-files";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const fileTypes = ["xlsx"];

const CSVUpload = (props) => {

  const [file, setFile] = useState(null);
  const handleChange = async (file) => {
    console.log(file);
    setFile(file);
  };

  const uploadFile = async () => {
    if (file) {
      try {
        var formData = new FormData();
        formData.append("file", file);
        console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers/upload`);
        await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers/upload`, {
          method: 'POST',
          body: formData
        });
        setFile(file);
        NotificationManager.success('File successfully uploaded', 'Success!', 3000);
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 mb-7" fluid>
        <Row className="mt-9">
          <Col className="mb-5 mb-xl-0 d-flex justify-content-center" xl="12">
            <FileUploader
              multiple={false}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
            
          </Col>
          <div className="w-100 d-flex justify-content-center">
            <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <Button outline color="primary" size="sm" type="button" onClick={() => uploadFile()}>
              Upload
            </Button>
          </div>
        </Row>
      </Container>
      <NotificationContainer/>
    </>
  );
  // }
};

CSVUpload.layout = Admin;

export default CSVUpload;
