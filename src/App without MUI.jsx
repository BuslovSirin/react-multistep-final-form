import { useState } from "react";
import { Field } from "react-final-form";
import Modal from "./Modal";
import Wizard from "./Wizard";
import WizardPage from "./WizardPage";

import { TextField, Box } from "@mui/material";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

const required = (value) => (value ? undefined : "Required");
const validateName = value => {
  if (!value) {
    return "This field is obligatory";
  }
  if (value?.length < 4) {
    return "The value is too short";
  }
  if (value?.length > 30) {
    return "The value is too long";
  }
};


const App = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setModalOpened(true)}>Open Modal</button>
      <Modal open={modalOpened} onClose={() => setModalOpened(false)}>
        Modal is Opened
      </Modal>
      <Box
        sx={{
          border: "1px solid blue",
          borderRadius: "10px",
          height: "500px",
          width: "50%",
          margin: "auto",
          padding: "20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Wizard Form</h1>

        <Wizard
          initialValues={{ employed: true, stooge: "larry" }}
          onSubmit={onSubmit}
        >
          <WizardPage>
            <div>
              <label>First Name</label>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
                validate={validateName}
              />
              <Error name="firstName" />
            </div>
            <div>
              <label>Last Name</label>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
                validate={validateName}
              />
              <Error name="lastName" />
            </div>
          </WizardPage>
          <WizardPage>
            <div>
              <label>Email</label>
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="Email"
              />
              <Error name="email" />
            </div>
            <div>
              <label>Favorite Color</label>
              <Field name="favoriteColor" component="select">
                <option />
                <option value="#ff0000">❤️ Red</option>
                <option value="#00ff00">💚 Green</option>
                <option value="#0000ff">💙 Blue</option>
              </Field>
              <Error name="favoriteColor" />
            </div>
          </WizardPage>
          <WizardPage
            validate={(values) => {
              const errors = {};
              if (!values.toppings) {
                errors.toppings = "Required";
              } else if (values.toppings.length < 2) {
                errors.toppings = "Choose more";
              }
              return errors;
            }}
          >
            <div>
              <label>Employed?</label>
              <Field name="employed" component="input" type="checkbox" />
            </div>
            <div>
              <label>Toppings</label>
              <Field name="toppings" component="select" multiple>
                <option value="ham">🐷 Ham</option>
                <option value="mushrooms">🍄 Mushrooms</option>
                <option value="cheese">🧀 Cheese</option>
                <option value="chicken">🐓 Chicken</option>
                <option value="pineapple">🍍 Pinapple</option>
              </Field>
              <Error name="toppings" />
            </div>
          </WizardPage>
          <WizardPage
            validate={(values) => {
              const errors = {};
              if (!values.notes) {
                errors.notes = "Required";
              }
              return errors;
            }}
          >
            <div>
              <label>Best Stooge?</label>
              <div>
                <label>
                  <Field
                    name="stooge"
                    component="input"
                    type="radio"
                    value="larry"
                  />{" "}
                  Larry
                </label>
                <label>
                  <Field
                    name="stooge"
                    component="input"
                    type="radio"
                    value="moe"
                  />{" "}
                  Moe
                </label>
                <label>
                  <Field
                    name="stooge"
                    component="input"
                    type="radio"
                    value="curly"
                  />{" "}
                  Curly
                </label>
              </div>
            </div>
            <div>
              <label>Notes</label>
              <Field name="notes" component="textarea" placeholder="Notes" />
              <Error name="notes" />
            </div>
          </WizardPage>
        </Wizard>
      </Box>
    </div>
  );
};

export default App;
