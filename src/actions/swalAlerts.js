const swalMessages = {
  LOGIN_SUCCESSFUL: {
    title: 'Login Successful',
    text: '',
    type: 'success',
    showConfirmButton: false,
    timer: 3000,
  },
  LOGIN_ERROR: {
    title: 'Oops...',
  },
  REGISTRATION_SUCCESSFUL: {
    title: 'Resgistration Successful',
    text: 'An email with a verification link has been sent to you, please verify your account',
    type: 'success',
    confirmButtonText: 'continue',
  },
  REGISTRATION_ERROR: {
    title: 'Unable to complete registration',
    text: '',
    type: 'error',
    confirmButtonText: 'Try Agian',
  },
  PROFILE_ERROR: {
    title: 'Sorry, An error has occurred',
    text: 'Please check to see if your logged in',
    type: 'error',
    confirmButtonText: 'Try Again',
  },
  RATING_SUCCESSFUL: {
    title: 'Rating Successful',
    text: 'You successfully rated the article',
    type: 'success',
    confirmButtonText: 'continue',
  },
  CREATE_ARTICLE_SUCCESSFUL: {
    title: 'Article created',
    text: 'Your article was successfully created',
    type: 'success',
    confirmButtonText: 'continue',
  },
  EDIT_ARTICLE_SUCCESSFUL: {
    title: 'Article edit',
    text: 'Your article was successfully edited',
    type: 'success',
    confirmButtonText: 'continue',
  },
  EDIT_ARTICLE_FAILED: {
    title: 'Oops',
    text: 'You do not have permission to edit this article',
    type: 'error',
    confirmButtonText: 'continue',
  },
};

export default swalMessages;
