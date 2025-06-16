export const isSessionValid = session => {
    if (
      typeof session !== "undefined" &&
      session !== null &&
      typeof session.user !== "undefined"
    ) {
      const { expires } = session;
  
      if (Date.parse(new Date()) > Date.parse(expires)) return false;
  
      return true;
    }
  
    return false;
  };