import { GraphQLClient } from "graphql-request";
import { getResultQuery, publishQuery, imageUpdateQuery } from "./queries";

const url = process.env.REACT_APP_HYGRAPH_URL || "";
const graphcms = new GraphQLClient(url, {
  headers: {
    Authorization: process.env.REACT_APP_HYGRAPH_TOKEN || "",
  },
});

export const getImageUrl = async () => {
  const result = await graphcms.request(getResultQuery);
  return result;
};

export const updateImageAndPublish = async (variables) => {
  await graphcms.request(imageUpdateQuery, variables);
  await graphcms.request(publishQuery, variables);
};
