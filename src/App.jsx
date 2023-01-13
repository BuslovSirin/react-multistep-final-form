import { useState } from "react";
import { Field } from "react-final-form";
import Modal from "./Modal";
import Wizard from "./Wizard";
import WizardPage from "./WizardPage";
import useUnsavedChangesWarning from "./hooks/useUnsavedChangesWarning";

import {
  TextField,
  Box,
  MenuItem,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = (value) => (value ? undefined : "Required");
const validateName = (value) => {
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

const FAVCOLORS = [
  {
    value: "#ff0000",
    label: "❤️ Red",
  },
  {
    value: "#00ff00",
    label: "💚 Green",
  },
  {
    value: "#0000ff",
    label: "💙 Blue",
  },
];

const STOOGES = [
  {
    value: "stooge_1",
    label: "Stooge 1",
  },
  {
    value: "stooge_2",
    label: "Stooge 2",
  },
  {
    value: "stooge_3",
    label: "Stooge 3",
  },
];

const App = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const [setWarningUp, setWarningDown] = useUnsavedChangesWarning();

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
          minHeight: "500px",
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
          initialValues={{ employed: true, stooge: "stooge_1" }}
          onSubmit={onSubmit}
        >
          <WizardPage>
            <Field
              name="firstName"
              validate={validateName}
              render={(props) => (
                <TextField
                  label="First Name"
                  variant="outlined"
                  required
                  value={props.input.value}
                  onChange={props.input.onChange}
                  onClick={setWarningUp}
                  helperText={
                    props.meta.error && props.meta.modified
                      ? props.meta.error
                      : ""
                  }
                  error={props.meta.error && props.meta.modified}
                />
              )}
            />
            <Field
              name="lastName"
              validate={validateName}
              render={(props) => (
                <TextField
                  label="Last Name"
                  variant="outlined"
                  required
                  value={props.input.value}
                  onChange={props.input.onChange}
                  helperText={
                    props.meta.error && props.meta.modified
                      ? props.meta.error
                      : ""
                  }
                  error={props.meta.error && props.meta.modified}
                />
              )}
            />
          </WizardPage>
          <WizardPage>
            <Field
              name="email"
              render={(props) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              )}
            />
            <Field
              name="favoriteColor"
              render={(props) => (
                <TextField
                  select
                  label="Color"
                  // defaultValue={FAVCOLORS[1].value}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  helperText="Select your favorite color"
                  required
                >
                  {FAVCOLORS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </WizardPage>
          <WizardPage>
            <Field
              name="employed"
              type="checkbox"
              render={(props) => (
                <FormControlLabel
                  value="start"
                  label="Employed?"
                  labelPlacement="start"
                  control={
                    <Checkbox
                      defaultChecked
                      value={props.input.value}
                      onChange={props.input.onChange}
                    />
                  }
                />
              )}
            />
          {/* <Field
              name="toppings"
              render={(props) => {
                console.log(props.input.value)
                // props.input.onChange([])
                return(
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label">Topping:</InputLabel>
                  <Select
                    name="toppings"
                    multiple
                    // value={props.input.value}
                    // onChange={props.input.onChange}
                    value={personName}
                    // In this field we cant set props.input.value, because the field requires array
                    // value={props.input.value}
                    onChange={handleChange}
                    input={<OutlinedInput label="Topping:" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {TOPPINGS.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}}
            /> */}
          <div>
              <label>Toppings</label><br />
              <Field name="toppings" component="select" multiple>
                <option value="ham">🐷 Ham</option>
                <option value="mushrooms">🍄 Mushrooms</option>
                <option value="cheese">🧀 Cheese</option>
                <option value="chicken">🐓 Chicken</option>
                <option value="pineapple">🍍 Pinapple</option>
              </Field>
            </div>
          </WizardPage>
          <WizardPage>
            <Field
              name="stooge"
              type="radio"
              render={(props) => (
                <FormControl>
                  <FormLabel>Best Stooge?</FormLabel>
                  <RadioGroup
                    defaultValue='stooge_1'
                    value={props.input.value}
                    onChange={props.input.onChange}
                    required
                  >
                    {STOOGES.map((stooge) => (
                      <FormControlLabel
                        key={stooge.value}
                        value={stooge.value}
                        control={<Radio />}
                        label={stooge.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
            <Field
              name="notes"
              render={(props) => (
                <TextField
                  label="Notes"
                  multiline
                  rows={4}
                  variant="filled"
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              )}
            />
          </WizardPage>
        </Wizard>
      </Box>
    </div>
  );
};

export default App;
