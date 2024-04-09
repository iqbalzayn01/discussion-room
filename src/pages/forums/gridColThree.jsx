import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function GridColThree({ users, isLoading }) {
  const limitedUsers = users.slice(0, 7);

  return (
    <div className="col-span-1 flex flex-col">
      <div className="flex flex-col gap-5 bg-white p-5 rounded-lg">
        <p className="font-medium text-lg">Leaderboards</p>

        <ul className="flex flex-col gap-5">
          {isLoading ? (
            <li>
              <p className="text-black">Loading . . .</p>
            </li>
          ) : (
            limitedUsers.map((user) => {
              const avatarWithoutSpaces = user.avatar.replace(/\s/g, "");
              return (
                <li key={user.id} className="flex items-center gap-3">
                  <span
                    className="w-[36px] h-[36px] rounded-full"
                    style={{
                      backgroundImage: `url(${avatarWithoutSpaces})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></span>
                  <p className="text-sm">{user.name}</p>
                </li>
              );
            })
          )}
        </ul>
        <Link to="/#see-all" className="self-end hover:text-gray-500">
          See all
        </Link>
      </div>
    </div>
  );
}

GridColThree.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
};
