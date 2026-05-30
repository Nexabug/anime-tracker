function Panel({ children, style = "" }) {
  return <div className={`Component ${style}`}>{children}</div>;
}

export default Panel;
