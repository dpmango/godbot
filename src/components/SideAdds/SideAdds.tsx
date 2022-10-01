import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { useAppSelector } from "../../reducers/hooks.store";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const SideAdds: React.FC<{
  setVisible: () => void;
  visible: boolean;
}> = ({ setVisible, visible }) => {
  const [display, setDisplay] = useState("block");
  const { userData } = useAppSelector((state) => state.userState);
  const ctx = useContext(ThemeContext);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setDisplay("none");
      }, 700);
    }
  }, [visible]);

  return (
    <div
      style={{ display }}
      className={visible === true ? "adds" : "adds adds--hidden"}
    >
      {userData?.rank === "Инвестор" ? (
        <div className="adds__cash">
          <p>
            Общий заработок:{" "}
            <span style={{ color: "#EFAD10" }}>$19,481.29</span>
          </p>
          <p>
            Ваш доход: <span style={{ color: "#449C62" }}>$9,481.29</span>
          </p>
          <p>
            Сумма оплаты: <span style={{ color: "#88019E" }}>$8,481.29</span>
          </p>
        </div>
      ) : (
        <a className="adds__link" href="#">
          <svg
            width="25"
            height="20"
            viewBox="0 0 25 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.65904 8.60987C8.13728 5.78741 12.4571 3.92667 14.6186 3.02765C20.7899 0.460774 22.0723 0.0148807 22.9081 0.000156987C23.0919 -0.00308132 23.503 0.0424773 23.7692 0.25852C23.994 0.440943 24.0559 0.687369 24.0855 0.860326C24.1151 1.03328 24.1519 1.42728 24.1226 1.73514C23.7882 5.249 22.3411 13.7762 21.605 17.7118C21.2935 19.3771 20.6801 19.9354 20.0863 19.9901C18.7958 20.1088 17.8159 19.1372 16.566 18.3179C14.6101 17.0358 13.5052 16.2377 11.6067 14.9867C9.41266 13.5408 10.835 12.7462 12.0853 11.4475C12.4126 11.1076 18.0985 5.93584 18.2085 5.46668C18.2223 5.40801 18.2351 5.18929 18.1051 5.0738C17.9752 4.95831 17.7834 4.9978 17.645 5.02921C17.4489 5.07373 14.3244 7.1389 8.27155 11.2247C7.38467 11.8337 6.58137 12.1304 5.86163 12.1149C5.06818 12.0977 3.54191 11.6663 2.40727 11.2974C1.0156 10.8451 -0.0904675 10.6059 0.00584654 9.83761C0.0560128 9.43745 0.607078 9.0282 1.65904 8.60987Z"
              fill="white"
            />
          </svg>
          ПЕРЕЙТИ В ЧАТ
        </a>
      )}

      <div>
        {userData?.rank === "Трейдер" ? (
          <button className="adds__close" onClick={setVisible}>
            &times;
          </button>
        ) : (
          ""
        )}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={true}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <li>
              <img src="./images/bybit.svg" alt="" />
            </li>
          </SwiperSlide>
          <SwiperSlide>
            <li>
              <img src="./images/finblox.svg" alt="" />
            </li>
          </SwiperSlide>
          {ctx?.theme ? (
            <SwiperSlide>
              <li>
                <img src="./images/magpie-black.svg" alt="" />
              </li>
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <li>
                <img src="./images/magpie-white.svg" alt="" />
              </li>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};
