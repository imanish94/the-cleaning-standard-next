import { getSession } from "next-auth/react";
import { isSessionValid } from "@/utils/helpers";
import { verifyUser } from "@/utils/api/common";

export const withAuth = getServerSideProps => {
  return async context => {
    const session = await getSession(context);

    if (!isSessionValid(session)) {
      return {
        redirect: {
          destination: "/account/sign-in"
        }
      };
    }

    const {
      user: { token }
    } = session;

    let data = {
      token: token
    };

    const isUserValid = await verifyUser(data);

    console.log("isUserValid", isUserValid);

    if (!isUserValid.status) {
      return {
        redirect: {
          destination: "/account/sign-in?isSessionExpired=expired"
        }
      };
    }

    const propsData = await getServerSideProps(context); // Run `getServerSideProps` to get page-specific data


    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        ...propsData.props,
        session
      }
    };
  };
};
