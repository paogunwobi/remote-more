// reactstrap components
import { useEffect, useState } from "react";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import DefaultNavbar from "./components/DefaultNavbar";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "app-store/userSlice";
import { Oval } from "react-loader-spinner";

const RepoList = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  let location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const repositories = useSelector((state) => state.repos.repositories);

  const gotoDetails = (login, name) => {
    history.push(`/repo-list/${login}/details/${name}`);
  }

  useEffect(() => {
    setIsLoading(true);
    const arr = location.pathname.split('/');
    const lngt = location.pathname.split('/').length;
    const username = arr[lngt - 1];
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(setRepos(data));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(
          err && err.response ? err.response.data.message : "Couldn't complete the search"
        );
      });
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(setUser(data));
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(
          err && err.response ? err.response.data.message : "User not found"
        );
      });
  }, []);
  
  return (
    <>
    {user && <DefaultNavbar title={`${user.login}'s Projects`} photoURL={user.avatar_url} displayName={user.name} />}
    {isLoading && <section className="header section-profile-cover section-shaped bg-gradient-remote pb-7 pt-5">
        <Container className="pt-5 pb-5">
          <Row className="row-grid justify-content-center pt-5 mx-auto">
              <Oval color="primary" width={50} height={50}/>
          </Row>
        </Container>
      </section>}
    {!isLoading && <section className="section-profile-cover section-shaped bg-gradient-remote pb-5 pt-2">
        <Container className="pt-5 pb-5">
          <Row className="row-grid justify-content-center">
            <Col className="text-center" lg="7">
            {repositories.length > 0 && repositories.map((item) => {
                return <div className="btn-wrapper mb-3" key={item.id} onClick={(ev) => gotoDetails(item.owner.login, item.name)}>
                <Card className="card-stats cursr mb-2 mb-xl-0">
                  <CardBody>
                    <Row>
                      <Col className="col-auto">
                        <div className="icon icon-shape icon-shape-warning rounded-circle shadow">
                          <i className="ni ni-hat-3" />
                        </div>
                      </Col>       
                      <Col className="text-left">
                        <span className="mt-3 text-capitalize">{item.name}</span><br/>
                        <p className="mt-1 mb-0">Visibility: <span className="p-1 icon-shape-primary rounded shadow text-capitalize">{item.visibility}</span></p>
                      </Col>       
                    </Row>
                  </CardBody>
                </Card>
              </div>
              })}
              {repositories.length === 0 && (<div className="btn-wrapper bg-gradient-remote mt-5 mb-3">
                <span className="text-center">No Project Found</span>  
              </div>)}
            </Col>
          </Row>
        </Container>
      </section>}
    </>
  );
};

export default RepoList;
