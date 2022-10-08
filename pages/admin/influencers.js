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
import { useInfluencers } from '../../lib/influencers';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setInfluxModalOpen } from "../../store";
import InfluxModal from "../../components/Influx/InfluxModal";

const InfluencerDashboard = (props) => {

  const dispatch = useDispatch();

  const router = useRouter();
  const { data } = useInfluencers();
  // console.log('data===', data.influencers
  const [modalType, setModalType] = useState('add');
  const [influencers, setInfluencers] = useState([]);
  const [influencer, setInfluencer] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    if (data && data.influencers) {
      console.log('data.influencers===', data.influencers);
      setInfluencers(data.influencers);
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
    if (Math.ceil(influencers.length / pageSize) > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const addNewInfux = (e) => {
    e.preventDefault();
    setModalType('add');
    dispatch(setInfluxModalOpen(true));
  }

  const updateInflux = (item) => {
    setInfluencer(item);
    setModalType('edit');
    dispatch(setInfluxModalOpen(true));
  }

  // const showDeleteConfirmationModal = (id, i) => {
  //   setAdminId(id);
  //   setAdminIndex(i);
  //   setDisplayConfirmationModal(true);
  // }

  // const submitDelete = async (id, i) => {
  //   setAdmins([...admins.slice(0, i), ...admins.slice(i + 1, admins.length)]);
  //   setDisplayConfirmationModal(false);
  //   await fetcher('/api/admins', {
  //     method: 'DELETE',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       id: id
  //     }),
  //   });
  // }

  // const hideConfirmationModal = () => {
  //   setDisplayConfirmationModal(false);
  // }

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
                    <h3 className="mb-0">Influencers</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href=""
                      onClick={(e) => addNewInfux(e)}
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
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">logo link</th>
                    <th scope="col">region</th>
                    <th scope="col">language</th>
                    <th scope="col">isVIP</th>
                    <th scope="col">engagementRate</th>
                    <th scope="col">contactLink</th>
                    <th scope="col">niche</th>
                    <th scope="col">promotionType</th>
                    <th scope="col">Telegram Channel</th>
                    <th scope="col">Telegram URL</th>
                    <th scope="col">Twitter Username</th>
                    <th scope="col">Tiktok Username</th>
                    <th scope="col">Instagram Username</th>
                    <th scope="col">Youtube Username</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {influencers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, i) => (
                    <tr key={i}>
                      <td scope="row"> {item.account.name} </td>
                      <td> {item.account.email} </td>
                      <td> {item.account.logo} </td>
                      <td> {item.account.region} </td>
                      <td> {item.account.language} </td>
                      <td> {item.isVIP ? 'true' : 'false'} </td>
                      <td> {item.engagementRate} </td>
                      <td> {item.contactLink} </td>
                      <td> {item.niche} </td>
                      <td> {item.promotionType} </td>
                      <td> {item.telegram && item.telegram.channel ? item.telegram.channel : '-'} </td>
                      <td> {item.telegram && item.telegram.url ? item.telegram.url : '-'} </td>
                      <td> {item.telegram && item.twitter.username ? item.twitter.username : '-'} </td>
                      <td> {item.telegram && item.tiktok.username ? item.tiktok.username : '-'} </td>
                      <td> {item.telegram && item.instagram.username ? item.instagram.username : '-'} </td>
                      <td> {item.telegram && item.youtube.username ? item.youtube.username : '-'} </td>
                      {/* <td> 
                        <Button outline color="primary" size="sm" type="button" onClick={() => router.push(`/admin/account/${item.id}`)}>
                          View Details
                        </Button>
                      </td>
                      <td> 
                        <Button outline color="primary" size="sm" type="button" onClick={() => router.push(`/admin/campaigns/${item.id}`)}>
                          View Details
                        </Button>
                      </td> */}
                      {/* <td> {item.priceRange.length > 1 ? `[${item.priceRange[0]}, ${item.priceRange[1]}]` : ''} </td> */}
                      <td> 
                        <Button outline color="primary" size="sm" type="button" onClick={() => updateInflux(item)}>
                          Edit
                        </Button>
                        <Button outline color="primary" size="sm" type="button" onClick={() => updateInflux(item)}>
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
                    Math.ceil(influencers.length / pageSize) > currentPage && (
                      <PaginationItem>
                        <PaginationLink href="#pablo" onClick={() => setCurrentPage(currentPage + 1)}>
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }
                  <PaginationItem className={Math.ceil(influencers.length / pageSize) > currentPage ? '' : 'disabled'}>
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
      <InfluxModal influx={influencer} type={modalType} />
    </>
  );
  // }
};

InfluencerDashboard.layout = Admin;

export default InfluencerDashboard;
