/// This file implements a helper function for server requests handling -> HTTP Requests

import { asyncImportWrapper } from './codeWrappers.js';

/**
 * Universal http request handler
 */
const httpRequestHelper = asyncImportWrapper(
  /**
   * Universal http request handler
   * @param {string} requestUrl Request url to the server handler
   * @param {T | any} submitData FormData object or normal obejct{}
   * @param {{requestMethod: string, dataType: 'normal' | 'attachement', allowRedirect: boolean, redirectUrl: string}} configOptions
   * @returns { Promise<T> | Promise<Error>} An error object or a success object
   */
  async function (
    requestUrl,
    submitData,
    configOptions = {
      requestMethod: '',
      dataType: '',
      allowRedirect: false,
      redirectUrl: '',
    }
  ) {
    // Get parameters
    //const {requestUrl, submitData, configOptions}
    console.log(arguments[0]);
    let [url, data, options] = arguments[0];

    // Intialize configs
    const { requestMethod, dataType, allowRedirect, redirectUrl } = {
      ...(options
        ? {
            allowRedirect: false,
            redirectUrl: '/',
            ...options,
          }
        : {
            allowRedirect: false,
            redirectUrl: '/',
          }),
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
    const response = await fetch(url, requestOptions);

    /// Convert request to readable string
    const res = await response.json();

    /// Check for response errors
    if (res.status !== 'success') {
      throw new Error(res);
    }

    /// Successful request -> send response to backend
    if (!allowRedirect) return res;

    // Redirect to /sys-admin
    // TODO: Redirect /sys-admin
    if (allowRedirect) {
      location.replace(redirectUrl);
    }
  },
  {
    allowErrorThrow: true,
  }
);

/// Export feature
export default httpRequestHelper;
