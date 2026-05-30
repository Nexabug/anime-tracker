function MoreInfoLink({ i }) {
  return (
    <a
      href={i.url}
      className="more-info-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      More Info
    </a>
  );
}

export default MoreInfoLink;
