import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Learderboards({ leaderboards, isLoading }) {
  const limitedUsers = leaderboards.slice(0, 7);

  return (
    <div className="col-span-1 flex flex-col">
      <div className="flex flex-col gap-5 bg-white p-5 rounded-lg">
        <p className="font-medium text-lg">Leaderboards</p>

        <ul className="flex flex-col gap-5">
          <li className="flex items-center justify-between">
            <h6 className="font-medium">Users</h6>
            <h6 className="font-medium">Score</h6>
          </li>
          {isLoading ? (
            <li>
              <p className="text-black">Loading . . .</p>
            </li>
          ) : (
            limitedUsers.map((leaderboard) => {
              const dataLeaderboard = leaderboard.user;
              const avatarWithoutSpaces = dataLeaderboard.avatar.replace(
                /\s/g,
                ''
              );
              return (
                <li
                  key={dataLeaderboard.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-[36px] h-[36px] rounded-full"
                      style={{
                        backgroundImage: `url(${avatarWithoutSpaces})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <p className="text-sm">{dataLeaderboard.name}</p>
                  </div>
                  <p>{leaderboard.score}</p>
                </li>
              );
            })
          )}
        </ul>
        <Link to="/#Leaderboards" className="self-end hover:text-gray-500">
          See all
        </Link>
      </div>
    </div>
  );
}

Learderboards.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      score: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool,
};
