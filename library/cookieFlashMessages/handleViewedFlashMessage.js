import filterMsgAndSendCookieMsg from './filterMsgAndSendCookieMsg.js';

/**
 * Validate Incoming body
 * @param {{viewStatus: 'viewed' | 'pending',  showOnPage: string, message: string,action: string,removeAfter: 'shown' | 'timeExpires', messageType: 'info' | 'warning' | 'success' | 'error', expiresIn: Date,createdAt: Date, }} body Body from client request (Notifying to delete flash message because is now shown)
 * @returns
 */
const validateIncomingFlashBody = body => {
  /// Check if Body is set
  if (!body) return false;

  /// Type check the incoming body type
  if (
    typeof body === 'string' ||
    Array.isArray(body) ||
    typeof body === 'number' ||
    typeof body === 'boolean'
  )
    return false;

  /// Check if body has the right fields
  const expectingObjProperties = [
    'message',
    'messageType',
    'action',
    'removeAfter',
    'expiresIn',
    'showOnPage',
    'createdAt',
    'viewStatus',
  ];

  const bodyProperties = Object.keys(body);

  const foundDifferentProperties = bodyProperties.filter(bodypro => {
    if (!expectingObjProperties.find(el => bodypro === el)) return true;
  });

  if (foundDifferentProperties.length > 0) return false;

  // No errors
  return true;
};

/**
 *
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @returns {Boolean} Report whether we have a flash message shown
 */
const handleViewedFlashMessage = (req = Request, res = Response) => {
  if (req.originalUrl === '/viewed-flash-message' && req.method === 'POST') {
    const body = req.body;

    /// Validate body structure
    const validationStatus = validateIncomingFlashBody(body);
    if (!validationStatus) return false; // Request failed

    /// Mark incoming cookie to be removed from the cookie messages
    req.flashMessageToRemove = body;

    // Filter the marked cookie for removal
    filterMsgAndSendCookieMsg(req, res);

    /// Send a successful response
    res.status(200).json({ status: 'success' });

    return true;
  }

  /// Still Filter message and send cookie even if no response was received
  filterMsgAndSendCookieMsg(req, res);

  return false;
};

// Export
export default handleViewedFlashMessage;
