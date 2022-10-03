import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
// reactstrap components
import {
  Button,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Input,
  FormGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";

import Header from "components/Headers/Header.js";
import PageChange from "components/PageChange/PageChange.js"
import { useRouter } from "next/router";
import { useInfluencer } from '../../../lib/influencers';

const InfluencerAccount = (props) => {
  const router = useRouter();
  console.log('router===', router.query.id);
  const { data } = useInfluencer(router.query.id);
  const [account, setAccount] = useState();

  useEffect(() => {
    if (data)
      setAccount(data.influencer.account)
  }, [data]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 mb-7" fluid>
        <Row className="mt-9">
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                id:
              </label>
              <Input
                className="form-control-alternative"
                id="input-id"
                value = {account && account.id}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                name:
              </label>
              <Input
                className="form-control-alternative"
                id="input-name"
                value = {account && account.name}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                email:
              </label>
              <Input
                className="form-control-alternative"
                id="input-email"
                value = {account && account.email}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                logo:
              </label>
              <Input
                className="form-control-alternative"
                id="input-logo"
                value = {account && account.logo}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                region:
              </label>
              <Input
                className="form-control-alternative"
                id="input-region"
                value = {account && account.region}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                language:
              </label>
              <Input
                className="form-control-alternative"
                id="input-language"
                value = {account && account.language}
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card>
              <CardBody>
                <CardTitle>Telegram</CardTitle>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    username:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.telegram.username}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    channelMembers:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.telegram.channelMembers}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    accountId:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.telegram.accountId}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    socialUrl:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.telegram.socialUrl}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    averageInteractions:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.telegram.averageInteractions}
                    type="text"
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card>
              <CardBody>
                <CardTitle>Youtube</CardTitle>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    username:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.youtube.username}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    subscribers:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.youtube.subscribers}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    accountId:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.youtube.accountId}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    socialUrl:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.youtube.socialUrl}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    averageViews:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.youtube.averageViews}
                    type="text"
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card>
              <CardBody>
                <CardTitle>Tiktok</CardTitle>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    username:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.tiktok.username}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    followers:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.tiktok.followers}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    accountId:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.tiktok.accountId}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    socialUrl:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.tiktok.socialUrl}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    averageLikes:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.tiktok.averageLikes}
                    type="text"
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card>
              <CardBody>
                <CardTitle>Twitter</CardTitle>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    username:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.twitter.username}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    followers:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.twitter.followers}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    accountId:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.twitter.accountId}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    socialUrl:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.twitter.socialUrl}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    averageImpressions:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.twitter.averageImpressions}
                    type="text"
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card>
              <CardBody>
                <CardTitle>Instagram</CardTitle>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    username:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.instagram.username}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    followers:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.instagram.followers}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    accountId:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.instagram.accountId}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    socialUrl:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.instagram.socialUrl}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                  >
                    averageInteractions:
                  </label>
                  <Input
                    className="form-control-alternative"
                    value = {account && account.instagram.averageInteractions}
                    type="text"
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
  // }
};

InfluencerAccount.layout = Admin;

export default InfluencerAccount;
