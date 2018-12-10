import swal from 'sweetalert2';
import ACTION_TYPE from '../../actions/actionTypes';
import swalMessages from '../../actions/swalAlerts';

const initalState = {
};

const createArticleReducer = (state = initalState, action) => {
  const { articlePostData } = state;
  switch (action.type) {
    case ACTION_TYPE.CREATE_ARTICLE_SUCCESS:
      swal({ ...swalMessages.CREATE_ARTICLE_SUCCESSFUL });
      setTimeout(() => window.location.replace(`/article/${action.payload.id}`), 2500);
      return { ...state, articlePost: action.payload };

    case ACTION_TYPE.CREATE_ARTICLE_FAILED:
      return { ...state, articlePostFail: action.payload };

    case ACTION_TYPE.POST_ARTICLE_DATA:
      return { ...state, articlePostData: action.payload };

    case ACTION_TYPE.UPDATE_IMAGE_URL:
      return {
        ...state,
        articlePostData: { ...articlePostData, image_url: action.payload },
      };

    default:
      return state;
  }
};

export default createArticleReducer;
