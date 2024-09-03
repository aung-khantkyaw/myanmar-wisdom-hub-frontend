import PropTypes from "prop-types";
const Success = ({ success }) => {
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 rounded-lg">
      <p className="text-lg font-semibold">{success}</p>
    </div>
  );
};

Success.propTypes = {
  success: PropTypes.string,
};

export default Success;
