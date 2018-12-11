import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './Home.scss';
import Articles from '../../containers/Articles';
import CarouselBanner from '../../containers/CarouselBanner';
import Tags from '../TagList/viewTags';

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
          <div>
            <div className="righter-title">Popular Tags </div>
            <Tags />
          </div>
        </div>
      </div>
    </div>
  </BrowserRouter>
);
export default Home;
