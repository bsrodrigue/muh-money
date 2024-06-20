import Crypto from "../lib/crypto";

const wrapperHorizontalPadding = 40;

const defaultIdGenerator = {
  generateId: Crypto.generateRandomUUID,
};

export const config = {
  wrapperHorizontalPadding,
  defaultIdGenerator,
};
