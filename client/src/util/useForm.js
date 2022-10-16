import { useState } from "react";
// Store the regexes as globals so they're cached and not re-parsed on every call:
var visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
var mastPattern = /^(?:5[1-5][0-9]{14})$/;
var amexPattern = /^(?:3[47][0-9]{13})$/;
var discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

const useForm = (initialJson, callback) => {
  //Form values
  const [inputs, setInputs] = useState(initialJson);
  //Errors
  const [errors, setErrors] = useState({});

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case "postalcd":
        if (
          !new RegExp(
            /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            postalcd: "Please enter a valid postal code.",
          });
        } else {
          let newObj = errors;
          delete newObj.postalcd;
          setErrors(newObj);
        }

        break;
      case "phone":
        if (
          !new RegExp(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            phone: "Please enter a valid phone number.",
          });
        } else {
          let newObj = errors;
          delete newObj.phone;
          setErrors(newObj);
        }

        break;

      case "cvv":
        if (!new RegExp(/^[0-9]{3,4}$/).test(value)) {
          setErrors({
            ...errors,
            cvv: "CVV should contains 3 or 4 digits",
          });
        } else {
          let newObj = errors;
          delete newObj.cvv;
          setErrors(newObj);
        }
        break;

      case "cardnumber":
        if (
          !new RegExp(visaPattern).test(value) &&
          !new RegExp(mastPattern).test(value) &&
          !new RegExp(amexPattern).test(value) &&
          !new RegExp(discPattern).test(value)
        ) {
          setErrors({
            ...errors,
            cardnumber: "Please enter a valid card number.",
          });
        } else {
          let newObj = errors;
          delete newObj.cardnumber;
          setErrors(newObj);
        }
        break;

      case "username":
        if (value.length <= 4) {
          // we will set the error state

          setErrors({
            ...errors,
            username: "Username at least have 5 letters",
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object

          let newObj = errors;
          delete newObj.username;
          setErrors(newObj);
        }
        break;

      case "expdate":
        var date1Updated = new Date(value.replace(/-/g, "/"));

        var today = new Date();
        if (date1Updated <= today) {
          setErrors({
            ...errors,
            expdate: "Expire date is invalid",
          });
        } else {
          let newObj = errors;
          delete newObj.expdate;
          setErrors(newObj);
        }
        break;

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Please enter a valid email address",
          });
        } else {
          let newObj = errors;
          delete newObj.email;
          setErrors(newObj);
        }
        break;

      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
          });
        } else {
          let newObj = errors;
          delete newObj.password;
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  //A method to handle form inputs
  const handleChange = (event) => {
    //To stop default events
    event.persist();

    const target = event.target;
    const value =
      target.getAttribute("type") === "checkbox"
        ? target.checked
        : target.value;
    const name = target.name;
    validate(event, name, value);

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(inputs).length !== 0) {
      callback();
    } else {
      alert("There is an Error!");
    }
  };

  return {
    inputs,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
