import React from "react";

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "#3e0ce3",
      color: "#fff",
      textAlign: "center",
      padding: "15px",
      marginTop: "30px"
    }}>
      <p>© {new Date().getFullYear()} Tinkoy's Online Business</p>
    </footer>
  );
};

export default Footer;