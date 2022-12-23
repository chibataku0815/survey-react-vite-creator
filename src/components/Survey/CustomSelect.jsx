import React from 'react';
import Select from 'react-select';

const CustomSelect = (props) => {
  const { question } = props;
  const options = question.visibleChoices.map((c) => {
    return { value: c.value, label: c.value };
  });
  const selectedOption = options.filter((o) => o.value == question.value);
  const onSelectChange = (selectedOption) => {
    question.value = selectedOption.value;
  };

  // If the question is non-editable, render a stylized div
  if (question.isReadOnly) {
    return (
      <div id={question.inputId} className={question.getControlClass()} disabled>
        {question.displayValue || question.placeholder}
      </div>
    );
  }

  // Otherwise, render the React Select component
  return <Select name="form-field-name" value={selectedOption} options={options} onChange={onSelectChange} />;
};

export default CustomSelect;
