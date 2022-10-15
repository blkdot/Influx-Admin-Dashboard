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
import Select from 'react-select';

function InfluxModal({influx, type}) {

  const isVIPOptions = [{value: true, label: 'true'}, {value: false, label: 'false'}];
  const engagementRateOptions = [
    {value: 'Poor', label: 'Poor'},
    {value: 'Ok', label: 'Ok'},
    {value: 'Good', label: 'Good'},
    {value: 'Great', label: 'Great'}
  ];
  const promotionTypeOptions = [
    {value: 'PaidPromo', label: 'PaidPromo'},
    {value: 'MayDoPaidPromo', label: 'MayDoPaidPromo'}
  ];
  const channelOptions = [
    {value: 'Telegram', label: 'Telegram'},
    {value: 'Twitter', label: 'Twitter'},
    {value: 'Tiktok', label: 'Tiktok'},
    {value: 'Instagram', label: 'Instagram'},
    {value: 'Youtube', label: 'Youtube'}
  ];

  const { mutate } = useSWRConfig();

  const dispatch = useDispatch();
	const state = useSelector((state) => state.influx);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [isVIP, setIsVIP] = useState(false);
  const [engagementRate, setEngagementRate] = useState('Ok');
  const [loginChannel, setLoginChannel] = useState('Telegram');
  const [mainChannel, setMainChannel] = useState('Telegram');
  const [contactLink, setContactLink] = useState('');
  const [niche, setNiche] = useState('');
  const [promotionType, setPromotionType] = useState('PaidPromo');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [tiktokUsername, setTiktokUsername] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [youtubeUsername, setYoutubeUsername] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  useEffect(() => {
    if (influx && type === 'edit') {
      setId(influx.id);
      setName(influx.account.name);
      setEmail(influx.account.email);
      setLogo(influx.account.logo);
      setRegion(influx.account.region);
      setLanguage(influx.account.language);
      setIsVIP(influx.isVIP);
      setEngagementRate(influx.engagementRate);
      setLoginChannel(influx.loginChannel);
      setMainChannel(influx.mainChannel);
      setContactLink(influx.contactLink);
      setNiche(influx.niche);
      setPromotionType(influx.promotionType);
      setTelegramUsername(influx.telegram && influx.telegram.channel ? influx.telegram.channel : '')
      setTelegramUrl(influx.telegram && influx.telegram.url ? influx.telegram.url : '')
      setTwitterUsername(influx.twitter && influx.twitter.username ? influx.twitter.username : '')
      setTwitterUrl(influx.twitter && influx.twitter.url ? influx.twitter.url : '')
      setTiktokUsername(influx.tiktok && influx.tiktok.username ? influx.tiktok.username : '')
      setTiktokUrl(influx.tiktok && influx.tiktok.url ? influx.tiktok.url : '')
      setInstagramUsername(influx.instagram && influx.instagram.username ? influx.instagram.username : '')
      setInstagramUrl(influx.instagram && influx.instagram.url ? influx.instagram.url : '')
      setYoutubeUsername(influx.youtube && influx.youtube.username ? influx.youtube.username : '')
      setYoutubeUrl(influx.youtube && influx.youtube.url ? influx.youtube.url : '')
    } else {
      setName('');
      setEmail('');
      setLogo('');
      setRegion('');
      setLanguage('');
      setIsVIP(false);
      setEngagementRate('Ok');
      setLoginChannel('Telegram');
      setMainChannel('Telegram');
      setContactLink('');
      setNiche('');
      setPromotionType('PaidPromo');
      setTelegramUsername('')
      setTelegramUrl('')
      setTwitterUsername('')
      setTwitterUrl('')
      setTiktokUsername('')
      setTiktokUrl('')
      setInstagramUsername('')
      setInstagramUrl('')
      setYoutubeUsername('')
      setYoutubeUrl('')
    }
  }, [influx, type]);

  const updateInflux = async (e) => {
    try {
      e.preventDefault();
      if (type === 'edit' && name != '' && email != '' && logo != '') {
        await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            logo,
            region,
            language,
            isVIP,
            engagementRate,
            loginChannel,
            mainChannel,
            contactLink,
            niche,
            promotionType,
            telegramUsername,
            telegramUrl,
            twitterUsername,
            twitterUrl,
            tiktokUsername,
            tiktokUrl,
            instagramUsername,
            instagramUrl,
            youtubeUsername,
            youtubeUrl
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
            isVIP,
            engagementRate,
            loginChannel,
            mainChannel,
            contactLink,
            niche,
            promotionType,
            telegramUsername,
            telegramUrl,
            twitterUsername,
            twitterUrl,
            tiktokUsername,
            tiktokUrl,
            instagramUsername,
            instagramUrl,
            youtubeUsername,
            youtubeUrl
          }),
        });
      }
      mutate('/api/influencers');
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
                    <Select
                      defaultValue={isVIP}
                      onChange={(item) => setIsVIP(item.value)}
                      options={isVIPOptions}
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
                    <Select
                      defaultValue={engagementRate}
                      onChange={(item) => setEngagementRate(item.value)}
                      options={engagementRateOptions}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-loginChannel"
                    >
                      Login Channel
                    </label>
                    <Select
                      defaultValue={loginChannel}
                      onChange={(item) => setLoginChannel(item.value)}
                      options={channelOptions}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-mainChannel"
                    >
                      Main Channel
                    </label>
                    <Select
                      defaultValue={mainChannel}
                      onChange={(item) => setMainChannel(item.value)}
                      options={channelOptions}
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
                    <Select
                      defaultValue={promotionType}
                      onChange={(item) => setPromotionType(item.value)}
                      options={promotionTypeOptions}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                    >
                      Telegram Username
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={telegramUsername}
                      onChange={(e) => setTelegramUsername(e.target.value)}
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
                      Twitter Url
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
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
                      Tiktok Url
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={tiktokUrl}
                      onChange={(e) => setTiktokUrl(e.target.value)}
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
                      Instagram Url
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
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
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                    >
                      Youtube Url
                    </label>
                    <Input
                      className="form-control-alternative"
                      placeholder=""
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
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
