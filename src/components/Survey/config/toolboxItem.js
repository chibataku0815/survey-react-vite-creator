export const toolboxItemTitle = {
  text: '一問一答形式の短い自由回答が可能な入力項目を作成出来ます。\n項目例：氏名・メールアドレス・住所 等',
  multipletext:
    '複数の短い回答が必要な質問に対して、自由回答が可能な入力項目を作成出来ます。\n項目例：趣味を4つまで答えてください・保有資格を5 つまでご記載ください 等',
  comment:
    '複数行にまたがる文章での回答が必要な質問に対して、自由回答が可能な入力項目を作成出来ます。\n項目例：お問い合わせ内容・志望理由・ご希望条件詳細 等',
  dropdown:
    '質問に対する単一選択項目を作成出来ます。選択肢の数が多い場合に使うことがあります。\n項目例：年齢・生年月日・都道府県 等',
  checkbox:
    '質問に対する複数選択項目、或いは同意事項などの確認チェックとしてのチェック項目を作成出来ます。\n項目例：複数回答可能なアンケート項目(複数チェックボックス)・規約に同意しますか？(単一チェックボックス) 等',
  radiogroup: '質問に対する単一選択項目を作成出来ます。\n項目例：性別・職業・〇〇の保有の有無 等',
  rating:
    '質問に対し点数で答える必要がある項目を作成出来ます。\n項目例：サービスの満足度は何点でしょうか・利用頻度はどのくらいでしょうか(週1/月1) 等',
  file: 'ファイルのアップロードボタンを設置出来ます。\n使用例：本人確認書類の添付・写真や資料の添付 等',
  html: 'HTMLやプログラムを自由に記述出来ます。\n使用例：HTMLを用いた画像の挿入・CSSを用いたデザインの変更・JS を用いた動きの付与 等',
  link: 'テキストリンクを作成出来ます。\n使用例：規約ページへの遷移が必要な際 等',
};

export const setToolboxItemTitle = (array) =>
  Object.keys(array).forEach(function (toolboxName) {
    let textToolboxItem = creator.toolbox.getItemByName(toolboxName);
    textToolboxItem.tooltip = array[toolboxName];
    creator.toolbox.replaceItem(textToolboxItem);
  });

export const orderToolboxItem = (creator) =>
  (creator.toolbox.orderedQuestions = [
    'text',
    'multipletext',
    'comment',
    'dropdown',
    'checkbox',
    'radiogroup',
    'rating',
    'file',
    'html',
    'link',
  ]);
