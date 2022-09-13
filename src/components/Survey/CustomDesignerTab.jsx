import React from 'react';
import { SurveyCreator } from 'survey-creator-react';
import * as SurveyReact from 'survey-react-ui';
import { creatorOptions } from './config/creatorOptions';

export default function CustomDesignerTab() {
  const creator = new SurveyCreator(creatorOptions);
  const designerTabClassName = 'svc-tab-designer ' + survey.css.root;

  return (
    <React.Fragment>
      <div className="svc-flex-column">
        {SurveyReact.ReactElementFactory.Instance.createElement('svc-toolbox', { creator })}
      </div>
    </React.Fragment>
  );
}
