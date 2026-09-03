import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation-types';

// Initialize the module (needs to be done only once)
const getErrorList = (data: any) => {
  const { message, errors } = data;
  let concatenatedMessages: any = null;
  console.log('errors=>>::', errors);

  if (typeof errors === 'object' && Object.keys(errors)?.length) {
    concatenatedMessages = errors
      ? Object.values(message)?.flat()?.join(', ')
      : null;
  } else if (typeof message === 'string') return message;
  concatenatedMessages = message
    ? Object.values(message)?.flat()?.join(', ')
    : null;

  console.log(concatenatedMessages);
  return concatenatedMessages;
};
export const horizontalAnimation: any = {
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export const UTILS = {
  resetStack: (props: NavigationProps, routeName: string, params?: object) => {
    props?.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: routeName,
            params: params,
          },
        ],
      }),
    );
  },

  getItem: async (key: string) => {
    try {
      const res = await AsyncStorage.getItem(key);
      return res;
    } catch (error) {
      console.log('error=>', error);
      return null;
    }
  },

  setItem: async (key: string, data: string) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.log('error=>', error);
      return null;
    }
  },
  clearStorage: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('error=>', error);
      return null;
    }
  },
  getFormData: (object: any) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  },
  returnError: (error: any) => {
    try {
      // Case 1: If `_response` is present in `error.response.request`
      if (error?.response?.request) {
        let { _response } = error?.response?.request;
        console.log('FACTORY ERRORS :: ', JSON.parse(_response));
        const temp = JSON.parse(_response);
        const resp = getErrorList(temp);

        // Clean up the response message if it has unnecessary commas and spaces
        if (typeof resp === 'string') {
          return resp.replace(/,\s?/g, '').trim(); // Remove commas and spaces
        }
        return resp;
      }

      // Case 2: Handle errors from `error.response.data`
      if (error?.response) {
        console.log('Error response data:', error.response.data);
        console.log('Status code:', error.response.status);

        const errorMessage =
          error.response.data?.errors || error.response.data?.message;
        if (typeof errorMessage === 'string') {
          // Clean up any unwanted spaces and commas between characters
          return errorMessage.replace(/,\s?/g, '').trim();
        }
        return `${error.response.status}`;
      }

      // Case 3: If there's no response, but request was made
      if (error?.request) {
        console.log('Request made, no response:', error.request);
        return 'No response received from server.';
      }

      // Case 4: Unexpected error
      console.log('Unexpected Error:', error.message);
      return error.message?.replace(/,\s?/g, '').trim() || error.code;
    } catch (e) {
      console.error('Error while parsing error response:', e);
      return 'An unexpected error occurred';
    }
  },
};
