import React from 'react';
import phoneImg from './images/phone.svg';
import { useGlobalContext } from './context';

const Hero = () => {
  const { closeSubmenu } = useGlobalContext();

  return (
    <section className="hero" onMouseOver={closeSubmenu}>
      <div className="hero-center">
        <article className="hero-info">
          <h1>payments infrastrucure for the internet</h1>
          <p>
            Millions of companies of all sizes-from startups to fortune 500s-use
            stripe's software and APIs to accept payments, send payouts and
            manage their businesses online
          </p>
          <button className="btn">start now</button>
        </article>
        <artice className="hero-images">
          <img src={phoneImg} className="phone-img" alt="phone" />
        </artice>
      </div>
    </section>
  );
};

export default Hero;
