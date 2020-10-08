import React from 'react';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 3px -1px rgba(0, 0, 0, 0.5);
  max-width: 350px;
  width: 350px;
  height: 175px;
  justify-content: space-evenly;
  position: relative;
  padding: 75px 20px 20px;
  background: rgba(0, 0, 0, 0.05);

  td {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 200px;
  }

  th {
    text-align: left;
  }

  &:hover {
    box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.5);
  }
`;

const Flag = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  background-image: url(${(props) => props?.flag});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  max-width: 75px;
  max-height: 50px;
  width: 100%;
  height: 100%;
  padding: 0;
`;

const Languages = styled.td`
  display: flex;

  span {
    margin-right: 5px;
  }
`;

const Card = ({ name, nativeName, population, capital, flag, languages }) => {
  return (
    <CardContainer>
      <Flag flag={flag} />
      <table>
        <tbody>
          <tr>
            <th>Country Name</th>

            <td>
              {name} ({nativeName})
            </td>
          </tr>
          <tr>
            <th>Population</th>
            <td>{population?.toLocaleString()}</td>
          </tr>
          <tr>
            <th>Capital</th>
            <td>{capital}</td>
          </tr>
          <tr>
            <th>Languages</th>
            <Languages>
              {languages?.slice(0, 5)?.map((language) => (
                <span key={language?.name}>{language?.name}</span>
              ))}
            </Languages>
          </tr>
        </tbody>
      </table>
    </CardContainer>
  );
};

export default Card;
