import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSWRConfig } from "swr";
// reactstrap components
import { 
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { setInfluxModalOpen } from "../../store";
import { fetcher } from "../../lib/fetch";

function InfluxModal({influx}) {
  const { mutate } = useSWRConfig();

  const dispatch = useDispatch();
	const state = useSelector((state) => state.influx);

  const [accountId, setAccountId] = useState('');
  const [isVIP, setIsVIP] = useState(false);
  const [engagementRate, setEngagementRate] = useState('');
  const [loginChannel, setLoginChannel] = useState('');
  const [mainChannel, setMainChannel] = useState('');
  const [promotionType, setPromotionType] = useState('');
  const [niche, setNiche] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    if (influx) {
      setAccountId(influx.accountId);
      setIsVIP(influx.isVIP === 'true' ? true : false);
      setEngagementRate(influx.engagementRate);
      setLoginChannel(influx.loginChannel);
      setMainChannel(influx.mainChannel);
      setPromotionType(influx.promotionType);
      setNiche(influx.niche);
      setContactLink(influx.contactLink);
      setRegion(influx.account.region);
      setLanguage(influx.account.language);
    }
  }, [influx]);

  const updateInflux = async (e) => {
    try {
       e.preventDefault();
      await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId,
          isVIP: isVIP === "true" ? true : false,
          engagementRate,
          loginChannel,
          mainChannel,
          promotionType,
          niche,
          contactLink,
          region,
          language
        }),
      });
    } catch (e) {
      console.log(e.message);
    } finally {
    }
    dispatch(setInfluxModalOpen(!state.isInfluxModalOpen));
  }
  return (
    <>
      <Modal toggle={() => dispatch(setInfluxModalOpen(!state.isInfluxModalOpen))} isOpen={state.isInfluxModalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="id-admin-modal">
            Update influencer
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => dispatch(setInfluxModalOpen(!state.isInfluxModalOpen))}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-isVIP"
                    >
                      isVIP
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-isVIP"
                      placeholder=""
                      type="text"
                      value={isVIP}
                      onChange={(e) => setIsVIP(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-engagementRate"
                    >
                      engagementRate
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-engagementRate"
                      placeholder=""
                      type="text"
                      value={engagementRate}
                      onChange={(e) => setEngagementRate(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-loginChannel"
                    >
                      loginChannel
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-loginChannel"
                      placeholder=""
                      type="text"
                      value={loginChannel}
                      onChange={(e) => setLoginChannel(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-mainChannel"
                    >
                      mainChannel
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-mainChannel"
                      placeholder=""
                      type="text"
                      value={mainChannel}
                      onChange={(e) => setMainChannel(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-promotionType"
                    >
                      promotionType
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-promotionType"
                      placeholder=""
                      type="text"
                      value={promotionType}
                      onChange={(e) => setPromotionType(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-niche"
                    >
                      niche
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-niche"
                      placeholder=""
                      type="text"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-contactLink"
                    >
                      contactLink
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-contactLink"
                      placeholder=""
                      type="text"
                      value={contactLink}
                      onChange={(e) => setContactLink(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-region"
                    >
                      region
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-region"
                      placeholder=""
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-language"
                    >
                      language
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-language"
                      placeholder=""
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => dispatch(setInfluxModalOpen(!state.isInfluxModalOpen))}
          >
            Close
          </Button>
          <Button 
            color="primary"
            type="button"
            onClick={(e) => updateInflux(e)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default InfluxModal;
