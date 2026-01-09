import CardItem from "../CardItem/CardItem";

export default function CardList({ pictures, shuffledArray }) {
  return (
    <div>
       <ul className="card__list">
      {pictures.map((pic) => (
        <CardItem key={pic.id} picture={pic} shuffledArray={shuffledArray} />
      ))}
    </ul>
    </div>
  );
}
