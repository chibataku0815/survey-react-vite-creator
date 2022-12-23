import { useEffect } from 'react';
import { ElementFactory, Question, Serializer, SvgRegistry } from 'survey-core';
import 'survey-core/defaultV2.css';
import { localization } from 'survey-creator-core';
import 'survey-creator-core/survey-creator-core.css';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import { SurveyQuestionElementBase } from 'survey-react-ui';
import '../../styless/style';
import { creatorOptions } from './config/creatorOptions';
// import "./index.css";
import './config/localization';
import { visibledProperties } from './config/propertiesGrid';
import { setToolboxDefaltValue } from './config/toolbox';
import { orderToolboxItem } from './config/toolboxItem';

SvgRegistry.registerIconFromSvg(
  'link',
  `<svg id="link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg>`,
);

// Register new `link` component
// ComponentCollection.Instance.add({
//   name: 'link',
//   title: 'Link',
//   iconName: 'icon-link',
//   questionJSON: {
//     type: 'html',
//     html: '<a href="https://surveyjs.io">SurveyJS</a>',
//   },
//   onInit: (question, editor) => {
//     Serializer.addProperty('link', [
//       {
//         name: 'URL:text',
//         category: 'general',
//       },
//     ]);
//     Serializer.addProperty('link', {
//       name: '新規タブを開く:boolean',
//       category: 'general',
//       defaultValue: true,
//       default: true,
//     });

//     Serializer.addProperty('link', {
//       name: 'titleLocation',
//       visible: false,
//       default: 'hidden',
//     });
//     Serializer.addProperty('link', {
//       name: 'description',
//       visible: false,
//     });
//     Serializer.addProperty('link', {
//       name: 'hidenumber',
//       visible: false,
//     });
//     Serializer.addProperty('link', {
//       name: 'isRequired',
//       visible: false,
//     });
//     Serializer.addProperty('link', {
//       name: 'visible',
//       visible: false,
//       default: true,
//     });
//     Serializer.addProperty('link', {
//       name: 'validators',
//       visible: false,
//     });
//     Serializer.addProperty('link', {
//       name: 'requiredErrorText',
//       visible: false,
//     });
//   },
// });
const CUSTOM_TYPE = 'link';

// A model for the new question type
class QuestionLinkModel extends Question {
  getType() {
    return CUSTOM_TYPE;
  }
  get linkType() {
    return this.getPropertyValue('linkType');
  }
  set linkType(val) {
    this.setPropertyValue('linkType', val);
  }

  get disableAlpha() {
    return this.getPropertyValue('disableAlpha');
  }
  set disableAlpha(val) {
    this.setPropertyValue('disableAlpha', val);
  }
}

export function registerLink() {
  ElementFactory.Instance.registerElement(CUSTOM_TYPE, (name) => {
    return new QuestionLinkModel(name);
  });
}

// specify display names for the new question type and its properties
const locale = localization.getLocale();
locale.qt[CUSTOM_TYPE] = 'Link';
locale.pe.colorPickerType = 'Link type';
locale.pe.disableAlpha = 'Disable alpha channel';

Serializer.addClass(
  CUSTOM_TYPE,
  [],
  function () {
    return new QuestionLinkModel('');
  },
  'question',
);

// Add link to the serializer.
Serializer.addProperty('link', [
  {
    name: 'URL:text',
    category: 'general',
  },
]);

// The name of the property in the property panel
Serializer.addProperty('link', {
  name: '新規タブを開く:boolean',
  category: 'general',
  defaultValue: true,
  default: true,
});

/**
 * This function settings a new properties object in the Property Panel.
 *
 * @param {string} name - The name of the new property
 * @param {object} options - The options object for the property
 */
Serializer.addProperty('link', {
  name: 'titleLocation',
  visible: false,
  default: 'hidden',
});
Serializer.addProperty('link', {
  name: 'titleLocation',
  debug: true,
});
Serializer.addProperty('link', {
  name: 'description',
  visible: false,
});
Serializer.addProperty('link', {
  name: 'hidenumber',
  visible: false,
});
Serializer.addProperty('link', {
  name: 'isRequired',
  visible: false,
});
Serializer.addProperty('link', {
  name: 'visible',
  visible: false,
  default: true,
});
Serializer.addProperty('link', {
  name: 'validators',
  visible: false,
});
Serializer.addProperty('link', {
  name: 'requiredErrorText',
  visible: false,
});

// Add a custom property for the URL field to the serializer
// Serializer.addProperty(CUSTOM_TYPE, [
//   {
//     name: 'URL:text',
//     category: 'general',
//   },
//   {
//     name: '新規タブを開く:boolean',
//     category: 'general',
//     defaultValue: true,
//     default: true,
//   },
//   {
//     name: 'titleLocation',
//     visible: false,
//     default: 'hidden',
//   },
//   {
//     name: 'description',
//     visible: false,
//   },
//   {
//     name: 'hidenumber',
//     visible: false,
//   },
//   {
//     name: 'isRequired',
//     visible: false,
//   },
//   {
//     name: 'visible',
//     visible: false,
//     default: true,
//   },
//   {
//     name: 'validators',
//     visible: false,
//   },
//   {
//     name: 'requiredErrorText',
//     visible: false,
//   },
// ]);

// A class that renders the new question type in the UI
export class SurveyQuestionLink extends SurveyQuestionElementBase {
  constructor(props) {
    super(props);
    this.state = { value: this.question.value };
  }

  get question() {
    return this.questionBase;
  }

  get value() {
    return this.question.value;
  }

  get disableAlpha() {
    return this.question.disableAlpha;
  }
  get type() {
    return this.question.colorPickerType;
  }

  get style() {
    return this.question.getPropertyValue('readOnly') || this.question.isDesignMode
      ? { pointerEvents: 'none' }
      : undefined;
  }

  renderElement() {
    return (
      <div>
        <input
          type={this.type}
          value={this.value}
          onChange={(e) => {
            this.setState({ value: e.target.value });
            this.question.value = e.target.value;
          }}
        />
      </div>
    );
  }
}

registerLink();

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

  return <SurveyCreatorComponent creator={creator} />;
}

export default SurveyComponent;
