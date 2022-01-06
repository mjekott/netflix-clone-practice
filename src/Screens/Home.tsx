import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  backgound: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 64px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 20px;
  line-height: 24px;
`;

const Slider = styled.div`
  position: relative;
  top: -50px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const Offset = 6;

const Home = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "now_playing"], getMovies);
  const movieMatch = useMatch("/movies/:movieId");
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const navigation = useNavigate();
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / Offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving(false);

  const onBoxClick = (movieId: number) => {
    navigation(`/movies/${movieId}`, { replace: true });
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            onClick={increaseIndex}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(Offset * index, Offset * index + Offset)
                  .map((movie) => (
                    <Box
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                      initial="normal"
                      whileHover="hover"
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClick(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {movieMatch && (
              <motion.div
                style={{
                  position: "absolute",
                  width: "40vw",
                  height: "80vh",
                  backgroundColor: "red",
                  top: 60,
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                }}
              ></motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
