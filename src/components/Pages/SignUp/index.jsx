import React, { useState } from "react";
import CustomFormWrap from "../../Common/CustomFormWrap";
import "./SignUp.css";
import wavebg from "../../../assets/imageedit_2_3611863364.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Formik } from "formik";
import TextInput from "../../Common/TextInput";
import BaseHeader from "../../Common/BaseHeader";
import { URLS } from "../../../constants";
import CustomButton from "../../Common/CustomButton";
import { apiClient, handleAlerts, handleHideEmail } from "../../../utils";
import * as Yup from "yup";
import useLoader from "../../../useLoader";
import RegistrationForm from "../../Common/SignupComponents/RegistrationForm";

export const getErrorsBasedOnCode = (errorCode) => {
  switch (errorCode) {
    case 30:
      return "EMAIL ALREADY IN USE";
    case 220:
      return "EMAIL NOT SENT";
    case 1999:
      return "USER-ID DOES NOT EXIST";
    case 502:
      return "INVALID OTP";
    case 301:
      return "YOU HAVE EXCEEDED THE MAXIMUM NUMBER OF ATTEMPTS FOR ENTERING THE OTP";
    default: {
      return "SOMETHING WENT WRONG";
    }
  }
};

const SignUp = (props) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [resentOtp, setResendOtp] = useState(false);
  const { isLoading, handleLoading } = useLoader();

  const currentStep = searchParams.get("step");

  const otpFormSchema = Yup.object().shape({
    otpId: Yup.string()
      .matches(/^\d+$/, "Invalid OTP")
      .required("This is a * required field")
      .min(6, "Enter a valid OTP")
      .max(6, "Enter a valid OTP"),
  });

  const passwordFormSchema = Yup.object().shape({
    password: Yup.string()
      .required("This is a * required field")
      .matches("^(?=.*[&#$!@])[a-zA-Z0-9&#$!@]+$", "Password is weak")
      .min(8, "Password should have atleast 8 characters")
      .max(16, "Password cannot be greater than 16 characters"),
    confirmPassword: Yup.string()
      .test(
        "compareValues",
        "Password does not match",
        function (confirmPassword) {
          const password = this.parent.password;
          if (confirmPassword !== password) {
            return false;
          }
          return true;
        }
      )
      .required("This is a * required field"),
  });

  const renderVerifyOtpForm = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const isForgotPassFlow = searchParams.get("fgtPass");
    return (
      <Formik
        initialValues={{
          otpId: null,
        }}
        onSubmit={async (values, { resetForm }) => {
          handleLoading(true);
          // @toDo API integration
          if (resentOtp) {
            const payload = {
              userId: userData.userId,
            };
            const response = await apiClient.post(URLS.RESEND_OTP, payload);
            if (response.code === 200) {
              handleLoading(false);
              setResendOtp(false);
              return handleAlerts("Success", "", "success");
            } else {
              return handleAlerts("Error", "SOMETHING WENT WRONG", "error");
            }
          }
          if (isForgotPassFlow) {
            const fgtPasswordPayload = {
              email: userData.emailId,
              OTP: values.otpId.toString(),
            };
            const response = await apiClient.post(
              URLS.OTP_FORGOT_PASS,
              fgtPasswordPayload
            );
            if (response.code === 200) {
              handleLoading(false);
              resetForm();
              return setSearchParams({ step: 3, fgtPass: true });
            } else {
              handleLoading(false);
              return handleAlerts("Error!", "INVALID OTP", "error");
            }
          }
          const payload = {
            userId: userData.userId,
            OTP: values.otpId,
          };
          const response = await apiClient.post(URLS.VERIFY_OTP, payload);
          if (response.code === 500) {
            handleLoading(false);
            resetForm();
            return setSearchParams({ step: 3 });
          } else {
            handleLoading(false);
            handleAlerts(
              "Error!",
              getErrorsBasedOnCode(response.code),
              "error",
              async (result) => {
                if (result.isConfirmed && response.code === 301) {
                  setResendOtp(true);
                }
              }
            );
          }
        }}
        validationSchema={otpFormSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form className="otp-form" onSubmit={handleSubmit}>
            <p>
              Enter the verification code sent on your registered Email ID:
              {` ${handleHideEmail(userData.emailId) || ""}`}
            </p>
            <TextInput
              type="number"
              name="otpId"
              value={values.otpId || ""}
              onChange={handleChange}
              placeHolder="Verification Code"
              onBlur={handleBlur}
              error={errors.otpId && touched.otpId ? errors.otpId : ""}
            />
            <CustomButton
              loading={isLoading}
              type="submit"
              className="submit-btn"
            >
              {resentOtp ? "Resend OTP" : "Proceed"}
            </CustomButton>
          </Form>
        )}
      </Formik>
    );
  };

  const renderPasswordCreationForm = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const isForgotPassFlow = searchParams.get("fgtPass");

    return (
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          handleLoading(true);
          if (isForgotPassFlow) {
            const changePassPayload = {
              email: userData.emailId,
              password: values.password,
            };
            const response = await apiClient.post(
              URLS.CHANGE_PASSOWRD,
              changePassPayload
            );
            if (response.code === 200) {
              handleLoading(false);
              return navigate("/");
            } else {
              handleLoading(false);
              return handleAlerts("Error!", "OTP not saved", "error");
            }
          }
          const payload = {
            userId: userData.userId,
            password: values.password,
          };
          const response = await apiClient.post(URLS.ADD_PASSWORD, payload);
          if (response.code === 200) {
            handleLoading(false);
            resetForm();
            navigate("/");
          } else {
            handleLoading(false);
            handleAlerts(
              "Error!",
              getErrorsBasedOnCode(response.code),
              "error"
            );
          }
        }}
        validationSchema={passwordFormSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form className="password-form" onSubmit={handleSubmit}>
            <div>
              <p>In order to protect your account, make sure your password:</p>
              <ul>
                <li>Should be 8-16 characters long.</li>
                <li>
                  Must be alphanumeric and must contain at least one special
                  character such as '&@!#$'.
                </li>
              </ul>
            </div>
            <TextInput
              type="password"
              name="password"
              value={values.password || ""}
              placeHolder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password ? errors.password : ""}
            />
            <TextInput
              type="password"
              name="confirmPassword"
              value={values.confirmPassword || ""}
              placeHolder="Re-enter Password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.confirmPassword && touched.confirmPassword
                  ? errors.confirmPassword
                  : ""
              }
            />
            <CustomButton type="submit" className="submit-btn">
              Submit
            </CustomButton>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <>
      <BaseHeader />
      <div
        style={{ backgroundImage: `url(${wavebg})` }}
        className="signup-root"
      >
        <CustomFormWrap
          flip
          panelTitle="Welcome Back!"
          panelDescription="Please login to start shopping with us."
          pannelbuttonLabel="LOGIN"
          onClickPanelButton={() => navigate("/")}
        >
          <div className="signup-container">
            <h1>
              {searchParams.get("fgtPass")
                ? "RESET PASSWORD"
                : "CREATE ACCOUNT"}
            </h1>
            {currentStep === "1"
              ? <RegistrationForm />
              : currentStep === "2"
              ? renderVerifyOtpForm()
              : renderPasswordCreationForm()}
          </div>
        </CustomFormWrap>
      </div>
    </>
  );
};

export default SignUp;
