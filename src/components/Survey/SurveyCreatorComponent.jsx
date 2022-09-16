import { useEffect } from 'react';
import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import '../../styless/style';
import { creatorOptions } from './config/creatorOptions';
// import "./index.css";
import './config/localization';
import { visibledProperties } from './config/propertiesGrid';
import { setToolboxDefaltValue } from './config/toolbox';
import { orderToolboxItem } from './config/toolboxItem';

function SurveyComponent() {
  const creator = new SurveyCreator(creatorOptions);
  visibledProperties(creator);
  creator.toolbox.getItemByName('text').tooltip = '';
  orderToolboxItem(creator);
  setToolboxDefaltValue(creator);
  visibledProperties(creator);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <SurveyCreatorComponent creator={creator} renderElement={(data) => <h1>Hello {data.target}</h1>} />
    </div>
  );
}

export default SurveyComponent;
