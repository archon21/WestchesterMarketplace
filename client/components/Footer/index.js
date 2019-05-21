import React from 'react';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom'
const Footer = props => {
  const { phone, company } = props;
  return (
    <footer id="footer-container" className="no-print flex column align-center  background-primary color-secondary">
      <h1 className="headline-4 color-secondary text-center">Westchester Marketplace</h1>

    </footer>
  );
};

const mapStateToProps = state => ({
  phone: state.init.phone,
  company: state.init.company
});

export default connect(mapStateToProps)(Footer);
