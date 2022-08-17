export const getResultQuery = `
{
  detection(where: {id: "${process.env.REACT_APP_IMAGE_ID}"}) {
    imageString,
    updatedAt
  }
}
`;

export const publishQuery = `mutation MyMutation {
  publishDetection(where: {id: "${process.env.REACT_APP_IMAGE_ID}"}) {
    id
  }
}`;

export const imageUpdateQuery = `mutation($imageTaken: String!) {
  updateDetection(
    data: {imageString: $imageTaken}
    where: {id: "${process.env.REACT_APP_IMAGE_ID}"}
  ) {
    id
  }}`;
