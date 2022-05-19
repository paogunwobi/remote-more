// reactstrap components
import { useState } from "react";
import { Container, Row, Col, Form, FormGroup, InputGroup, Input, Button, InputGroupAddon, InputGroupText } from "reactstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { setRepos } from "app-store/reposSlice";
import { setUser } from "app-store/userSlice";
import { toast } from "react-toastify";

const Home = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [ form, setForm ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isSearchingIn, setisSearchingIn ] = useState(false);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const { search } = form
    const newErrors = {}
    if ( !search || search === '' ) newErrors.search = 'Search cannot be blank!!'
    return newErrors
  }

  const searchUserRepos = (search) => {
    setisSearchingIn(true);
    // .get(`${process.env.API_BASE_URL}/users/${search}`)
    axios
      .get(`https://api.github.com/users/${search}`)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(setUser(data));
        }
      })
      .catch((err) => {
        setisSearchingIn(false);
        toast.error(
          err && err.response ? err.response.data.message : "User not found"
        );
      });
    axios
      .get(`https://api.github.com/users/${search}/repos`)
      .then(({ status, data }) => {
        setisSearchingIn(false);
        if (status === 200) {
          dispatch(setRepos(data));
          history.push(`/repo-list/${search}`);
        }
      })
      .catch((err) => {
        setisSearchingIn(false);
        toast.error(
          err && err.response ? err.response.data.message : "Couldn't complete the search"
        );
      });
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      setErrors(newErrors)
    } else {
      const { search } = form;
      searchUserRepos(search);
    }
  }
  
  return (
    <>
      <section className="header section-profile-cover section-shaped bg-gradient-remote hide-scroller pb-7 pt-5 pt-md-8">
        <Container className="pt-5 pb-5">
          <Row className="row-grid justify-content-center">
            <Col className="text-center" lg="6">
              <div className="icon icon-lg icon-shape icon-shape-warning rounded-circle shadow">
                <i className="fas fa-search" />
              </div>
              <h1 className="mt-2">Github Search</h1>
              <Form role="form">
                <FormGroup className="mb-2">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Enter a valid Username"
                      name="search"
                      type="search"
                      autoComplete="new-search"
                      onChange={ e => setField('search', e.target.value) }
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                {isSearchingIn ? 
                  (<Button className="my-2" color="primary" type='submit' onClick={ handleSubmit }>
                    <Oval color="#fff" width={20} height={20}/>
                  </Button>) : 
                  (<Button className="my-2" color="primary" type='submit' onClick={ handleSubmit }>
                    Search
                  </Button>)}
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
