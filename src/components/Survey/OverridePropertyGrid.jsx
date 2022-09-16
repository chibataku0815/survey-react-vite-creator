import React from 'react';

import { PropertyGridComponent } from 'survey-creator-react';
import { ReactElementFactory } from 'survey-react-ui';

import 'survey-core/survey.i18n.js';
import 'survey-creator-core/survey-creator-core.i18n.js';

import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import { creatorOverride } from '../../styless/style';

class CustomPropertyGridWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.btnClearSurveyClick = this.btnClearSurveyClick.bind(this);
    this.btnLoadNPSSurveyClick = this.btnLoadNPSSurveyClick.bind(this);
  }
  setCreatorJSON(val) {
    this.props.model.creator.JSON = val;
  }
  render() {
    const model = this.props.model;
    if (!model) return null;
    const rootStyle = { width: '100%', display: 'flex', padding: '5px' };
    const btnsStyle = { flex: '100%', padding: '5px' };
    const btnStyle = {
      width: '100%',
      minHeight: '32px',
      marginRight: '7px',
      marginBottom: '7px',
    };
    // Render a new element (a button in this demo) within the Property Grid, at the top.
    // Place the SurveyJS Creator's built-in PropertyGridComponent to render the rest of the Property Grid element in the default manner.
    return (
      <React.Fragment>
        <div className={creatorOverride}>
          <img src="https://avatars.githubusercontent.com/u/25198306?s=200&amp;v=4" width="80px" height="80px"></img>
          <div style={btnsStyle}>
            <button type="button" onClick={this.btnClearSurveyClick} style={btnStyle}>
              Clear Survey
            </button>
            <button type="button" onClick={this.btnLoadNPSSurveyClick} style={btnStyle}>
              Load NPS Survey
            </button>
          </div>
        </div>
        <PropertyGridComponent model={model}></PropertyGridComponent>
      </React.Fragment>
    );
  }
  btnClearSurveyClick() {
    this.setCreatorJSON({});
  }
  btnLoadNPSSurveyClick() {
    this.setCreatorJSON({
      completedHtml:
        '<h3>Thank you for your feedback.</h3><h5>Your thoughts and ideas will help us to create a great product!</h5>',
      completedHtmlOnCondition: [
        {
          expression: '{nps_score} > 8',
          html: '<h3>Thank you for your feedback.</h3><h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>',
        },
        {
          expression: '{nps_score} < 7',
          html: '<h3>Thank you for your feedback.</h3><h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5>',
        },
      ],
      pages: [
        {
          name: 'page1',
          elements: [
            {
              type: 'rating',
              name: 'nps_score',
              title: 'On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?',
              isRequired: true,
              rateMin: 0,
              rateMax: 10,
              minRateDescription: '(Most unlikely)',
              maxRateDescription: '(Most likely)',
            },
            {
              type: 'checkbox',
              name: 'promoter_features',
              visibleIf: '{nps_score} >= 9',
              title: 'Which features do you value the most?',
              isRequired: true,
              validators: [
                {
                  type: 'answercount',
                  text: 'Please select two features maximum.',
                  maxCount: 2,
                },
              ],
              hasOther: true,
              choices: ['Performance', 'Stability', 'User Interface', 'Complete Functionality'],
              otherText: 'Other feature:',
              colCount: 2,
            },
            {
              type: 'comment',
              name: 'passive_experience',
              visibleIf: '{nps_score} > 6  and {nps_score} < 9',
              title: 'What do you like about our product?',
            },
            {
              type: 'comment',
              name: 'disappointed_experience',
              visibleIf: '{nps_score} notempty',
              title: 'What do you miss or find disappointing in your experience with our products?',
            },
          ],
        },
      ],
      showQuestionNumbers: 'off',
    });
  }
}
// ! Register your custom class (CustomPropertyGridWrapper) as a React component which will be used by Survey Creator to render the Property Grid element.
// Call the ReactElementFactory's registerElement() method and use "svc-property-grid" as an identifier of the Property Grid element for which to register your custom component.
ReactElementFactory.Instance.registerElement('svc-property-grid', (props) => {
  return React.createElement(CustomPropertyGridWrapper, props);
});
