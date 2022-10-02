import { ValidateProps } from '../../../api-lib/constants';
import { getAdmins, insertAdmin, deleteAdminById } from '../../../api-lib/db';
import { validateBody } from '../../../api-lib/middlewares';
import { ncOpts } from '../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const admins = await getAdmins();
  return res.json({ admins });
});

handler.post(
  validateBody({
    type: 'object',
    properties: {
      email: ValidateProps.admin.email,
      password: ValidateProps.admin.password,
      role: ValidateProps.admin.role,
    },
    required: ['email'],
    additionalProperties: true,
  }),
  async (req, res) => {
    const { email, password, role } = req.body
    const admin = await insertAdmin(email, password, role);
    return res.json({ admin });
  }
);

// handler.patch(
//   // validateBody({
//   //   type: 'object',
//   //   properties: {
//   //     email: ValidateProps.admin.email,
//   //   },
//   //   required: ['email'],
//   //   additionalProperties: true,
//   // }),
//   async (req, res) => {
//     const { email, loggedIn } = req.body;
//     const admin = await updateAdminByEmail(req.db, email, { loggedIn });

//     res.json({ admin });
//   }
// );

handler.delete(
  async (req, res) => {

    const { id  } = req.body;
   
    const admin = await deleteAdminById(id);

    res.json({ admin });
  }
);

export default handler;
