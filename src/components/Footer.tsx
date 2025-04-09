import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: 'center', padding: '1rem 0', borderTop: '1px solid #ddd' }}>
      <p>☕ Coffee rights &copy; {currentYear} - Michaela ✨</p>
    </footer>
  );
};

export default Footer;