import "./styles.css";

const Dialog = (props) => {
  const { open, userInfoData, handleClose } = props;
  const { customerIdentificationCode, firstName, lastName, birthDate, gender } =
    userInfoData;
  return (
    <div className="dialogWrap" style={{ display: open ? "block" : "none" }}>
      <dialog open>
        <ul>
          <li>Identification number: {customerIdentificationCode}</li>
          <li>First name: {firstName}</li>
          <li>Last name: {lastName}</li>
          <li>Birth date: {birthDate}</li>
          <li>Gender: {gender}</li>
        </ul>
        <div className="buttonDialog">
          <button onClick={handleClose} className="buttonClose">
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};
export default Dialog;
