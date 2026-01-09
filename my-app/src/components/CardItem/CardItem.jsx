export default function CardItem({ picture, shuffledArray }) {
    return (
        <li className="card__item">
     <img className="gif" onClick={() => shuffledArray(picture.id)} src={picture.images.fixed_height.url} alt={picture.title} />
     <p className="gif__text">{picture.title}</p>
        </li>
    )
}