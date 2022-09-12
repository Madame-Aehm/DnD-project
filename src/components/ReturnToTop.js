import React from 'react'

function ReturnToTop() {
  const button = document.getElementById("scroll-button");

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  window.onscroll = () => scrollFunction();

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <button id='scroll-button' onClick={topFunction}>⇞</button>
  )
}

export default ReturnToTop