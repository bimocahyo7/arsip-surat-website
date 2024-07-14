import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const LoadingErrorWrapper = ({ loading, error, children }) => {
  if (loading) {
    return (
      <div className="bg-slate-200 min-h-full flex">
        <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
          <div className="loading-container">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-200 min-h-full flex">
        <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
          <div className="error-container">
            <Typography variant="h5" color="error">
              Error: {error.message}
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

LoadingErrorWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};

export default LoadingErrorWrapper;
