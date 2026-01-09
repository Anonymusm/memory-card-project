export default function SearchedPic({ onChange, value, onClick }) {
    return (
        <div className="search">
        <h1 className="memory__title">Memory Card</h1>
        <p className="description">Try not to click the same card twice</p>
        <div className="field__wrapper">
        <label>
            Search:
        <input type="text" onChange={onChange} value={value} placeholder="e.g. Messi"/>
        </label>
        </div>
           <button type="button" onClick={onClick}>Search</button>
        </div>
    )
}