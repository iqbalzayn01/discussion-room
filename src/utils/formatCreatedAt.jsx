export default function formatCreatedAt(createdAt) {
  const postDate = new Date(createdAt);
  const now = new Date();

  const diffTime = now - postDate;
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 1) {
    return `${diffDays} days ago`;
  }
  if (diffHours > 1) {
    return `${diffHours} hours ago`;
  }
  if (diffMinutes > 1) {
    return `${diffMinutes} minutes ago`;
  }
  return `${diffSeconds} seconds ago`;
}
