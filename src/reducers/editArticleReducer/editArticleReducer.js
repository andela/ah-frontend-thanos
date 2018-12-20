import swal from 'sweetalert2';
import ACTION_TYPE from '../../actions/actionTypes';
import swalMessages from '../../actions/swalAlerts';

const initalState = {
};

const editArticleReducer = (state = initalState, action) => {
  const { articleEditData } = state;
  switch (action.type) {
    case ACTION_TYPE.EDIT_ARTICLE_SUCCESS:
      swal({ ...swalMessages.EDIT_ARTICLE_SUCCESSFUL });
      return { ...state, articleEdit: action.payload };

    case ACTION_TYPE.EDIT_ARTICLE_FAILED:
      swal({ ...swalMessages.EDIT_ARTICLE_FAILED });
      return { ...state, articleEditFail: action.payload };

    case ACTION_TYPE.EDIT_ARTICLE_DATA:
      return { ...state, articleEditData: action.payload };

    case ACTION_TYPE.UPDATE_IMAGE:
      return {
        ...state,
        articleEditData: { ...articleEditData, image_url: action.payload },
      };

    case ACTION_TYPE.LOAD_EDIT_DATA:
      return {
        ...state,
        articleEditData: { ...articleEditData, ...action.payload },
      };

    default:
      return state;
  }
};

export default editArticleReducer;
