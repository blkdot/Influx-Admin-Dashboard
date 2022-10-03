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
import Select from 'react-select';



const InfluencerCampaigns = (props) => {
  const router = useRouter();
  const { data } = useInfluencer(router.query.id);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [campaign, setCampaign] = useState(undefined);

  useEffect(() => {
    if (data) {
      let _options = [];
      for (let i = 0; i < data.influencer.campaigns.length; i++) {
        _options.push({ value: data.influencer.campaigns[i].id, label: data.influencer.campaigns[i].id });
      }
      setOptions(_options);
      setCampaigns(data.influencer.campaigns)
    }
  }, [data]);

  useEffect(() => {
    if (selectedOption) {
      for (let i = 0; i < data.influencer.campaigns.length; i++) {
        if (data.influencer.campaigns[i].id == selectedOption.value) {
          console.log(data.influencer.campaigns[i]);
          setCampaign(data.influencer.campaigns[i]);
        }
      }
    }
    
  }, [selectedOption]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 mb-7" fluid>
        <Row className="mt-9">
          <Col className="mb-5 mb-xl-0" xl="4">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </Col>
        </Row>
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
                value = {campaign && campaign.id}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                campaignId:
              </label>
              <Input
                className="form-control-alternative"
                id="input-campaignId"
                value = {campaign ? campaign.campaignId : ''}
                type="text"
                onChange={(e) => e.preventDefault()}
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                avgER:
              </label>
              <Input
                className="form-control-alternative"
                id="input-campaignId"
                value = {campaign ? campaign.campaignId : ''}
                type="text"
                onChange={(e) => e.preventDefault()}
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                influencerId:
              </label>
              <Input
                className="form-control-alternative"
                id="input-influencerId"
                value = {campaign && campaign.influencerId}
                type="text"
                onChange={(e) => e.preventDefault()}
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                status:
              </label>
              <Input
                className="form-control-alternative"
                id="input-status"
                value = {campaign && campaign.status}
                type="text"
                onChange={(e) => e.preventDefault()}
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                campaign name:
              </label>
              <Input
                className="form-control-alternative"
                id="input-creator"
                value = {campaign && campaign.campaign.name}
                type="text"
                onChange={(e) => e.preventDefault()}
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                campaign avgER:
              </label>
              <Input
                className="form-control-alternative"
                id="input-creator"
                value = {campaign && campaign.campaign.avgER}
                type="text"
                onChange={(e) => e.preventDefault()}
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                campaign template:
              </label>
              <Input
                className="form-control-alternative"
                id="input-creator"
                value = {campaign && campaign.campaign.template}
                type="text"
                onChange={(e) => e.preventDefault()}
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                campaign negoBudget:
              </label>
              <Input
                className="form-control-alternative"
                id="input-creator"
                value = {campaign && campaign.campaign.negoBudget}
                type="text"
                onChange={(e) => e.preventDefault()}
              />
            </FormGroup>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <FormGroup>
              <label
                className="form-control-label"
              >
                campaign creator:
              </label>
              <Input
                className="form-control-alternative"
                id="input-creator"
                value = {campaign && campaign.campaign.creator}
                type="text"
                onChange={(e) => e.preventDefault()}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
  // }
};

InfluencerCampaigns.layout = Admin;

export default InfluencerCampaigns;
