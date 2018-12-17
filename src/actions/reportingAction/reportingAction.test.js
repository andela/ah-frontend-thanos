import moxios from 'moxios';
import { reportingThunk } from './reportingAction';
import APP_URL from '../../utils/constants';

jest.mock('react-notify-toast');

describe('Rating Component', () => {
  let articleId;

  const userdata = {
    reason: 'its not appropriate',
  };
  const Header = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token drshcfchgc5868',
    },
  };

  beforeEach(() => {
    moxios.install();
    articleId = 1;
    jest.setTimeout(10000);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('should handle succefull article reporting', async (done) => {
    moxios.stubRequest(`${APP_URL}/articles/${articleId}/report`, userdata, Header);
    const reportArticle = await reportingThunk('some reason', articleId);
    expect(reportArticle).toBeUndefined();
    done();
  });

  test('should handle failure to report an article', async (done) => {
    moxios.stubRequest(`${APP_URL}/articles/${articleId}/report`);
    const repo = await reportingThunk('', articleId);
    expect(repo).toBeUndefined();
    done();
  });
});
