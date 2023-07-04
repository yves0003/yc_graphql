const regEx =
  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
export const verifEmail = (email: string) => {
  if (email.match(regEx)) {
    return true;
  } else {
    return false;
  }
};
