import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
query {
  countries {
    name 
    capital
    population
    region
    flags {
      alt
      png
      svg
    }
  }
}
`;