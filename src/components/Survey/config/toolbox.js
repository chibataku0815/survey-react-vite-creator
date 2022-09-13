export const setToolboxDefaltValue = (creator) => {
  creator.toolbox.getItemByName('multipletext').json.items = [{ name: 'テキスト1' }, { name: 'テキスト2' }];
  creator.toolbox.getItemByName('text').json.isRequired = true;
  creator.toolbox.getItemByName('multipletext').json.isRequired = true;
  creator.toolbox.getItemByName('comment').json.isRequired = true;
  creator.toolbox.getItemByName('dropdown').json.isRequired = true;
  creator.toolbox.getItemByName('checkbox').json.isRequired = true;
  creator.toolbox.getItemByName('radiogroup').json.isRequired = true;
  creator.toolbox.getItemByName('rating').json.isRequired = true;
};
