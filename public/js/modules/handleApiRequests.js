// Promise timeout
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Send A GET or POST Request request to server
 * @param {Object{url: String, method: String, isFileUpload: Boolean}} options URL and Request type to post the data
 * @param {Object} data Requires to have submit data to the server
 * @return {Void}
 */
const handlerApiRequests = async function (
  options = { url: '', method: '', isFileUpload: false },
  uploadData
) {
  try {
    const responseOptions = options.isFileUpload
      ? {
          body: uploadData,
        }
      : {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        };

    const fetchType = uploadData
      ? fetch(options.url, {
          method: options.method,
          ...responseOptions,
        })
      : fetch(options.url);

    const response = await Promise.race([timeout(5000), fetchType]);

    //convert to JSON -> Get data
    const data = await response.json();

    // Handle success message
    if (data.status === 'fail' || data.status !== 'success')
      throw new Error(data.message);

    // signifies success message
    return data;
  } catch (error) {
    // Display Error message
    throw error;
  }
};

export default handlerApiRequests;
