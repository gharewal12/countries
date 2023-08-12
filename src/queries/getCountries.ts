import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
query {
  countries {
    name 
    capital
    population
    region
    subRegion
    currencies
    languages
    borders
    nativeName
    tld 
    flags {
      alt
      png
      svg
    }
  }
}
`;