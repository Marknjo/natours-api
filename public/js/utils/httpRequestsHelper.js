/// This file implements a helper function for server requests handling -> HTTP Requests

import { asyncErrorWrapper } from './handleErrors.js';

/**
 * Handles client side http request error message if there is a successful response but has an error Message
 * @param {Response} response server response object
 * @param {string} errorMessage A message to throw if server does not provide one
 * @returns {Promise<{status: 'string', data: {[prop: string]?: {} | string, errorMessage?: 'string', message?: 'string'}}>} server object with successful message
 */
export const handleHttpErrors = async (response, errorMessage) => {
  const res = await response.json();

  /// Check for response errors
  if (!response.ok && res.status !== 'success') {
    let errMessage = res.data.errorMessage
      ? res.data.errorMessage
      : errorMessage;

    errMessage = res.data.message ? res.data.message : errorMessage;

    throw new Error(errMessage);
  }
  /// Successful request -> send response to backend
  return res;
};

/**
 * Universal http request handler
 * @param {string} requestUrl Request url to the server handler
 * @param {{sendPlainResponse: boolean, submitData : T | any, requestMethod: string, dataType: 'normal' | 'attachment', allowRedirect: boolean, redirectUrl: string}} configOptions
 * @returns { Promise<T> | Promise<Error>} An error object or a success object
 */
const httpRequestHelper = async function (
  requestUrl,
  configOptions = {
    submitData: {},
    requestMethod: '',
    dataType: 'normal',
    allowRedirect: false,
    redirectUrl: '',
    sendPlainResponse: false,
  }
) {
  /// Wrap wit error wrapper
  return asyncErrorWrapper(
    async () => {
      // set default configs
      const defaultConfigs = {
        dataType: 'normal',
        allowRedirect: false,
        redirectUrl: '',
        sendPlainResponse: false,
      };

      // Intialize configs
      const {
        requestMethod,
        submitData,
        dataType,
        allowRedirect,
        redirectUrl,
        sendPlainResponse,
      } = {
        ...defaultConfigs,
        ...configOptions,
      };

      // Intialize request options
      let requestOptions = {
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
        redirect: 'follow',
      };

      /// Handle currently supported http request method method
      switch (requestMethod) {
        //// Handling POST|PATCH|PUT requests
        case 'POST':
        case 'PATCH':
        case 'PUT':
          /// DataType -> normal | attachment

          /// Normal request
          if (dataType === 'normal') {
            requestOptions = {
              method: requestMethod,
              body: JSON.stringify(submitData),
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              ...requestOptions,
            };
          }

          /// Request with attachment
          if (dataType === 'attachment') {
            requestOptions = {
              method: requestMethod,
              body: submitData,
              ...requestOptions,
            };
          }
          break;

        //// HANDLE GET REQUESTS
        case 'GET':
          requestOptions = {
            method: 'GET',
            ...requestOptions,
          };
          break;

        default:
          throw new Error('Method request currently unsupported');
      }

      /// Send fetch
      const response = await fetch(requestUrl, requestOptions);

      if (!allowRedirect && sendPlainResponse) return response;

      // Handle errors
      if (!response.ok && !sendPlainResponse)
        throw new Error('Request unsuccessful ????????????');

      /// Convert request to readable string
      if (!sendPlainResponse) {
        const res = await response.json();

        /// Check for response errors
        if (res.status !== 'success') throw new Error(res);

        /// Successful request -> send response to backend
        if (!allowRedirect) return res;
      }

      // Redirect to /sys-admin
      // TODO: Redirect /sys-admin
      if (allowRedirect) {
        location.replace(redirectUrl);
      }
    },
    { allowErrorThrow: true }
  );
};

/// Export feature
export default httpRequestHelper;
