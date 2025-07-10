
function Form({submission, formLegend, buttonName, children}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    submission(data);
  };
  return (
    <form className='form' onSubmit={handleSubmit}>
      <legend className='form__title'>{formLegend}</legend>
      {children}
      <button type='submit' className='form__button'>{buttonName}</button>
    </form>
  );
}

export default Form;