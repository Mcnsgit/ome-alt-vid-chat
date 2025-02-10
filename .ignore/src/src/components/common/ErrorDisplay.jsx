import PropTypes from 'prop-types';
function ErrorDisplay({ error }) {
    return (
        <div className="error">
            <p>{error}</p>
        </div>
    );
}

ErrorDisplay.propTypes = {
    error: PropTypes.string.isRequired
};
export default ErrorDisplay;