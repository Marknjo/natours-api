import { asyncErrorWrapper } from '../utils/handleErrors';
import httpRequestsHelper, {
  handleHttpErrors,
} from '../utils/httpRequestsHelper';
import redirectTo from '../utils/redirectsHelper';

const updateUserPassword = formEl => {
  asyncErrorWrapper(
    async () => {
      const getSubmitBtnEl = formEl.querySelector('.btn');

      getSubmitBtnEl.innerText = 'Updating Password...';

      // get form data
      const formData = new FormData(formEl);
      const passwordCurrent = formData.get('passwordCurrent');
      const passwordConfirm = formData.get('passwordConfirm');
      const password = formData.get('password');

      // Validata user inputs
      if (!password || !passwordConfirm || !passwordCurrent) {
        throw new Error(
          'One of the password fields is empty, ensure all fields have valid inputs'
        );
      }

      // Prep send data
      const url = '/api/v1/users/update-password';
      const submitData = {
        password,
        passwordConfirm,
        passwordCurrent,
      };

      // send form data
      const response = await httpRequestsHelper(url, {
        sendPlainResponse: true,
        submitData,
        requestMethod: 'PATCH',
        dataType: 'normal',
      });

      // /// susccess response
      await handleHttpErrors(response, 'Could not update your password!');

      // // If no error
      redirectTo('/sys-admin/profile', {
        redirectOption: 'pageRefresh',
      });
    },
    {},
    {
      displayPosition: 'right',
      action: 'Invalid Inputs',
    }
  );
};

export default updateUserPassword;
