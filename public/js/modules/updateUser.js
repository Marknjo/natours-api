import { asyncErrorWrapper } from '../utils/handleErrors';
import httpRequestsHelper, {
  handleHttpErrors,
} from '../utils/httpRequestsHelper';
import redirectTo from '../utils/redirectsHelper';

const updateUser = formEl => {
  asyncErrorWrapper(
    async () => {
      // get form data
      const formData = new FormData(formEl);
      const name = formData.get('name');
      const email = formData.get('email');

      // Validata user inputs
      if (!name || !email) {
        throw new Error('Name and Email requred in the field.');
      }

      const url = '/api/v1/users/update-me';

      formData.delete(name);

      // send form data
      const response = await httpRequestsHelper(url, {
        sendPlainResponse: true,
        submitData: formData,
        requestMethod: 'PATCH',
        dataType: 'attachment',
      });

      /// susccess response
      await handleHttpErrors(response, 'Could not update form data!');

      // If no error
      redirectTo('/sys-admin/profile', {
        redirectOption: 'pageRefresh',
      });
    },
    {
      message: 'Updating User data failed!',
    },
    {
      displayPosition: 'right',
      action: 'Invalid Inputs',
    }
  );
};

export default updateUser;
