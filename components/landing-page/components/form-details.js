import AutoCompleteInput from "@/components/UI-components/inputs/autocomplete-input";
import classes from "./form-details.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function FormDetails({
  userDetails,
  setUserDetails,
  loadingFetchDetails,
}) {
  const {
    user_first_name,
    user_last_name,
    user_email,
    user_phone,
    user_address,
  } = userDetails || {};

  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className={classes.formDetails}>
      <section className={classes.topSection}>
        <h3 className={classes.sectionTitle}>Persöhnliche Informationen</h3>
      </section>

      <section className={classes.row}>
        {[
          {
            label: "Vorname",
            type: "text",
            value: user_first_name,
            field: "user_first_name",
          },
          {
            label: "Nachname",
            type: "text",
            value: user_last_name,
            field: "user_last_name",
          },
          {
            label: "Email",
            type: "email",
            value: user_email,
            field: "user_email",
          },
          {
            label: "Telefonnummer",
            type: "text",
            value: user_phone,
            field: "user_phone",
          },
          {
            label: "Addresse (optional)",
            type: "text",
            value: user_address,
            field: "user_address",
          },
        ].map(({ label, type, value, field }) =>
          field === "user_address" ? (
            <span
              key={field}
              className={`${classes.inputWrapper} ${classes.addressField} `}
            >
              <AutoCompleteInput
                key={field}
                value={value}
                onChange={(newValue) => handleInputChange(field, newValue)}
              />
              {loadingFetchDetails && (
                <AiOutlineLoading3Quarters className={classes.loadingIcon} />
              )}
            </span>
          ) : (
            <span key={field} className={`${classes.inputWrapper} `}>
              <input
                type={type}
                id={field}
                className={classes.input}
                placeholder={label}
                required
                value={value || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
              {loadingFetchDetails && (
                <AiOutlineLoading3Quarters className={classes.loadingIcon} />
              )}
            </span>
          )
        )}
      </section>
    </section>
  );
}
