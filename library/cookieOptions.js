import { env } from 'process';

/**
 * Helper function for setting cookies options
 * @param {Request} req Express Request
 * @param {{remember: boolean, allowRemember: boolean, customExpiresAt: number}} configOptions Cofiguration options -> Remember for login users or sining, and custom expires for custom cases where time is to be set
 * @returns {T as object} -> Returns nothing. It is just a configuration utility
 */
const setCookieOptions = (
  req,
  configOptions = { allowRemember: false, remember: false, customExpiresIn: 1 }
) => {
  // Initialize configs
  const { customExpiresAt, remember, allowRemember } = {
    ...(configOptions
      ? {
          allowRemember: false,
          remember: false,
          customExpiresIn: 1,
          ...configOptions,
        }
      : { allowRemember: false, remember: false, customExpiresIn: 1 }),
  };

  // Set timers
  let expiresIn = new Date(Date.now() + customExpiresAt);

  /// Handle login and signup cases -> remember me
  if (allowRemember) {
    expiresIn = remember
      ? new Date(Date.now() + 7 * 24 * 60 * 1000)
      : new Date(Date.now() + 24 * 60 * 1000);
  }

  /// Define cookie options
  const cookieOptions = {
    expires: expiresIn,
    httpOnly: true,
    sameSite: true,
  };

  // Secure cookie check
  // TODO: Requires more finetuning to handle live site
  if (req.protocol === 'https' && env.NODE_ENV === 'production')
    cookieOptions.secure = true;

  // Set cookie
  return cookieOptions;
};

export default setCookieOptions;
