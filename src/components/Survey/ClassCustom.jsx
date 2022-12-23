import Select from 'react-select';
import { SurveyQuestionDropdown } from 'survey-react';
import 'survey-react/survey.css';

export default class ClassCustomSelect extends SurveyQuestionDropdown {
  constructor(props) {
    super(props);
  }
  // Convert the `visibleChoices` array to a format supported by React Select
  get options() {
    return this.question.visibleChoices.map((c) => {
      return { value: c.value, label: c.value };
    });
  }
  // Retrieve an option object based on the question value
  get selectedOption() {
    return this.options.filter((o) => o.value == this.question.value);
  }
  // Set the question value to the selected option value
  onSelectChange = (selectedOption) => {
    this.setValueCore(selectedOption.value);
  };
  renderElement() {
    // If the question is non-editable, render a stylized div
    if (this.isDisplayMode) {
      return (
        <div id={this.question.inputId} className={this.question.getControlClass()} disabled>
          {this.question.displayValue || this.question.placeholder}
        </div>
      );
    }
    // Otherwise, render the React Select component
    return (
      <Select
        id={this.question.inputId}
        value={this.selectedOption}
        onChange={this.onSelectChange}
        options={this.options}
        required={this.question.isRequired}
        menuPortalTarget={document.querySelector('body')}
      />
    );
  }
}
