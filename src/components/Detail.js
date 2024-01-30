import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../firebase";





const Detail = (props) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          console.log("no such document in firebase");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);

  return (
    <Container>
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>

      <ImageTitle>
        {/* <img alt={detailData.title} src={detailData.titleImg} /> */}
      </ImageTitle>
      <ContentMeta>
        <h1>{detailData.title}</h1>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>


        </Controls>

        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 62px;
  padding: 0 calc(3.5vw + 5px);
  
`;

const Background = styled.div`
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;


  img {
    width: 100vw;
    height: 100vh;
    object-fit: hidden; 
  }

  /* Semi-transparent overlay to disable half of the background */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
    z-index: 1; /* Place overlay above the background image */
    pointer-events: none; /* Allow interaction with elements behind the overlay */
  }

  /* Adjust the opacity and filter for the background image */
  img {
    opacity: 0.8; /* Adjust opacity as needed */
    filter: sepia(50%) grayscale(10%); /* Apply desired filter effects */
  }

  /* Media query for smaller screens */
  @media (max-width: 768px) {
    img {
      width: initial;
    }
  }
`;



const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
  letter-spacing: 1px;
  font-family: "Times New Roman", Times, serif;
  font-size: 25px;


  border-radius: 10px;
  padding: 20px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 30px;
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb (249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 28px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
  
    }
  }
`;






const Description = styled.div`
  line-height: 1.4;
  font-size: 15px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 3px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
