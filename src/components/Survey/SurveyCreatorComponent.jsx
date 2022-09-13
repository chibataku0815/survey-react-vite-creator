import { Fragment } from 'react';
import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import { creatorOptions } from './config/creatorOptions';
// import "./index.css";
import './config/localization';
import './config/propertiesGrid';
import { visibledProperties } from './config/propertiesGrid';
import { setToolboxDefaltValue } from './config/toolbox';
import { orderToolboxItem } from './config/toolboxItem';

function SurveyComponent() {
  const creator = new SurveyCreator(creatorOptions);

  visibledProperties(creator);
  //   setToolboxItemTitle(setToolboxItemTitle);

  creator.toolbox.getItemByName('text').tooltip = 'testestestestte';

  console.info(creator.toolbox.getItemByName('text').tooltip);
  orderToolboxItem(creator);
  setToolboxDefaltValue(creator);

  return (
    <Fragment>
      <SurveyCreatorComponent creator={creator} />
    </Fragment>
  );
}

export default SurveyComponent;
