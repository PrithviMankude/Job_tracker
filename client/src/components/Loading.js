const Loading = ({ centre }) => {
  return <div className={centre ? 'loading loading-centre' : 'loading'}></div>;
};
export default Loading;
