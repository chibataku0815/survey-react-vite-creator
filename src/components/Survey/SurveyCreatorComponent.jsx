import { Fragment } from 'react';
import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import { creatorOptions } from './config/creatorOptions';
// import "./index.css";
import './config/localization';
import './config/propertiesGrid';
import { visibledProperties } from './config/propertiesGrid';

function SurveyComponent() {
  const creator = new SurveyCreator(creatorOptions);

  visibledProperties(creator);

  return (
    <Fragment>
      <SurveyCreatorComponent creator={creator} />
    </Fragment>
  );
}

export default SurveyComponent;
