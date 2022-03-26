/// This file implements a helper function for server requests handling -> HTTP Requests

import { errorWrapper } from './handleErrors.js';

/**
 * Universal http request handler
 * @param {string} requestUrl Request url to the server handler
 * @param {{sendPlainResponse: boolean, submitData : T | any, requestMethod: string, dataType: 'normal' | 'attachement', allowRedirect: boolean, redirectUrl: string}} configOptions
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
  return errorWrapper(async () => {
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
      submitData: data,
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
            body: JSON.stringify(data),
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
            body: data,
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

    /// Convert request to readable string
    if (!sendPlainResponse) {
      const res = await response.json();

      /// Check for response errors
      if (res.status !== 'success') throw new Error(res);

      /// Successful request -> send response to backend
      if (!allowRedirect) return res;
    }

    if (!allowRedirect && sendPlainResponse) return response;

    // Redirect to /sys-admin
    // TODO: Redirect /sys-admin
    if (allowRedirect) {
      location.replace(redirectUrl);
    }
  });
};

/// Export feature
export default httpRequestHelper;
