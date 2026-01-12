import jwt from 'jsonwebtoken';

export const decodeCodes = (codes: { code: string }[], userJWT: string) => {
  return codes.map(code => {
    try {
      const decoded = jwt.verify(code.code, userJWT) as { code: string };
      return {
        ...code,
        code: decoded.code
      };
    } catch (error) {
      console.error('Error decoding code:', error);
      return code;
    }
  });
};