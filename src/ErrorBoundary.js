import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <section className="section-border border-primary">
          <div className="container d-flex flex-column">
            <div className="row align-items-center justify-content-center gx-0 min-vh-100">
              <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
                <h1 className="display-3 fw-bold text-center">Uh Oh.</h1>

                <p className="mb-5 text-center text-muted">
                  We ran into an issue, but don’t worry, we’ll take care of it
                  for sure.
                </p>

                <div className="text-center">
                  <a className="btn btn-primary" href="/">
                    Back to safety
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
