import "./Tile.css";

function Tile(props) {
  const handleClick = () => {
    // console.log(props.tile.src, "clicked");
    if (!props.disabled) props.handleChoice(props.tile);
  };

  return (
    <div className="tile" key={props.tile.id}>
      <div className={props.flipped ? "flipped" : ""}>
        <img className="front" src={props.tile.src} alt="card front"></img>
        <img
          className="back"
          src="/img/cover.png"
          alt="card back"
          onClick={handleClick}
        ></img>
      </div>
    </div>
  );
}

export default Tile;
