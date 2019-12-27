export default {
    ALL_VIDEOS: /(?<=a href=")(.*\/episodio\/.*)(?=">)/g,
    PAGE_VIDEO: /(?<=source src=")(https:\/\/videos.*)(?=" type="video\/mp4")/g
};