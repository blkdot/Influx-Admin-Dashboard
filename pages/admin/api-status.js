import React, { useEffect } from "react";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react"
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Badge,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";

import Header from "components/Headers/Header.js";
import PageChange from "components/PageChange/PageChange.js"
import apis from "../../data/apis.json"
import { getApiStatus, getApiType } from "../../utils/api-checker";

const Dashboard = (props) => {
  const [apiList, setApiList] = React.useState([]);

  useEffect(() => {

    async function fetchData() {
      let tmpArray = [];
      let promises = [];

      for (let api of apis) {
        const promise = await getApiStatus(api.url);
        promises.push(promise);
      }

      let results = await Promise.all(promises);
      for (let res of results) {
        if (res && res.type === 'rest')
          tmpArray.push({'url': res.url, 'status': res.status, 'responseTime': res.responseTime});
      }
      setApiList(tmpArray);
    }

    fetchData();
    setInterval(async () => 
      fetchData(), 10000);
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">APIs</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">URL</th>
                    <th scope="col">Status</th>
                    <th scope="col">Response Time</th>
                  </tr>
                </thead>
                <tbody>
                  {apiList.map((itemAPI, i) => (
                    <tr key={i}>
                      <th scope="row">{itemAPI.url}</th>
                      <td> 
                        <Badge color="" className="badge-dot mr-4">
                        <i className={itemAPI.status === 'operational' ? 'bg-success' : (itemAPI.status === 'slow response' ? 'bg-warning' : 'bg-danger')} />
                          {itemAPI.status}
                        </Badge>
                      </td>
                      <td> {itemAPI.status === 'down' ? '-' : itemAPI.responseTime} </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
  // }
};

Dashboard.layout = Admin;

export default Dashboard;
