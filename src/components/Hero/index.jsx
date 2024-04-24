import { useNavigate } from 'react-router-dom';
import CButton from '../CButton';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="container-base px-5">
      <div className="flex w-full h-screen flex-col place-content-center items-center text-center gap-5">
        <h1 className="text-8xl">
          Welcome to Discussion Room: Where Tech Enthusiasts Connect
        </h1>
        <p className="w-full md:w-[426px] text-xl mb-5">
          Join a Community of Technology Enthusiasts, Learn, and Discuss the
          Latest Trends
        </p>
        <CButton
          action={() => {
            navigate('/signup');
          }}
          className="flex items-center justify-center gap-5 bg-black dark:bg-white text-white dark:text-black px-5 py-[14px] rounded-lg"
        >
          <p>Join The Community</p>
          <svg
            width="10"
            height="9"
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.72855 7.40694C8.62705 7.40688 8.52974 7.36653 8.45797 7.29477C8.3862 7.223 8.34586 7.12568 8.3458 7.02419L8.34534 1.44947L1.05547 8.73935C0.983646 8.81117 0.886231 8.85152 0.784657 8.85152C0.683082 8.85152 0.585666 8.81117 0.513842 8.73935C0.442017 8.66752 0.401667 8.57011 0.401667 8.46853C0.401667 8.36696 0.442017 8.26954 0.513842 8.19772L7.80372 0.907846L2.229 0.907394C2.12983 0.903893 2.03588 0.862035 1.96696 0.790638C1.89804 0.719241 1.85952 0.623879 1.85952 0.524643C1.85952 0.425407 1.89804 0.330045 1.96696 0.258648C2.03588 0.187251 2.12983 0.145393 2.229 0.141892L8.72855 0.141892C8.83004 0.141955 8.92736 0.182301 8.99912 0.254067C9.07089 0.325833 9.11124 0.423151 9.1113 0.524643L9.1113 7.02419C9.11123 7.12568 9.07089 7.223 8.99912 7.29477C8.92736 7.36653 8.83004 7.40688 8.72855 7.40694Z"
              fill="white"
            />
          </svg>
        </CButton>
      </div>
    </section>
  );
}
