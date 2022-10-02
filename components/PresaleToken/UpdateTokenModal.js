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
import { setTokenModalOpen } from "../../store";
import axios from "axios";

function UpdateTokenModal({ id, index, tokens, setTokens }) {

  const dispatch = useDispatch();
  const state = useSelector((state) => state.token);

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [rating, setRating] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [softCap, setSoftCap] = useState("");
  const [hardCap, setHardCap] = useState("");
  const [socialVolume, setSocialVolume] = useState(6000);
  const [listing, setListing] = useState("");

  useEffect(async () => {
    if (id) {
      try {
        const response = await axios.get(`/api/presale/${id}`);
        setTokenName(response.data.token_name);
        setTokenSymbol(response.data.token_symbol);
        setRating(response.data.rating);
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);

  const updateRating = async (e) => {
    e.preventDefault();
    try {
      const json = JSON.stringify({ rating: rating });
      const res = await axios.post(`/api/presale/${id}`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let tmpTokens = [...tokens.slice(0, index), res.data, ...tokens.slice(index + 1, tokens.length)];
      setTokens(tmpTokens)
    } catch (error) {
      console.log(error);
    }
    dispatch(setTokenModalOpen(!state.isTokenModalOpen));
  }

  return (
    <>
      <Modal toggle={() => dispatch(setTokenModalOpen(!state.isTokenModalOpen))} isOpen={state.isTokenModalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="id-admin-modal">
            Update presale token
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => dispatch(setTokenModalOpen(!state.isTokenModalOpen))}
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
                      htmlFor="input-email"
                    >
                      TokenName
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder=""
                      type="text"
                      readOnly
                      value={tokenName}
                      onChange={(e) => setTokenName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-password"
                    >
                      TokenSymbol
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-password"
                      placeholder=""
                      type="text"
                      readOnly
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                    >
                      Dash Score
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-rating"
                      placeholder=""
                      type="text"
                      value={rating ? rating : ''}
                      onChange={(e) => setRating(e.target.value)}
                    >
                    </Input>
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
            onClick={() => dispatch(setTokenModalOpen(!state.isTokenModalOpen))}
          >
            Close
          </Button>
          <Button 
            color="primary"
            type="button"
            onClick={(e) => updateRating(e)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UpdateTokenModal;
