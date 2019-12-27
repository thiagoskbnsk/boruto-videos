import { get } from '../../utils/api/base';
import constants from '../../utils/constants';
import regexes from '../../utils/regexes';

export const getVideos = async () => {
    const { SITE_DEFAULT_BORUTO } = constants;
    const { ALL_VIDEOS } = regexes;

    const borutoSite = await get(`https://cors-anywhere.herokuapp.com/${SITE_DEFAULT_BORUTO}`);
    const bodyString = await borutoSite.text();

    const videos = bodyString.match(ALL_VIDEOS);

    return videos;
}

export const getVideo = async (url) => {
    const { PAGE_VIDEO } = regexes;

    const borutoSite = await get(`https://cors-anywhere.herokuapp.com/${url}`);
    const bodyString = await borutoSite.text();

    const video = bodyString.match(PAGE_VIDEO);

    return video ? video[0] : Math.random();
} 