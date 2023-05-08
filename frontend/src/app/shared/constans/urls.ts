const BASE_URL = 'http://localhost:5000';

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_TAG_URL = FOODS_URL + '/tag/';
export const FOODS_BY_ID_URL = FOODS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';


export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';

export const ADMIN_URL = BASE_URL + '/api/admin';
export const ADMIN_ORDER = ADMIN_URL + '/orders';
export const ADMIN_TOTAL_PRICE = ADMIN_URL + '/totalPrice';

export const ADMIN_GET_FOOD = ADMIN_URL + '/get-foods';
export const ADMIN_DELETE_FOOD = ADMIN_URL + '/delete-foods/';
export const ADMIN_POST_FOOD = ADMIN_URL + '/post-foods';
export const ADMIN_PUT_FOOD = ADMIN_URL + '/update-foods/';
export const ADMIN_DETAIL_FOOD = ADMIN_URL + '/detail-foods/';

export const ADMIN_GET_CATEGORY = ADMIN_URL + '/get-categories';
export const ADMIN_DELETE_CATEGORY = ADMIN_URL + '/delete-category/';
export const ADMIN_POST_CATEGORY = ADMIN_URL + '/post-category';
export const ADMIN_PUT_CATEGORY = ADMIN_URL + '/update-category/';
export const ADMIN_DETAIL_CATEGORY = ADMIN_URL + '/detail-category/';

export const ADMIN_USER = ADMIN_URL + '/get-users';
export const ADMIN_DELETE_USER = ADMIN_URL + '/delete-user/';
export const ADMIN_POST_USER = ADMIN_URL + '/post-user';
export const ADMIN_PUT_USER = ADMIN_URL + '/update-user/';
export const ADMIN_DETAIL_USER = ADMIN_URL + '/detail-user/';

export const ADMIN_GET_ORDER = ADMIN_URL + '/get-orders';
export const ADMIN_DETAIL_ORDER = ADMIN_URL + '/detail-order/';
export const ADMIN_PUT_ORDER = ADMIN_URL + '/update-order/';