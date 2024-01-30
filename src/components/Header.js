import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  selectRecommend,
  selectOriginal,
  selectNewDisney,
  selectTrending,
} from "../features/movie/movieSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const [isTrue, setState] = useState(false);
  const [value, setValue] = useState("");
  const [movies, setMatchingMovies] = useState();

  const movies1 = useSelector(selectRecommend);
  const movies2 = useSelector(selectOriginal);
  const movies3 = useSelector(selectNewDisney);
  const movies4 = useSelector(selectTrending);

  const allMovies = [
    ...(Array.isArray(movies1) ? movies1 : []),
    ...(Array.isArray(movies2) ? movies2 : []),
    ...(Array.isArray(movies3) ? movies3 : []),
    ...(Array.isArray(movies4) ? movies4 : []),
  ];

  useEffect(() => {
    let movies = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setMatchingMovies(movies);
    console.log(movies)
  }, [value]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <>
      <Nav>
        <Logo>
          <img src="/images/logo.png" alt="sport" />
        </Logo>

        {!userName ? (
          <>
            <Login onClick={handleAuth}>Getting start</Login>
          </>
        ) : (
          <>
            <NavMenu>
              <a href="/home">
                <img src="/images/home-icon.svg" alt="HOME" />
                <span>HOME</span>
              </a>
              <a>
                <Link to="/live">
                <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                <span>Live</span>
                </Link>
              </a>
              <a>
                <img src="/images/original-icon.svg" alt="ORIGINALS" />
                <span>ORIGINALS</span>
              </a>
              <a>
                <img src="/images/movie-icon.svg" alt="MOVIES" />
                <span>MOVIES</span>
              </a>
              <a>
                <img src="/images/series-icon.svg" alt="SERIES" />
                <span>SERIES</span>
              </a>
              <a onClick={() => setState(!isTrue)}>
                <img src="/images/search-icon.svg" alt="SEARCH" />
                <span>SEARCH</span>
              </a>
            </NavMenu>
            <SignOut>
              <UserImg src={userPhoto} alt={userName} />
              <DropDown>
                {/* <Rigester>Subscribe</Rigester> */}
                <Link to="/subscription">
                  <Register>subscription</Register>
                </Link>
                <span onClick={handleAuth}>Sign out</span>
              </DropDown>
            </SignOut>
          </>
        )}
      </Nav>
      {isTrue ? (
        <SearchBox>
          <Box>
            <div className="search">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <input
                placeholder="Type to search"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <RxCross2
                className="cross-Icon"
                onClick={() => {
                  setValue("");
                  setState(false);
                }}
              />
            </div>
            {movies.map((v, i) => (
              <div className="cards" key={i}>
                <div>
                  <img
                    src={v.cardImg}
                    alt="SEARCH"
                    height="200px"
                    className="searched-img"
                  />
                </div>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                  <Link to={`/detail/` + v.id}>
                    <div>
                      <button
                        className="go-btn"
                        onClick={() => setState(false)}
                      >
                        View
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Box>
        </SearchBox>
      ) : (
        <span></span>
      )}
    </>
  );
};

const Box = styled.div`
  color: #fff;
  height: 96vh;
  overflow: scroll;
  .scroll-content::-webkit-scrollbar {
  width: 12px;
}

.scroll-content::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.scroll-content::-webkit-scrollbar-track {
  background-color: transparent;
}

/* Style scrollbar for WebKit browsers */
.scroll-content::-webkit-scrollbar-thumb {
  background-color: #888; /* Change the color of the thumb */
  border-radius: 6px; /* Add rounded corners to the thumb */
}

.scroll-content::-webkit-scrollbar-track {
  background-color: #eee; /* Change the color of the track */
}

/* Hover effect on the thumb */
.scroll-content::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

  .cards {
    display: flex;
    gap: 20px;
    .searched-img {
      border-radius: 10px;
      box-shadow: 0px 0px 5px #8a86ae;
      width: 300px;
    }
    .go-btn {
      padding: 10px 16px;
      outline: none;
      border: 2px solid #fff;
      border-radius: 6px;
      background-color: transparent;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      color: #fff;
      transition: all 0.3s;
      transform: scale(1);
      &:hover {
        background-color: #fff;
        box-shadow: 0px 0px 4px #8a86ae;
        color: #040714;
        transform: scale(1.1);
      }
    }
  }
  .search {
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid grey;
    margin: 10px 0px;
    padding: 6px 0px;
    img {
      height: 28px;
      margin-top: 2px;
    }
    .cross-Icon {
      cursor: pointer;
      font-size: 24px;
      color: red;
    }
    input {
      outline: none;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      width: 96%;
      background-color: transparent;
      font-size: 16px;
      color: white;
    }
  }
`;

const SearchBox = styled.div`
  position: fixed;
  background-color: #040714;
  z-index: 99;
  margin-top: 70px;
  padding: 10px 40px;
  width: 100%;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  position: relative;
  top: -4px;
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;
const Register = styled.div`
  height: 48px;
  letter-spacing: 2px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  /* opacity: 0; */
  display: none;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      /* opacity: 1; */
      display: block;
      transition-duration: 1s;
    }
  }
`;

export default Header;
