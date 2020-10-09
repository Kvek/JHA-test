import React, { useEffect, useRef, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';
import Card from './Card';

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  padding: 5em;
`;

const LoadingContainer = styled.div`
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

function App() {
  const [cardList, setCardList] = useState([]);
  const loaderRef = useRef(null);
  const [hideLoader, setHideLoader] = useState(false);

  const [maxIndex, setMaxIndex] = useState(0);

  let options = {
    rootMargin: '500px',
    threshold: 0
  };

  const { loading, data } = useQuery(gql`
    query {
      Country {
        name
        nativeName
        population
        capital
        officialLanguages {
          iso639_1
          iso639_2
          name
          nativeName
        }
        flag {
          emoji
          emojiUnicode
          svgFile
        }
      }
    }
  `);

  let observer = new IntersectionObserver((e) => {
    if (maxIndex < data?.Country.length) {
      if (e[0]?.isIntersecting) {
        setMaxIndex((prevState) => prevState + 10);
      }
    } else {
      setHideLoader(true);
    }
  }, options);

  const setRef = (ref) => {
    if (ref) {
      observer.observe(ref);
      return (loaderRef.current = ref);
    }
  };

  useEffect(() => {
    if (!loading) {
      setCardList(data?.Country.slice(0, 20));
    }
  }, [data, loading]);

  useEffect(() => {
    setCardList(data?.Country.slice(0, maxIndex));
  }, [data, maxIndex]);

  if (loading)
    return (
      <LoadingContainer>
        <p>Loading...</p>
      </LoadingContainer>
    );

  return (
    <AppContainer>
      {cardList?.map(
        (
          { name, nativeName, population, capital, flag, officialLanguages },
          index
        ) => (
          <span index={index}>
            <Card
              name={name}
              nativeName={nativeName}
              population={population}
              capital={capital}
              flag={flag?.svgFile}
              languages={officialLanguages}
              key={name}
            />
          </span>
        )
      )}
      {!hideLoader && (
        <LoadingContainer ref={(ref) => setRef(ref)}>
          <p>Loading...</p>
        </LoadingContainer>
      )}
    </AppContainer>
  );
}

export default App;
