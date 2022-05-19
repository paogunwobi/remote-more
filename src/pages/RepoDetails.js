// reactstrap components
import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DefaultNavbar from "./components/DefaultNavbar";
import decode from "./util.js/decodeBase64";
import axios from "axios";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import ReactMarkdown from "react-markdown";
import { setDetails } from "app-store/detailsSlice";

const RepoDetails = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const details = useSelector((state) => state.details.details);
  const [isLoading, setIsLoading] = useState(false);
  const [repo, setRepo] = useState('');


  useEffect(() => {
    setIsLoading(true);
    const arr = location.pathname.split('/');
    const lngt = location.pathname.split('/').length;
    const username = arr[lngt - 3];
    const repo = arr[lngt - 1];
    setRepo(repo);
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
      
    axios
      .get(`https://api.github.com/repos/${username}/${repo}/readme`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      })
      .then(({ status, data }) => {
      if (status === 200) {
        dispatch(setDetails(data.content));
        setIsLoading(false);
      }
    })
    .catch((err) => {
      setIsLoading(false);
      toast.error(
        err && err.response ? err.response.data.message : "Couldn't complete the search"
      );
    });
  }, [])

  return (
    <>
      <DefaultNavbar title={`Project: ${repo}`} photoURL={user.avatar_url} displayName={user.name} />
      {isLoading && <section className="header section-profile-cover section-shaped bg-white pb-7 pt-5">
        <Container className="pt-5 pb-5">
          <Row className="row-grid justify-content-center pt-5 mx-auto">
              <Oval color="primary" width={50} height={50}/>
          </Row>
        </Container>
      </section>}
      {!isLoading && <section className="header section-profile-cover section-shaped bg-white pb-7 pt-5">
        <Container className="pt-3 pb-5">
          <Row className="row-grid justify-content-center">
            <Col lg="7">
              {<ReactMarkdown>{decode(details)}</ReactMarkdown>}
            </Col>
          </Row>
        </Container>
      </section>}
    </>
  );
};

export default RepoDetails;
