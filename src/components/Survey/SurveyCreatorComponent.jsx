import { css } from '@linaria/core';
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/monolith.min.css';
import { useEffect } from 'react';
import { CustomWidgetCollection, JsonObject, Serializer } from 'survey-core';
import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import { validateHTMLColorHex } from 'validate-color';
import { SURVEY_PROPERTY_BLACK_LIST } from '../../config/propertyGridBlackList';
import '../../styless/style';
import { creatorOptions } from './config/creatorOptions';
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

  // Register our widget in singleton custom widget collection
  const widget = {
    name: 'submitbuttonColor',
    isFit: (question) => {
      return question.getType() === 'text';
    },
    isDefaultRender: true,
    afterRender: (question, el) => {
      // aria-label='color'を持つ要素を取得
      const input = el.querySelector("[aria-label='Submitbutton color']");

      if (!input) return;

      input.style.width = '80%';
      input.style.marginRight = '10px';
      if (!input) return;
      input.type = question.inputType;
      el.style.display = 'flex';
      el.style.alignItems = 'center';

      const pickrDiv = document.createElement('div');

      // .pickrを持つ要素を取得
      const hasPickr = el.querySelector('.pickr');
      // inputの後ろにpickrDivを追加
      if (!hasPickr) {
        input.after(pickrDiv);
      } else {
        return;
      }

      const pickrInstance = new Pickr({
        el: pickrDiv,
        default: '#303030',
        theme: 'monolith',
        lockOpacity: true,
        comparison: false,

        swatches: ['#3f51b5', '#f44336', '#e91e63', '#9c27b0', '#673ab7'],

        components: {
          preview: true,
          opacity: false,
          hue: true,

          interaction: {
            rgba: false,
            input: true,
            save: true,
          },
        },
        i18n: {
          // Strings visible in the UI
          'ui:dialog': 'color picker dialog',
          'btn:toggle': 'toggle color picker dialog',
          'btn:swatch': 'color swatch',
          'btn:last-color': 'use previous color',
          'btn:save': '色一覧に追加',
          'btn:cancel': 'Cancel',
          'btn:clear': 'Clear',

          // Strings used for aria-labels
          'aria:btn:save': 'save and close',
          'aria:btn:cancel': 'cancel and close',
          'aria:btn:clear': 'clear and close',
          'aria:input': 'color input field',
          'aria:palette': 'color selection area',
          'aria:hue': 'hue selection slider',
          'aria:opacity': 'selection slider',
        },
      })
        .on('init', () => {
          pickrInstance.setColor(input.value);
          const pcrResult = document.querySelector('.pcr-result');
          if (pcrResult) pcrResult.maxLength = 7;
        })
        .on('change', (color) => {
          input.value = color.toHEXA().toString(0);
          document.body.style.setProperty('--global-color-custom', input.value);
          css`
            :global() {
              .sd-btn--action {
                background-color: var(--global-color-custom);
              }
            }
          `;
          // inputへフォーカス
          input.focus();
        });
    },
  };

  CustomWidgetCollection.Instance.addCustomWidget(widget);

  // Serializer.addProperties custom widget
  JsonObject.metaData.addProperty('survey', {
    name: 'submitbuttonColor',
    default: '#000000',
    category: 'general',
    visibleIndex: 1,
  });

  creator.onShowingProperty.add((_sender, options) => {
    options.canShow = SURVEY_PROPERTY_BLACK_LIST.indexOf(options.propertyName) === -1;
    if (options.propertyName === 'completedHtml') {
      options.propertyHtml = '';
    }
  });

  //
  Serializer.addProperty('survey', {
    name: 'completedText:string',
    category: 'general',
    default: '送信',
  });

  Serializer.addProperty('survey', {
    name: 'adminNotification:boolean',
    default: false,
    category: 'sendOptions',
    categoryIndex: 200,
  });

  Serializer.addProperty('text', {
    name: 'userNotification:boolean',
    default: false,
    category: 'general',
    dependsOn: ['inputType'],
    visibleIf(obj) {
      return obj.inputType === 'email';
    },
  });

  creator.onPropertyValidationCustomError.add((sender, options) => {
    if (options.propertyName === 'name') {
      options.value.length > 32 ? (options.error = '32文字まで入力してください') : (options.error = '');
    }
  });

  creator.onPropertyValidationCustomError.add((sender, options) => {
    if (options.propertyName === 'maxSize') {
      Number(options.value) > 314572800
        ? (options.error = '最大サイズは300MBまでに設定してください')
        : (options.error = '');
    }
  });

  creator.onPropertyValidationCustomError.add((sender, options) => {
    if (options.propertyName === 'submitbuttonColor') {
      if (!validateHTMLColorHex(options.value)) {
        options.error = '正しいカラーコードを入力してください（例：#000000）';
      }
    }
  });

  creator.onTestSurveyCreated.add(async (sender, options) => {
    creator.JSON.completedText
      ? (options.survey.completeText = creator.JSON.completedText)
      : (options.survey.completeText = '送信');

    // show svg
    options.survey.completedHtml = `
      <div class="survey-completed">
        <div class="survey-completed__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <g fill="none" fill-rule="evenodd">
              <circle cx="50" cy="50" r="50" fill="#FFF" />
              <path fill="#3F51B5" d="M50 100C22.4 100 0 77.6 0 50S22.4 0 50 0s50 22.4 50 50-22.4 50-50 50zm0-93C24.5 7 7 24.5 7 50s17.5 43 43 43 43-17.5 43-43S75.5 7 50 7z" />
              <path fill="#FFF" d="M50 100C22.4 100 0 77.6 0 50S22.4 0 50 0s50 22.4 50 50-22.4 50-50 50zm0-93C24.5 7 7 24.5 7 50s17.5 43 43 43 43-17.5 43-43S75.5 7 50 7z" />
              <path fill="#3F51B5" d="M50 100C22.4 100 0 77.6 0 50S22.4 0 50 0s50 22.4 50 50-22.4 50-50 50zm0-93C24.5 7 7 24.5 7 50s17.5 43 43 43 43-17.5 43-43S75.5 7 50 7z" />
              <path fill="#FFF" d="M50 100C22.4 100 0 77.6 0 50S22.4 0 50 0s50 22.4 50 50-22.4 50-50 50zm0-93C24.5 7 7 24.5 7 50s17.5 43 43 43 43-17.5 43-43S75.5 7 50 7z" />
              <path fill="#3F51B5" d="M50 100C22.4 100 0 77.6 0 50S22.4 0 50 0s50 22.4 50 50-22.4 50-50 50zm0-93C24.5 7 7 24.5 7 50s17.5 43 43 43 43-17.5 43-43S75.5 7 50 7z" />
              <path fill="#FFF" d="M50 100C22.4 100 0 77.6 0 50S22.4 0 50 0s50 22.4 50 50-22.4 50-50 50zm0-93C24.5 7 7 24.5 7 50s17.5 43 43 43 43-17.5 43-43S75.5 7 50 7z" />

            </g>
          </svg>
        </div>
        <div class="survey-completed__title">送信完了</div>
        <div class="survey-completed__text">ご協力ありがとうございました。</div>
      </div>
    `;

    options.survey.onComplete.add(async (sender, options) => {
      console.log('onComplete');
      const survey = options;
      console.log(survey);
    });
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <SurveyCreatorComponent creator={creator} />
    </>
  );
}

export default SurveyComponent;
