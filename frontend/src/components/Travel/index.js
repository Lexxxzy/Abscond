import React from "react";
import cn from "classnames";
import styles from "./Travel.module.sass";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Icon from "../Icon";

const items = [
  {
    title: "Cashback $$$",
    content:
      "We have a cashback system — more often you purchase, more we refund!",
    color: "#8BC5E5",
  },
  {
    title: "Best prices",
    content:
      "Cheaper than aviasales? Yes!",
    color: "#92A5EF",
  },
  {
    title: "24-hour consultation",
    content:
      "We will check everything ourselves, tell you about new rules of entry and in general - we will be in touch 24/7, so write to us whenever you want.",
    color: "#58C27D",
  },
];

const gallery = [
  {
    src: "/images/content/travel-pic-1.jpg",
    srcSet: "/images/content/travel-pic-1@2x.jpg",
    images: [
      {
        content: "Cash Back",
      },
      {
        content: "Unique experience",
      },
      {
        content: "Best prices",
      },
    ],
  },
  {
    src: "/images/content/travel-pic-2.jpg",
    srcSet: "/images/content/travel-pic-2@2x.jpg",
    images: [
      {
        content: "Nature",
      },
      {
        content: "Hotel",
      },
      {
        content: "Rest",
      },
    ],
  },
];

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Travel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
  };

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <h2 className={cn("h2", styles.title)}>
            Want to shift the scenery?
          </h2>
          <div className={cn("info", styles.info)}>
           We will help!
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.list}>
              {items.map((x, index) => (
                <div className={styles.item} key={index}>
                  <div
                    className={styles.number}
                    style={{ backgroundColor: x.color }}
                  >
                    0{index + 1}
                  </div>
                  <div className={styles.subtitle}>{x.title}</div>
                  <div className={styles.text}>{x.content}</div>
                </div>
              ))}
            </div>
            <Link className={cn("button", styles.button)} to="/tickets">
            View tickets
            </Link>
          </div>
          <div className={styles.col}>
            <div className={styles.wrapper}>
              <Slider className="travel-slider" {...settings}>
                {gallery.map((item, index) => (
                  <div className={styles.gallery} key={index}>
                    <div className={cn("travel-bg", styles.bg)}>
                      <img
                        srcSet={`${item.srcSet} 2x`}
                        src={item.src}
                        alt="Travel"
                      />
                    </div>
                    <div className={styles.group}>
                      {item.images.map((x, index) => (
                        <div
                          className={cn("travel-preview", styles.preview)}
                          key={index}
                        >
                          
                          <div>
                            <p className={styles.ad}>
                              {x.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;
