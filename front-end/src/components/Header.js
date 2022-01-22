import * as React from "react";
import PropTypes from "prop-types";
function Header() {
  return (
    <React.Fragment>
      <img
        style={{ height: "200px", width: "100%", objectFit: "cover" }}
        src="https://thumbs.dreamstime.com/b/work-study-place-empty-notebook-colored-pencil-dry-flowers-beige-background-flat-lay-top-view-copy-space-181522890.jpg"
      ></img>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
