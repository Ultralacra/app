import { Formik, Form, Field, ErrorMessage } from "formik";
import { Checkbox } from "antd";

const options = [
  { label: "Tarjeta de crédito", value: "credit" },
  { label: "Tarjeta de débito", value: "debit" }
];

function App() {
  return (
    <Formik
      initialValues={{ paymentMethod: [] }}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, handleSubmit }) => (
        <form onSubmit={handleSubmit}
        >
          <Field name="paymentMethod">
            {({ field, form }) => (
              <div>
                {options.map((option) => (
                  <Checkbox
                    key={option.value}
                    {...field}
                    value={option.value}
                    checked={values.paymentMethod.includes(option.value)}
                    onChange={() => {
                      if (field.value.includes(option.value)) {
                        const nextValue = field.value.filter(
                          (value) => value !== option.value
                        );
                        form.setFieldValue("paymentMethod", nextValue);
                      } else {
                        form.setFieldValue("paymentMethod", [
                          ...field.value,
                          option.value
                        ]);
                      }
                    }}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </div>
            )}
          </Field>
          <ErrorMessage name="paymentMethod" />
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
}

export default App;