import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';
import Card from './Card';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
  justify-items: center;
  grid-gap: 15px;
  height: 100%;
  scrollbar-width: 0;
  padding: 5em;
`;

function App() {
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

  if (loading) return <p>Loading...</p>;

  return (
    <AppContainer>
      {data?.Country.map(
        ({
          name,
          nativeName,
          population,
          capital,
          flag,
          officialLanguages
        }) => (
          <Card
            name={name}
            nativeName={nativeName}
            population={population}
            capital={capital}
            flag={flag?.svgFile}
            languages={officialLanguages}
            key={name}
          />
        )
      )}
      ;
    </AppContainer>
  );
}

export default App;
