import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PasswordResetPage from '.';

import NewPassword from './newpasswordPage';

const store = configureStore([thunk])({});

describe('handle Invoke email for password reset', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <PasswordResetPage />
      </MemoryRouter>,
    );
  });

  it('should submit user email for passwordreset', () => {
    component
      .find('input#email')
      .simulate('change', { target: { id: 'email', value: '' } });
    component.find('form').simulate('submit');
    component.find('input#email').simulate('change', { target: { id: 'email', value: 'email' } });
    component.find('input#email').simulate('change', { target: { id: 'email', value: 'email@g.com' } });
  });
});

describe('handle Invoke email for password reset', () => {
  const mockFunc = jest.fn();
  let component;
  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <Provider store={store}>
          <NewPassword
            handlepasswordChange={jest.fn()}
            handleDataSubmit={jest.fn()}
          />
        </Provider>
      </MemoryRouter>,
    );
  });

  it('should submit user email without failing', () => {
    expect(mockFunc).toHaveBeenCalledTimes(0);
    component
      .find('input#newpassword')
      .simulate('change', { target: { id: 'newpassword', value: 'ewrfg' } });
    component
      .find('input#newpassword')
      .simulate('change', { target: { name: 'newpassword', value: '' } });
    component
      .find('input#newpassword')
      .simulate('change', {
        target: { name: 'newpassword', value: '23456uytrews' },
      });
    component
      .find('input#newpassword')
      .simulate('change', {
        target: { name: 'newpassword', value: '23456uytre234de' },
      });

    component
      .find('input#confpassword')
      .simulate('change', { target: { name: 'confpassword', value: '' } });
    component
      .find('input#confpassword')
      .simulate('change', {
        target: { name: 'confpassword', value: '23456uytrews' },
      });

    component
      .find('input#newpassword')
      .simulate('change', {
        target: { name: 'newpassword', value: '23456uytrews' },
      });
    component
      .find('input#confpassword')
      .simulate('change', {
        target: { name: 'confpassword', value: '23456uytrews' },
      });

    component.find('form').simulate('submit');
  });
});
