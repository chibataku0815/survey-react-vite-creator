import React, { useEffect } from 'react';

import { ReactElementFactory } from 'survey-react-ui';

import 'survey-core/survey.i18n.js';
import 'survey-creator-core/survey-creator-core.i18n.js';

import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import { PropertyGridComponent } from 'survey-creator-react';

export default function CustomPropertyGridWrapper(props) {
  // console.info(`functional`);

  const { model } = props;

  // console.info(model);

  useEffect(() => {
    if (!model) return;
    // console.info(model);
    return () => {};
  }, []);
  return (
    <>
      <PropertyGridComponent model={model}>
        <h1>Hello {model}</h1>
      </PropertyGridComponent>
    </>
  );
}

// ! Register your custom class (CustomPropertyGridWrapper) as a React component which will be used by Survey Creator to render the Property Grid element.
// Call the ReactElementFactory's registerElement() method and use "svc-property-grid" as an identifier of the Property Grid element for which to register your custom component.
ReactElementFactory.Instance.registerElement('svc-property-grid', (props) => {
  return React.createElement(CustomPropertyGridWrapper, props);
});
