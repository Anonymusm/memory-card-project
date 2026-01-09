import { useEffect, useState } from "react";
import Board from "../Board/Board";
import CardList from "../CardList/CardList";
import SearchedPic from "../SearchedPic/SearchedPic";
import WonPreview from "../WonPreview/WonPreview";

//   function shuffledArray() {
//         const shuffled = [...pictures];

//     for (let lastElementIndex = shuffled.length - 1; lastElementIndex >= 0; lastElementIndex--) {
//         const randomOrder = Math.floor(Math.random() * i + 1);
//     }
//     setPictures(randomOrder)
//   }

export default function MemoryCardContainer() {
  const currentStatus = {
    UNPLAYING: "unplaying",
    PLAYING: "playing",
    WON: "won",
  };

  const [pictures, setPictures] = useState([]);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Початкове значення false, бо тільки після натискання на кнопку пошуку наш loading має змінитися на тру. після відповіді від сервера він гарантовано зміниться на false
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(currentStatus.UNPLAYING); // на початку наш статус є "не граю", потім він буде змінюватися -- злежно від того, що трапилося в застосунку

  const URL = "https://api.giphy.com/v1/gifs/search";
  const API_KEY = "59YCxHgCAOSbfHMzvyOMWqtv2ojbeLoU";
  const LIMIT = 12;

  function handleReStartClick() {
    setStatus(currentStatus.UNPLAYING);
    setHistory([]);
    setScore(0);
    setBestScore(0);
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function shuffledArray(id) {
    setHistory((prev) => [...prev, id]);
    const shuffled = [...pictures]; // копія масиву через оператор spread

    for (let i = shuffled.length - 1; i > 0; i--) {
      // беремо рандомне оркгулене значення від 0 до максимального індекса(i(11))
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // наш масив стане на рондомні місця
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }

    // змінюємо стан нашого масиву фоток на shuffled, який буде змінюватися під час взаємодії з користувачем
    setPictures(shuffled);
  }

  useEffect(() => {
    if (history.length === 0) return; // якщо історія порожня(ще не клацалися гіфки), то закінчиться

    const lastId = history[history.length - 1]; // отримуємо наш минулий айдішнік віднімаючи один від поточної довжини масиву, щоб отримати не поточний айді, а минулий
    const previousHistory = history.slice(0, -1); // не знаю, поясни

    if (previousHistory.includes(lastId)) {
      setScore(0); //
      setHistory([]);
    } else {
      setBestScore((prev) => Math.max(prev, score + 1));
      setScore((prev) => prev + 1); // якщо було натиснуто на гіфку, яку не було натиснуто, то минуле значення скор зміниться на + 1
    }

    if (score + 1 === pictures.length) {
      setStatus(currentStatus.WON); // виграв -- статус зміниться
    }
  }, [history]);

  //
  function handleSearchClick() {
    if (!query.trim()) return; // якщо поле порожнє(false), то нічого не повертай(закінчуй роботу)

    setQuery("");
    setIsLoading(true);
    //
    setPictures([]);

    fetch(`${URL}?api_key=${API_KEY}&q=${query}&limit=${LIMIT}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load gifs.");
        return res.json();
      })
      .then((json) => {
        setPictures(json.data || []);
        setStatus(currentStatus.PLAYING); // якщо нам прилітають дані у масив, то статус зміниться на "грається"
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  return (
    <div className="container">
      {/* умовні рендери для грузіння та для випадку, якщо після пошуку не було знайдено гіфок */}
      {isLoading && <p className="loading__text">Loading...</p>}
      {pictures.length === 0 && status === "playing" && <p>No GIFs found.</p>}

      {/* умовний рендеринг. якщо статус "не грається", то повертається компонент з інпутом */}
      {status === currentStatus.UNPLAYING && (
        <SearchedPic
          onChange={handleChange}
          value={query}
          onClick={handleSearchClick}
        />
      )}

      {/* умовний рендеринг. якщо статус "грається", то побачимо компонент скору та списка */}
    {status === currentStatus.PLAYING && pictures.length > 0 && (
  <>
    <Board score={score} bestScore={bestScore} />
    <div className="white-section"> 
      <CardList
        pictures={pictures}
        shuffledArray={shuffledArray}
      />
      <button
        className="restart-btn"
        type="button"
        onClick={handleReStartClick}
      >
        Restart Game
      </button>
    </div>
  </>
)}

      {/* якщо ми перемогли, то побаимо переможній компонент, у якому буде кнопка, після натискання на яку спрацює передана через пропси функція обробника подій та статус зміниться на "на грається"(покажеться компннет інпута)" */}
      {status === currentStatus.WON && pictures.length > 0 && (
        <WonPreview onClick={handleReStartClick} />
      )}
    </div>
  );
}
