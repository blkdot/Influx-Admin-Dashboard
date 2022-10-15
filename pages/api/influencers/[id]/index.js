import { ncOpts } from '../../../../api-lib/nc';
import nc from 'next-connect';
import { fetcher } from "../../../../lib/fetch";

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  try {
    let influencer = await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers/${req.query.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json({ influencer });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: { message: 'influencer is not found GET.' } });
  }
});

handler.delete(
  async (req, res) => {
    try {
      let influencer = await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers/${req.query.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      return res.json({ influencer });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: { message: 'influencer is not found DELETE.' } });
    }
  }
);

handler.patch(
  async (req, res) => {
    try {
      let influencer = await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers/${req.query.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: req.body
      });
      return res.json({ influencer });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: { message: 'influencer is not found PATCH.' } });
    }
  }
);

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
