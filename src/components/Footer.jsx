import React from "react";

export default function Footer() {
  const social = {
    frontend: "https://github.com/wismo-s",
    backend: "https://github.com/wismo-s",
  };
  return (
    <footer>
      <a href={social.frontend} target="_blank" rel="noopener noreferrer">
        frontend repo
      </a>
      <a href={social.backend} target="_blank" rel="noopener noreferrer">
        backend repo
      </a>
    </footer>
  );
}
