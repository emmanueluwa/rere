function Influencer(props) {
  return (
    <>
      <h3>influencer {props.name}</h3>
      <p>{props.role ? props.role : "No role"}</p>
    </>
  );
}

export default Influencer;
