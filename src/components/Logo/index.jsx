export default function Logo() {
  return (
    <h1 className="flex items-center justify-center gap-2 font-semibold text-3xl text-black dark:text-white">
      <svg
        width="60"
        height="60"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M46 23C46 35.7025 35.7025 46 23 46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23ZM38 13C38 15.7614 35.7614 18 33 18C30.2386 18 28 15.7614 28 13C28 10.2386 30.2386 8 33 8C35.7614 8 38 10.2386 38 13ZM18 38C23.5228 38 28 33.5228 28 28C28 22.4772 23.5228 18 18 18C12.4772 18 8 22.4772 8 28C8 33.5228 12.4772 38 18 38Z"
          fill="url(#paint0_linear_104_10)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_104_10"
            x1="0"
            y1="23"
            x2="46"
            y2="23"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF6A48" />
            <stop offset="1" stopColor="#6248FF" />
          </linearGradient>
        </defs>
      </svg>
      Discussion
      <br />
      Room
    </h1>
  );
}
