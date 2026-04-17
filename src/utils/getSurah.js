

export const getAllSurah = async () => {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/index.json');
    
    if (!response.ok) {
      throw new Error(' Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return []; 
  }
};


// get surah details by id
// utils/getSurahDetails.js

export const getSurahDetails = async (chapterNumber) => {
  try {
    const response = await fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/${chapterNumber}.json`);
    
    if (!response.ok) {
      throw new Error(' Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching surah:", error);
    return null;
  }
};
