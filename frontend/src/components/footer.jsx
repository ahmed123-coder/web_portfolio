import React from 'react';
import '../styles/footer.css';

const Footer = ({ footerContent }) => {
  return (
    <footer id="footer" className="footer">
      <p>{footerContent}</p>
    </footer>
  );
};

export default Footer;