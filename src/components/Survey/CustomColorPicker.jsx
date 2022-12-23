// Set up a custom component using Pickr to render Property Grid elements.
import Pickr from '@simonwep/pickr';
import React, { useEffect, useRef } from 'react';
import 'survey-core/defaultV2.css';
import 'survey-core/survey.i18n.js';
import 'survey-creator-core/survey-creator-core.css';
import 'survey-creator-core/survey-creator-core.i18n.js';

export default function CustomPropertyGridPickr(props) {
  const { model, property } = props;
  const pickrRef = useRef(null);

  useEffect(() => {
    if (!model || !property) return;
    const pickr = Pickr.create({
      el: pickrRef.current,
      theme: 'classic',
      default: model[property.name],
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true,
          clear: true,
          save: true,
        },
      },
    });

    pickr.on('save', (color, instance) => {
      model[property.name] = color.toHEXA().toString();
    });

    return () => {
      pickr.destroyAndRemove();
    };
  }, [model, property]);

  return (
    <div>
      <input type="text" ref={pickrRef} />
    </div>
  );
}
