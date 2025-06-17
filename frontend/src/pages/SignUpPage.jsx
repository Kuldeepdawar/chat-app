import React, { useState } from "react";

const SignUpPage = () => {
  // creating a form first we need a state for showPassword and nor
  const [showPaaword, setShowPassword] = useState(false);
  // this state for formdata like fullname, email, password
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  return <div>SignUpPage</div>;
};

export default SignUpPage;
