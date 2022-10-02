import { ValidateProps } from '../../../../api-lib/constants';
// import { findAdminById, getAdmins, insertAdmin, deleteAdminById } from '../../../../api-lib/db';
import { validateBody } from '../../../../api-lib/middlewares';
import { ncOpts } from '../../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

// handler.get(async (req, res) => {
//   const admin = await findAdminById(req.db, parseInt(req.query.adminId));
//   if (!admin) {
//     return res.status(404).json({ error: { message: 'Admin is not found GET.' } });
//   }

//   const admins = await getAdmins(
//     req.db
//   );

//   return res.json({ admins });
// });

// handler.post(
//   validateBody({
//     type: 'object',
//     properties: {
//       email: ValidateProps.admin.email,
//       password: ValidateProps.admin.password,
//       role: ValidateProps.admin.role,
//     },
//     required: ['email'],
//     additionalProperties: false,
//   }),
//   async (req, res) => {
//     if (!req.user) {
//       return res.status(401).end();
//     }

//     const email = req.body.email;
//     const password = req.body.password;
//     const role = req.body.role;
//     const role_create_account = req.body.role_create_account;
//     const role_delete_account = req.body.role_delete_account;
//     const role_manage_content = req.body.role_manage_content;
//     const role_update_presale_ratings = req.body.role_update_presale_ratings;
//     const role_view_user_data = req.body.role_view_user_data;

//     const admin = await findAdminById(req.db, req.query._id);

//     if (!admin) {
//       return res.status(404).json({ error: { message: 'Admin is not found POST.' } });
//     }

//     const admins = await insertAdmin(req.db, {
//       email, password, role, role_create_account, role_delete_account, role_manage_content, role_update_presale_ratings, role_view_user_data
//     });

//     return res.json({ admins });
//   }
// );

export default handler;
