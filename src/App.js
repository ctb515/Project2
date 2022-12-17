import { useState } from 'react';
import './styles.css';

const translations = [
  'Yoda',
  'Pirate',
  'Valspeak',
  'Minion',
  'Ferb-latin',
  'Pig-latin',
  'Dothraki',
  'Valyrian',
  'Hodor',
  'Sindarin',
  'Quenya',
  'Orcish',
  'Sith',
  'Cheunh',
  'Gungan',
  'Mandalorian',
  'Huttese',
  'Chef',
  'Catalan',
  'Oldenglish',
  'Shakespeare',
  'Vulcan',
  'Klingon',
  'Romulan',
  'Dovahzul',
  'Thuum',
  'Aldmeris',
  'Groot',
  'Jive',
  'Ebonics',
  'Dolan',
  'Fudd',
  'Kraut',
  'Wow',
  'Cockney',
  'Norfolk',
  'Morse',
  'Us2uk',
  'Uk2us',
  'Leetspeak',
  'Brooklyn',
  'Ermahgerd',
  'Australian',
  'Boston',
  'Austrian',
  'Article_rewrite',
  'Braille',
  'Numbers',
  'Emoji',
  'Doge',
  'Navi',
  'Southern-accent',
  'Ubbi-dubbi',
  'Inflationary-english',
  'George-bush-dubya',
  'Post-modern',
  'Ayleidoon',
  'Redneck',
  'Roman-numerals',
  'Asian-accent',
  'Russian-accent',
  'English-contraction',
  'Irish',
  'British',
  'German-accent',
  'Draconic',
  'Enderman',
  'Wheel-of-time-old-tongue',
];

const giphyAPIKey = 'LtOUS8j6Pf0jfm3AF2Jd6yVo3mPHJ6gZ';

const App = () => {
  const [toTranslate, setToTranslate] = useState('');
  const [translation, setTranslation] = useState('');
  const [language, setLanguage] = useState(translations[0]);
  const [img, setImg] = useState('');

  const fetchTranslation = async () => {
    await fetch(
      `https://api.funtranslations.com/translate/${language}.json?text=${encodeURIComponent(
        toTranslate
      )}`,
      {
        Method: 'POST',
      }
    )
      .then((response) => response.json())
      .then((data) => setTranslation(data.contents.translated));
  };

  const fetchGIF = async () => {
    await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${language}&limit=1&offset=0&rating=g&lang=en`
    )
      .then((response) => response.json())
      .then((data) => {
        setImg(`https://giphy.com/embed/${data.data[0].id}`);
      });
  };

  const handleTranslate = async () => {
    await fetchTranslation().then(async () => fetchGIF());
  };

  return (
    <div className="App">
      <h1>Funny Translator</h1>
      <div className="flex-container">
        <form>
          <div className="flex-item">
            <div className="grid-container">
              <div className="grid-item">
                <label for="cars">Choose a language:</label>
              </div>
              <div className="grid-item">
                <select
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                  value={language}
                >
                  {translations.map((translation) => (
                    <option value={translation.toLowerCase()}>
                      {translation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex-item">
            <label for="writing"> Type here to translate </label>
          </div>
          <div className="flex-item">
            <input
              value={toTranslate}
              onChange={(e) => setToTranslate(e.target.value)}
            />
          </div>
          <div className="flex-item">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleTranslate();
              }}
            >
              Translate!
            </button>
          </div>
          <div className="flex-item">{translation}</div>
        </form>
        <div className="flex-item">
          <iframe
            title="gif"
            src={img}
            alt={`this is a gif related to ${language}`}
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
