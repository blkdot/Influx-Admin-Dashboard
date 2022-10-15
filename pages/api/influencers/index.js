import { ValidateProps } from '../../../api-lib/constants';
import { getInfluencers, insertInfluencer } from '../../../api-lib/db';
import { validateBody } from '../../../api-lib/middlewares';
import { ncOpts } from '../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const influencers = await getInfluencers();
  return res.json({ influencers });
});

handler.post(
  async (req, res) => {
    const { 
      name, email, logo, region, language, isVIP, enagementRate, loginChannel, mainChannel, contactLink, niche,
      promotionType, telegramUsername, telegramUrl, twitterUsername, twitterUrl, tiktokUsername, tiktokUrl, instagramUsername, instagramUrl, youtubeUsername, youtubeUrl
    } = req.body
    const influencer = await insertInfluencer(name, email, logo, region, language, isVIP, enagementRate, loginChannel, mainChannel, contactLink, niche,
      promotionType, telegramUsername, telegramUrl, twitterUsername, twitterUrl, tiktokUsername, tiktokUrl, instagramUsername, instagramUrl, youtubeUsername, youtubeUrl);
    return res.json({ influencer });
  }
);

export default handler;
