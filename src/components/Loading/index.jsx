import LoadingBar from 'react-redux-loading-bar';

export default function Loading() {
  return (
    <div>
      <LoadingBar className="loading" maxProgress={100} progressIncrease={10} />
    </div>
  );
}
