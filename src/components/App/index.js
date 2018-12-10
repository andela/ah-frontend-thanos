import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Notification from 'react-notify-toast';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Home from '../Home';
import LoginPage from '../../containers/LoginPage';
import Header from '../Header';
import FooterConnected from '../../containers/Footer';
import SignUpPageConnected from '../../containers/SignUpPage';
import Articles from '../../containers/Articles';
import ArticlePageConnected from '../../containers/ArticlePage';
import ProfileConnected from '../../containers/profiles/profiles';
import EditProfilePageConnected from '../../containers/profiles/editProfile';
import PasswordResetPage from '../../containers/PasswordResetPage';
import NewPasswordPage from '../../containers/PasswordResetPage/newpasswordPage';
import CreateArticlePage from '../../containers/CreateArticlePage';
import Tags from '../TagList/viewTags';
import FollowUnfollow from '../../containers/FollowUnfollow';

library.add(faSearch);
const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPageConnected} />
        <Route path="/articles" component={Articles} />
        <Route path="/article/:articleId" component={ArticlePageConnected} />
        <Route path="/profile" component={ProfileConnected} />
        <Route path="/profiles/edit" component={EditProfilePageConnected} />
        <Route path="/passwordreset" component={PasswordResetPage} />
        <Route path="/newpassword" component={NewPasswordPage} exact />
        <Route path="/createArticle" component={CreateArticlePage} />
        <Route path="/tags" component={Tags} />
        <Route exact path="/profiles/:username" component={FollowUnfollow} />
      </Switch>
      <Notification />
      <FooterConnected />

    </React.Fragment>
  </BrowserRouter>
);

export default App;
