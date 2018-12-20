import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './Home.scss';
import Articles from '../../containers/Articles';
import CarouselBanner from '../../containers/CarouselBanner';

const Home = () => (
  <BrowserRouter>
    <div>
      <div className="header-img">
        <CarouselBanner />
      </div>
      <div className="home-body">
        <div className="lefter">
          <div className="lefter-title"><h3>Recent Articles</h3></div>
          <hr />
          <Route path="/" component={Articles} />
        </div>
        <div className="righter">
          <div className="righter-title"><h3>Popular Tags</h3></div>
        </div>
      </div>
    </div>
  </BrowserRouter>
);
export default Home;
