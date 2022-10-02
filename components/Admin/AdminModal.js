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
import { setModalOpen, setSelectedAdmin } from "../../store";
import { fetcher } from "../../lib/fetch";

function AdminModal() {

  const { mutate } = useSWRConfig();

  const dispatch = useDispatch();
	const state = useSelector((state) => state.admin);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(generatePassword());

  function generatePassword() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  const createNewAdmin = async (e) => {
    try {
      e.preventDefault();
      await fetcher('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          role: 'admin',
        }),
      });
      mutate('/api/admins');
    } catch (e) {
      console.log(e.message);
    } finally {
    }
    dispatch(setModalOpen(!state.isModalOpen));
  }
  return (
    <>
      <Modal toggle={() => dispatch(setModalOpen(!state.isModalOpen))} isOpen={state.isModalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="id-admin-modal">
            Add new admin
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => dispatch(setModalOpen(!state.isModalOpen))}
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
                      Email
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder=""
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
                      htmlFor="input-password"
                    >
                      Password
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-password"
                      placeholder=""
                      type="text"
                      value={password}
                      readOnly
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
            onClick={() => dispatch(setModalOpen(!state.isModalOpen))}
          >
            Close
          </Button>
          <Button 
            color="primary"
            type="button"
            onClick={(e) => createNewAdmin(e)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AdminModal;
