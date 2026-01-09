export default function WonPreview({ onClick }) {
  return (
    <div className="winning__wrapper">
      <h2 className="won__title">CONGRATULATIONS!</h2>
      <p className="win__text">
        You won the Memory game without clicking on any GIF twice. If you want
        to try playing this game by choosing another interesting GIF topic or
        trying to test your knowledge again, you can click on the restart
        button.
      </p>
      <button type="button" onClick={onClick}>Restart the game</button>
    </div>
  );
}
