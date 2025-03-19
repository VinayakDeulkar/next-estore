import axios from "axios";

export const updateUserDetails = async ({
  vendor_id,
  country_code,
  phone_number,
  full_name,
  email,
  jwt_token,
  user_id,
  language,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/update-user`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendor_id,
        country_code: country_code,
        phone_number: phone_number,
        full_name: full_name,
        email: email,
        user_id: user_id,
        language: language === "ltr" ? "en" : "ar",
      }),
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const RegisterUser = async ({
  vendors_id,
  vendor_ecom_id,
  phone_number,
  country_code,
  email,
  language,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/register-user`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendors_id,
        vendor_ecom_id: vendor_ecom_id,
        sendSMS: false,
        country_code: country_code,
        phone_number: phone_number,
        email: email,
        language: language === "ltr" ? "en" : "ar",
      })
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrderDetails = async ({
  vendor_id,
  ecom_user_id,
  vendor_ecom_id,
  phone_number,
  country_code,
  jwt_token,
  user_id,
  language,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/get-user-orders`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendor_id,
        ecom_user_id: ecom_user_id,
        vendor_ecom_id: vendor_ecom_id,
        phone_number: phone_number,
        country_code: country_code?.includes("+")
          ? country_code
          : `+${country_code}`,
        user_id: user_id,
        language: language === "ltr" ? "en" : "ar",
      }),
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveUserAddress = async ({
  vendors_id,
  ecom_user_id,
  area,
  address_type,
  area_id,
  country,
  country_id,
  block,
  street,
  avenue,
  house_number,
  floor_number,
  flat_number,
  user_lat,
  user_long,
  is_primary,
  special_directions,
  address_id,
  title,
  jwt_token,
  user_id,
  language,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/save-user-address`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendors_id,
        ecom_user_id: ecom_user_id,
        address_type: address_type,
        area: area,
        area_id: area_id,
        country: country,
        country_id: country_id,
        block: block,
        street: street,
        avenue: avenue,
        house_number: house_number,
        floor_number: floor_number,
        flat_number: flat_number,
        user_lat: user_lat,
        user_long: user_long,
        is_primary: is_primary,
        special_directions: special_directions,
        address_id: address_id,
        title: title,
        user_id: user_id,
        language: language === "ltr" ? "en" : "ar",
      }),
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserAddress = async ({
  ecom_user_id,
  address_id,
  jwt_token,
  user_id,
  language,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/delete-address`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        ecom_user_id: ecom_user_id,
        address_id: address_id,
        user_id: user_id,
        language: language === "ltr" ? "en" : "ar",
      }),
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyUserOTP = async ({
  phone_number,
  verification_code,
  country_code,
  user_id,
  vendor_ecom_id,
  language,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/verify-otp-and-get-token`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        country_code: country_code,
        phone_number: phone_number,
        verification_code: verification_code,
        user_id: user_id,
        vendor_ecom_id: vendor_ecom_id,
        language: language === "ltr" ? "en" : "ar",
      })
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const resendOTPApi = async ({
  phone_number,
  sendSMS,
  country_code,
  user_id,
  vendor_ecom_id,
  language,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/resend-otp`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        country_code: country_code,
        phone_number: phone_number,
        sendSMS: sendSMS,
        user_id: user_id,
        vendor_ecom_id: vendor_ecom_id,
        language: language === "ltr" ? "en" : "ar",
      })
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetUserDetails = async ({
  vendors_id,
  phone_number,
  country_code,
  jwt_token,
  user_id,
  language,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_URL}/get-user-details`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendors_id,
        country_code: country_code,
        phone_number: phone_number,
        user_id: user_id,
        language: language === "ltr" ? "en" : "ar",
      }),
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
