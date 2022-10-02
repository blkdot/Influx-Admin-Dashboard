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
import AdminModal from "components/Admin/AdminModal.js";
import { useAdmins } from '../../lib/admins';
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../store";
import { fetcher } from "../../lib/fetch";
import DeleteConfirmation from "components/Admin/DeleteConfirmation.js";

const AdminDashboard = (props) => {

  const dispatch = useDispatch();
  const {data: session} = useSession();
  // console.log('session====', session);

  const { data } = useAdmins();
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  // const [displayUsers, setDisplayUsers] = usesState([]);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

  const [adminId, setAdminId] = useState(-1);
  const [adminIndex, setAdminIndex] = useState(-1);

  useEffect(() => {
    setInterval(async () => {
      let data = await fetcher('/api/admins', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('data admins==', data.admins);
      setAdmins(data.admins);
    }, [15000]);
  }, [])

  useEffect(() => {
    if (data) {
      setAdmins(data.admins);
    }
  }, [data])

  const onPreviousClick = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const onNextClick = (e) => {
    e.preventDefault();
    if (Math.ceil(admins.length / pageSize) > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const addNewAdmin = (e) => {
    e.preventDefault();
    dispatch(setModalOpen(true));
  }

  const showDeleteConfirmationModal = (id, i) => {
    setAdminId(id);
    setAdminIndex(i);
    setDisplayConfirmationModal(true);
  }

  const submitDelete = async (id, i) => {
    setAdmins([...admins.slice(0, i), ...admins.slice(i + 1, admins.length)]);
    setDisplayConfirmationModal(false);
    await fetcher('/api/admins', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id
      }),
    });
  }

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 mb-7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Admins</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href=""
                      onClick={(e) => addNewAdmin(e)}
                      size="sm"
                    >
                      Add new
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((admin, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1 + (currentPage - 1) * pageSize}</th>
                      <td> {admin.email} </td>
                      <td> {admin.role} </td>
                      <td> 
                        <Button outline color="warning" size="sm" type="button" onClick={() => showDeleteConfirmationModal(admin.id, i)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row className="align-items-center justify-content-center mt-4">
                <Pagination>
                  <PaginationItem className={currentPage > 1 ? '' : 'disabled'}>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => onPreviousClick(e)}
                      tabIndex="-1"
                    >
                      <i className=" fa fa-angle-left"></i>
                      <span className=" sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={() => setCurrentPage(currentPage - 1)}>
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem className=" active">
                    <PaginationLink href="#pablo" onClick={() => setCurrentPage(currentPage)}>
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  {
                    Math.ceil(admins.length / pageSize) > currentPage && (
                      <PaginationItem>
                        <PaginationLink href="#pablo" onClick={() => setCurrentPage(currentPage + 1)}>
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }
                  <PaginationItem className={Math.ceil(admins.length / pageSize) > currentPage ? '' : 'disabled'}>
                    <PaginationLink href="#pablo" onClick={(e) => onNextClick(e)}>
                      <i className=" fa fa-angle-right"></i>
                      <span className=" sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      <AdminModal />
      <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={adminId} index={adminIndex}  />
    </>
  );
  // }
};

AdminDashboard.layout = Admin;

export default AdminDashboard;
