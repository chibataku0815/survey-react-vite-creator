import { useEffect } from 'react';
import { ComponentCollection, Serializer } from 'survey-core';
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
const replaceHtml = (url, text, isEnableTarget) => {
  const newURL = url || '';
  const newText = text || newURL;
  const target = isEnableTarget ? "target='_blank'" : '';
  return `<a href='${newURL}' rel='noopener noreferrer' ${target}>${newText}</a>`;
};
ComponentCollection.Instance.add({
  name: 'link',
  title: 'リンク',
  iconName: 'icon-link',
  questionJSON: {
    type: 'html',
    html: '',
    showTitleLocation: false,
  },
  onInit() {
    Serializer.addProperty('link', {
      name: 'URL:text',
      category: 'general',
    });
    Serializer.addProperty('link', {
      name: '新規タブを開く:boolean',
      category: 'general',
      defaultValue: true,
      default: true,
    });

    Serializer.addProperty('link', {
      name: 'titleLocation',
      visible: false,
      default: 'hidden',
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
  },

  // itemをload時にaタグへ変換
  onLoaded(question) {
    question.contentQuestion.html = replaceHtml(question.URL || '', question.title, question['新規タブを開く']);
  },

  // プロパティに変更があった際にaタグへ変換
  onPropertyChanged(question) {
    question.contentQuestion.html = replaceHtml(question.URL || '', question.title, question['新規タブを開く']);
  },

  // メソッドを記載しないとエラーになるため記載
  onAfterRender() {},
  onAfterRenderContentElement() {},
  onCreated() {},
  onItemValuePropertyChanged() {},
  onValueChanged() {},
});

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
