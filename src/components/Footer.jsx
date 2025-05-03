import React from "react";

export default function Footer() {
  const social = {
    wismo: "https://github.com/wismo-s",
  };
  return (
    <footer>
      <a href={social.wismo} target="_blank" rel="noopener noreferrer">
        Hecho por Team Guarmain
      </a>
    </footer>
  );
}
