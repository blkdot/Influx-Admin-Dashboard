import { hashPassword } from '../../lib/auth'
import prisma from '../../prisma/index'

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