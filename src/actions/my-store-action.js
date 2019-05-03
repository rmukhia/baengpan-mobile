import { Platform } from 'react-native';
import axios from 'axios';
import { API } from '../constants/rest-gateway';
import { getFilenameFromURI, getTypeFromImage } from '../utils/helpers';
import { errorAction, setApplicationPropertyAction } from './application-state-actions';


/* Set my store items */
export const setMyStoreItemsAction = items => ({
  type: 'set-my-store-items-action',
  payload: items,
});

/* Returns Promise. type is 0 for product 1 for service */
export const uploadToMyStoreAction = (
  productName,
  description,
  quantity,
  price,
  type,
  image,
) => (dispatch) => {
  // eslint-disable-next-line no-undef
  const data = new FormData();
  data.append('name', productName);
  data.append('description', description);
  data.append('quantity', quantity);
  data.append('price', price);
  data.append('type', type);
  data.append('image', {
    name: getFilenameFromURI(image.uri),
    type: getTypeFromImage(image),
    uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
  });

  return axios.post(API.uploadToMyStore(), data)
    .then((response) => {
      if (!response.data.success) throw new Error('Request not successful!');
    })
    .catch((error) => {
      dispatch(errorAction(error.message));
      return Promise.reject(error);
    });
};


/* Returns promise after loading */
export const getAllMyStoreItemsAction = () => dispatch => axios.get(API.getAllMyStoreItems())
  .then((response) => {
    if (!response.data.success) throw new Error('Request not successful!');
    dispatch(setMyStoreItemsAction(response.data.items));
  })
  .catch((error) => {
    dispatch(errorAction(error.message));
    return Promise.reject(error);
  });
