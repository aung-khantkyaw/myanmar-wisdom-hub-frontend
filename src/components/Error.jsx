import PropTypes from "prop-types";

const Error = ({ error }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded-lg">
      <p className="text-lg font-semibold">{error}</p>
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.string,
};

export default Error;
