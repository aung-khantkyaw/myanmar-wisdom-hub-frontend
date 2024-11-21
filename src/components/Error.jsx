import PropTypes from "prop-types";

const Error = ({ type, error, link }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center space-y-5">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-500 mb-4">
          {type} | {error}
        </h1>
        <a href={link} className="btn text-white btn-error">
          Go back
        </a>
      </div>
    </div>
  );
};

Error.propTypes = {
  type: PropTypes.string,
  error: PropTypes.string,
  link: PropTypes.string,
};

export default Error;
