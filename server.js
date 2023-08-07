const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`

  type Flags {
    alt: String
    png: String
    svg: String
  }

  type Currency {
    name: String
    symbol: String
  }
  
  type CurrencyEntry {
    key: String
    value: Currency
  }
  
  type Country {
    name: String
    population: Int
    region: String
    subRegion: String
    flag: String
    capital : [String]
    flags : Flags
    currencies : String
    languages: String
    tld: [String]
    borders: [String]
  }

  type Query {
    countries: [Country]
  }
`;

const resolvers = {
  Query: {
    countries: async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data.map(country => ({
        name: country.name.common,
        population: country.population,
        region: country.region,
        subRegion: country.subregion,
        capital: country.capital,
        tld: country.tld,
        currencies: country.currencies !== undefined ? JSON.stringify(country.currencies) : "",
        languages: country.languages !== undefined ? JSON.stringify(country.languages) : "",
        borders: country.borders,
        flag: country.flag,
        flags: { alt: country.flags.alt, png: country.flags.png, svg: country.flags.svg }
      }));
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
