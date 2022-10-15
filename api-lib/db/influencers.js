import { hashPassword } from '../../lib/auth'
import { fetcher } from "../../lib/fetch"

export async function getInfluencerById(id) {
  try {
    let influencer = await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return influencer;
  } catch (error) {
    console.log(error);
    return null;
  }
}

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

export async function getInfluencers() {
  try {
    let influencers = await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return influencers;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function insertInfluencer(name, email, logo, region, language, isVIP, enagementRate, loginChannel, mainChannel, contactLink, niche,
  promotionType, telegramUsername, telegramUrl, twitterUsername, twitterUrl, tiktokUsername, tiktokUrl, instagramUsername, instagramUrl, youtubeUsername, youtubeUrl) {
    try {
      let influencer = await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, logo, region, language, isVIP, enagementRate, loginChannel, mainChannel, contactLink, niche,
          promotionType, telegramUsername, telegramUrl, twitterUsername, twitterUrl, tiktokUsername, tiktokUrl, instagramUsername, instagramUrl, youtubeUsername, youtubeUrl
        })
      });
      return influencer;
    } catch (error) {
      console.log(error);
      return null;
    }
}

// export async function updateInfluencer(name, email, logo, region, language, isVIP, enagementRate, loginChannel, mainChannel, contactLink, niche,
//   promotionType, telegramUsername, telegramUrl, twitterUsername, twitterUrl, tiktokUsername, tiktokUrl, instagramUsername, instagramUrl, youtubeUsername, youtubeUrl) {
//     try {
//       let influencer = await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name, email, logo, region, language, isVIP, enagementRate, loginChannel, mainChannel, contactLink, niche,
//           promotionType, telegramUsername, telegramUrl, twitterUsername, twitterUrl, tiktokUsername, tiktokUrl, instagramUsername, instagramUrl, youtubeUsername, youtubeUrl
//         })
//       });
//       return influencer;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
// }

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

export async function deleteInfluencerById(id) {
  try {
    let influencer = await fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/influencers/${id}`, {
      method: 'DELETE',
    });
    return influencer;
  } catch (error) {
    console.log(error);
    return null;
  }
}