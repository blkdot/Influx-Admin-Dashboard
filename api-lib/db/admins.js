import { hashPassword } from '../../lib/auth'
import prisma from '../../prisma/index'
// export async function findAdminById(db, id) {
//   const admins = await db
//     .collection('AdminAccounts')
//     .aggregate([
//       { $match: { _id: new ObjectId(id) } },
//       { $limit: 1 },
//     ])
//     .toArray();
//   if (!admins[0]) return null;
//   return admins[0];
// }

// export async function findAdminByEmail(db, email) {
//   const admins = await db
//     .collection('AdminAccounts')
//     .aggregate([
//       { $match: { email: email } },
//       { $limit: 1 },
//     ])
//     .toArray();
//   if (!admins[0]) return null;
//   return admins[0];
// }

export async function getAdmins() {
  try {
    const admins = await prisma.adminUser.findMany();
    return admins;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function insertAdmin(email, password, role) {
  const hashedPassword = await hashPassword(password);
  const adminData = {
    email,
    password: hashedPassword,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    const admin = await prisma.adminUser.create({
      data: adminData
    })
    return admin;
  } catch(error) {
    console.log(error);
    return null;
  }
}

// export async function updateAdminById(db, id, { email, password, role, role_create_account, role_delete_account, role_manage_content, role_update_presale_ratings, role_view_user_data }) {
//   const hashedPassword = await hashPassword(password);
//   const admin = {
//     email,
//     password: hashedPassword,
//     role,
//     role_create_account,
//     role_delete_account,
//     role_manage_content,
//     role_update_presale_ratings,
//     role_view_user_data,
//     updatedAt: new Date()
//   };
  
//   return db
//     .collection('AdminAccounts')
//     .findOneAndUpdate(
//       { _id: new ObjectId(id) },
//       { $set: admin },
//     )
// }

// export async function updateAdminByEmail(db, email, { loggedIn }) {
//   return db
//     .collection('AdminAccounts')
//     .findOneAndUpdate(
//       { email: email },
//       { $set: {loggedIn: loggedIn} },
//     )
// }

export async function deleteAdminById(id) {
  try {
    const deleteAdmin = await prisma.adminUser.delete({
      where: {
        id: id,
      },
    })
    return deleteAdmin;
  } catch (error) {
    console.log(error);
    return null;
  }
}