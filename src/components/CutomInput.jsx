// Set up a custom input component to be used for rendering Property Grid elements.
import React, { useEffect, useRef } from 'react';
import 'survey-core/defaultV2.css';
import 'survey-core/survey.i18n.js';
import 'survey-creator-core/survey-creator-core.css';
import 'survey-creator-core/survey-creator-core.i18n.js';

export default function CustomPropertyGridInput(props) {
  const { model, property } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    if (!model || !property) return;
    inputRef.current.value = model[property.name];
  }, [model, property]);

  const onChange = (e) => {
    model[property.name] = e.target.value;
  };

  return <input type="text" ref={inputRef} onChange={onChange} />;
}
