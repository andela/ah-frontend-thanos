import React from 'react';
import { shallow, mount } from 'enzyme';
import DisplayHtml from '../../components/ArticleReporting';
import { ReportArticle, mapDispatchToProps } from '.';

let wrapper;
jest.mock('react-notify-toast');

describe('<DisplayHtml />', () => {
  const props = { match: { params: 0 } };
  beforeEach(() => {
    wrapper = shallow(
      <ReportArticle {...props} saveReport={jest.fn} reason="" />,
    );
  });
  it('should test component', () => {
    wrapper.instance().handleSubmit({ preventDefault: jest.fn });
    wrapper
      .instance()
      .handleChange({ target: { name: 'comment', value: 'fkj' } });
  });

  it('should test rendering DisplayHtml component', () => {
    wrapper = mount(
      <DisplayHtml handleChange={jest.fn()} handleSubmit={jest.fn()} />,
    );
  });
  it('should check for the presence of report article dispatch', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).saveReport({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
  it('', () => {
    localStorage.setItem('reason', '');
    wrapper = mount(
      <ReportArticle {...props} saveReport={jest.fn} reason="" />,
    );
    wrapper.instance().handleSubmit({ preventDefault: jest.fn });
  });
});
