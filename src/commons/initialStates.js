const initialState = {
  articleReducer: {
    article: {
      id: 0,
      tag_list: [],
      slug: '',
      title: '',
      description: '',
      body: '',
      created_at: '',
      updated_at: '',
      image_url: '',
      audio_url: '',
      read_time: '',
      likes: 0,
      dislikes: 0,
      likeDislikeStatus: '',
      views_count: '',
      rating: 0,
      author: {
        id: 0,
        username: '',
        email: '',
      },
    },
    articles: [],
    errorMessage: '',
  },
  deleteArticleReducer: {},
  socialLoginReducer: { isLoggedIn: false },
  loginReducer: { errorMessage: '', successMessage: '', user_details: '' },
  createArticleReducer: {},
  editArticleReducer: {},
  userReducer: {
    freshUser: { email: '', password: '', username: '' },
  },
  profileReducer: {
    profile: {
      bio: '',
      first_name: '',
      image: '',
      isLoggedIn: false,
      last_name: '',
    },
  },
  comments: {
    getCommentData: {
      results: [],
    },
  },
  ratingReducer: {},
  tagsReducer: { tags: [] },
  followUnfollowReducer: {
    currentProfile: {
      username: '',
      bio: '',
      first_name: '',
      last_name: '',
      image: '',
      created_at: '',
      updated_at: '',
      isFollowee: false,
    },
    followersList: [],
    followeesList: [],
  },
  searchReducer: {
    searchArticles: [],
    searchQuery: '',
    title: '',
    tag: '',
    author: '',
  },
};

export const sampleProfiles = [
  { ...initialState.followUnfollowReducer.currentProfile, isFollowee: true },
];

export const sampleArticle = {
  id: 1,
  tag_list: ['tag'],
  slug: 'title-sample',
  title: 'title sample',
  description: 'desc',
  body: 'body',
  created_at: '12-12-2018',
  updated_at: '12-12-2018',
  image_url: 'http://test.png',
  audio_url: 'http://test.mp3',
  read_time: '0 min',
  likes: 12,
  dislikes: 2,
  likeDislikeStatus: 'dislike',
  views_count: 0,
  rating: 0,
  author: {
    id: 2,
    username: 'janedoe',
    email: 'janedoe@gmail.com',
  },
};

export const sampleArticle2 = {
  ...sampleArticle,
  likeDislikeStatus: 'like',
};

export const initialStateWithSample = {
  article: sampleArticle,
};

export const initialStateWithSample2 = {
  article: sampleArticle2,
};

export const sampleListOfArticles = [
  sampleArticle, { ...sampleArticle, id: 2 }, { ...sampleArticle, id: 3 },
  { ...sampleArticle, id: 4 }, { ...sampleArticle, id: 5 }, { ...sampleArticle, id: 6 },
  { ...sampleArticle, id: 7 }, { ...sampleArticle, id: 8 }, { ...sampleArticle, id: 9 },
];

export const tempProfile = {
  username: localStorage.getItem('username'),
  first_name: 'You!',
  last_name: '',
  image: 'https://iviidev.info/downloads/images/you.jpg',
  isFollowee: false,
};

export default initialState;
