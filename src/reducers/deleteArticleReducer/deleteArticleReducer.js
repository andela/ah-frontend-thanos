import swal from 'sweetalert2';
import ACTION_TYPE from '../../actions/actionTypes';
import swalMessages from '../../actions/swalAlerts';

const initalState = {
};

const deleteArticleReducer = (state = initalState, action) => {
  switch (action.type) {
    case ACTION_TYPE.DELETE_ARTICLE_SUCCESS:
      swal({ ...swalMessages.ARTICLE_DELETED_SUCCESSFUL });
      setTimeout(() => window.location.replace('/articles'), 2500);
      return { ...state, articleDelete: action.payload };

    case ACTION_TYPE.DELETE_ARTICLE_FAILED:
      swal({ ...swalMessages.DELETE_ERROR });
      return { ...state, articleDeleteFail: action.payload };
    default:
      return state;
  }
};

export default deleteArticleReducer;
