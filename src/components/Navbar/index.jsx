import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export const Navbar = ({ className }) => {
  return (
    <nav>
      <ul className={className}>
        <li>
          <Link to="/#about" className="">
            About
          </Link>
        </li>
        <li>
          <Link to="/#blog" className="">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/forums" className="">
            Forums
          </Link>
        </li>
        <li>
          <Link to="/#contact-us" className="">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
};
