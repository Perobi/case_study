import classes from "./form-details.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function FormDetails({
  userDetails,
  setUserDetails,
  loadingFetchDetails,
}) {
  return (
    <>
      <section className={classes.formDetails}>
        <section className={classes.topSection}>
          <h3 className={classes.sectionTitle}>Persöhnliche Informationen</h3>
        </section>
        <section className={classes.row}>
          <span className={classes.inputWrapper}>
            <input
              type="text"
              className={classes.input}
              placeholder="Vorname"
              required
              value={userDetails?.user_first_name}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  user_first_name: e.target.value,
                }))
              }
            />
            {loadingFetchDetails && (
              <AiOutlineLoading3Quarters className={classes.loadingIcon} />
            )}
          </span>

          <span className={classes.inputWrapper}>
            <input
              type="text"
              required
              placeholder="Nachname"
              className={classes.input}
              value={userDetails?.user_last_name}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  user_last_name: e.target.value,
                }))
              }
            />
            {loadingFetchDetails && (
              <AiOutlineLoading3Quarters className={classes.loadingIcon} />
            )}{" "}
          </span>

          <span className={classes.inputWrapper}>
            <input
              type="email"
              placeholder="Email"
              required
              className={classes.input}
              value={userDetails?.user_email}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  user_email: e.target.value,
                }))
              }
            />
            {loadingFetchDetails && (
              <AiOutlineLoading3Quarters className={classes.loadingIcon} />
            )}
          </span>

          <span className={classes.inputWrapper}>
            <input
              type="text"
              placeholder="Telefonnummer"
              required
              className={classes.input}
              value={userDetails?.user_phone}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  user_phone: e.target.value,
                }))
              }
            />
            {loadingFetchDetails && (
              <AiOutlineLoading3Quarters className={classes.loadingIcon} />
            )}
          </span>

          <span className={classes.inputWrapper}>
            <input
              type="text"
              placeholder="Addresse (optional)"
              className={classes.input}
              value={userDetails?.user_address}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  user_address: e.target.value,
                }))
              }
            />
            {loadingFetchDetails && (
              <AiOutlineLoading3Quarters className={classes.loadingIcon} />
            )}
          </span>
        </section>
      </section>
    </>
  );
}
