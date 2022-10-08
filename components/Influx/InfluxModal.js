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
  FormFeedback,
  Row,
  Col
} from "reactstrap";
import { setInfluxModalOpen } from "../../store";
import { fetcher } from "../../lib/fetch";

function InfluxModal({influx, type}) {
  console.log('type=====', type);

  const dispatch = useDispatch();
	const state = useSelector((state) => state.influx);
  const [accountId, setAccountId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [isVIP, setIsVIP] = useState(false);
  const [engagementRate, setEngagementRate] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [niche, setNiche] = useState('');
  const [promotionType, setPromotionType] = useState('');
  const [telegramChannel, setTelegramChannel] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [tiktokUsername, setTiktokUsername] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [youtubeUsername, setYoutubeUsername] = useState('');

  useEffect(() => {
    if (influx && type === 'edit') {
      setAccountId(influx.accountId);
      setName(influx.account.name);
      setEmail(influx.account.email);
      setLogo(influx.account.logo);
      setRegion(influx.account.region);
      setLanguage(influx.account.language);
      setIsVIP(influx.isVIP === 'true' ? true : false);
      setEngagementRate(influx.engagementRate);
      setContactLink(influx.contactLink);
      setNiche(influx.niche);
      setPromotionType(influx.promotionType);
      setTelegramChannel(influx.telegram && influx.telegram.channel ? influx.telegram.channel : '')
      setTelegramUrl(influx.telegram && influx.telegram.url ? influx.telegram.url : '')
      setTwitterUsername(influx.twitter && influx.twitter.username ? influx.twitter.username : '')
      setTiktokUsername(influx.tiktok && influx.tiktok.username ? influx.tiktok.username : '')
      setInstagramUsername(influx.instagram && influx.instagram.username ? influx.instagram.username : '')
      setYoutubeUsername(influx.youtube && influx.youtube.username ? influx.youtube.username : '')
    } else {
      setName('');
      setEmail('');
      setLogo('');
      setRegion('');
      setLanguage('');
      setIsVIP(false);
      setEngagementRate('');
      setContactLink('');
      setNiche('');
      setPromotionType('');
      setTelegramChannel('')
      setTelegramUrl('')
      setTwitterUsername('')
      setTiktokUsername('')
      setInstagramUsername('')
      setYoutubeUsername('')
    }
  }, [influx, type]);

  const updateInflux = async (e) => {
    try {
      e.preventDefault();
      if (type === 'edit' && name != '' && email != '' && logo != '') {
        await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accountId,
            name,
            email,
            logo,
            region,
            language,
            isVIP: isVIP === "true" ? true : false,
            engagementRate,
            contactLink,
            niche,
            promotionType,
          }),
        });
      } else if (type === 'add' && name != '' && email != '' && logo != '') {
        await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            logo,
            region,
            language,
            isVIP: isVIP === "true" ? true : false,
            engagementRate,
            contactLink,
            niche,
            promotionType,
          }),
        });
      }
      
    } catch (e) {
      console.log(e.message);
    } finally {
    }
    if (name != '' && email != '' && logo != '')
      dispatch(setInfluxModalOpen(!state.isInfluxModalOpen));
  }
  return (
    <>
      <Modal toggle={() => dispatch(setInfluxModalOpen(!state.isInfluxModalOpen))} isOpen={state.isInfluxModalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="id-admin-modal">
            { type === 'edit' ? 'Update influencer' : 'Add influencer' }
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
                      htmlFor="input-name"
                    >
                      name
                    </label>
                    <Input
                      className={name == '' ? "is-invalid" : "is-valid"}
                      placeholder={name == '' ? "Name is empty" : ""}
                      id="input-name"
                      type="text"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-email"
                    >
                      email
                    </label>
                    <Input
                      className={name == '' ? "is-invalid" : "is-valid"}
                      placeholder={name == '' ? "Email is empty" : ""}
                      id="input-email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-logo"
                    >
                      logo
                    </label>
                    <Input
                      className={name == '' ? "is-invalid" : "is-valid"}
                      placeholder={name == '' ? "Logo is empty" : ""}
                      id="input-logo"
                      type="text"
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
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
                    >
                      Telegram Channel Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={telegramChannel}
                      onChange={(e) => setTelegramChannel(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                    >
                      Telegram Url
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={telegramUrl}
                      onChange={(e) => setTelegramUrl(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                    >
                      Twitter Username
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={twitterUsername}
                      onChange={(e) => setTwitterUsername(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                    >
                      Twitter Username
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={twitterUsername}
                      onChange={(e) => setTwitterUsername(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                    >
                      Tiktok Username
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={tiktokUsername}
                      onChange={(e) => setTiktokUsername(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                    >
                      Instagram Username
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={instagramUsername}
                      onChange={(e) => setInstagramUsername(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                    >
                      Youtube Username
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={youtubeUsername}
                      onChange={(e) => setYoutubeUsername(e.target.value)}
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
